// src/admin/pages/sticky-scroll/StickyScrollPage.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyScrollForm } from './StickyScrollForm';
import { StickyScrollListItem } from './StickyScrollListItem';
import type { StickyScrollContent } from '../../types';
import { Plus, ArrowUp } from 'lucide-react';

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

 // داخل دالة handleDeleteItem في ملف StickyScrollPage.tsx
  const handleDeleteItem = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذا العنصر؟')) {
      try {
        const token = localStorage.getItem('adminToken'); // جلب التوكن

        const response = await fetch('/api/sticky-scroll', {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // إضافة سطر الحماية
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchItems();
        } else {
          alert('فشل في حذف العنصر (تأكد من تسجيل الدخول)');
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
        alert('حدث خطأ أثناء محاولة الحذف');
      }
    }
  };
  
  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <ArrowUp className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-8">
      {/* رأس الصفحة */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            إدارة القسم اللاصق
          </h1>
          <p className="mt-2 text-gray-400">تعديل عناصر هذا القسم.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          إضافة عنصر جديد
        </button>
      </motion.div>

      {/* الفورم */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <StickyScrollForm
              item={editingItem}
              onSave={handleSaveItem}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(undefined);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* شبكة العناصر */}
      {items.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {items.map((item, _index) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <StickyScrollListItem
                item={item}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 text-center col-span-full"
        >
          لا توجد عناصر لعرضها.
        </motion.p>
      )}
    </div>
  );
}