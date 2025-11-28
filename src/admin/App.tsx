//import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';

// This is the main routing component for the admin panel.
export function AdminApp() {
  // We'll use a simple check in localStorage to see if the user is logged in.
  const isAuthenticated = !!localStorage.getItem('adminToken');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* If not authenticated, redirect to login */}
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} />
          
          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="dashboard" element={<Dashboard />} />
            {/* We will add more protected routes here later, e.g., /articles, /slider */}
            <Route path="articles" element={<div>Articles Page (Coming Soon)</div>} />
            <Route path="slider" element={<div>Slider Page (Coming Soon)</div>} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>

          {/* Redirect root admin to dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}