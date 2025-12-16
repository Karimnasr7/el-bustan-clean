// src/components/ArticlesSection.tsx
import { motion } from "framer-motion";
import { ImageWithFallback } from "./images/ImageWithFallback";
import { ArrowLeft, Clock, User } from "lucide-react";
import { useState, useEffect, forwardRef } from "react";
import { ArticleModal } from './ArticleModal';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readtime: string;
  full_content: string;
}

export const ArticlesSection = forwardRef<HTMLDivElement>((_, ref) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleReadMore = (article: Article) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-20 text-white">جاري تحميل المقالات...</div>;
  }

  return (
    <section 
      id="articles" 
      ref={ref}
      className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden"
      style={{ scrollMarginTop: '100px' }} 
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: "linear-gradient(45deg, #00BCD4 25%, transparent 25%, transparent 75%, #00BCD4 75%, #00BCD4), linear-gradient(45deg, #00BCD4 25%, transparent 25%, transparent 75%, #00BCD4 75%, #00BCD4)",
          backgroundSize: "60px 60px",
          backgroundPosition: "0 0, 30px 30px",
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl mb-4 text-white"
            style={{ textShadow: "0 0 30px rgba(0, 188, 212, 0.6)" }}
          >
            نصائح ومقالات
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            اكتشف أحدث النصائح والإرشادات للحفاظ على نظافة مثالية
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-xl group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/20 transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Glow Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{article.readtime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl md:text-2xl text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                    {article.excerpt}
                  </p>

                  {/* Read More Link */}
                  <motion.div
                    className="flex items-center gap-2 text-cyan-400 cursor-pointer"
                    whileHover={{ x: -5 }}
                    onClick={() => handleReadMore(article)} 
                  >
                    <span>اقرأ المزيد</span>
                    <motion.div
                      animate={{ x: [0, -5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Shine Effect */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.8 }}
                />

                {/* Corner Accent */}
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-cyan-400/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <ArticleModal 
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        articleData={selectedArticle}
      />
    </section>
  );
});

ArticlesSection.displayName = 'ArticlesSection';