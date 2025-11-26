import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface ContentItem {
  title: string;
  description: { highlight: string; detail: string }[]; 
  image: string;
}

const contentData: ContentItem[] = [
  {
    title: "نظافة سكنية فائقة",
    description: [
      { highlight: "نحول منزلك إلى واحة من النقاء والراحة،", detail: "مع الاهتمام بكل زاوية وتفصيل صغير." },
      { highlight: "فرقنا المدربة تستخدم أحدث التقنيات والمواد الصديقة للبيئة،", detail: "لضمان سلامة عائلتك." },
      { highlight: "خدمة شاملة تشمل تنظيف الأرضيات والسجاد والأثاث،", detail: "بالمطابخ والحمامات بمعايير عالمية." }
    ],
    image: "/images/ice29.jpg",
  },
  {
    title: "حلول نظافة للمؤسسات",
    description: [
      { highlight: "نوفر بيئة عمل صحية ومحفزة لزيادة إنتاجية فريقك،", detail: "وتركيزهم." },
      { highlight: "خطط مرنة تتناسب مع ساعات عملكم،", detail: "مع التركيز على المناطق الأكثر استخداماً وتعرضاً للجراثيم." },
      { highlight: "عقود صيانة دورية تضمن لكم استمرارية النظافة،", detail: "والاحترافية على مدار العام." }
    ],
    image: "/images/ice2.jpg",
  },
  {
    title: "تعقيم شامل ومكافحة آفات",
    description: [
      { highlight: "نقدم حلولاً فعالة ومضمونة للقضاء على البكتيريا،", detail: "والفيروسات، والحشرات." },
      { highlight: "نستخدم معقمات ومبيدات حشرية معتمدة عالمياً،", detail: "وآمنة تماماً على صحة الإنسان والحيوانات الأليفة." },
      { highlight: "فريق من الخبراء يضمن لك راحة البال،", detail: "وحماية ممتدة لمنزلك أو مقر عملك." }
    ],
    image: "/images/ice3.jpg",
  },
];

// debounce
const debounce = (func: Function, delay: number) => {
  let timeoutId: number;
  return function(...args: any) {
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = window.setTimeout(() => func.apply(this, args), delay);
  };
};

export const StickyScrollSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
    if (isFlipping) return;

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
  }, [activeIndex, isFlipping]);

  useEffect(() => {
    const debouncedScroll = debounce(handleScroll, 10);
    window.addEventListener('scroll', debouncedScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', debouncedScroll);
  }, [handleScroll]);

  const setTextRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    textRefs.current[index] = el;
  }, []);

  return (
    <>
      <section className="bg-black text-white min-h-screen py-24 px-4 sm:px-8 lg:px-12" dir="rtl">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* النصوص */}
          <div className="lg:col-span-7 flex flex-col pt-12">
            {contentData.map((item, index) => (
              <div
                key={index}
                ref={setTextRef(index)}
                className="min-h-[70vh] py-16 transition-all duration-500"
                style={{ paddingBottom: '20px' }}
              >
                <div className="lg:hidden w-full mb-8">
                  <img
                    src={item.image}
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
                      <img src={contentData[activeIndex].image} alt={contentData[activeIndex].title} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                      <img src={contentData[(activeIndex + 1) % contentData.length].image} alt={contentData[(activeIndex + 1) % contentData.length].title} className="w-full h-full object-cover" />
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
