//import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}