import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedSliderForm } from './AnimatedSliderForm';
import { AnimatedSliderListItem } from './AnimatedSliderListItem';
import type { AnimatedSlide } from '../../types';
import { Plus, Sliders } from 'lucide-react';

export function AnimatedSliderPage() {
  const [slides, setSlides] = useState<AnimatedSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState<AnimatedSlide | undefined>(undefined);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch('/api/animated-slider');
      const data = await response.json();
      setSlides(data.slides || []); // نضمن أنها مصفوفة
    } catch (error) {
      console.error('Failed to fetch slides:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSlide = () => {
    setShowForm(false);
    setEditingSlide(undefined);
    fetchSlides();
  };

  const handleEditSlide = (slide: AnimatedSlide) => {
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleDeleteSlide = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الشريحة؟')) {
      try {
        const token = localStorage.getItem('adminToken'); // جلب التوكن 🛡️
        const response = await fetch('/api/animated-slider', {
          method: 'DELETE',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // تمرير الهوية 🛡️
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchSlides();
        } else {
          const err = await response.json();
          alert(err.error || 'فشل في حذف الشريحة');
        }
      } catch (error) {
        console.error('Failed to delete slide:', error);
        alert('فشل في حذف الشريحة');
      }
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Sliders className="w-12 h-12 text-cyan-400" />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4 sm:p-8 text-right" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            إدارة السلايدر المتحرك
          </h1>
          <p className="mt-2 text-gray-400">إدارة صور ونصوص الشرائح المتحركة في الصفحة الرئيسية.</p>
        </div>
        <button
          onClick={() => {
            setEditingSlide(undefined);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          إضافة شريحة جديدة
        </button>
      </motion.div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-8"
          >
            <AnimatedSliderForm
              slide={editingSlide}
              onSave={handleSaveSlide}
              onCancel={() => {
                setShowForm(false);
                setEditingSlide(undefined);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {slides && slides.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {slides.map((slide) => (
            <motion.div
              key={slide.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <AnimatedSliderListItem
                slide={slide}
                onEdit={handleEditSlide}
                onDelete={handleDeleteSlide}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-gray-500 text-center col-span-full py-10">لا توجد شرائح لعرضها حالياً.</p>
      )}
    </div>
  );
}