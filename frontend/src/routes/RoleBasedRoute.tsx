import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface RoleBasedRouteProps {
  component: React.ElementType;
  allowedRoles: string[];
}

const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ component: Component, allowedRoles }) => {
  const { role, user } = useSelector((state: RootState) => state.auth);

  if (!user || (role && !allowedRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default RoleBasedRoute;
