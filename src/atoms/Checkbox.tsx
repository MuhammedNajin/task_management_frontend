import React from 'react';

interface CheckboxProps {
  status: 'pending' | 'in_progress' | 'completed';
  onChange: () => void;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ status, onChange, className = '' }) => {
  const isCompleted = status === 'completed';
  return (
    <button
      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
        isCompleted ? 'bg-green-500 border-green-500' : 'border-gray-400'
      } ${className}`}
      onClick={onChange}
    >
      {isCompleted && (
        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
};