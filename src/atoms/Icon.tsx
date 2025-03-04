import React from 'react';

interface IconProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
  disabled?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  children,
  onClick,
  className = '',
  ariaLabel,
  disabled = false,
}) => (
  <button
    disabled={disabled}
    className={`p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    onClick={onClick}
    aria-label={ariaLabel}
  >
    {children}
  </button>
);