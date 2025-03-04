import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '../atoms/Input';
import { Icon } from '../atoms/Icon';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder = 'Search tasks...' }) => (
  <div className="relative flex flex-grow max-w-md">
    <div className="absolute inset-y-0 left-0 -top-2.5 flex items-center  pointer-events-none">
      <Icon className="h-5 w-5 text-gray-400">
        <Search />
      </Icon>
    </div>
    <Input
      id="search"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white"
    />
  </div>
);