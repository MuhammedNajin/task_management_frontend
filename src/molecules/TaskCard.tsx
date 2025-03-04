import React from 'react';
import { Task } from '../types/Task';
import { Checkbox } from '../atoms/Checkbox';
import { TaskDetails } from './TaskDetails';
import { TaskActions } from './TaskAction';

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit?: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const cardStyles = `border rounded-lg overflow-hidden transition-shadow hover:shadow-md ${
    task.status === 'completed'
      ? 'border-green-200 bg-green-50'
      : task.status === 'in_progress'
      ? 'border-blue-200 bg-blue-50'
      : 'border-gray-200 bg-white'
  }`;

  return (
    <div className={cardStyles}>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <Checkbox
              status={task.status}
              onChange={() => onToggle(task.id as string)}
            />
            <TaskDetails task={task} />
          </div>
          <TaskActions
            onEdit={onEdit ? () => onEdit(task.id as string) : undefined}
            onDelete={() => onDelete(task.id as string)}
          />
        </div>
      </div>
    </div>
  );
};