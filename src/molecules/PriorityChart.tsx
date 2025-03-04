import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

interface PriorityChartProps {
  low: number;
  medium: number;
  high: number;
}

export const PriorityChart: React.FC<PriorityChartProps> = ({ low, medium, high }) => {
  const data = {
    labels: ['Low', 'Medium', 'High'],
    datasets: [{
      label: 'Tasks',
      data: [low, medium, high],
      backgroundColor: ['#90EE90', '#FFD700', '#FF4500'],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Tasks',
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend since it's a single dataset
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
};