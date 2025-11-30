// src/admin/pages/animated-slider/AnimatedSliderListItem.tsx
import { motion } from 'framer-motion';
import type { AnimatedSlide } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

interface AnimatedSliderListItemProps {
  slide: AnimatedSlide;
  onEdit: (slide: AnimatedSlide) => void;
  onDelete: (id: number) => void;
}

export function AnimatedSliderListItem({ slide, onEdit, onDelete }: AnimatedSliderListItemProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* صورة الشريحة */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={slide.img_url} 
          alt={`Slide ${slide.id}`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* محتوى البطاقة */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">الشريحة رقم: {slide.id}</h3>
        <p className="text-gray-400 text-sm mb-4">الترتيب: {slide.sort_order}</p>
        
        {/* الأزرار */}
        <div className="flex justify-end gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(slide)} 
            className="flex items-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(slide.id)} 
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