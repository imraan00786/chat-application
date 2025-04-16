

// src/layouts/MainLayout.tsx
import React, { ReactNode } from 'react';
import Header from '../components/Shared/Header';
import { Outlet } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-4">
        {children || <Outlet />} {/* Use children or fallback to nested routes */}
      </main>
    </div>
  );
};

export default MainLayout;

