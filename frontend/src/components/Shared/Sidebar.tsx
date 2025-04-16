import React from 'react';
import { FaHome, FaUsers, FaCog } from 'react-icons/fa';
import SidebarLink from './SidebarLink'; 
interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  return (
    <div
      className={`${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-0 z-50 bg-gray-800 bg-opacity-75 md:relative md:translate-x-0 transition-transform`}
    >
      <div className="flex flex-col bg-gray-900 text-white w-64 min-h-screen py-6 px-4">
        {/* Close Button for mobile */}
        <div className="flex justify-end md:hidden">
         
        </div>

        {/* Sidebar Links */}
        <div className="flex flex-col space-y-4 mt-6">
          <SidebarLink to="/" label="Home" />
          <SidebarLink to="/group" label="Groups"  />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
