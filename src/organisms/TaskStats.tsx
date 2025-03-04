// src/components/organisms/TaskStats.tsx
import React from 'react';
import { Card } from '../atoms/Card';
import { StatNumber } from '../atoms/StatNumber';

interface TaskStatsProps {
  totalTasks: number;
  overdueTasks: number;
  completionRate: number;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ totalTasks, overdueTasks, completionRate }) => (
  <Card className="flex justify-between items-center">
    <StatNumber value={totalTasks} label="Total Tasks" />
    <StatNumber value={overdueTasks} label="Overdue" />
    <StatNumber value={`${completionRate}%`} label="Completion Rate" />
  </Card>
);