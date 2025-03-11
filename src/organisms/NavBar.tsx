import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { NavLink } from '../molecules/NavLink';
import { Avatar } from '../molecules/Avatar';
import { MobileMenu } from './NavBarMobileMenu';
import { NavItem } from '../types/Task';
import { TaskCreationModal } from './TaskCreationModal';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import {  logout } from '../redux/reducer/authSlice';


export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/home' },
    { label: 'Analytics', href: '/analytics' },
  ];

  const handleTaskCreated = () => {
    console.log('Task created, consider refreshing task list');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin'); 
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-2 text-xl font-semibold text-gray-800">
                Task Manager
              </span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  isActive={item.href === pathname}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <Button onClick={() => setIsOpen(true)} className="ml-4">
              New Task
            </Button>
            <div className="hidden md:ml-4 md:flex md:items-center">
              <Avatar
                initials={user?.username.slice(0, 2) ?? ''}
                className="ml-3 uppercase w-10 h-10"
              />
              <button
                onClick={handleLogout}
                className="ml-3 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                title="Logout"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
           
            <div className="md:hidden flex items-center">
              <Button
                onClick={() => setIsOpen((prev) => !prev)}
                className="ml-4 p-2 text-gray-600 hover:text-gray-800"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu navItems={navItems}  />

      <TaskCreationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userId={user?.id ?? ''}
        onTaskCreated={handleTaskCreated}
      />
    </nav>
  );
};