// src/components/StickyScrollSection.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface for the data structure, matching the database columns
interface ContentItem {
  id: number;
  title: string;
  description: { highlight: string; detail: string }[]; 
  image_url: string;
}

// debounce function (remains the same)
const debounce = (func: Function, delay: number) => {
  let timeoutId: number;
  return function(...args: any) {
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = window.setTimeout(() => func.apply(this, args), delay);
  };
};

export const StickyScrollSection: React.FC = () => {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [loading, setLoading] = useState(true);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/sticky-scroll');
        const data = await response.json();
        setContentData(data);
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const handleScroll = useCallback(() => {
    if (isFlipping || contentData.length === 0) return;

    let newActiveIndex = 0;
    for (let i = contentData.length - 1; i >= 0; i--) {
      const el = textRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          newActiveIndex = i;
          break;
        }
      }
    }

    if (newActiveIndex !== activeIndex) {
      setActiveIndex(newActiveIndex);
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 800);
    }
  }, [activeIndex, isFlipping, contentData]);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  const setTextRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    textRefs.current[index] = el;
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#146EF5]"></div>
          <p className="text-white mt-4">جاري تحميل المحتوى...</p>
        </div>
      </section>
    );
  }

  if (contentData.length === 0) {
    return (
      <section className="bg-black text-white min-h-screen py-24 px-4 sm:px-8 lg:px-12 flex items-center justify-center">
        <p className="text-white">لا يوجد محتوى لعرضه.</p>
      </section>
    );
  }

  return (
    <>
      <section className="bg-black text-white min-h-screen py-24 px-4 sm:px-8 lg:px-12" dir="rtl">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* النصوص */}
          <div className="lg:col-span-7 flex flex-col pt-12">
            {contentData.map((item, index) => (
              <div
                key={item.id} // Use the unique ID from the database
                ref={setTextRef(index)}
                className="min-h-[70vh] py-16 transition-all duration-500"
                style={{ paddingBottom: '20px' }}
              >
                <div className="lg:hidden w-full mb-8">
                  <img
                    src={item.image_url} // Use image_url from the database
                    alt={item.title}
                    className="w-full h-auto object-cover rounded-2xl border border-gray-700"
                  />
                </div>

                <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 transition-colors duration-500 text-white">
                  {item.title}
                </h2>

                <div className="max-w-2xl">
                  <div className='text-base sm:text-lg text-gray-300 leading-tight border-r-4 border-gray-700 pr-4 space-y-6'>
                    {item.description.map((descObj, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[#146EF5] text-xl font-bold mt-1">•</span>
                        <div>
                          <p className='text-xl sm:text-2xl font-bold text-white leading-tight mb-1'>
                            {descObj.highlight}
                          </p>
                          <p className='text-base sm:text-lg text-gray-300 leading-tight'>
                            {descObj.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* الصور */}
          <div className="lg:col-span-5 hidden lg:block relative" style={{ height: `${contentData.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex items-center justify-end">
              <div className="relative w-[450px] h-[450px] rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-800" style={{ perspective: '1000px' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    className="absolute inset-0 w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ rotateY: 0 }}
                    animate={{ rotateY: 0 }}
                    exit={{ rotateY: -180 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden' }}>
                      <img src={contentData[activeIndex].image_url} alt={contentData[activeIndex].title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <img src={contentData[(activeIndex + 1) % contentData.length].image_url} alt={contentData[(activeIndex + 1) % contentData.length].title} className="w-full h-full object-cover" />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};