// src/admin/components/ArticleForm.tsx
import React, { useState, useEffect } from 'react';

interface ArticleFormProps {
  article: any; // يمكن أن يكون null عند الإنشاء
  onSave: (articleData: any) => void;
  onClose: () => void;
}

export const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    full_content: '',
    image: '',
    author: '',
    readtime: '',
  });

  useEffect(() => {
    if (article) {
      setFormData(article);
    } else {
      // إعادة تعريف النموذج عند فتحه لإنشاء مقال جديد
      setFormData({
        title: '',
        excerpt: '',
        full_content: '',
        image: '',
        author: '',
        readtime: '',
      });
    }
  }, [article]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-right">
            {article ? 'تعديل مقال' : 'إنشاء مقال جديد'}
          </h3>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-right">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">العنوان</label>
              <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700">الكاتب</label>
              <input type="text" name="author" id="author" value={formData.author} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="readtime" className="block text-sm font-medium text-gray-700">وقت القراءة (مثال: 5 دقائق)</label>
              <input type="text" name="readtime" id="readtime" value={formData.readtime} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">مقتطف</label>
              <textarea name="excerpt" id="excerpt" rows={3} value={formData.excerpt} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label htmlFor="full_content" className="block text-sm font-medium text-gray-700">المحتوى الكامل</label>
              <textarea name="full_content" id="full_content" rows={8} value={formData.full_content} onChange={handleChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">رابط الصورة</label>
              <input type="text" name="image" id="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {formData.image && <img src={formData.image} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded-md" />}
            </div>
            <div className="flex justify-start space-x-4 space-x-reverse pt-4">
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">حفظ</button>
              <button type="button" onClick={onClose} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">إلغاء</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};