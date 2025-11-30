// src/admin/pages/articles/ArticleForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Article } from '../../types';
import { ImageUploader } from '../../components/ImageUploader'; 

interface ArticleFormProps {
  article?: Article;
  onSave: (article: Article) => void;
  onCancel: () => void;
}

export function ArticleForm({ article, onSave, onCancel }: ArticleFormProps) {
  const [formData, setFormData] = useState<Article>({
    id: 0,
    title: '',
    excerpt: '',
    image: '',
    author: '',
    readtime: '',
    full_content: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      setFormData({
        id: 0,
        title: '',
        excerpt: '',
        image: '',
        author: '',
        readtime: '',
        full_content: '',
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const method = article?.id ? 'PUT' : 'POST';
    const url = '/api/articles'; // الـ API يتعامل مع PUT و POST بناءً على وجود ID

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save article');

      const savedArticle = await response.json();
      onSave(savedArticle);
    } catch (err) {
      setError('فشل في حفظ المقال. يرجى المحاولة مرة أخرى.');
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
      <h2 className="text-2xl font-bold text-white mb-6">{article?.id ? 'تعديل مقال' : 'إضافة مقال جديد'}</h2>
      {error && <p className="text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">عنوان المقال</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">المقتطف</label>
          <textarea 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleChange} 
            rows={3} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
          />
        </div>
        
        <ImageUploader
          label="صورة المقال"
          value={formData.image}
          onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">الكاتب</label>
            <input 
              type="text" 
              name="author" 
              value={formData.author} 
              onChange={handleChange} 
              className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
              required 
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">وقت القراءة</label>
            <input 
              type="text" 
              name="readtime" 
              value={formData.readtime} 
              onChange={handleChange} 
              className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
              placeholder="5 دقائق" 
              required 
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">المحتوى الكامل</label>
          <textarea 
            name="full_content" 
            value={formData.full_content} 
            onChange={handleChange} 
            rows={10} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
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