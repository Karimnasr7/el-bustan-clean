// src/admin/pages/before-after-gallery/BeforeAfterGalleryForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { BeforeAfterGalleryItem } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; 

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

  // داخل handleSubmit في ملف BeforeAfterGalleryForm.tsx
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = formData.id ? 'PUT' : 'POST';
    const url = '/api/before-after-gallery';

    try {
      const token = localStorage.getItem('adminToken'); // جلب التوكن

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // إضافة سطر الحماية
        },
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
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">{formData.id ? 'تعديل عنصر' : 'إضافة عنصر جديد'}</h2>
      {error && <p className="text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">العنوان</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ImageUploader
            label="الصورة (قبل)"
            value={formData.before_image_url}
            onChange={(url) => setFormData(prev => ({ ...prev, before_image_url: url }))}
          />
          <ImageUploader
            label="الصورة (بعد)"
            value={formData.after_image_url}
            onChange={(url) => setFormData(prev => ({ ...prev, after_image_url: url }))}
          />
        </div>

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">ترتيب العرض</label>
          <input 
            type="number" 
            name="sort_order" 
            value={formData.sort_order} 
            onChange={handleChange} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
          />
        </div>
        <div className="flex justify-end gap-4">
          <motion.button 
            type="button" 
            onClick={onCancel} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 text-gray-400 font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            إلغاء
          </motion.button>
          <motion.button 
            type="submit" 
            disabled={loading} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-medium py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}