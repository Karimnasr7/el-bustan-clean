// src/components/HeroSection.tsx
"use client";

import { useState, useEffect } from "react"; 
import { Star, ChevronLeft, Play } from 'lucide-react';
import { VideoModal } from './VideoModal'; 

interface SiteContent {
  [key: string]: string | number;
}

interface Rating {
  source: string;
  score: number;
  count: string;
}

const ImageBlock = ({ src, alt, heightClass }: { src: string; alt: string; heightClass: string }) => {
  const fallbackSrc = (width: number, height: number) => `https://placehold.co/${width}x${height}/1a1a1a/FFFFFF?text=El+Bustan+Img`;

  return (
    <div className={`relative w-full ${heightClass} rounded-xl overflow-hidden shadow-lg border border-gray-700/50 transform hover:scale-[1.01] transition-transform duration-300`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        onError={(e) => {
            const [w, h] = heightClass === 'h-2/5' ? [400, 600] : [400, 800];
            e.currentTarget.src = fallbackSrc(w, h); 
            e.currentTarget.onerror = null;
        }}
      />
    </div>
  );
};

export function HeroSection() { 
  const [content, setContent] = useState<SiteContent>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch('/api/site-content');
        const data = await response.json();
        setContent(data);
      } catch (error) {
        console.error("Failed to fetch site content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const ratings: Rating[] = [
    { 
      source: content.google_rating_source as string || "Google", 
      score: content.google_rating_score as number || 4.9, 
      count: content.google_rating_count as string || "5K+" 
    },
    { 
      source: content.trustpilot_rating_source as string || "Trustpilot", 
      score: content.trustpilot_rating_score as number || 4.7, 
      count: content.trustpilot_rating_count as string || "3K+" 
    },
  ];

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  const videoUrl = content.hero_video_url as string || "https://www.youtube.com/embed/TdhF6GDN5Xg";

  const StarRating = ({ score }: { score: number }) => (
    <div className="flex items-center space-x-0.5" dir="ltr">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < Math.floor(score) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );

  if (loading) {
    return <div className="relative pt-[72px] bg-black text-white min-h-screen flex items-center justify-center">جاري تحميل المحتوى...</div>;
  }

  return (
    <section className="relative pt-[72px] bg-black text-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 py-16 md:py-32 lg:py-24 relative z-10">

        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(to right, #ffffff0d 1px, transparent 1px), repeating-linear-gradient(to bottom, #ffffff0d 1px, transparent 1px)',
            backgroundSize: '25px 25px',
          }}
        ></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#146EF5] rounded-full mix-blend-lighten opacity-10 filter blur-3xl animate-pulse-slow"></div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          <div className="lg:w-5/12 text-center lg:text-right">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-tight mb-6">
              {content.hero_title_main || "نظافة لا تُنسى تبدأ"} <span className="text-white block sm:inline">{content.hero_title_sub || "من منزلك."}</span>
            </h1>

            <p className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10">
              {content.hero_subtitle || "نحن نقدم خدمات تنظيف متكاملة ومخصصة للمنازل والشركات، باستخدام أحدث التقنيات وأفضل مواد صديقة للبيئة. استمتع ببيئة نظيفة وصحية تستحقها."}
            </p>

              <div className="flex flex-col sm:flex-row justify-center lg:justify-end gap-4 mb-8">
                
                <a 
                  href={content.whatsapp_link as string || "https://wa.me/9660563207097"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:w-auto px-8 py-3 bg-[#146EF5] text-white rounded-lg text-lg font-bold transition-all hover:bg-[#0f5bcc] shadow-lg shadow-[#146ef5]/30 group"
                >
                  {content.cta_button_text || "احجز خدمتك الآن"}
                  <ChevronLeft className="w-5 h-5 mr-2 group-hover:mr-1 transition-all" />
                </a>

                <button 
                  onClick={() => setIsVideoModalOpen(true)}
                  className="flex items-center justify-center sm:w-auto px-8 py-3 bg-white/10 border border-white/20 text-white rounded-lg text-lg font-medium transition-all hover:bg-white/20"
                >
                  <Play className="w-5 h-5 ml-2 fill-white text-white" />
                  {content.video_button_text || "شاهد كيف نعمل"}
                </button>
              </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-6 pt-4 border-t border-gray-800">
              {ratings.map((rating) => (
                <div key={rating.source} className="flex items-center gap-3">
                  <StarRating score={rating.score} />
                  <span className="text-sm font-semibold text-gray-300">
                    {rating.score} نجوم ({rating.count}) - {rating.source}
                  </span>
                </div>
              ))}
            </div>

          </div>
          <div className="lg:w-6/12 w-full flex justify-center lg:justify-start relative mt-12 lg:mt-0">
          
            <div className="w-full max-w-2xl h-[40rem] bg-black">
              
              <div className="grid grid-cols-3 gap-2 h-full">
                
                <div className="flex flex-col gap-2">
                  <ImageBlock 
                    src={String(content.hero_grid_image_1) || "/images/ice11.jpg"} 
                    alt="تنظيف الغرف" 
                    heightClass="h-2/5" 
                  />
                  <ImageBlock 
                    src={String(content.hero_grid_image_2) || "/images/ice4.jpg"} 
                    alt="تعقيم الأسطح" 
                    heightClass="h-3/5" 
                  />
                </div>
                
                <div className="flex flex-col gap-2 pt-4"> 
                  <ImageBlock 
                    src={String(content.hero_grid_image_3) || "/images/ice3.jpg"} 
                    alt="فريق العمل" 
                    heightClass="h-3/6" 
                  />
                  <ImageBlock 
                    src={String(content.hero_grid_image_4) || "/images/ice40.jpg"} 
                    alt="معدات حديثة" 
                    heightClass="h-3/6" 
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <ImageBlock 
                    src={String(content.hero_grid_image_5) || "/images/ice5.jpg"} 
                    alt="المنتجات الصديقة للبيئة" 
                    heightClass="h-3/5" 
                  />
                  <ImageBlock 
                    src={String(content.hero_grid_image_6) || "/images/ice6.jpg"} 
                    alt="تنظيف النوافذ" 
                    heightClass="h-2/5" 
                  />
                </div>
                
              </div>
            </div>
          </div>
    </div>
  </div>

          
      <VideoModal 
        isOpen={isVideoModalOpen} 
        onClose={() => setIsVideoModalOpen(false)} 
        videoUrl={videoUrl} 
      />
    </section>
  );
}