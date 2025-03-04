import React from 'react';
import { Card } from '../atoms/Card';
import { StatusChart } from '../molecules/StatusChart';
import { PriorityChart } from '../molecules/PriorityChart';

interface TaskAnalyticsProps {
  statusBreakdown: {
    pending: number;
    inProgress: number;
    completed: number;
  };
  priorityBreakdown: {
    low: number;
    medium: number;
    high: number;
  };
}

export const TaskAnalytics: React.FC<TaskAnalyticsProps> = ({ statusBreakdown, priorityBreakdown }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <Card>
      <h3 className="text-lg font-semibold mb-4">Status Breakdown</h3>
      <StatusChart 
        pending={statusBreakdown.pending}
        inProgress={statusBreakdown.inProgress}
        completed={statusBreakdown.completed}
      />
    </Card>
    <Card>
      <h3 className="text-lg font-semibold mb-4">Priority Breakdown</h3>
      <PriorityChart 
        low={priorityBreakdown.low}
        medium={priorityBreakdown.medium}
        high={priorityBreakdown.high}
      />
    </Card>
  </div>
);