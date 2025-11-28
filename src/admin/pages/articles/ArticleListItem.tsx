//C:\Users\dell\al_bustan\El_bustancleaning\src\admin\pages\articles\ArticleListItem.tsx
//import React from 'react';

import type { Article } from '../../types'; // <-- التغيير: استخدام 'import type'

interface ArticleListItemProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export function ArticleListItem({ article, onEdit, onDelete }: ArticleListItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{article.title}</h3>
        <p className="text-sm text-gray-600">بواسطة {article.author} • {article.readtime}</p>
      </div>
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => onEdit(article)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(article.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          حذف
        </button>
      </div>
    </div>
  );
}