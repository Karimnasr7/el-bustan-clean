// src/admin/pages/sticky-scroll-reversed/StickyScrollReversedListItem.tsx
//import React from 'react';
import type { StickyScrollReversedContent } from '../../types';

interface StickyScrollReversedListItemProps {
  item: StickyScrollReversedContent;
  onEdit: (item: StickyScrollReversedContent) => void;
  onDelete: (id: number) => void;
}

export function StickyScrollReversedListItem({ item, onEdit, onDelete }: StickyScrollReversedListItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-sm text-gray-600">الترتيب: {item.sort_order}</p>
      </div>
      <div className="flex space-x-2 space-x-reverse">
        <button onClick={() => onEdit(item)} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm">تعديل</button>
        <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm">حذف</button>
      </div>
    </div>
  );
}