import React from 'react';

interface StatNumberProps {
  value: number | string;
  label: string;
}

export const StatNumber: React.FC<StatNumberProps> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-3xl font-bold text-gray-800">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);