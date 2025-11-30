// src/admin/pages/services/ServiceForm.tsx
import React, { useState, useEffect } from 'react';
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
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
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
    <div className="p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">{service?.id ? 'تعديل خدمة' : 'إضافة خدمة جديدة'}</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">عنوان الخدمة</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">الوصف</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">الأيقونة</label>
            <select name="icon_name" value={formData.icon_name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">اللون</label>
            <select name="color" value={formData.color} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              {colorOptions.map(color => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">ترتيب العرض</label>
          <input type="number" name="sort_order" value={formData.sort_order} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        <div className="flex justify-end space-x-4 space-x-reverse">
          <button type="button" onClick={onCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            إلغاء
          </button>
          <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
            {loading ? 'جاري الحفظ...' : 'حفظ'}
          </button>
        </div>
      </form>
    </div>
  );
}