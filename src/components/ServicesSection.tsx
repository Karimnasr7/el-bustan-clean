// src/components/ServicesSection.tsx
import { motion } from "framer-motion";
import { Sparkles, Droplets, Shield, Bug } from "lucide-react";
import { useState, useEffect } from "react";

// هذا الكود يحول اسم الأيقونة القادم من قاعدة البيانات (مثل "Sparkles")
// إلى المكون الفعلي الذي يمكن لـ React استخدامه.
const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  Droplets,
  Shield,
  Bug,
};

const colorMap: Record<string, { border: string; glow: string; text: string; bg: string }> = {
  cyan: {
    border: "group-hover:border-cyan-400",
    glow: "group-hover:shadow-cyan-400/50",
    text: "group-hover:text-cyan-400",
    bg: "from-cyan-500/20 to-blue-500/20",
  },
  blue: {
    border: "group-hover:border-blue-400",
    glow: "group-hover:shadow-blue-400/50",
    text: "group-hover:text-blue-400",
    bg: "from-blue-500/20 to-purple-500/20",
  },
  green: {
    border: "group-hover:border-green-400",
    glow: "group-hover:shadow-green-400/50",
    text: "group-hover:text-green-400",
    bg: "from-green-500/20 to-teal-500/20",
  },
  orange: {
    border: "group-hover:border-orange-400",
    glow: "group-hover:shadow-orange-400/50",
    text: "group-hover:text-orange-400",
    bg: "from-orange-500/20 to-red-500/20",
  },
};

export function ServicesSection() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/api/services');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-white">جاري تحميل الخدمات...</div>;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, cyan 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl mb-4 text-white"
            style={{ textShadow: "0 0 30px rgba(0, 188, 212, 0.6)" }}
          >
            خدماتنا المتخصصة
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من خدمات النظافة والتعقيم بأحدث التقنيات
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            // الحصول على مكون الأيقونة من الاسم القادم من قاعدة البيانات
            const IconComponent = iconMap[service.icon_name];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ 
                  y: -10,
                  rotateY: 5,
                  rotateX: 5,
                }}
                className="group relative"
                style={{ perspective: "1000px" }}
              >
                <div
                  className={`relative bg-gradient-to-br from-white/10 to-gray-100/10 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-6 sm:p-8 transition-all duration-300 ${colorMap[service.color].border} ${colorMap[service.color].glow} shadow-xl overflow-hidden`}              
                >
                  {/* Glow Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${colorMap[service.color].bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    initial={false}
                  />

                  {/* Icon Container */}
                  <div className="relative mb-4 sm:mb-6">
                    <motion.div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 flex items-center justify-center group-hover:border-transparent transition-all"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* استخدام مكون الأيقونة الديناميكي */}
                      {IconComponent && <IconComponent className={`w-8 h-10 sm:w-10 sm:h-10 text-gray-400 ${colorMap[service.color].text} transition-colors`} />}
                    </motion.div>
                    
                    {/* Icon Glow */}
                    <motion.div
                      className={`absolute inset-0 blur-2xl bg-gradient-to-br ${colorMap[service.color].bg} opacity-0 group-hover:opacity-70`}
                      initial={false}
                      whileHover={{ scale: 1.5 }}
                    />
                  </div>

                  {/* Content */}
                  <h3 className={`text-xl sm:text-2xl mb-2 sm:mb-3 text-white ${colorMap[service.color].text} transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {service.description}
                  </p>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Corner Accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}