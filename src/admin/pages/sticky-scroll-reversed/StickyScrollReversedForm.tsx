// src/admin/pages/sticky-scroll-reversed/StickyScrollReversedForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { StickyScrollReversedContent } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; 

interface StickyScrollReversedFormProps {
  item?: StickyScrollReversedContent;
  onSave: (item: StickyScrollReversedContent) => void;
  onCancel: () => void;
}

export function StickyScrollReversedForm({ item, onSave, onCancel }: StickyScrollReversedFormProps) {
  const [formData, setFormData] = useState<StickyScrollReversedContent>({
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
    setError(''); // إعادة تعيين الخطأ قبل البدء

    const method = formData.id ? 'PUT' : 'POST';
    const url = '/api/sticky-scroll-reversed';

    try {
      // 1. جلب التوكن من التخزين المحلي
      const token = localStorage.getItem('adminToken');

      // 2. تنفيذ طلب الإرسال مع إضافة التوكن في الرأس (Headers)
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // تمرير الهوية للسيرفر 🛡️
        },
        body: JSON.stringify(formData),
      });

      // 3. التحقق من رد السيرفر
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save item');
      }

      const savedItem = await response.json();
      
      // 4. استدعاء دالة الحفظ بنجاح
      onSave(savedItem);
      
    } catch (err: any) {
      setError(err.message || 'فشل في حفظ العنصر. يرجى المحاولة مرة أخرى.');
      console.error('Save error:', err);
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
      <h2 className="text-2xl font-bold text-white mb-6">{formData.id ? 'تعديل عنصر معكوس' : 'إضافة عنصر معكوس جديد'}</h2>
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
        
        <ImageUploader
          label="صورة العنصر"
          value={formData.image_url}
          onChange={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
        />

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">الوصف (بصيغة JSON)</label>
          <textarea
            name="description"
            value={JSON.stringify(formData.description, null, 2)}
            onChange={handleDescriptionChange}
            rows={8}
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-mono text-sm"
            placeholder='{"key1": "value1", "key2": "value2"}'
            required
          />
          <p className="text-xs text-gray-500 mt-1">يجب أن يكون الوصف بتنسيق JSON صالح.</p>
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
            disabled={loading || !!error} 
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