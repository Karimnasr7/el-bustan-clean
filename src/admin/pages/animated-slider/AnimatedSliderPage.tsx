// src/admin/pages/animated-slider/AnimatedSliderPage.tsx
import _React, { useState, useEffect } from 'react';
import { AnimatedSliderForm } from './AnimatedSliderForm';
import { AnimatedSliderListItem } from './AnimatedSliderListItem';
import type { AnimatedSlide } from '../../types';

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
      setSlides(data.slides); // API returns { slides: [...] }
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
        const response = await fetch('/api/animated-slider', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchSlides();
        } else {
          alert('فشل في حذف الشريحة');
        }
      } catch (error) {
        console.error('Failed to delete slide:', error);
        alert('فشل في حذف الشريحة');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة السلايدر المتحرك</h1>
        <button onClick={() => setShowForm(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">إضافة شريحة جديدة</button>
      </div>

      {showForm && (
        <AnimatedSliderForm
          slide={editingSlide}
          onSave={handleSaveSlide}
          onCancel={() => {
            setShowForm(false);
            setEditingSlide(undefined);
          }}
        />
      )}

      <div>
        {slides.length > 0 ? (
          slides.map(slide => (
            <AnimatedSliderListItem
              key={slide.id}
              slide={slide}
              onEdit={handleEditSlide}
              onDelete={handleDeleteSlide}
            />
          ))
        ) : (
          <p className="text-gray-600">لا توجد شرائح لعرضها.</p>
        )}
      </div>
    </div>
  );
}