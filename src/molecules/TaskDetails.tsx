import React from 'react';
import { Task } from '../types/Task';
import { Tag } from '../atoms/Tags';

interface TaskDetailsProps {
  task: Task;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  return (
    <div className="flex-1">
      <h3
        className={`text-lg font-medium ${
          task.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-900'
        }`}
      >
        {task.title}
      </h3>
      {task.description && (
        <p
          className={`mt-1 text-sm ${
            task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          {task.description}
        </p>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <Tag variant="status" status={task.status}>
          {task.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Tag>
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
          Created: {new Date(task.createdAt).toLocaleDateString()}
        </span>
        {task.updatedAt && (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
            Updated: {new Date(task.updatedAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};