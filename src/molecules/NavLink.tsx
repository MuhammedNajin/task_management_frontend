import React from 'react';
import { NavItem } from '../types/Task';

interface NavLinkProps extends NavItem {}

export const NavLink: React.FC<NavLinkProps> = ({ label, href, isActive = false }) => {
  const baseStyles = 'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium';
  const activeStyles = isActive
    ? 'border-blue-500 text-gray-900'
    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300';

  return (
    <a href={href} className={`${baseStyles} ${activeStyles}`}>
      {label}
    </a>
  );
};