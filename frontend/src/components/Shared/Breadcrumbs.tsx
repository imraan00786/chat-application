import React from 'react';
import { Link } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  breadcrumbs: Breadcrumb[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex list-none p-0">
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.path}
            className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? 'active' : ''}`}
          >
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-600">{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.path} className="text-blue-500 hover:text-blue-700">
                {breadcrumb.label}
              </Link>
            )}
            {index < breadcrumbs.length - 1 && (
              <span className="mx-2">/</span> // Divider between breadcrumbs
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
