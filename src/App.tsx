// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { ServicesModal } from "./components/ServicesModal";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { BeforeAfterGallery } from "./components/BeforeAfterGallery";
import { StickyScrollSection } from './components/StickyScrollSection';
import { StickyScrollSectionReversed } from './components/StickyScrollSectionReversed'; 
import { AnimatedSlider} from "./components/AnimatedSlider";
import { ArticlesSection } from "./components/ArticlesSection";
import { ContactSection } from "./components/ContactSection";
import { FloatingCTAs } from "./components/FloatingCTAs";

import AdminPage from './admin';

function MainSiteLayout() {
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const articlesSectionRef = useRef<HTMLDivElement>(null); 
  const contactSectionRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToArticles = () => articlesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact = () => contactSectionRef.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-black text-white" dir="rtl">
      <Navbar 
        onServicesClick={() => setIsServicesModalOpen(true)} 
        onAboutClick={scrollToAbout}
        onArticlesClick={scrollToArticles}
        onContactClick={scrollToContact}
      />

      <main>
        <ServicesModal
          isOpen={isServicesModalOpen}
          onClose={() => setIsServicesModalOpen(false)}
        />

        <HeroSection />
        <ServicesSection />
        <BeforeAfterGallery />
        
        <div ref={aboutSectionRef}>
          <StickyScrollSection />
          <div className="-mt-24 lg:-mt-48">
            <StickyScrollSectionReversed />
          </div>
        </div>

        <AnimatedSlider />
        
        <div ref={articlesSectionRef}>
          <ArticlesSection />
        </div>

        <div ref={contactSectionRef}>
          <ContactSection />
        </div>

        <FloatingCTAs />

        <footer className="bg-black border-t border-gray-800 py-8">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-500">
              © 2025 البستان كلين. جميع الحقوق محفوظة.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<MainSiteLayout />} />

        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}