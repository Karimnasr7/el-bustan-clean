//C:\Users\dell\al_bustan\El_bustancleaning\src\admin\pages\articles\ArticlesPage.tsx
import _React, { useState, useEffect } from 'react';
import { ArticleForm } from './ArticleForm';
import { ArticleListItem } from './ArticleListItem';
import type { Article } from '../../types'; 
export function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>(undefined);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('/api/articles');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveArticle = () => {
    setShowForm(false);
    setEditingArticle(undefined);
    fetchArticles();
  };

  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setShowForm(true);
  };

  const handleDeleteArticle = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا المقال؟')) {
      try {
        const response = await fetch('/api/articles', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchArticles();
        } else {
          alert('فشل في حذف المقال');
        }
      } catch (error) {
        console.error('Failed to delete article:', error);
        alert('فشل في حذف المقال');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة المقالات</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          إضافة مقال جديد
        </button>
      </div>

      {showForm && (
        <ArticleForm
          article={editingArticle}
          onSave={handleSaveArticle}
          onCancel={() => {
            setShowForm(false);
            setEditingArticle(undefined);
          }}
        />
      )}

      <div>
        {articles.length > 0 ? (
          articles.map(article => (
            <ArticleListItem
              key={article.id}
              article={article}
              onEdit={handleEditArticle}
              onDelete={handleDeleteArticle}
            />
          ))
        ) : (
          <p className="text-gray-600">لا توجد مقالات لعرضها.</p>
        )}
      </div>
    </div>
  );
}