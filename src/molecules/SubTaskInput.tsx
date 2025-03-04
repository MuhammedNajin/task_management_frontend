import React from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface SubtaskInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: () => void;
  disabled?: boolean; 
}

export const SubtaskInput: React.FC<SubtaskInputProps> = ({
  value,
  onChange,
  onAdd,
  disabled = false,
}) => (
  <div className="flex">
    <Input
      id="newSubtask"
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Add a subtask"
      className="flex-grow rounded-l-md border-r-0"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onAdd();
        }
      }}
      disabled={disabled}
    />
    <Button
      onClick={onAdd}
      className="rounded-l-none bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400" 
      disabled={disabled || !value.trim()} 
    >
      Add
    </Button>
  </div>
);