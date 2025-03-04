import React from 'react';
import { CheckCircle, Clock, AlertCircle, Edit } from 'lucide-react';
import { Text } from '../atoms/Text';

type Status = 'completed' | 'pending' | 'in_progress';

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',

  };

  const StatusIcon = () => {
    if (status === 'completed') return <CheckCircle className="w-3 h-3 mr-1" />;
    if (status === 'pending') return <Clock className="w-3 h-3 mr-1" />;
    if (status === 'in_progress') return <Edit className="w-3 h-3 mr-1" />;
    return <AlertCircle className="w-3 h-3 mr-1" />;
  };

  return (
    <Text
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        statusStyles[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      <StatusIcon />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Text>
  );
};