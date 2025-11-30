// src/admin/pages/before-after-gallery/BeforeAfterGalleryListItem.tsx
import { motion } from 'framer-motion';
import type { BeforeAfterGalleryItem } from '../../types';
import { Edit, Trash2, ArrowRightLeft } from 'lucide-react';

interface BeforeAfterGalleryListItemProps {
  item: BeforeAfterGalleryItem;
  onEdit: (item: BeforeAfterGalleryItem) => void;
  onDelete: (id: number) => void;
}

export function BeforeAfterGalleryListItem({ item, onEdit, onDelete }: BeforeAfterGalleryListItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* الصور */}
      <div className="grid grid-cols-2 gap-1 h-48">
        <div className="relative overflow-hidden">
          <img 
            src={item.before_image_url} 
            alt="Before" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">قبل</div>
        </div>
        <div className="relative overflow-hidden">
          <img 
            src={item.after_image_url} 
            alt="After" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">بعد</div>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5 text-cyan-400" />
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4">الترتيب: {item.sort_order}</p>
        
        {/* الأزرار */}
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(item)} 
            className="flex items-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(item.id)} 
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