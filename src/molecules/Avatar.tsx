// src/components/molecules/Avatar.tsx
import React from 'react';
import { Text } from '../atoms/Text';

interface AvatarProps {
  initials: string;
  className?: string;
  color?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ initials, className, color = 'bg-blue-100 text-blue-700' }) => (
  <Text
    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium border border-white ${color} ${className}`}
  >
    {initials}
  </Text>
);