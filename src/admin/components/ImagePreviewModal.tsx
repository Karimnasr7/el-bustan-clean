// src/admin/components/ImagePreviewModal.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle } from 'lucide-react';

interface PreviewBoxProps {
    title: string;
    description: string;
    className: string; 
    imageSrc: string;
    objectFit: 'object-cover' | 'object-contain'; 
    aspectRatio: number; 
}

const PreviewBox: React.FC<PreviewBoxProps> = ({ title, description, className, imageSrc, objectFit, aspectRatio }) => {
    
    const isCover = objectFit === 'object-cover';

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-xl p-5 shadow-lg flex flex-col"
        >
            <h4 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-cyan-400" />
                {title}
            </h4>
            <p className="text-sm text-gray-400 mb-4">{description}</p>
            
            <div className="flex-grow">
                <div 
                    className={`relative w-full overflow-hidden ${className}`}
                    style={{ paddingBottom: isCover ? `${(1 / aspectRatio) * 100}%` : 'auto' }} 
                >
                    <img
                        src={imageSrc}
                        alt={`Preview for ${title}`}
                        className={`absolute inset-0 w-full h-full ${objectFit} transition-transform duration-300`} 
                        loading="lazy"
                    />
                </div>
            </div>
            
            <div className={`mt-3 text-xs font-semibold px-3 py-1 rounded-full w-fit ${isCover ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                نمط القص: {isCover ? 'ملء وقص (Cover)' : 'احتواء (Contain)'}
            </div>
        </motion.div>
    );
};

interface ImagePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

export function ImagePreviewModal({ isOpen, onClose, imageUrl }: ImagePreviewModalProps) {
    if (!isOpen) return null;

    const ARTICLE_CARD_ASPECT = 16 / 9; 

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div 
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()} 
                className="bg-gray-900 border border-cyan-800/50 p-6 rounded-2xl shadow-[0_0_40px_rgba(0,188,212,0.2)] w-full max-w-5xl mx-auto max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-8 border-b border-gray-700/50 pb-4">
                    <h3 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                        👁️‍🗨️ معاينة ظهور الصورة
                    </h3>
                    <motion.button 
                        onClick={onClose}
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        className="p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all shadow-md"
                    >
                        <X className="w-6 h-6" />
                    </motion.button>
                </div>

                <p className="text-gray-300 mb-8 border-l-4 border-cyan-500/70 pl-3">
                   للتأكد من أن أهم أجزاء الصورة ستظهر بشكل سليم لأن المتصفح أحياناً يقص من أطرافها.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <PreviewBox
                        title="الحجم عادي"
                        description="تظهر كيف سيتم قص الصورة عند عرضها كبطاقة في قسم المقالات مثلاً (نسبة 16:9 تقريباً)."
                        className="h-64" 
                        imageSrc={imageUrl}
                        objectFit='object-cover'
                        aspectRatio={ARTICLE_CARD_ASPECT}
                    />
                    
                    <PreviewBox
                        title="الصورة المصغرة (Thumbnail)"
                        description="كيف ستظهر الصورة إذا تم استخدامها كصورة مربعة (1:1) في قسم ستيكي مثلاً."
                        className="aspect-square h-64" 
                        imageSrc={imageUrl}
                        objectFit='object-cover'
                        aspectRatio={1 / 1}
                    />

                    <PreviewBox
                        title="صورة ذات احتواء كامل (Contain)"
                        description="تُستخدم في الأماكن التي تتطلب ظهور الصورة بالكامل. إذا ظهرت حواف بيضاء، فهذا يعني أن الصورة لا تتطابق مع نسبة العرض.أصغر يعني."
                        className="h-64"
                        imageSrc={imageUrl}
                        objectFit='object-contain'
                        aspectRatio={16 / 9}
                    />
                    
                </div>
            </motion.div>
        </motion.div>
    );
}