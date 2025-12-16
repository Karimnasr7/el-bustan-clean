// src/admin/pages/site-content/SiteContentPage.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteContent } from '../../types';
import { ImageUploader } from '../../components/ImageUploader';
import { Settings, Image as ImageIcon, User, Phone, Mail, MapPin, Star, MessageSquare } from 'lucide-react';

export function SiteContentPage() {
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/site-content');
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string, value: string) => {
      setSaving(true);
      setMessage('');

      try {
        // استخراج التوكن من المتصفح
        const token = localStorage.getItem('adminToken');

        const response = await fetch('/api/site-content', {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // إضافة سطر الحماية هنا
          },
          body: JSON.stringify({ content_key: key, content_value: value }),
        });

        if (!response.ok) throw new Error('Failed to save content');
        
        setMessage('تم حفظ التغيير بنجاح.');
        setTimeout(() => setMessage(''), 3000);
      } catch (err) {
        setMessage('فشل في حفظ التغيير. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        setSaving(false);
      }
    };
    
  const fieldsToManage = [
    // مجموعة الهيرو
    { key: 'hero_title_main', label: 'العنوان الرئيسي للبطل', type: 'text', icon: Settings, group: 'hero' },
    { key: 'hero_title_sub', label: 'العنوان الفرعي للبطل', type: 'text', icon: Settings, group: 'hero' },
    { key: 'hero_subtitle', label: 'النص تحت العنوان', type: 'textarea', icon: MessageSquare, group: 'hero' },
    { key: 'cta_button_text', label: 'نص زر الدعوة للإجراء', type: 'text', icon: Settings, group: 'hero' },
    { key: 'video_button_text', label: 'نص زر الفيديو', type: 'text', icon: Settings, group: 'hero' },
    // مجموعة صور الهيرو
    { key: 'hero_grid_image_1', label: 'صورة الشبكة (أعلى اليسار)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    { key: 'hero_grid_image_2', label: 'صورة الشبكة (أسفل اليسار)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    { key: 'hero_grid_image_3', label: 'صورة الشبكة (أعلى الوسط)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    { key: 'hero_grid_image_4', label: 'صورة الشبكة (أسفل الوسط)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    { key: 'hero_grid_image_5', label: 'صورة الشبكة (أعلى اليمين)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    { key: 'hero_grid_image_6', label: 'صورة الشبكة (أسفل اليمين)', type: 'image', icon: ImageIcon, group: 'hero-images' },
    // مجموعة التواصل والثقة
    { key: 'whatsapp_link', label: 'رابط واتساب', type: 'url', icon: MessageSquare, group: 'contact' },
    { key: 'contact_phone', label: 'رقم هاتف التواصل', type: 'tel', icon: Phone, group: 'contact' },
    { key: 'contact_email', label: 'البريد الإلكتروني للتواصل', type: 'email', icon: Mail, group: 'contact' },
    { key: 'contact_address', label: 'عنوان التواصل', type: 'text', icon: MapPin, group: 'contact' },
    { key: 'google_rating_score', label: 'تقييم جوجل', type: 'text', icon: Star, group: 'contact' },
    { key: 'google_rating_count', label: 'عدد مقيمي جوجل', type: 'text', icon: User, group: 'contact' },
    { key: 'formspree_form_id', label: 'معرف Formspree', type: 'text', icon: Settings, group: 'contact' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Settings className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-8">
      {/* رأس الصفحة */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            إدارة المحتوى العام
          </h1>
          <p className="mt-2 text-gray-400">تعديل النصوص والأرقام العامة.</p>
        </div>
        <div className="flex items-center gap-2">
          {saving && <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-cyan-400"
          >جاري الحفظ...</motion.p>}
          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`${message.includes('نجاح') ? 'text-green-400' : 'text-red-400'}`}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* حاويات الحقول */}
      <div className="space-y-8">
        {/* مجموعة الهيرو */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Settings className="w-6 h-6 text-cyan-400" />
            قسم الهيرو (Hero)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fieldsToManage.filter(f => f.group === 'hero').map((field) => (
              <div key={field.key} className="col-span-1">
                <label className="block text-gray-300 text-sm font-bold mb-2">{field.label}</label>
                {field.type === 'textarea' ? (
                  <textarea
                    value={content[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={(e) => handleSave(field.key, e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={content[field.key] || ''}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    onBlur={(e) => handleSave(field.key, e.target.value)}
                    className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* مجموعة صور الهيرو */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <ImageIcon className="w-6 h-6 text-cyan-400" />
            صور شبكة الهيرو
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieldsToManage.filter(f => f.group === 'hero-images').map((field) => (
              <div key={field.key}>
                <ImageUploader
                  label={field.label}
                  value={content[field.key] || ''}
                  onChange={(url) => {
                    handleChange(field.key, url);
                    handleSave(field.key, url);
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* مجموعة التواصل والثقة */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-cyan-400" />
            معلومات التواصل والثقة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fieldsToManage.filter(f => f.group === 'contact').map((field) => (
              <div key={field.key}>
                <label className="block text-gray-300 text-sm font-bold mb-2">{field.label}</label>
                <input
                  type={field.type}
                  value={content[field.key] || ''}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onBlur={(e) => handleSave(field.key, e.target.value)}
                  className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}