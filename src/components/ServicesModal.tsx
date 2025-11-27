import { motion, AnimatePresence } from "framer-motion"; 
import { X, Droplets, Shield, Trash2, Sparkles } from "lucide-react";

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  {
    id: 1,
    title: "تنظيف شامل",
    description: "تنظيف عميق لجميع المساحات بتقنيات متقدمة",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    id: 2,
    title: "تعقيم بالبخار",
    description: "تعقيم آمن وفعال باستخدام البخار الساخن",
    icon: Droplets,
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: 3,
    title: "تنظيف خزانات",
    description: "تنظيف وتعقيم خزانات المياه بمعايير صحية عالية",
    icon: Shield,
    gradient: "from-green-500 to-teal-600",
  },
  {
    id: 4,
    title: "مكافحة حشرات",
    description: "حلول فعالة وآمنة للقضاء على الحشرات",
    icon: Trash2,
    gradient: "from-orange-500 to-red-600",
  },
];

export function ServicesModal({ isOpen, onClose }: ServicesModalProps) {
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
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            // --- 1. تقليل الهوامش الخارجية على الموبايل ---
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            <div className="relative w-full max-w-6xl pointer-events-auto">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute -top-4 -right-4 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-full p-3 shadow-lg shadow-cyan-500/50 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl shadow-cyan-500/20">
                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 text-white"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
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
                      <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 sm:p-8 overflow-hidden transition-all duration-300 group-hover:border-cyan-400/50">
                        {/* Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                          initial={false}
                        />

                        {/* Icon */}
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} p-0.5`}>
                            <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center">
                              <service.icon className="w-8 h-8 text-cyan-400 group-hover:text-white transition-colors" />
                            </div>
                          </div>
                          <motion.div
                            className={`absolute inset-0 blur-xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-50`}
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
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}