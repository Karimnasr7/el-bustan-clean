// src/admin/pages/sticky-scroll-reversed/StickyScrollReversedPage.tsx
import _React, { useState, useEffect } from 'react';
import { StickyScrollReversedForm } from './StickyScrollReversedForm';
import { StickyScrollReversedListItem } from './StickyScrollReversedListItem';
import type { StickyScrollReversedContent } from '../../types';

export function StickyScrollReversedPage() {
  const [items, setItems] = useState<StickyScrollReversedContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StickyScrollReversedContent | undefined>(undefined);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/sticky-scroll-reversed'); 
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Failed to fetch items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItem = () => {
    setShowForm(false);
    setEditingItem(undefined);
    fetchItems();
  };

  const handleEditItem = (item: StickyScrollReversedContent) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا العنصر؟')) {
      try {
        const response = await fetch('/api/sticky-scroll-reversed', { 
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchItems();
        } else {
          alert('فشل في حذف العنصر');
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('فشل في حذف العنصر');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة القسم اللاصق المعكوس</h1>
        <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">إضافة عنصر جديد</button>
      </div>

      {showForm && (
        <StickyScrollReversedForm
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => { setShowForm(false); setEditingItem(undefined); }}
        />
      )}

      <div>
        {items.length > 0 ? (
          items.map(item => (
            <StickyScrollReversedListItem
              key={item.id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
            />
          ))
        ) : (
          <p className="text-gray-600">لا توجد عناصر لعرضها.</p>
        )}
      </div>
    </div>
  );
}