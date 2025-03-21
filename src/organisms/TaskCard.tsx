import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { Text } from '../atoms/Text';
import { Button } from '../atoms/Button';
import { StatusBadge } from '../molecules/StatusBadge';
import { PriorityBadge } from '../molecules/PriorityBadge';
import { TaskDetailsModal } from './TaskDetailsModal';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task: initialTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(initialTask);

  const handleTaskUpdated = (updatedTask: Task) => {
    setCurrentTask(updatedTask);
  };

  const getSubtaskStats = () => {
    if (!currentTask.subtasks || currentTask.subtasks.length === 0) {
      return 'No subtasks';
    }
    const completed = currentTask.subtasks.filter(st => st.completed).length;
    const total = currentTask.subtasks.length;
    return `${completed}/${total} completed`;
  };

  const formatDueDate = (date?: Date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white capitalize shadow rounded-lg overflow-hidden border border-gray-200 max-w-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Text className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-md flex items-center justify-center text-xs font-medium">
              T
            </Text>
            {currentTask.category && (
              <Text className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {currentTask.category}
              </Text>
            )}
          </div>
          <PriorityBadge priority={currentTask.priority} />
        </div>

        <Text className="font-medium text-lg text-gray-900 mb-1">{currentTask.title}</Text>
        <Text className="text-sm text-gray-500 line-clamp-1 mb-2">{currentTask.description}</Text>

        <div className="space-y-2 mb-3">
          <div className="flex items-center justify-between text-sm">
            <Text className="text-gray-600">Due:</Text>
            <Text className={`${
              currentTask.dueDate && new Date(currentTask.dueDate) < new Date() 
                ? 'text-red-600' 
                : 'text-gray-600'
            }`}>
              {formatDueDate(currentTask.dueDate)}
            </Text>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <Text className="text-gray-600">Subtasks:</Text>
            <Text className="text-gray-600">{getSubtaskStats()}</Text>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-3 flex items-center justify-between">
          <StatusBadge status={currentTask.status} />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <Eye className="w-4 h-4 mr-1" />
          </Button>
        </div>
      </div>

      {showModal && (
        <TaskDetailsModal 
          task={currentTask} 
          onClose={() => setShowModal(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};