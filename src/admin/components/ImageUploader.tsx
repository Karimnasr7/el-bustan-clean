// src/admin/components/ImageUploader.tsx
import _React, { useState } from 'react';
import type { ChangeEvent } from 'react'; 
import { Eye, X } from 'lucide-react'; 
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

      if (!response.ok) throw new Error('فشل في رفع الصورة');

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
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
      
    
      <div className="mb-3">
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/*"
          disabled={uploading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {uploading && <p className="text-sm text-blue-500 mt-1">جاري الرفع...</p>}
        {uploadError && <p className="text-sm text-red-500 mt-1">{uploadError}</p>}
      </div>

     
      <div className="mb-3">
        <label className="block text-gray-600 text-xs mb-1">أو أدخل رابط الصورة مباشرة</label>
        <input 
          type="text" 
          value={value}
          onChange={handleUrlChange}
          placeholder="https://example.com/image.jpg"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
        />
      </div>

      
      {value && (
        <div className="flex items-end gap-2 mt-2">
            <div className="relative">
                <img 
                    src={value} 
                    alt="Preview" 
                    className="h-32 w-auto object-cover rounded-md border border-gray-300" 
                />
                
               
                <motion.button
                    type="button"
                    onClick={handleRemoveImage}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-200 shadow-md"
                    title="حذف الصورة"
                >
                    <X className="w-4 h-4" />
                </motion.button>
            </div>

            
            <motion.button
                type="button"
                onClick={() => setIsPreviewOpen(true)} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1 h-fit bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 text-sm shadow-md"
                title="معاينة ظهور الصورة في الموقع"
            >
                <Eye className="w-4 h-4" />
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