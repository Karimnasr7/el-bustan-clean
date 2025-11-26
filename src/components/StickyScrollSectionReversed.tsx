import React, { useState, useEffect, useRef, useCallback } from 'react';


interface ContentItem {
  title: string;
  description: { highlight: string; detail: string }[]; 
  image: string;
}


const contentData: ContentItem[] = [
  {
    title: "تنظيف ما بعد البناء - لمسة نهائية احترافية",
    description: [
      {
        highlight: "نزيل الغبار والبقايا بعد كل مرحلة بناء،",
        detail: "لتحضير المساحة للتسليم النهائي."
      },
      {
        highlight: "نتعامل مع أصعب البقع والمخلفات،",
        detail: "باستخدام معدات متخصصة وفرق مدربة."
      },
      {
        highlight: "نضمن لك استلام مشروعك نظيفاً وجاهزاً للاستخدام،",
        detail: "مع اهتمام فائق بالتفاصيل الدقيقة."
      }
    ],
    image: "/images/ice7.jpg", 
  },
  {
    title: "تنظيف السجاد والستائر - إعادة الحياة للألياف",
    description: [
      {
        highlight: "نستخدم تقنيات البخار والشفط العميق لإزالة الأوساخ،",
        detail: "والبكتيريا العالقة في أعماق الألياف."
      },
      {
        highlight: "مواد تنظيف آمنة تحافظ على ألوان السجاد والستائر،",
        detail: "وتمنع بهتانها مع مرور الوقت."
      },
      {
        highlight: "نتائج سريعة الجفاف تسمح لك باستخدام مساحتك خلال ساعات،",
        detail: "مع ترك رائحة منعشة ونظافة فائقة."
      }
    ],
    image: "/images/ice8.jpg", 
  },
  {
    title: "تنظيف الواجهات الزجاجية - شفافية تصل إلى السماء",
    description: [
      {
        highlight: "فرقنا المتخصصة تعمل بأمان على ارتفاعات عالية،",
        detail: "لتنظيف واجهات المباني والنوافذ الزجاجية."
      },
      {
        highlight: "نستخدم مواد عالية الجودة تترك الزجاج لامعاً بدون أي خطوط،",
        detail: "أو بقايا تؤثر على الرؤية والجمال."
      },
      {
        highlight: "نحسن من الإضاءة الطبيعية الداخلة،",
        detail: "ونمنح مبنى مظهراً خارجياً مشرقاً وجذاباً."
      }
    ],
    image: "/images/ice9.jpg",
  },
];


const debounce = (func: Function, delay: number) => {
  let timeoutId: number;
  return function(...args: any) {
    clearTimeout(timeoutId);
    // @ts-ignore
    timeoutId = window.setTimeout(() => func.apply(this, args), delay);
  };
};

export const StickyScrollSectionReversed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleScroll = useCallback(() => {
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
  }, [activeIndex]);

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
                src={contentData[activeIndex].image}
                alt={contentData[activeIndex].title}
                className="w-full h-full object-cover transition-opacity duration-200 ease-out opacity-90 hover:opacity-100"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col pt-12">
          {contentData.map((item, index) => (
            <div
              key={index}
              ref={setTextRef(index)}
              className="min-h-[80vh] py-16 transition-all duration-500"
              style={{
                paddingBottom: '10px', 
              }}
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
                <div className='text-base sm:text-lg text-gray-300 leading-tight border-r-4 border-gray-700 pr-4 space-y-3'> {/* تم تغيير space-y-6 إلى space-y-3 */}
                  {item.description.map((descObj, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="text-[#146EF5] text-xl font-bold mt-1">•</span>
                      <div>
                        <p className='text-xl sm:text-2xl font-bold text-white leading-tight mb-0'> {/* تم تغيير mb-1 إلى mb-0 */}
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