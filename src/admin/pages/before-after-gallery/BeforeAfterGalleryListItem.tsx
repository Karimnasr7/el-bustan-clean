// src/admin/pages/before-after-gallery/BeforeAfterGalleryListItem.tsx
//import React from 'react';
import type { BeforeAfterGalleryItem } from '../../types';

interface BeforeAfterGalleryListItemProps {
  item: BeforeAfterGalleryItem;
  onEdit: (item: BeforeAfterGalleryItem) => void;
  onDelete: (id: number) => void;
}

export function BeforeAfterGalleryListItem({ item, onEdit, onDelete }: BeforeAfterGalleryListItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <div className="flex space-x-2 space-x-reverse">
          <button onClick={() => onEdit(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">تعديل</button>
          <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">حذف</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">قبل</p>
          <img src={item.before_image_url} alt="Before" className="w-full h-40 object-cover rounded-md" />
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">بعد</p>
          <img src={item.after_image_url} alt="After" className="w-full h-40 object-cover rounded-md" />
        </div>
      </div>
    </div>
  );
}