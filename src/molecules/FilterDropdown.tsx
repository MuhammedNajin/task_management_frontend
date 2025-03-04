// src/components/molecules/FilterDropdown.tsx
import React from 'react';
import { Filter } from 'lucide-react';
import { Select } from '../atoms/Select';
import { Icon } from '../atoms/Icon';

interface FilterDropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange }) => (
  <div className="relative">
    <Select
      id="filter"
      value={value}
      onChange={onChange}
      options={[
        { value: 'all', label: 'All Tasks' },
        { value: 'pending', label: 'Pending' },
        { value: 'inProgress', label: 'In Progress' },
        { value: 'completed', label: 'Completed' },
      ]}
      className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm"
    />
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <Icon className="h-4 w-4">
        <Filter className='h-4 w-4'/>
      </Icon>
    </div>
  </div>
);