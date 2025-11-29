// src/admin/components/Dashboard.tsx
import _React from 'react';
import { Link } from 'react-router-dom'; // <-- استيراد Link للتنقل السلس

export function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      <p>أهلاً بك في لوحة التحكم. من هنا يمكنك إدارة محتوى الموقع.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* استخدام Link بدلاً من <a> للتنقل دون إعادة تحميل */}
        <Link to="/admin/hero" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة قسم الهيرو</h3>
          <p className="text-gray-600">تغيير صور ونصوص البانر الرئيسي.</p>
        </Link>

        <Link to="/admin/content" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">المحتوى العام</h3>
          <p className="text-gray-600">تعديل النصوص والأرقام العامة.</p>
        </Link>

        <Link to="/admin/before-after-gallery" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">معرض قبل وبعد</h3>
          <p className="text-gray-600">إدارة صور معرض قبل وبعد.</p>
        </Link>

        <Link to="/admin/animated-slider" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة السلايدر المتحرك</h3>
          <p className="text-gray-600">تغيير صور ونصوص السلايدر.</p>
        </Link>

        <Link to="/admin/sticky-scroll" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة قسم Sticky Scroll</h3>
          <p className="text-gray-600">تعديل عناصر هذا القسم.</p>
        </Link>

        <Link to="/admin/sticky-scroll-reversed" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة قسم Sticky Scroll المعكوس</h3>
          <p className="text-gray-600">تعديل عناصر القسم المعكوس.</p>
        </Link>

        <Link to="/admin/articles" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة المقالات</h3>
          <p className="text-gray-600">إنشاء، تعديل، أو حذف المقالات.</p>
        </Link>
        
      </div>
    </div>
  );
}