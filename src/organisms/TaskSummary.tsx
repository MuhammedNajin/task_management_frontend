// src/components/organisms/TaskSummary.tsx
import React from 'react';
import { TaskSummaryCard } from '../molecules/TaskSummryCard';

interface TaskSummaryProps {
  all: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const TaskSummary: React.FC<TaskSummaryProps> = ({ all, pending, inProgress, completed }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
    <TaskSummaryCard title="All Tasks" count={all} borderColor="border-blue-500" />
    <TaskSummaryCard title="Pending" count={pending} borderColor="border-yellow-500" />
    <TaskSummaryCard title="In Progress" count={inProgress} borderColor="border-indigo-500" />
    <TaskSummaryCard title="Completed" count={completed} borderColor="border-green-500" />
  </div>
);