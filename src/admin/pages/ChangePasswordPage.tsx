// src/admin/pages/ChangePasswordPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
export function ChangePasswordPage() {
  /* المنطق القديم بدون تغيير */
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState({ cur: false, new: false, conf: false });

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
      const token = localStorage.getItem('adminToken'); // جلب التوكن 

      const response = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // تمرير الهوية للسيرفر 🛡️
        },
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
    } catch {
      setMessage('حدث خطأ ما. يرجى المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  /* شريط قوة كلمة السر */
  const strengthColor =
    newPassword.length < 6 ? 'bg-red-500' : newPassword.length < 10 ? 'bg-yellow-500' : 'bg-green-500';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
      {/* خلفية ديناميكية */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 30% 20%, #0ea5e9 0%, transparent 50%), radial-gradient(circle at 70% 80%, #8b5cf6 0%, transparent 50%)',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* الكرت الزجاجي */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 space-y-6">
          {/* رأس الصفحة */}
          <div className="text-center">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="inline-block p-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mb-3"
            >
              <Lock className="w-7 h-7 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              تغيير كلمة المرور
            </h1>
            <p className="text-gray-400 text-sm mt-1">أدخل بياناتك الحالية والجديدة أدناه</p>
          </div>

          {/* رسالة حالة */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`flex items-center gap-2 text-sm ${message.includes('نجاح') ? 'text-green-400' : 'text-red-400'}`}
              >
                {message.includes('نجاح') ? <CheckCircle /> : <XCircle />}
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* الفورم */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* كلمة المرور الحالية */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">كلمة المرور الحالية</label>
              <div className="relative">
                <input
                  type={visible.cur ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setVisible((v) => ({ ...v, cur: !v.cur }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {visible.cur ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* كلمة المرور الجديدة */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={visible.new ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setVisible((v) => ({ ...v, new: !v.new }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {visible.new ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {/* شريط قوة الكلمة */}
              <div className="mt-2 h-1 w-full bg-white/10 rounded overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: newPassword ? '100%' : '0%' }}
                  className={`h-full ${strengthColor}`}
                />
              </div>
            </div>

            {/* تأكيد كلمة المرور الجديدة */}
            <div>
              <label className="block text-gray-300 text-sm mb-1">تأكيد كلمة المرور الجديدة</label>
              <div className="relative">
                <input
                  type={visible.conf ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                  className="w-full pl-4 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setVisible((v) => ({ ...v, conf: !v.conf }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {visible.conf ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {/* زر الإرسال */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? 'جاري الحفظ...' : 'تغيير كلمة المرور'}
            </motion.button>
          </form>

          {/* رجوع */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm transition"
            >
              <ArrowLeft className="w-4 h-4" />
              العودة
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}