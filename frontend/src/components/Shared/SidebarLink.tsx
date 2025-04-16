import React, { ElementType } from 'react';
import { Link } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  label: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label }) => {
  return (
    <Link
      to={to}
      className="flex items-center text-white hover:bg-gray-700 py-2 px-4 rounded-md transition-colors"
    >
      {/* Use Icon as a valid component */}
      <span>{label}</span>
    </Link>
  );
};

export default SidebarLink;
