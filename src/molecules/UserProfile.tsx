import React from 'react';
import { Text } from '../atoms/Text';
import { Avatar } from '../molecules/Avatar';
import { User } from '../types/Task';

interface UserProfileProps extends User {
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  name,
  email,
  initials,
  className = '',
}) => (
  <div className={`flex items-center ${className}`}>
    <Avatar initials={initials} />
    <div className="ml-3">
      <Text className="text-base font-medium text-gray-800">{name}</Text>
      <Text className="text-sm font-medium text-gray-500">{email}</Text>
    </div>
  </div>
);