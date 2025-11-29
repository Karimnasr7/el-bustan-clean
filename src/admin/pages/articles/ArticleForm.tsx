// src/admin/pages/articles/ArticleForm.tsx
import React, { useState, useEffect } from 'react';
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
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{article?.id ? 'تعديل مقال' : 'إضافة مقال جديد'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">عنوان المقال</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">المقتطف</label>
          <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        
        <ImageUploader
          label="صورة المقال"
          value={formData.image}
          onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">الكاتب</label>
            <input type="text" name="author" value={formData.author} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">وقت القراءة</label>
            <input type="text" name="readtime" value={formData.readtime} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="5 دقائق" required />
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">المحتوى الكامل</label>
          <textarea name="full_content" value={formData.full_content} onChange={handleChange} rows={10} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            إلغاء
          </button>
          <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </form>
    </div>
  );
}