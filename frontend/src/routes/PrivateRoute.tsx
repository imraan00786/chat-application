import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface PrivateRouteProps {
  component: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

export default PrivateRoute;

