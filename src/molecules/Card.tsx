import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-white bg-opacity-10 p-6 rounded-lg ${className}`}>
    {children}
  </div>
);