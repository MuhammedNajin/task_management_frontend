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

  useEffect(() => {
    setTask(initialTask);
    setEditedTask({ ...initialTask });
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
      const updatedTask = await TaskService.updateTask(task.id!, editedTask);
      console.log("updated", updatedTask)
      setTask(updatedTask);
      setEditedTask(updatedTask);
      toast.success('Task updated successfully', {
        duration: 4000,
        position: 'top-right',
      });
      setIsEditing(false);
      onTaskUpdated?.(updatedTask);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update task', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await TaskService.deleteTask(task.id!);
      toast.success('Task deleted successfully', {
        duration: 4000,
        position: 'top-right',
      });
      onTaskDeleted?.(task.id!);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete task', {
        duration: 4000,
        position: 'top-right',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      setEditedTask({
        ...editedTask,
        subtasks: editedTask.subtasks ? [...editedTask.subtasks, newSubtask.trim()] : [newSubtask.trim()],
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-screen overflow-auto">
 
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <Text className="text-lg font-medium text-gray-900">Task Details</Text>
          <Button onClick={onClose} className="text-gray-950 hover:text-gray-500 bg-gray-100 hover:bg-gray-200" disabled={isSaving || isDeleting}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="px-6 py-4 space-y-6">
          {!isEditing ? (
            <>
              <div className="space-y-4">
                <div>
                  <Text className="text-xl font-semibold text-gray-900">{task.title}</Text>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <StatusBadge status={task.status} />
                    <PriorityBadge priority={task.priority} />
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
                        <Text className="text-gray-900">{subtask}</Text>
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
                  />
                </div>
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Description</Text>
                  <Textarea
                    id="description"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    disabled={isSaving || isDeleting}
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
                  />
                  <Button
                    onClick={addSubtask}
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
                    disabled={isSaving || isDeleting || !newSubtask.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {editedTask.subtasks && editedTask.subtasks.length > 0 && (
                  <ul className="space-y-2 max-h-40 overflow-auto">
                    {editedTask.subtasks.map((subtask, index) => (
                      <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                        <Text className="text-gray-900">{subtask}</Text>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  />
                </div>
                <div>
                  <Text className="block text-sm font-medium text-gray-700">Status</Text>
                  <Select
                    id="status"
                    value={editedTask.status}
                    onChange={(e) =>
                      setEditedTask({
                        ...editedTask,
                        status: e.target.value as 'pending' | 'in_progress' | 'completed',
                      })
                    }
                    options={[
                      { value: 'pending', label: 'Pending' },
                      { value: 'in_progress', label: 'In Progress' },
                      { value: 'completed', label: 'Completed' },
                    ]}
                    disabled={isSaving || isDeleting}
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
                className="bg-gray-100 text-gray-700 hover:bg-gray-300 disabled:bg-gray-400"
                disabled={isDeleting}
              >
                <Edit className="w-4 h-4 mr-1" />
              </Button>
              <Button
                onClick={handleDelete}
                className="text-red-800 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-400"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  'Deleting...'
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-1" /> 
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="flex justify-end space-x-3">
              <Button
                onClick={() => {
                  setIsEditing(false);
                  setEditedTask({ ...task }); // Reset editedTask to current task on cancel
                }}
                className="text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:bg-gray-200"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400"
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