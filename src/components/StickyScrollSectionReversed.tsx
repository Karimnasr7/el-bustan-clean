// src/components/StickyScrollSectionReversed.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

// Interface for the data structure
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

export const StickyScrollSectionReversed: React.FC = () => {
  const [contentData, setContentData] = useState<ContentItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/sticky-scroll-reversed');
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
    if (contentData.length === 0) return;

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
    }
  }, [activeIndex, contentData]);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll);
    handleScroll(); 
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
    <section 
      className="bg-black text-white min-h-screen py-24 px-4 sm:px-8 lg:px-12"
      dir="rtl"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-5 hidden lg:block relative" style={{ height: `${contentData.length * 100}vh` }}>
          <div className="sticky top-0 h-screen flex items-center justify-start">
            <div 
              className="w-[450px] h-[450px] rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ease-out border-4 border-gray-800"
              style={{ 
                transform: activeIndex === 0 ? 'scale(1.05)' : 'scale(1)',
                boxShadow: `0 0 50px -10px rgba(255, 255, 255, 0.1)`
              }}
            >
              <img
                key={activeIndex}
                src={contentData[activeIndex].image_url} // Use image_url
                alt={contentData[activeIndex].title}
                className="w-full h-full object-cover transition-opacity duration-200 ease-out opacity-90 hover:opacity-100"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col pt-12">
          {contentData.map((item, index) => (
            <div
              key={item.id} // Use unique ID from database
              ref={setTextRef(index)}
              className="min-h-[80vh] py-16 transition-all duration-500"
              style={{
                paddingBottom: '10px', 
              }}
            >
              <div className="lg:hidden w-full mb-8">
                <img
                  src={item.image_url} // Use image_url
                  alt={item.title}
                  className="w-full h-auto object-cover rounded-2xl border border-gray-700"
                />
              </div>

              <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 transition-colors duration-500 text-white">
                {item.title}
              </h2>
              
              <div className="max-w-2xl">
                <div className='text-base sm:text-lg text-gray-300 leading-tight border-r-4 border-gray-700 pr-4 space-y-3'>
                  {item.description.map((descObj, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#146EF5] text-xl font-bold mt-1">•</span>
                      <div>
                        <p className='text-xl sm:text-2xl font-bold text-white leading-tight mb-0'>
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

              {index < contentData.length - 1 && (
                <div className="mt-12 h-px bg-gray-800 w-1/4"></div> 
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};