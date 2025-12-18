// src/admin/components/ImageUploader.tsx
import _React, { useState } from 'react';
import type { ChangeEvent } from 'react'; 
import { Eye, X, Film } from 'lucide-react'; // أضفنا أيقونة Film للجمالية
import { motion, AnimatePresence } from 'framer-motion'; 
import { ImagePreviewModal } from './ImagePreviewModal'; 

interface ImageUploaderProps {
  value: string; 
  onChange: (url: string) => void;
  label: string;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); 

  // دالة بسيطة للتحقق هل الرابط هو فيديو
  const isVideo = (url: string) => {
    return url.match(/\.(mp4|webm|ogg)$/i) || url.includes('blob');
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('folder', 'general-uploads'); 

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: fileData,
      });

      if (!response.ok) throw new Error('فشل في رفع الملف');

      const result = await response.json();
      onChange(result.url);
    } catch (err) {
      setUploadError('فشل الرفع، حاول مرة أخرى.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  const handleRemoveImage = () => {
    onChange(''); 
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <label className="block text-gray-300 text-sm font-bold mb-3">{label}</label>
      
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          // تم التعديل هنا ليقبل الصور والفيديو
          accept="image/*,video/mp4,video/webm"
          disabled={uploading}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer disabled:opacity-50"
        />
        {uploading && <p className="text-sm text-cyan-400 mt-2 animate-pulse">جاري الرفع...</p>}
        {uploadError && <p className="text-sm text-red-400 mt-2">{uploadError}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1">أو رابط مباشر للملف</label>
        <input 
          type="text" 
          value={value}
          onChange={handleUrlChange}
          placeholder="https://example.com/file.mp4"
          className="w-full bg-black/20 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 text-sm focus:ring-1 focus:ring-cyan-500 outline-none"
        />
      </div>

      {value && (
        <div className="flex items-end gap-3 mt-4">
            <div className="relative group">
                {/* تم إضافة شرط العرض هنا */}
                {isVideo(value) ? (
                  <div className="h-32 w-48 bg-black rounded-md border border-gray-700 flex items-center justify-center overflow-hidden">
                    <video src={value} className="h-full w-full object-cover opacity-60" />
                    <Film className="absolute text-white/50 w-8 h-8" />
                  </div>
                ) : (
                  <img 
                      src={value} 
                      alt="Preview" 
                      className="h-32 w-48 object-cover rounded-md border border-gray-700 shadow-lg" 
                  />
                )}
                
                <motion.button
                    type="button"
                    onClick={handleRemoveImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                    title="حذف"
                >
                    <X className="w-3 h-3" />
                </motion.button>
            </div>

            <motion.button
                type="button"
                onClick={() => setIsPreviewOpen(true)} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all text-xs border border-white/10"
            >
                <Eye className="w-4 h-4 text-cyan-400" />
                معاينة
            </motion.button>
        </div>
      )}
      
      <AnimatePresence>
        {isPreviewOpen && value && (
          <ImagePreviewModal
            isOpen={isPreviewOpen}
            imageUrl={value}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}