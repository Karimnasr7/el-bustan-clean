// src/admin/pages/before-after-gallery/BeforeAfterGalleryForm.tsx
import React, { useState, useEffect } from 'react';
import type { BeforeAfterGalleryItem } from '../../types';

interface BeforeAfterGalleryFormProps {
  item?: BeforeAfterGalleryItem;
  onSave: (item: BeforeAfterGalleryItem) => void;
  onCancel: () => void;
}

export function BeforeAfterGalleryForm({ item, onSave, onCancel }: BeforeAfterGalleryFormProps) {
  const [formData, setFormData] = useState<BeforeAfterGalleryItem>({
    id: 0,
    title: '',
    before_image_url: '',
    after_image_url: '',
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: 0, title: '', before_image_url: '', after_image_url: '', sort_order: 0 });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = formData.id ? 'PUT' : 'POST';
    const url = '/api/before-after-gallery';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save item');

      const savedItem = await response.json();
      onSave(savedItem);
    } catch (err) {
      setError('فشل في حفظ العنصر. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{formData.id ? 'تعديل عنصر' : 'إضافة عنصر جديد'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">العنوان</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">رابط الصورة (قبل)</label>
            <input type="text" name="before_image_url" value={formData.before_image_url} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="/images/before.jpg" required />
            {formData.before_image_url && <img src={formData.before_image_url} alt="Before" className="mt-2 h-24 w-auto object-cover rounded-md" />}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">رابط الصورة (بعد)</label>
            <input type="text" name="after_image_url" value={formData.after_image_url} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="/images/after.jpg" required />
            {formData.after_image_url && <img src={formData.after_image_url} alt="After" className="mt-2 h-24 w-auto object-cover rounded-md" />}
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">ترتيب العرض</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">إلغاء</button>
          <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">{loading ? 'جاري الحفظ...' : 'حفظ'}</button>
        </div>
      </form>
    </div>
  );
}