// src/admin/pages/ArticlesPage.tsx
import React, { useState, useEffect } from 'react';
import { ArticleForm } from '../components/ArticleForm'; // سنقوم بإنشائه بعد قليل

interface Article {
  id: number;
  title: string;
  excerpt: string;
  full_content: string;
  image: string;
  author: string;
  readtime: string;
}

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // دالة لجلب المقالات من الـ API
  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) throw new Error('فشل في جلب المقالات');
      const data = await response.json();
      setArticles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // دالة لحذف مقال
  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد أنك تريد حذف هذا المقال؟')) return;

    try {
      const response = await fetch(`/api/articles?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('فشل في حذف المقال');
      fetchArticles(); // إعادة جلب القائمة بعد الحذف
    } catch (err: any) {
      alert(`خطأ: ${err.message}`);
    }
  };

  // دالة لحفظ مقال (جديد أو معدل)
  const handleSave = async (articleData: Partial<Article>) => {
    try {
      const isEditing = editingArticle !== null;
      const url = isEditing ? `/api/articles?id=${editingArticle.id}` : '/api/articles';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) throw new Error(`فشل في ${isEditing ? 'تعديل' : 'إنشاء'} المقال`);
      
      setIsFormOpen(false);
      setEditingArticle(null);
      fetchArticles(); // إعادة جلب القائمة بعد الحفظ
    } catch (err: any) {
      alert(`خطأ: ${err.message}`);
    }
  };
  
  const openCreateForm = () => {
    setEditingArticle(null);
    setIsFormOpen(true);
  };

  const openEditForm = (article: Article) => {
    setEditingArticle(article);
    setIsFormOpen(true);
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;
  if (error) return <div className="p-8 text-center text-red-500">خطأ: {error}</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المقالات</h1>
        <button
          onClick={openCreateForm}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          إنشاء مقال جديد
        </button>
      </div>

      <div className="bg-white shadow-md rounded my-6 overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">العنوان</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">الكاتب</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">وقت القراءة</th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{article.title}</p></td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{article.author}</p></td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm"><p className="text-gray-900 whitespace-no-wrap">{article.readtime}</p></td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                  <button onClick={() => openEditForm(article)} className="text-indigo-600 hover:text-indigo-900 mx-2">تعديل</button>
                  <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900 mx-2">حذف</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isFormOpen && (
        <ArticleForm
          article={editingArticle}
          onSave={handleSave}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
};