// src/admin/components/Dashboard.tsx
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Image, 
  Sliders, 
  ArrowUp, 
  Briefcase, 
  ArrowDown, 
  PenTool,
  LogOut,
  Lock 
} from 'lucide-react';

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  // بيانات الأقسام لجعل الكود أنظف وأسهل في الإدارة
  const sections = [
    {
      title: 'المحتوى العام',
      description: 'تعديل النصوص والأرقام العامة.',
      icon: FileText,
      color: 'from-blue-500/20 to-cyan-500/20',
      borderColor: 'group-hover:border-blue-400/50',
      shadowColor: 'group-hover:shadow-blue-400/20',
      link: '/admin/content'
    },
    {
      title: 'معرض قبل وبعد',
      description: 'إدارة صور معرض قبل وبعد.',
      icon: Image,
      color: 'from-green-500/20 to-teal-500/20',
      borderColor: 'group-hover:border-green-400/50',
      shadowColor: 'group-hover:shadow-green-400/20',
      link: '/admin/before-after-gallery'
    },
    {
      title: 'إدارة السلايدر المتحرك',
      description: 'تغيير صور ونصوص السلايدر.',
      icon: Sliders,
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'group-hover:border-purple-400/50',
      shadowColor: 'group-hover:shadow-purple-400/20',
      link: '/admin/animated-slider'
    },
    {
      title: 'إدارة قسم Sticky Scroll',
      description: 'تعديل عناصر هذا القسم.',
      icon: ArrowUp,
      color: 'from-orange-500/20 to-red-500/20',
      borderColor: 'group-hover:border-orange-400/50',
      shadowColor: 'group-hover:shadow-orange-400/20',
      link: '/admin/sticky-scroll'
    },
    {
      title: 'إدارة الخدمات',
      description: 'إضافة، تعديل، أو حذف خدمات الموقع.',
      icon: Briefcase,
      color: 'from-indigo-500/20 to-blue-500/20',
      borderColor: 'group-hover:border-indigo-400/50',
      shadowColor: 'group-hover:shadow-indigo-400/20',
      link: '/admin/services'
    },
    {
      title: 'إدارة قسم Sticky Scroll المعكوس',
      description: 'تعديل عناصر القسم المعكوس.',
      icon: ArrowDown,
      color: 'from-cyan-500/20 to-blue-500/20',
      borderColor: 'group-hover:border-cyan-400/50',
      shadowColor: 'group-hover:shadow-cyan-400/20',
      link: '/admin/sticky-scroll-reversed'
    },
    {
      title: 'إدارة المقالات',
      description: 'إنشاء، تعديل، أو حذف المقالات.',
      icon: PenTool,
      color: 'from-pink-500/20 to-rose-500/20',
      borderColor: 'group-hover:border-pink-400/50',
      shadowColor: 'group-hover:shadow-pink-400/20',
      link: '/admin/articles'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
      {/* خلفية متحركة وأنماط */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #0ea5e9 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #8b5cf6 0%, transparent 50%)`,
        }} />
      </div>

      <div className="relative z-10 p-4 sm:p-8">
        {/* رأس الصفحة */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
            <p className="mt-2 text-gray-400">أهلاً بك. من هنا يمكنك إدارة محتوى الموقع بكل سهولة.</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium py-2 px-4 rounded-lg transition-all duration-300"
          >
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </motion.div>

    <div className="flex flex-col gap-3">
      <Link
        to="/admin/change-password"
        className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium py-2 px-4 rounded-lg transition"
      >
        <Lock className="w-5 h-5" />
        تغيير كلمة المرور
      </Link>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium py-2 px-4 rounded-lg transition"
  >
    <LogOut className="w-5 h-5" />
    تسجيل الخروج
  </button>
</div>
        {/* شبكة الأقسام */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link to={section.link} className="block h-full">
                  <div className={`relative h-full p-6 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl transition-all duration-300 ${section.borderColor} ${section.shadowColor} overflow-hidden`}>
                    {/* تدرج لوني عند التمرير */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${section.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <IconComponent className="w-10 h-10 text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-300 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                        {section.description}
                      </p>
                    </div>

                    {/* تأثير التوهج عند التمرير */}
                    <div className={`absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br ${section.color} rounded-full blur-xl opacity-0 group-hover:opacity-70 transition-opacity duration-500`} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}