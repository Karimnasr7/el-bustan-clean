//import React from 'react';

export function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">لوحة التحكم</h1>
      <p>أهلاً بك في لوحة التحكم. من هنا يمكنك إدارة محتوى الموقع.</p>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <a href="/admin/articles" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold">إدارة المقالات</h3>
          <p className="text-gray-600">إنشاء، تعديل، أو حذف المقالات.</p>
        </a>
        <a href="/admin/slider" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold">إدارة السلايدر</h3>
          <p className="text-gray-600">تغيير صور ونصوص السلايدر.</p>
        </a>
        <a href="/admin/content" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold">المحتوى العام</h3>
          <p className="text-gray-600">تعديل النصوص والأرقام العامة.</p>
        </a>
      </div>
    </div>
  );
}