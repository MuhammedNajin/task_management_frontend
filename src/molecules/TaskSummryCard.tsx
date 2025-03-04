import React from 'react';
import { Text } from '../atoms/Text';

interface TaskSummaryCardProps {
  title: string;
  count: number;
  borderColor: string;
}

export const TaskSummaryCard: React.FC<TaskSummaryCardProps> = ({ title, count, borderColor }) => (
  <div className={`bg-white rounded-lg shadow px-4 py-5 border-l-4 ${borderColor}`}>
    <Text className="text-sm font-medium text-gray-500">{title}</Text>
    <Text className="mt-1 text-3xl font-semibold text-gray-900">{count}</Text>
  </div>
);