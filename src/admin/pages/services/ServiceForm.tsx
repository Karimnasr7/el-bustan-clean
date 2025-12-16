// src/admin/pages/services/ServiceForm.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Service } from '../../types';

interface ServiceFormProps {
  service?: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
}

const iconOptions = ['Sparkles', 'Droplets', 'Shield', 'Bug']; 
const colorOptions = ['cyan', 'blue', 'green', 'orange']; 

export function ServiceForm({ service, onSave, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>({
    id: 0,
    title: '',
    description: '',
    icon_name: 'Sparkles',
    color: 'cyan',
    sort_order: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        id: 0,
        title: '',
        description: '',
        icon_name: 'Sparkles',
        color: 'cyan',
        sort_order: 0,
      });
    }
  }, [service]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError('');

      const method = service?.id ? 'PUT' : 'POST';
      const url = '/api/services';

      try {
        const token = localStorage.getItem('adminToken'); // جلب التوكن

        const response = await fetch(url, {
          method,
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // إضافة التوكن هنا
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Failed to save service');

        const savedService = await response.json();
        onSave(savedService);
      } catch (err) {
        setError('فشل في حفظ الخدمة. يرجى المحاولة مرة أخرى.');
        console.error(err);
      } finally {
        setLoading(false);
      }
  };
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold text-white mb-6">{service?.id ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}</h2>
      {error && <p className="text-red-400 mb-4 bg-red-500/10 p-3 rounded-lg">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">عنوان الخدمة</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
          />
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">الوصف</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            rows={4} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
            required 
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">الأيقونة</label>
            <select 
              name="icon_name" 
              value={formData.icon_name} 
              onChange={handleChange} 
              className="w-full px-4 py-3 text-gray-200 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">اللون</label>
            <select 
              name="color" 
              value={formData.color} 
              onChange={handleChange} 
              className="w-full px-4 py-3 text-gray-200 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
            >
              {colorOptions.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-300 text-sm font-bold mb-2">ترتيب العرض</label>
          <input 
            type="number" 
            name="sort_order" 
            value={formData.sort_order} 
            onChange={handleChange} 
            className="w-full px-4 py-3 text-gray-200 placeholder-gray-500 bg-white/10 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent" 
          />
        </div>
        <div className="flex justify-end gap-4">
          <motion.button 
            type="button" 
            onClick={onCancel} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 text-gray-400 font-medium py-2 px-6 rounded-lg transition-all duration-300"
          >
            إلغاء
          </motion.button>
          <motion.button 
            type="submit" 
            disabled={loading} 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-medium py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}