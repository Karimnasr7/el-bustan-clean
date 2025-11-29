// src/admin/pages/sticky-scroll/StickyScrollForm.tsx
import React, { useState, useEffect } from 'react';
import type { StickyScrollContent } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; 

interface StickyScrollFormProps {
  item?: StickyScrollContent;
  onSave: (item: StickyScrollContent) => void;
  onCancel: () => void;
}

export function StickyScrollForm({ item, onSave, onCancel }: StickyScrollFormProps) {
  const [formData, setFormData] = useState<StickyScrollContent>({
    id: 0,
    title: '',
    description: {},
    image_url: '',
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ id: 0, title: '', description: {}, image_url: '', sort_order: 0 });
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedDescription = JSON.parse(e.target.value);
      setFormData(prev => ({ ...prev, description: parsedDescription }));
      setError('');
    } catch (err) {
      setError('وصف JSON غير صالح. يرجى إدخال JSON صحيح.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;
    setLoading(true);
    const method = formData.id ? 'PUT' : 'POST';
    const url = '/api/sticky-scroll';

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
        
        <ImageUploader
          label="صورة العنصر"
          value={formData.image_url}
          onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">الوصف (بصيغة JSON)</label>
          <textarea
            name="description"
            value={JSON.stringify(formData.description, null, 2)}
            onChange={handleDescriptionChange}
            rows={8}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder='{"key1": "value1", "key2": "value2"}'
            required
          />
          <p className="text-xs text-gray-500 mt-1">يجب أن يكون الوصف بتنسيق JSON صالح.</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">ترتيب العرض</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            إلغاء
          </button>
          <button type="submit" disabled={loading || !!error} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </form>
    </div>
  );
}