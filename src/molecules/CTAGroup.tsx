import React from 'react';
import { Button } from '../atoms/Button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CTAGroupProps {
  className?: string;
}

export const CTAGroup: React.FC<CTAGroupProps> = ({ className = '' }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signin');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-center gap-4 ${className}`}>
      <Button
        className="flex items-center justify-center gap-2 px-6 py-3 text-lg"
        onClick={handleSignIn}
      >
        Sign In
        <ArrowRight size={18} />
      </Button>
      <Button
        className="flex items-center justify-center gap-2 px-6 py-3 text-lg"
        onClick={handleCreateAccount}
      >
        Create Account
      </Button>
    </div>
  );
};