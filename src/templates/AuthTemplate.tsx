
import React from 'react';
import { ImageSection } from '../organisms/ImageSection';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => (
  <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
    <div className="w-full max-w-6xl flex flex-col md:flex-row gap-8">
      { children}
      <ImageSection />
    </div>
  </div>
);