// src/admin/components/Dashboard.tsx
import { Link, useNavigate } from 'react-router-dom';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <div className="flex gap-4">
          <Link
            to="/admin/change-password"
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            تغيير كلمة المرور
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
      
      <p>أهلاً بك في لوحة التحكم. من هنا يمكنك إدارة محتوى الموقع.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        <Link to="/admin/services" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow block">
          <h3 className="text-xl font-semibold">إدارة الخدمات</h3>
          <p className="text-gray-600">إضافة، تعديل، أو حذف خدمات الموقع.</p>
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