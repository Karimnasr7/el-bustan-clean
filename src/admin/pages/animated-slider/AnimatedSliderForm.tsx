// src/admin/pages/animated-slider/AnimatedSliderForm.tsx
import React, { useState, useEffect } from 'react';
import type { AnimatedSlide } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; // <-- 1. استيراد المكون الجديد

interface AnimatedSliderFormProps {
  slide?: AnimatedSlide;
  onSave: (slide: AnimatedSlide) => void;
  onCancel: () => void;
}

export function AnimatedSliderForm({ slide, onSave, onCancel }: AnimatedSliderFormProps) {
  const [formData, setFormData] = useState<AnimatedSlide>({
    id: 0,
    img_url: '',
    texts: {},
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slide) {
      setFormData(slide);
    } else {
      setFormData({ id: 0, img_url: '', texts: {}, sort_order: 0 });
    }
  }, [slide]);

  // هذه الدالة لم تعد بحاجة للتعامل مع حقل الصورة
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTextsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const parsedTexts = JSON.parse(e.target.value);
      setFormData(prev => ({ ...prev, texts: parsedTexts }));
      setError('');
    } catch (err) {
      setError('نصوص JSON غير صالحة. يرجى إدخال JSON صحيح.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (error) return;

    setLoading(true);
    const method = formData.id ? 'PUT' : 'POST';
    const url = '/api/animated-slider';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save slide');

      const savedSlide = await response.json();
      onSave(savedSlide);
    } catch (err) {
      setError('فشل في حفظ الشريحة. يرجى المحاولة مرة أخرى.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{formData.id ? 'تعديل شريحة' : 'إضافة شريحة جديدة'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* 2. استبدال حقل رابط الصورة بالمكون الجديد */}
        <ImageUploader
          label="صورة الشريحة"
          value={formData.img_url}
          onChange={(url) => setFormData(prev => ({ ...prev, img_url: url }))}
        />

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">النصوص (بصيغة JSON)</label>
          <textarea
            name="texts"
            value={JSON.stringify(formData.texts, null, 2)}
            onChange={handleTextsChange}
            rows={8}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-mono"
            placeholder='{"title": "Slide Title", "subtitle": "Slide Subtitle"}'
            required
          />
          <p className="text-xs text-gray-500 mt-1">يجب أن تكون النصوص بتنسيق JSON صالح.</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">ترتيب العرض</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">إلغاء</button>
          <button type="submit" disabled={loading || !!error} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">{loading ? 'جاري الحفظ...' : 'حفظ'}</button>
        </div>
      </form>
    </div>
  );
}