import React from 'react';

interface TagProps {
  children: React.ReactNode;
  variant: 'status';
  status: 'pending' | 'in_progress' | 'completed';
}

export const Tag: React.FC<TagProps> = ({ children, status }) => {
  const baseStyles = 'px-2 py-1 text-xs font-medium rounded-full';
  const statusStyles =
    status === 'completed'
      ? 'bg-green-100 text-green-800'
      : status === 'in_progress'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';

  return <span className={`${baseStyles} ${statusStyles}`}>{children}</span>;
};