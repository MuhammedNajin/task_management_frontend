
import React from 'react';
import { X } from 'lucide-react';
import { Icon } from '../atoms/Icon';

interface SubtaskListProps {
  subtasks: string[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export const SubtaskList: React.FC<SubtaskListProps> = ({
  subtasks,
  onRemove,
  disabled = false,
}) => (
  <ul className="mt-2 space-y-2">
    {subtasks.map((subtask, index) => (
      <li
        key={index}
        className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
      >
        <span className="text-sm text-gray-700 truncate flex-grow">{subtask}</span>
        <Icon
          onClick={() => !disabled && onRemove(index)}
          className={`text-red-500 hover:text-red-700 ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          aria-label={`Remove subtask: ${subtask}`}
          disabled={disabled} 
        >
          <X size={16} />
        </Icon>
      </li>
    ))}
  </ul>
);