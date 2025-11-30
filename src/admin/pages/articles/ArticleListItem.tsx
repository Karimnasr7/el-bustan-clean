// src/admin/pages/articles/ArticleListItem.tsx
import { motion } from 'framer-motion';
import type { Article } from '../../types';
import { Edit, Trash2, User, Clock } from 'lucide-react';

interface ArticleListItemProps {
  article: Article;
  onEdit: (article: Article) => void;
  onDelete: (id: number) => void;
}

export function ArticleListItem({ article, onEdit, onDelete }: ArticleListItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* صورة المقال */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={article.image} 
          alt={article.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{article.readtime}</span>
          </div>
        </div>
        
        {/* الأزرار */}
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(article)} 
            className="flex items-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(article.id)} 
            className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            حذف
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}