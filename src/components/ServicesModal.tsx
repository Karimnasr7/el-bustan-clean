// src/components/ServicesModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { X, Droplets, Shield, Trash2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  color: string;
}

const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  Droplets,
  Shield,
  Trash2,
};

const gradientMap: { [key: string]: string } = {
  cyan: "from-cyan-500 to-blue-600",
  blue: "from-blue-500 to-purple-600",
  green: "from-green-500 to-teal-600",
  orange: "from-orange-500 to-red-600",
};

export function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services for modal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [isOpen]);

  // Effect to control body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // التغيير الأهم للموبايل: justify-start بدلاً من justify-center
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto"
          >
            <div className="relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-cyan-500/20 my-8">
              {/* Close Button - تم إعادة وضعه داخل منطقة المحتوى */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full p-3 shadow-lg shadow-cyan-500/50 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 sm:mb-6 text-white"
                style={{ textShadow: "0 0 30px rgba(0, 188, 212, 0.8)" }}
              >
                خدماتنا المتميزة
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-gray-400 mb-8 sm:mb-12 text-base sm:text-lg"
              >
                اختر الخدمة المناسبة لاحتياجاتك
              </motion.p>

              {loading ? (
                <div className="text-center text-white py-10">جاري تحميل الخدمات...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => {
                    const IconComponent = iconMap[service.icon_name];
                    const gradientClass = gradientMap[service.color];

                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          rotateX: 5,
                        }}
                        className="relative group cursor-pointer"
                        style={{ perspective: "1000px" }}
                      >
                        <div className={`relative bg-gradient-to-br ${gradientClass} p-0.5 rounded-2xl`}>
                          <div className="relative bg-gray-900 rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50">
                            {/* Glow Effect */}
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                              initial={false}
                            />
                            
                            {/* Icon */}
                            <div className="relative mb-6">
                              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradientClass} p-0.5`}>
                                <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                                  {IconComponent && <IconComponent className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors" />}
                                </div>
                              </div>
                              <motion.div
                                className={`absolute inset-0 blur-xl bg-gradient-to-br ${gradientClass} opacity-0 group-hover:opacity-50`}
                                initial={false}
                                whileHover={{ scale: 1.5 }}
                              />
                            </div>

                            {/* Content */}
                            <h3 className="text-xl sm:text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                              {service.title}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-400 group-hover:text-gray-300 transition-colors">
                              {service.description}
                            </p>

                            {/* Shine Effect */}
                            <motion.div
                              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}