// src/admin/components/VideoUploader.tsx
import { useState } from 'react';
import type { ChangeEvent } from 'react'; 
import { Film, X, Video } from 'lucide-react'; 
import { motion } from 'framer-motion'; 

interface VideoUploaderProps {
  value: string; 
  onChange: (url: string) => void;
  label: string;
}

export function VideoUploader({ value, onChange, label }: VideoUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // التحقق من الحجم (اختياري: Vercel Free يفضل أقل من 4.5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('حجم الفيديو كبير جداً (الأقصى 5MB)');
      return;
    }

    setUploading(true);
    setUploadError('');

    const fileData = new FormData();
    fileData.append('file', file);
    fileData.append('folder', 'site-videos'); 

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: fileData,
      });

      if (!response.ok) throw new Error('فشل في رفع الفيديو');

      const result = await response.json();
      onChange(result.url);
    } catch (err) {
      setUploadError('حدث خطأ أثناء الرفع، حاول مرة أخرى.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
      <label className="block text-gray-300 text-sm font-bold mb-3 items-center gap-2">
        <Video className="w-4 h-4 text-cyan-400" />
        {label}
      </label>
      
      <div className="mb-4">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="video/mp4,video/webm"
          disabled={uploading}
          className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer disabled:opacity-50"
        />
        {uploading && <p className="text-sm text-cyan-400 mt-2 animate-pulse font-medium">جاري معالجة ورفع الفيديو...</p>}
        {uploadError && <p className="text-sm text-red-400 mt-2">{uploadError}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-500 text-[10px] uppercase tracking-wider mb-1 font-bold">رابط الفيديو المباشر</label>
        <input 
          type="text" 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://..."
          className="w-full bg-black/20 border border-gray-700 rounded-lg py-2 px-3 text-gray-300 text-xs focus:ring-1 focus:ring-cyan-500 outline-none"
        />
      </div>

      {value && (
        <div className="relative group w-full aspect-video bg-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
            <video 
              src={value} 
              className="w-full h-full object-cover opacity-80"
              muted
              playsInline
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                <Film className="w-12 h-12 text-white/30" />
            </div>
            
            <motion.button
                type="button"
                onClick={() => onChange('')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full shadow-lg transition-all"
                title="حذف الفيديو"
            >
                <X className="w-4 h-4" />
            </motion.button>
        </div>
      )}
    </div>
  );
}