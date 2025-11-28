// src/admin/App.tsx

//import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ArticlesPage } from './pages/articles/ArticlesPage';
import { StickyScrollPage } from './pages/sticky-scroll/StickyScrollPage';

export function AdminApp() {
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* If not authenticated, redirect to login */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
        
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* will add more protected routes here later, e.g., /articles, /slider */}
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="sticky-scroll" element={<StickyScrollPage />} />
          <Route path="slider" element={<div>Slider Page (Coming Soon)</div>} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>

        {/* Redirect root admin to dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}