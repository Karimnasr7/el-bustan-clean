// src/admin/components/ProtectedRoute.tsx
import _React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem('adminToken');
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}