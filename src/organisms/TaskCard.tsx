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

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 max-w-sm">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Text className="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-md flex items-center justify-center mr-2 text-xs font-medium">
              T
            </Text>
          </div>
          <PriorityBadge priority={task.priority} />
        </div>

        <Text className="font-medium text-lg text-gray-900 mb-1">{task.title}</Text>
        <Text className="text-sm text-gray-500 line-clamp-1 mb-3">{task.description}</Text>

        <div className="border-t border-gray-200 pt-3 mt-2 flex items-center justify-between">
          <StatusBadge status={task.status} />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200"
          >
            <Eye className="w-4 h-4 mr-1" />
          </Button>
        </div>
      </div>

      {showModal && <TaskDetailsModal task={task} onClose={() => setShowModal(false)} />}
    </div>
  );
};