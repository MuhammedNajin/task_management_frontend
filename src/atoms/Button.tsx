import React from 'react';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  disabled?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, disabled = false, className, ...props }, ref) => (
    <button
      className={cn(
        'px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        disabled
          ? 'bg-blue-300 text-white cursor-not-allowed'
          : 'bg-blue-500 text-white hover:bg-blue-600',
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = 'Button';