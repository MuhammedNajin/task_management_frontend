import React from 'react';
import { Filter } from 'lucide-react';
import { Select } from '../atoms/Select';
import { Icon } from '../atoms/Icon';

interface Option {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  id?: string;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  placeholder?: string;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  value,
  onChange,
  options,
  id = 'filter',
  className = '',
  icon = <Filter className="h-4 w-4" />,
  disabled = false,
  placeholder,
}) => (
  <div className="relative">
    <Select
      id={id}
      value={value}
      onChange={onChange}
      options={
        placeholder
          ? [{ value: '', label: placeholder }, ...options]
          : options
      }
      className={`appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm ${className}`}
      disabled={disabled}
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <Icon className="h-4 w-4">{icon}</Icon>
    </div>
  </div>
);