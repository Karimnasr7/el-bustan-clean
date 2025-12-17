import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { AnimatedSlide } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; 

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
    const token = localStorage.getItem('adminToken'); // جلب التوكن 🛡️

    try {
      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // تمرير الهوية 🛡️
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to save slide');
      }

      const savedSlide = await response.json();
      onSave(savedSlide);
    } catch (err: any) {
      setError(err.message || 'فشل في حفظ الشريحة. يرجى المحاولة مرة أخرى.');
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
      <h2 className="text-2xl font-bold text-white mb-6">{formData.id ? 'تعديل شريحة' : 'إضافة شريحة جديدة'}</h2>
      {error && <p className="text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        
        <ImageUploader
          label="صورة الشريحة"
          value={formData.img_url}
          onChange={(url) => setFormData(prev => ({ ...prev, img_url: url }))}
        />

        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">النصوص (بصيغة JSON)</label>
          <textarea
            name="texts"
            value={JSON.stringify(formData.texts, null, 2)}
            onChange={handleTextsChange}
            rows={8}
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent font-mono text-sm"
            placeholder='{"title": "Slide Title", "subtitle": "Slide Subtitle"}'
            required
          />
          <p className="text-xs text-gray-500 mt-1">تأكد من تنسيق JSON صحيح (مثال: "key": "value")</p>
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