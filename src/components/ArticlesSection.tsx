import { motion } from "framer-motion";
import { ImageWithFallback } from "./images/ImageWithFallback";
import { ArrowLeft, Clock, User } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "أهمية التنظيف بالبخار للمنزل الصحي",
    excerpt: "اكتشف كيف يمكن للتنظيف بالبخار أن يحول منزلك إلى بيئة صحية خالية من البكتيريا والجراثيم",
    image: "/images/ice2.jpg",
    author: "فريق البستان كلين",
    readTime: "5 دقائق",
  },
  {
    id: 2,
    title: "دليل شامل لتنظيف خزانات المياه",
    excerpt: "تعرف على الخطوات الضرورية لضمان نظافة خزانات المياه وحماية صحة عائلتك",
    image: "/images/ice3.jpg",
    author: "فريق البستان كلين",
    readTime: "7 دقائق",
  },
  {
    id: 3,
    title: "نصائح للحفاظ على نظافة منزلك",
    excerpt: "نصائح عملية وسهلة التطبيق للحفاظ على منزلك نظيفاً ومرتباً على مدار العام",
    image: "/images/ice7.jpg",
    author: "فريق البستان كلين",
    readTime: "4 دقائق",
  },
];

export function ArticlesSection() {
  return (
    <section id="articles" className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
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
                      <span>{article.readTime}</span>
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
    </section>
  );
}