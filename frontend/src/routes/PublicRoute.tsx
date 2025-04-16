import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface PublicRouteProps {
  component: React.ElementType;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ component: Component }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  return <Component />;
};

export default PublicRoute;
