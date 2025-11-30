// src/admin/App.tsx
import _React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/LoginForm';
import { Dashboard } from './components/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ArticlesPage } from './pages/articles/ArticlesPage';
import { StickyScrollPage } from './pages/sticky-scroll/StickyScrollPage';
import { StickyScrollReversedPage } from './pages/sticky-scroll-reversed/StickyScrollReversedPage';
import { AnimatedSliderPage } from './pages/animated-slider/AnimatedSliderPage';
import { SiteContentPage } from './pages/site-content/SiteContentPage';
import { BeforeAfterGalleryPage } from './pages/before-after-gallery/BeforeAfterGalleryPage';
import { ServicesPage } from './pages/services/ServicePage'; // <-- استيراد الصفحة الجديدة


export function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/login" element={<LoginForm />} />

          <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="content" element={<SiteContentPage />} />
          <Route path="before-after-gallery" element={<BeforeAfterGalleryPage />} />
          <Route path="animated-slider" element={<AnimatedSliderPage />} />
          <Route path="sticky-scroll" element={<StickyScrollPage />} />
          <Route path="sticky-scroll-reversed" element={<StickyScrollReversedPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="services" element={<ServicesPage />} /> 

          
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </div>
  );
}