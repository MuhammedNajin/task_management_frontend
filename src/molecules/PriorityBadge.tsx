import React from 'react';
import { Text } from '../atoms/Text';

interface PriorityBadgeProps {
  priority: "high" | "medium" | "low";
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityStyles = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <Text
      className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
        priorityStyles[priority] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Text>
  );
};