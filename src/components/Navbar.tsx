"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu } from "lucide-react";

interface NavbarProps {
  onServicesClick: () => void;
  onAboutClick: () => void;
  onArticlesClick: () => void;
  onContactClick: () => void;
}

const mainLinks = [
  { name: "خدماتنا", action: "services" },
  { name: "مقالات", action: "articles" }, 
  { name: "عن الشركة", action: "about" },
  { name: "اتصل بنا", action: "contact" },
];

export function Navbar({ onServicesClick, onAboutClick, onArticlesClick, onContactClick }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAction = (action: string) => {
    console.log('تم الضغط على زر القائمة المتنقلة، الإجراء هو:', action);
    switch (action) {
      case "services":
        onServicesClick();
        break;
      case "articles": 
        onArticlesClick();
        break;
      case "about":
        onAboutClick();
        break;
      case "contact":
        onContactClick();
        break;
      default:
        break;
    }
    setMobileMenuOpen(false); 
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#050505]/90 backdrop-blur-md border-b border-gray-600 text-white shadow-xl" dir="rtl">
      <div className="max-w-[1440px] mx-auto px-6 h-[72px] flex items-center justify-between">
        
        <div className="flex-1 lg:flex-none lg:w-1/2">
          <motion.div 
            className="flex items-center gap-3"
            animate={{ x: ["0%", "3%", "0%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#146EF5] to-[#0f5bcc] rounded-xl flex items-center justify-center shadow-lg shadow-[#146EF5]/50">
              <span className="text-white font-black text-2xl">B</span>
            </div>
            <span className="text-white font-black text-2xl sm:text-3xl tracking-tight">
              البسـتــان كـلـــين
            </span>
          </motion.div>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {mainLinks.map((item) => (
            <button
              key={item.name}
              onClick={() => handleAction(item.action)}
              className="text-gray-300 hover:text-[#146EF5] text-[17px] font-bold transition-colors duration-200"
            >
              {item.name}
            </button>
          ))}
        </div>

        <button 
            className="lg:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-[#050505] border-t border-gray-800 overflow-hidden"
          >
            <div className="p-4 flex flex-col space-y-2">
                {mainLinks.map((item) => (
                    <button 
                        key={item.name}
                        onClick={() => handleAction(item.action)}
                        className="text-lg font-bold text-white hover:text-[#146EF5] block py-3 border-b border-white/5 transition-colors w-full text-right"
                    >
                        {item.name}
                    </button>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}