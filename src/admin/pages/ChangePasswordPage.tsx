// src/admin/pages/ChangePasswordPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    if (newPassword !== confirmNewPassword) {
      setMessage('كلمة المرور الجديدة وتأكيدها غير متطابقين.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('تم تغيير كلمة المرور بنجاح!');
        setTimeout(() => {
          localStorage.removeItem('adminToken');
          navigate('/admin/login');
        }, 2000);
      } else {
        setMessage(data.error || 'فشل تغيير كلمة المرور.');
      }
    } catch (err) {
      setMessage('حدث خطأ ما. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">تغيير كلمة المرور</h1>
        <div className="bg-white shadow-md rounded p-6 space-y-4">
          {message && <p className={`text-center ${message.includes('نجاح') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">كلمة المرور الحالية</label>
              <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">كلمة المرور الجديدة</label>
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">تأكيد كلمة المرور الجديدة</label>
              <input type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50">
              {loading ? 'جاري الحفظ...' : 'تغيير كلمة المرور'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}