import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface StatusChartProps {
  pending: number;
  inProgress: number;
  completed: number;
}

export const StatusChart: React.FC<StatusChartProps> = ({ pending, inProgress, completed }) => {
  const data = {
    labels: ['Pending', 'In Progress', 'Completed'],
    datasets: [{
      data: [pending, inProgress, completed],
      backgroundColor: ['#FF6B6B', '#4ECDC4', '#45B7D1'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="w-full max-w-xs mx-auto h-64">
      <Pie data={data} options={options} />
    </div>
  );
};