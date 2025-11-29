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
import { HeroPage } from './pages/hero/HeroPage';

export function AdminApp() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* 
          مسار تسجيل الدخول. غير محمي.
          إذا كان المستخدم مسجل دخوله بالفعل، سيتم إعادة توجيهه للداش بورد.
        */}
        <Route path="/login" element={<LoginForm />} />

        {/*
          جميع المسارات الأخرى محمية وتقع تحت ProtectedRoute.
          هذا المكون يعمل كبوابي: يتحقق من وجود التوكن.
          إذا لم يكن هناك توكن، يتم إعادة توجيه المستخدم إلى صفحة تسجيل الدخول.
        */}
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="content" element={<SiteContentPage />} />
          <Route path="before-after-gallery" element={<BeforeAfterGalleryPage />} />
          <Route path="animated-slider" element={<AnimatedSliderPage />} />
          <Route path="sticky-scroll" element={<StickyScrollPage />} />
          <Route path="sticky-scroll-reversed" element={<StickyScrollReversedPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          
          {/* أي مسار آخر داخل لوحة التحكم يتم توجيهه إلى الداش بورد */}
          <Route path="*" element={<Navigate to="/admin/dashboard" />} />
        </Route>

        {/* 
          أي طلب آخر إلى لوحة التحكم (مثل الوصول المباشر) 
          يتم توجيهه إلى الداش بورد.
          ProtectedRoute سيتكفل بإعادة توجيه غير المسجلين إلى صفحة الدخول.
        */}
        <Route path="*" element={<Navigate to="/admin/dashboard" />} />
      </Routes>
    </div>
  );
}