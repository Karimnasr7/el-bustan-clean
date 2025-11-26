import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  id: number;
  imgUrl: string;
  texts: string[];
}

const SLIDES_DATA: Slide[] = [
  { 
    id: 1, 
    imgUrl: "/images/ice12.jpg", 
    texts: ["خبرة تفوق التوقعات"]
  },
  { 
    id: 2, 
    imgUrl: "/images/ice11.jpg", 
    texts: ["أحدث المعدات"]
  },
  { 
    id: 3, 
    imgUrl: "/images/ice14.jpg", 
    texts: ["نجيـك ولو في الدور الثالث"]
  },
  { 
    id: 4, 
    imgUrl: "/images/ice30.jpg", 
    texts: ["احترافية عالـية"]
  },
  { 
    id: 5, 
    imgUrl: "/images/ice16.jpg", 
    texts: ["شوف المهـارة!"]
  },
];


export const AnimatedSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const currentSlide = SLIDES_DATA[index];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES_DATA.length);
    }, 5000); 
    
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (slideIndex: number) => {
    setIndex(slideIndex);
  };

  return (
    <section id="animated-slider" className="py-20 md:py-32 bg-black overflow-hidden">
        <div className="container mx-auto px-6">
            <motion.h2 
                className="text-4xl font-extrabold text-center mb-16 text-white tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                تميزنا يكمن في التفاصيل
            </motion.h2>

            <div className="relative w-full aspect-[16/10] max-w-6xl mx-auto overflow-hidden rounded-3xl border border-white/30">
            
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentSlide.id}
                    className="absolute inset-0"
                    initial={{ y: "100%", opacity: 0 }}  
                    animate={{ y: "0%", opacity: 1 }}     
                    exit={{ y: "-100%", opacity: 0 }}   
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
                >
                
                   
                    <motion.img
                        src={currentSlide.imgUrl} 
                        alt={`Slide ${currentSlide.id}`}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.05 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 w-full p-4 pb-6 sm:p-12 text-white flex flex-row justify-between items-end text-right" dir="rtl">
              
              <div className="space-y-1 sm:space-y-3">
                  {currentSlide.texts.map((text, i) => (
                      <motion.h3
                          key={i}

                          className="text-lg sm:text-xl md:text-2xl lg:text-5xl font-extrabold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
                      >
                          {text}
                      </motion.h3>
                  ))}
              </div>

              <motion.a
        href="#contact"

        className="px-4 py-1 sm:px-6 sm:py-3 bg-[#146EF5] text-white text-sm sm:text-lg font-bold rounded-full hover:bg-[#0f5bcc] transition shadow-2xl shadow-[#146ef5]/30 transform hover:scale-[1.05] whitespace-nowrap"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9, type: "spring", stiffness: 100 }}
    >
        اطلب فريــقنا الآن
    </motion.a>
</div>
                    
                </motion.div>
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center gap-2 z-20">
                {SLIDES_DATA.map((slide, i) => (
                <button
                    key={slide.id}
                    onClick={() => goToSlide(i)}
                    className={`w-3 h-3 rounded-full transition duration-300 ${i === index ? "bg-[#146EF5] scale-125" : "bg-white/50 hover:bg-white/80"}`}
                    aria-label={`Go to slide ${i + 1}`}
                />
                ))}
            </div>

            </div>
        </div>
    </section>
  );
};