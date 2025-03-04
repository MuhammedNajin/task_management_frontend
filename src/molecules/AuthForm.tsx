import React from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

interface AuthFormProps {
  email: string;
  password: string;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  onSubmit: () => void;
  isSignUp?: boolean;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onSubmit,
  isSignUp = false,
}) => (
  <div className="space-y-4">
    <Input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <Input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <Button onClick={onSubmit}>{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
  </div>
);