// src/admin/pages/sticky-scroll/StickyScrollPage.tsx
import _React, { useState, useEffect } from 'react';
import { StickyScrollForm } from './StickyScrollForm';
import { StickyScrollListItem } from './StickyScrollListItem';
import type { StickyScrollContent } from '../../types';

export function StickyScrollPage() {
  const [items, setItems] = useState<StickyScrollContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<StickyScrollContent | undefined>(undefined);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('/api/sticky-scroll');
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

  const handleEditItem = (item: StickyScrollContent) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDeleteItem = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا العنصر؟')) {
      try {
        const response = await fetch('/api/sticky-scroll', {
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
        <h1 className="text-3xl font-bold">إدارة القسم اللاصق</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          إضافة عنصر جديد
        </button>
      </div>

      {showForm && (
        <StickyScrollForm
          item={editingItem}
          onSave={handleSaveItem}
          onCancel={() => {
            setShowForm(false);
            setEditingItem(undefined);
          }}
        />
      )}

      <div>
        {items.length > 0 ? (
          items.map(item => (
            <StickyScrollListItem
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