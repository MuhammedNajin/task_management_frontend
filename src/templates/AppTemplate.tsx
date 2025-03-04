import React from 'react';
import { Navbar } from '../organisms/NavBar';

interface AppTemplateProps {
  children: React.ReactNode;
}

export const AppTemplate: React.FC<AppTemplateProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="p-6">{children}</main>
  </div>
);