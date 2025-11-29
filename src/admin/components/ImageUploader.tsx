// src/admin/components/ImageUploader.tsx
import _React, { useState } from 'react';
import type { ChangeEvent } from 'react'; 

interface ImageUploaderProps {
  value: string; 
  onChange: (url: string) => void;
  label: string;
}

export function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

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
        <img src={value} alt="Preview" className="mt-2 h-32 w-auto object-cover rounded-md border border-gray-300" />
      )}
    </div>
  );
}