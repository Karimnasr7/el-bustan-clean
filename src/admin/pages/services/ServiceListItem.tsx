// src/admin/pages/services/ServiceListItem.tsx
import type { Service } from '../../types';

interface ServiceListItemProps {
  service: Service;
  onEdit: (service: Service) => void;
  onDelete: (id: number) => void;
}

export function ServiceListItem({ service, onEdit, onDelete }: ServiceListItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{service.title}</h3>
        <p className="text-sm text-gray-600">الأيقونة: {service.icon_name} • اللون: {service.color}</p>
      </div>
      <div className="flex space-x-2 space-x-reverse">
        <button
          onClick={() => onEdit(service)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          تعديل
        </button>
        <button
          onClick={() => onDelete(service.id)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
        >
          حذف
        </button>
      </div>
    </div>
  );
}