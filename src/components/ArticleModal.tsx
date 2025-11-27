// src/components/ArticleModal.tsx
import { motion, AnimatePresence } from "framer-motion"; 
import { X, Clock, User } from "lucide-react";
import { ImageWithFallback } from "./images/ImageWithFallback";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleData: {
    title: string;
    full_content: string;
    image: string;
    author: string;
    readTime: string;
  } | null;
}

export function ArticleModal({ isOpen, onClose, articleData }: ArticleModalProps) {
  if (!isOpen || !articleData) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-gray-800 text-white rounded-full p-3 z-10"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Content */}
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-2/5 h-full">
                <ImageWithFallback
                    src={articleData.image}
                    alt={articleData.title}
                    className="w-full h-full object-cover"
                />
                </div>

                {/* Text Content */}
                <div className="lg:w-3/5 p-6 sm:p-8 md:p-12">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                    {articleData.title}
                  </h2>

                  {/* Meta */}
                  <div className="flex items-center gap-6 mb-8 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{articleData.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{articleData.readTime}</span>
                    </div>
                  </div>

                  {/* Full Content */}
                  <div className="prose prose-invert text-gray-300 leading-relaxed">
                    {articleData.full_content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}