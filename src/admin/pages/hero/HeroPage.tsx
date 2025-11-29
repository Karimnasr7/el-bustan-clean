// src/admin/pages/hero/HeroPage.tsx
import _React, { useState, useEffect } from 'react';
import type { SiteContent } from '../../types';

export function HeroPage() {
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
      setMessage('فشل في جلب المحتوى.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
    // تم إزالة الحفظ التلقائي من هنا
  };

  // دالة جديدة لحفظ جميع التغييرات دفعة واحدة
  const handleSaveAll = async () => {
    setSaving(true);
    setMessage('');

    try {
      const promises = Object.keys(content).map(key =>
        fetch('/api/site-content', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content_key: key, content_value: content[key] }),
        })
      );

      await Promise.all(promises);

      setMessage('تم حفظ جميع التغييرات بنجاح.');
      setTimeout(() => setMessage(''), 3000); // إخفاء الرسالة بعد 3 ثواني
    } catch (err) {
      setMessage('فشل في حفظ التغييرات. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const fieldsToManage = [
    { key: 'hero_title_main', label: 'العنوان الرئيسي للبطل', type: 'text' },
    { key: 'hero_title_sub', label: 'العنوان الفرعي للبطل', type: 'text' },
    { key: 'hero_subtitle', label: 'النص تحت العنوان', type: 'textarea' },
    { key: 'cta_button_text', label: 'نص زر الدعوة للإجراء', type: 'text' },
    { key: 'video_button_text', label: 'نص زر الفيديو', type: 'text' },
    { key: 'whatsapp_link', label: 'رابط واتساب', type: 'url' },
    { key: 'hero_video_url', label: 'رابط فيديو يوتيوب (embed)', type: 'url' },
    { key: 'google_rating_score', label: 'تقييم جوجل', type: 'text' },
    { key: 'google_rating_count', label: 'عدد مقيمي جوجل', type: 'text' },
  ];

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة قسم البطل</h1>
        {message && <p className={`text-sm ${message.includes('نجاح') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </div>

      <div className="bg-white shadow-md rounded p-6 space-y-6">
        {fieldsToManage.map((field) => (
          <div key={field.key}>
            <label htmlFor={field.key} className="block text-gray-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.key}
                value={content[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <input
                id={field.key}
                type={field.type}
                value={content[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          </div>
        ))}
        
        {/* زر الحفظ الرئيسي */}
        <div className="flex justify-end pt-4 border-t">
          <button
            onClick={handleSaveAll}
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {saving ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}
          </button>
        </div>
      </div>
    </div>
  );
}