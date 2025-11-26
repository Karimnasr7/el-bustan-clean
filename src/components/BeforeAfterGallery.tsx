import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./images/ImageWithFallback"; 

const gallery = [
  {
    id: 1,
    before: "https://images.unsplash.com/photo-1537870148480-ed9ff56a8148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXJ0eSUyMGNhcnBldCUyMGJlZm9yZXhsbnwxfHx8fDE3NjM2Njc3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1740168254713-1e8695f89ffe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGNhcnBldCUyMGx1eHVyeXhsbnwxfHx8fDE3NjM2Njc3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "تنظيف السجاد",
  },
  {
    id: 2,
    before: "https://images.unsplash.com/photo-1654911491498-c508b36bc1cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRhbmslMjBjbGVhbmluZ3hsbnwxfHx8fDE3NjM2Njc3OTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1632489670397-911518ac2138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXRzJTIwbWFjcm98ZW58MXx8fHwxNzYzNTY4MjIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "تنظيف الخزانات",
  },
  {
    id: 3,
    before: "https://images.unsplash.com/photo-1610817186378-e756a99b96ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGVhbCUyMGNsZWFuaW5nJTIwZGFya3hsbnwxfHx8fDE3NjM2Njc3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    after: "https://images.unsplash.com/photo-1495321451782-dcb9fdb512ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc2MzY2MDc2MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "تنظيف المساحات",
  },
];

export function BeforeAfterGallery() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  return (

    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >

          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-4 text-white"
            style={{ textShadow: "0 0 30px rgba(0, 188, 212, 0.6)" }}
          >
            نتائج مذهلة
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            شاهد التحول الذي نحققه في كل مشروع
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Before */}
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(gallery[currentIndex].id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl">

                  <ImageWithFallback
                    src={gallery[currentIndex].before}
                    alt="قبل التنظيف"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover transition-all duration-500"
                    style={{
                      filter: hoveredId === gallery[currentIndex].id ? "grayscale(0.8) brightness(0.6)" : "grayscale(0.5) brightness(0.7)",
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Label */}
                  <motion.div
                    className="absolute top-6 right-6 bg-red-500/90 backdrop-blur-sm px-6 py-3 rounded-full border border-red-400/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-white">قبل</span>
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(gallery[currentIndex].id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <div className="relative rounded-2xl overflow-hidden border border-cyan-400/50 shadow-2xl shadow-cyan-500/20">

                  <ImageWithFallback
                    src={gallery[currentIndex].after}
                    alt="بعد التنظيف"
                    className="w-full h-64 sm:h-80 md:h-96 object-cover transition-all duration-500"
                    style={{
                      filter: hoveredId === gallery[currentIndex].id ? "brightness(1.2) saturate(1.3)" : "brightness(1.1) saturate(1.2)",
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Label */}
                  <motion.div
                    className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-blue-500 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-400/50"
                    whileHover={{ scale: 1.05 }}
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(0, 188, 212, 0.5)",
                        "0 0 40px rgba(0, 188, 212, 0.8)",
                        "0 0 20px rgba(0, 188, 212, 0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-white">بعد</span>
                  </motion.div>

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Title */}
          <motion.div
            key={`title-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}

            className="text-center mt-8"
          >
            <h3 className="text-2xl md:text-3xl text-white">{gallery[currentIndex].title}</h3>
          </motion.div>

          <motion.button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-8 md:-translate-x-16 bg-gradient-to-r from-cyan-500 to-blue-600 p-3 sm:p-4 rounded-full shadow-lg shadow-cyan-500/50"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-8 md:translate-x-16 bg-gradient-to-r from-cyan-500 to-blue-600 p-3 sm:p-4 rounded-full shadow-lg shadow-cyan-500/50"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </motion.button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {gallery.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex ? "bg-cyan-400 w-8" : "bg-gray-600"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}