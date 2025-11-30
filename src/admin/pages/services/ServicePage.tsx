// src/admin/pages/services/ServicesPage.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceForm } from './ServiceForm';
import { ServiceListItem } from './ServiceListItem';
import type { Service } from '../../types';
import { Plus, Briefcase } from 'lucide-react';

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

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <Briefcase className="w-12 h-12 text-cyan-400" />
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
            إدارة الخدمات
          </h1>
          <p className="mt-2 text-gray-400">إضافة، تعديل، أو حذف خدمات الموقع.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 font-medium py-2 px-4 rounded-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          إضافة خدمة جديدة
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
            <ServiceForm
              service={editingService}
              onSave={handleSaveService}
              onCancel={() => {
                setShowForm(false);
                setEditingService(undefined);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* شبكة الخدمات */}
      {services.length > 0 ? (
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
          {services.map((service, _index) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <ServiceListItem
                service={service}
                onEdit={handleEditService}
                onDelete={handleDeleteService}
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
          لا توجد خدمات لعرضها.
        </motion.p>
      )}
    </div>
  );
}