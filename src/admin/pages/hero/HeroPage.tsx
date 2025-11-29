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

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة قسم البطل</h1>
        {message && <p className={`text-sm ${message.includes('نجاح') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      </div>

      <div className="bg-white shadow-md rounded p-6 space-y-6">
        <div>
          <label htmlFor="hero_title_main" className="block text-gray-700 text-sm font-bold mb-2">العنوان الرئيسي (الجزء الأول)</label>
          <input
            id="hero_title_main"
            type="text"
            value={content.hero_title_main || ''}
            onChange={(e) => handleChange('hero_title_main', e.target.value)}
            onBlur={(e) => handleSave('hero_title_main', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="hero_title_sub" className="block text-gray-700 text-sm font-bold mb-2">العنوان الرئيسي (الجزء الثاني)</label>
          <input
            id="hero_title_sub"
            type="text"
            value={content.hero_title_sub || ''}
            onChange={(e) => handleChange('hero_title_sub', e.target.value)}
            onBlur={(e) => handleSave('hero_title_sub', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="hero_subtitle" className="block text-gray-700 text-sm font-bold mb-2">النص تحت العنوان</label>
          <textarea
            id="hero_subtitle"
            rows={4}
            value={content.hero_subtitle || ''}
            onChange={(e) => handleChange('hero_subtitle', e.target.value)}
            onBlur={(e) => handleSave('hero_subtitle', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="cta_button_text" className="block text-gray-700 text-sm font-bold mb-2">نص زر الدعوة للإجراء</label>
          <input
            id="cta_button_text"
            type="text"
            value={content.cta_button_text || ''}
            onChange={(e) => handleChange('cta_button_text', e.target.value)}
            onBlur={(e) => handleSave('cta_button_text', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="video_button_text" className="block text-gray-700 text-sm font-bold mb-2">نص زر الفيديو</label>
          <input
            id="video_button_text"
            type="text"
            value={content.video_button_text || ''}
            onChange={(e) => handleChange('video_button_text', e.target.value)}
            onBlur={(e) => handleSave('video_button_text', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div>
          <label htmlFor="whatsapp_link" className="block text-gray-700 text-sm font-bold mb-2">رابط واتساب</label>
          <input
            id="whatsapp_link"
            type="url"
            value={content.whatsapp_link || ''}
            onChange={(e) => handleChange('whatsapp_link', e.target.value)}
            onBlur={(e) => handleSave('whatsapp_link', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://wa.me/..."
          />
        </div>
        <div>
          <label htmlFor="hero_video_url" className="block text-gray-700 text-sm font-bold mb-2">رابط فيديو يوتيوب (embed)</label>
          <input
            id="hero_video_url"
            type="url"
            value={content.hero_video_url || ''}
            onChange={(e) => handleChange('hero_video_url', e.target.value)}
            onBlur={(e) => handleSave('hero_video_url', e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="google_rating_score" className="block text-gray-700 text-sm font-bold mb-2">تقييم جوجل (الرقم)</label>
            <input
              id="google_rating_score"
              type="text"
              value={content.google_rating_score || ''}
              onChange={(e) => handleChange('google_rating_score', e.target.value)}
              onBlur={(e) => handleSave('google_rating_score', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="4.9"
            />
          </div>
          <div>
            <label htmlFor="google_rating_count" className="block text-gray-700 text-sm font-bold mb-2">عدد مقيمي جوجل</label>
            <input
              id="google_rating_count"
              type="text"
              value={content.google_rating_count || ''}
              onChange={(e) => handleChange('google_rating_count', e.target.value)}
              onBlur={(e) => handleSave('google_rating_count', e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="5K+"
            />
          </div>
        </div>
        {saving && <div className="text-center mt-4 text-blue-500">جاري الحفظ...</div>}
      </div>
    </div>
  );
}