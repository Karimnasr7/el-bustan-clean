// src/admin/pages/site-content/SiteContentPage.tsx
import _React, { useState, useEffect } from 'react';
import type { SiteContent } from '../../types';

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
      const response = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    { key: 'hero_title_main', label: 'العنوان الرئيسي للبطل', type: 'text' },
    { key: 'hero_title_sub', label: 'العنوان الفرعي للبطل', type: 'text' },
    { key: 'hero_subtitle', label: 'النص تحت العنوان', type: 'textarea' },
    { key: 'cta_button_text', label: 'نص زر الدعوة للإجراء', type: 'text' },
    { key: 'video_button_text', label: 'نص زر الفيديو', type: 'text' },
    { key: 'whatsapp_link', label: 'رابط واتساب', type: 'url' },
    { key: 'google_rating_score', label: 'تقييم جوجل', type: 'text' },
    { key: 'google_rating_count', label: 'عدد مقيمي جوجل', type: 'text' },
    { key: 'contact_phone', label: 'رقم هاتف التواصل', type: 'tel' },
    { key: 'contact_email', label: 'البريد الإلكتروني للتواصل', type: 'email' },
    { key: 'contact_address', label: 'عنوان التواصل', type: 'text' },
    { key: 'formspree_form_id', label: 'معرف Formspree', type: 'text' },
  ];

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المحتوى العام</h1>
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
                onBlur={(e) => handleSave(field.key, e.target.value)}
                rows={4}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            ) : (
              <input
                id={field.key}
                type={field.type}
                value={content[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                onBlur={(e) => handleSave(field.key, e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          </div>
        ))}
      </div>
      {saving && <div className="text-center mt-4 text-blue-500">جاري الحفظ...</div>}
    </div>
  );
}