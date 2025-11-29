// src/admin/pages/animated-slider/AnimatedSliderListItem.tsx
import _React from 'react';
import type { AnimatedSlide } from '../../types';

interface AnimatedSliderListItemProps {
  slide: AnimatedSlide;
  onEdit: (slide: AnimatedSlide) => void;
  onDelete: (id: number) => void;
}

export function AnimatedSliderListItem({ slide, onEdit, onDelete }: AnimatedSliderListItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">شريحة رقم {slide.id}</h3>
        <p className="text-sm text-gray-600">الترتيب: {slide.sort_order}</p>
      </div>
      <div className="flex space-x-2 space-x-reverse">
        <button onClick={() => onEdit(slide)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">تعديل</button>
        <button onClick={() => onDelete(slide.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">حذف</button>
      </div>
    </div>
  );
}