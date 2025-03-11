import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { z } from 'zod';
import { Task } from '../types/Task';
import { FormField } from '../molecules/FormField';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/TextArea';
import { Select } from '../atoms/Select';
import { SubtaskInput } from '../molecules/SubTaskInput';
import { SubtaskList } from '../molecules/SubTaskList';
import { ModalHeader } from '../molecules/ModalHeader';
import { ModalFooter } from '../molecules/ModalFooter';
import TaskService from '../service/api/task';
import toast from 'react-hot-toast';

// Define the task schema with dueDate validation
const taskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(1, 'Description is required').max(1000, 'Description must be 1000 characters or less'),
  status: z.enum(['pending', 'in_progress', 'completed']),
  priority: z.enum(['low', 'medium', 'high']),
  category: z.string().max(50, 'Category must be 50 characters or less').optional(),
  dueDate: z
    .string()
    .optional()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: 'Invalid date format',
    })
    .refine((val) => !val || new Date(val) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'Due date cannot be earlier than today',
    }),
  subtasks: z
    .array(z.string().min(1, 'Subtask cannot be empty').max(200, 'Subtask must be 200 characters or less'))
    .optional(),
  userId: z.string().min(1, 'User ID is required'),
  slug: z.string().min(1, 'Slug is required'),
});

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onTaskCreated?: () => void;
}

export const TaskCreationModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Task['status']>('pending');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState<string>('');
  const [subtasks, setSubtasks] = useState<string[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [errors, setErrors] = useState<
    Partial<Record<keyof Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>, string>> & {
      form?: string;
    }
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const taskData = {
      title,
      description,
      status,
      priority,
      userId,
      subtasks: subtasks.length > 0 ? subtasks : undefined,
      category: category || undefined,
      dueDate: dueDate || undefined,
      slug: title.toLowerCase().replace(/\s+/g, '-'),
    };

    const result = taskSchema.safeParse(taskData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>, string>> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'>;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    const taskForService: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'isDeleted'> = {
      ...result.data,
      dueDate: result.data.dueDate ? new Date(result.data.dueDate) : undefined,
    };

    try {
      await TaskService.createTask(taskForService);
      toast.success('Task created successfully!', {
        duration: 4000,
        position: 'top-right',
      });
      resetForm();
      window.location.href = '/home'
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create task';
      toast.error(errorMessage, {
        duration: 4000,
        position: 'top-right',
      });
      setErrors({ ...errors, form: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      const subtaskResult = z.string().min(1).max(200).safeParse(newSubtask.trim());
      if (!subtaskResult.success) {
        setErrors({ subtasks: subtaskResult.error.errors[0].message });
        return;
      }
      setSubtasks([...subtasks, newSubtask.trim()]);
      setNewSubtask('');
      setErrors((prev) => ({ ...prev, subtasks: undefined }));
    }
  };

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setStatus('pending');
    setPriority('medium');
    setCategory('');
    setDueDate('');
    setSubtasks([]);
    setNewSubtask('');
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-full overflow-hidden flex flex-col">
        <ModalHeader title="Create New Task" onClose={onClose} />

        <div className="p-6 overflow-y-auto flex-grow">
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <FormField label="Title" htmlFor="title">
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setErrors((prev) => ({ ...prev, title: undefined }));
                }}
                placeholder="Task title"
                disabled={isSubmitting}
              />
              {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
            </FormField>

            <FormField label="Description" htmlFor="description">
              <Textarea
                id="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setErrors((prev) => ({ ...prev, description: undefined }));
                }}
                placeholder="Describe the task"
                disabled={isSubmitting}
              />
              {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            </FormField>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Status" htmlFor="status">
                <Select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Task['status'])}
                  options={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'in_progress', label: 'In Progress' },
                    { value: 'completed', label: 'Completed' },
                  ]}
                  disabled={isSubmitting}
                />
              </FormField>
              <FormField label="Priority" htmlFor="priority">
                <Select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Task['priority'])}
                  options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                  ]}
                  disabled={isSubmitting}
                />
              </FormField>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category" htmlFor="category">
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setErrors((prev) => ({ ...prev, category: undefined }));
                  }}
                  placeholder="Category"
                  disabled={isSubmitting}
                />
                {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
              </FormField>
              <FormField label="Due Date" htmlFor="dueDate">
                <div className="relative">
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => {
                      setDueDate(e.target.value);
                      setErrors((prev) => ({ ...prev, dueDate: undefined }));
                    }}
                    min={new Date().toISOString().split('T')[0]} // Set min attribute to today
                    className="pr-10"
                    disabled={isSubmitting}
                  />
                  <Calendar className="absolute right-3 top-2.5 text-gray-400" size={16} />
                </div>
                {errors.dueDate && <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>}
              </FormField>
            </div>

            <FormField label="Subtasks" htmlFor="newSubtask">
              <SubtaskInput
                value={newSubtask}
                onChange={(e) => {
                  setNewSubtask(e.target.value);
                  setErrors((prev) => ({ ...prev, subtasks: undefined }));
                }}
                onAdd={addSubtask}
                disabled={isSubmitting}
              />
              {subtasks.length > 0 && (
                <SubtaskList subtasks={subtasks} onRemove={removeSubtask} disabled={isSubmitting} />
              )}
              {errors.subtasks && <p className="mt-1 text-sm text-red-600">{errors.subtasks}</p>}
            </FormField>

            {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
          </form>
        </div>

        <ModalFooter
          onCancel={onClose}
          onSave={handleSubmit}
          isSaveDisabled={!!errors.title || !!errors.description || !!errors.dueDate || isSubmitting}
          saveText={isSubmitting ? 'Saving...' : 'Save'}
        />
      </div>
    </div>
  );
};