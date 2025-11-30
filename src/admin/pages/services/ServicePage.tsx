// src/admin/pages/services/ServicesPage.tsx
import { useState, useEffect } from 'react';
import { ServiceForm } from './ServiceForm';
import { ServiceListItem } from './ServiceListItem';
import type { Service } from '../../types';

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState<Service | undefined>(undefined);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services');
      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveService = () => {
    setShowForm(false);
    setEditingService(undefined);
    fetchServices();
  };

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setShowForm(true);
  };

  const handleDeleteService = async (id: number) => {
    if (window.confirm('هل أنت متأكد من أنك تريد حذف هذه الخدمة؟')) {
      try {
        const response = await fetch('/api/services', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          fetchServices();
        } else {
          alert('فشل في حذف الخدمة');
        }
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('فشل في حذف الخدمة');
      }
    }
  };

  if (loading) return <div className="p-8 text-center">جاري التحميل...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">إدارة الخدمات</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          إضافة خدمة جديدة
        </button>
      </div>

      {showForm && (
        <ServiceForm
          service={editingService}
          onSave={handleSaveService}
          onCancel={() => {
            setShowForm(false);
            setEditingService(undefined);
          }}
        />
      )}

      <div>
        {services.length > 0 ? (
          services.map(service => (
            <ServiceListItem
              key={service.id}
              service={service}
              onEdit={handleEditService}
              onDelete={handleDeleteService}
            />
          ))
        ) : (
          <p className="text-gray-600">لا توجد خدمات لعرضها.</p>
        )}
      </div>
    </div>
  );
}