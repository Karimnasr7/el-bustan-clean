// src/admin/pages/services/ServiceListItem.tsx
import { motion } from 'framer-motion';
import type { Service } from '../../types';
import { Edit, Trash2 } from 'lucide-react';

// أيقونات Lucide React
import {
  Sparkles,
  Droplets,
  Shield,
  Bug,
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  Droplets,
  Shield,
  Bug,
};

// ألوان Tailwind CSS
const colorMap: Record<string, { bg: string; dot: string }> = {
  cyan: { bg: 'from-cyan-500/20 to-blue-500/20', dot: 'bg-cyan-400' },
  blue: { bg: 'from-blue-500/20 to-purple-500/20', dot: 'bg-blue-400' },
  green: { bg: 'from-green-500/20 to-teal-500/20', dot: 'bg-green-400' },
  orange: { bg: 'from-orange-500/20 to-red-500/20', dot: 'bg-orange-400' },
};

interface ServiceListItemProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export function ServiceListItem({ service, onEdit, onDelete }: ServiceListItemProps) {
  const IconComponent = iconMap[service.icon_name];
  const colors = colorMap[service.color] || colorMap.cyan;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-xl"
    >
      {/* خلفية تدرج لوني */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      <div className="relative z-10 p-6">
        {/* الأيقونة */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center group-hover:border-transparent transition-all">
            {IconComponent && <IconComponent className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />}
          </div>
          {/* مؤشر اللون */}
          <div className={`w-4 h-4 rounded-full ${colors.dot}`} />
        </div>

        {/* المحتوى */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 group-hover:text-gray-300 transition-colors">
          {service.description}
        </p>
        <p className="text-xs text-gray-500">الترتيب: {service.sort_order}</p>
        
        {/* الأزرار */}
        <div className="flex justify-end gap-2 mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(service)} 
            className="flex items-center gap-1 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/50 text-yellow-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Edit className="w-4 h-4" />
            تعديل
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onDelete(service.id)} 
            className="flex items-center gap-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-medium py-1.5 px-3 rounded-lg transition-all duration-300 text-sm"
          >
            <Trash2 className="w-4 h-4" />
            حذف
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}