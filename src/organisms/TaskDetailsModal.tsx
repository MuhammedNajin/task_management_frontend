import React, { useState, useEffect } from 'react';
import { X, Edit, Trash2, Plus } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/TextArea';
import { Select } from '../atoms/Select';
import { Text } from '../atoms/Text';
import { StatusBadge } from '../molecules/StatusBadge';
import { PriorityBadge } from '../molecules/PriorityBadge';
import { Task } from '../types/Task';
import TaskService from '../service/api/task'; 
import toast from 'react-hot-toast';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onTaskUpdated?: (updatedTask: Task) => void;
  onTaskDeleted?: (taskId: string) => void;
}

export const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task: initialTask,
  onClose,
  onTaskUpdated,
  onTaskDeleted,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(initialTask);
  const [editedTask, setEditedTask] = useState({ ...initialTask });
  const [newSubtask, setNewSubtask] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [length, setLength] = useState(0)

  useEffect(() => {
    setTask(initialTask);
    setEditedTask({ ...initialTask });
    setLength(initialTask?.subtasks?.length || 0)
  }, [initialTask]);

  const formatDate = (dateString: string | Date) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  const handleSave = async () => {
    setIsSaving(true);
    try {

      let flag = false;

      if(editedTask.subtasks) {

        if( length < editedTask?.subtasks.length ||  length > editedTask?.subtasks.length)
           flag = true;
      } 
      const updatedTask = await TaskService.updateTask(task.id!, {
        ...editedTask,
        status: flag ? 'in_progress' : editedTask.status, 
      });
      setTask(updatedTask);
      setEditedTask(updatedTask);
      toast.success('Task updated successfully');
      setIsEditing(false);
      onTaskUpdated?.(updatedTask);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await TaskService.deleteTask(task.id!);
      toast.success('Task deleted successfully');
      onTaskDeleted?.(task.id!);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setIsDeleting(false);
    }
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setEditedTask({
        ...editedTask,
        subtasks: editedTask.subtasks
          ? [...editedTask.subtasks, { title: newSubtask.trim(), completed: false }]
          : [{ title: newSubtask.trim(), completed: false }],
      });
      setNewSubtask('');
    }
  };

  const removeSubtask = (index: number) => {
    if (!editedTask.subtasks) return;
    setEditedTask({
      ...editedTask,
      subtasks: editedTask.subtasks.filter((_, i) => i !== index),
    });
  };

  const toggleSubtaskStatus = async (index: number) => {
    if (!task.id || !editedTask.subtasks) return;
    const currentSubtask = editedTask.subtasks[index];
    const newCompletedStatus = !currentSubtask.completed;

    try {
    
      const updatedTaskWithSubtask = await TaskService.updateSubtaskStatus(task.id, index, newCompletedStatus);
    
      let finalTask = updatedTaskWithSubtask;
      if (updatedTaskWithSubtask.status !== 'in_progress') {

        console.log("updated ..................")
        finalTask = await TaskService.updateTask(task.id, {
          ...updatedTaskWithSubtask,
          status: 'in_progress' as const
        });
      }

      const allCompleted = finalTask.subtasks?.every(sub => sub.completed);
      if (allCompleted && finalTask.status !== 'completed') {
        finalTask = await TaskService.updateTask(task.id, {
          ...finalTask,
          status: 'completed',
        });
        toast.success('Task marked as completed');
      } else {
        toast.success('Subtask status updated');
      }

      setTask(finalTask);
      setEditedTask(finalTask);
      onTaskUpdated?.(finalTask);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update subtask');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-auto">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <Text className="text-lg font-medium text-gray-900">Task Details</Text>
          <Button
            onClick={onClose}
            className="text-gray-950 hover:text-gray-500 bg-gray-100 hover:bg-gray-200"
            disabled={isSaving || isDeleting}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div>
                  <Text className="text-xl font-semibold text-gray-900 capitalize">{task.title}</Text>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
                    {task.category && (
                      <Text className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
                        {task.category}
                      </Text>
                    )}
                  </div>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Description</Text>
                  <Text className="mt-1 text-gray-900 whitespace-pre-wrap">{task.description}</Text>
                </div>
              </div>

              <div>
                <Text className="text-sm font-medium text-gray-500 mb-2">Subtasks</Text>
                {task.subtasks && task.subtasks.length > 0 ? (
                  <ul className="space-y-2">
                    {task.subtasks.map((subtask, index) => (
                      <li key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                        <input
                          type="checkbox"
                          checked={subtask.completed}
                          onChange={() => toggleSubtaskStatus(index)}
                          className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                        <Text className={`text-gray-900 ${subtask.completed ? 'line-through' : ''}`}>
                          {subtask.title}
                        </Text>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <Text className="text-gray-500 italic">No subtasks</Text>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Text className="text-sm font-medium text-gray-500">Created</Text>
                  <Text className="mt-1 text-gray-900">{formatDate(task.createdAt)}</Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Due Date</Text>
                  <Text className={`mt-1 ${
                    task.dueDate && new Date(task.dueDate) < new Date() 
                      ? 'text-red-600' 
                      : 'text-gray-900'
                  }`}>
                    {task.dueDate ? formatDate(task.dueDate) : 'Not set'}
                  </Text>
                </div>
                <div>
                  <Text className="text-sm font-medium text-gray-500">Last Updated</Text>
                  <Text className="mt-1 text-gray-900">{formatDate(task.updatedAt || new Date())}</Text>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Title</Text>
                  <Input
                    id="title"
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    disabled={isSaving || isDeleting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Description</Text>
                  <Textarea
                    id="description"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    disabled={isSaving || isDeleting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Category</Text>
                  <Input
                    id="category"
                    type="text"
                    value={editedTask.category || ''}
                    onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
                    disabled={isSaving || isDeleting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Due Date</Text>
                  <Input
                    id="dueDate"
                    type="date"
                    value={editedTask.dueDate ? new Date(editedTask.dueDate).toISOString().split('T')[0] : ''}
                    onChange={(e) => setEditedTask({ ...editedTask, dueDate: new Date(e.target.value) })}
                    disabled={isSaving || isDeleting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Text className="block text-sm font-medium text-gray-700">Subtasks</Text>
                <div className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    placeholder="Add new subtask"
                    onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
                    disabled={isSaving || isDeleting}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                  <Button
                    onClick={addSubtask}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 px-3 py-2 rounded-md"
                    disabled={isSaving || isDeleting || !newSubtask.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {editedTask.subtasks && editedTask.subtasks.length > 0 && (
                  <ul className="space-y-2 max-h-40 overflow-auto">
                    {editedTask.subtasks.map((subtask, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <Text className={`text-gray-900 ${subtask.completed ? 'line-through' : ''}`}>
                          {subtask.title}
                        </Text>
                        <Button
                          onClick={() => removeSubtask(index)}
                          className="text-red-600 hover:text-red-700 disabled:text-gray-400"
                          disabled={isSaving || isDeleting}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Priority</Text>
                  <Select
                    id="priority"
                    value={editedTask.priority}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        priority: e.target.value as 'low' | 'medium' | 'high',
                      })
                    }
                    options={[
                      { value: 'low', label: 'Low' },
                      { value: 'medium', label: 'Medium' },
                      { value: 'high', label: 'High' },
                    ]}
                    disabled={isSaving || isDeleting}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          {!isEditing ? (
            <div className="flex justify-between">
              <Button
                onClick={() => setIsEditing(true)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-300 disabled:bg-gray-400 px-3 py-2 rounded-md"
                disabled={isDeleting}
              >
                <Edit className="w-4 h-4 mr-1" /> Edit
              </Button>
              <Button
                onClick={handleDelete}
                className="text-red-800 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-400 px-3 py-2 rounded-md"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  'Deleting...'
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask({ ...task });
                }}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-200 px-3 py-2 rounded-md"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 px-3 py-2 rounded-md"
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};