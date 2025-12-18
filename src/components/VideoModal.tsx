// src/components/VideoModal.tsx
import { X } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string; 
}

export function VideoModal({ isOpen, onClose, videoUrl }: VideoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-white">
      <div className="relative w-full max-w-4xl">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close video"
        >
          <X className="w-8 h-8" />
        </button>
        
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10">
          {/* تم التعديل هنا ليدعم الروابط المباشرة من Vercel Blob */}
          <video 
            src={videoUrl} 
            controls 
            autoPlay 
            className="w-full h-full object-contain"
          >
            متصفحك لا يدعم تشغيل الفيديو.
          </video>
        </div>
      </div>
    </div>
  );
}