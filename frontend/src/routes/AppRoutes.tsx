import React, { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Loader from '../components/Shared/Loader';
import MainLayout from '../layouts/MainLayout';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Chat = lazy(() => import('../pages/Chat'));
const GroupManagement = lazy(() => import('../pages/GroupManagement'));

const AppRoutes = () => {
    console.log('start')

  return (
    <Suspense fallback={<Loader />}>
        <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<PublicRoute component={Login} />} />
        <Route path="/register" element={<PublicRoute component={Register} />} />

        {/* Private Routes */}
        <Route element={<MainLayout />}>
            <Route path="/chat" element={<PrivateRoute component={Chat} />} />
            <Route path="/groups" element={<PrivateRoute component={GroupManagement} />} />
            <Route path="/group-management" element={<PrivateRoute component={GroupManagement} />} />
        </Route>
          
         <Route path="*" element={<Navigate to="/" />} />
        
        {/* Default Route */}
        <Route path="/" element={<Login />} />
        </Routes>
    </Suspense>
  );
};

export default AppRoutes;
