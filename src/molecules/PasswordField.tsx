import React from 'react';
import { FormField } from './FormField';
import { Input } from '../atoms/Input'; 
import { Icon } from '../atoms/Icon';

interface PasswordFieldProps {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({ id, value, onChange }) => (
  <FormField label="Password" htmlFor={id}>
    <div className="relative">
      <Input
        id={id}
        type="password"
        placeholder="At least 8 characters"
        value={value}
        onChange={onChange}
      />
      <Icon className="absolute right-3 top-1/2 transform translate-y-1 text-gray-400">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </Icon>
    </div>
  </FormField>
);