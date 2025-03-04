import React from 'react';
import { UserProfile } from '../molecules/UserProfile';
import { NavItem } from '../types/Task';

interface MobileMenuProps {
  navItems: NavItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ navItems }) => {
  const user = {
    name: 'User Name',
    email: 'user@example.com',
    initials: 'US',
  };

  return (
    <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
      <div className="px-4 sm:px-6">
        <UserProfile
          name={user.name}
          email={user.email}
          initials={user.initials}
          className="flex-shrink-0"
        />
      </div>
      <div className="mt-3 space-y-1 px-2 sm:px-3">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              item.isActive
                ? 'text-gray-900 bg-gray-50'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
        >
          Logout
        </a>
      </div>
    </div>
  );
};