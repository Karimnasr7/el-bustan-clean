// src/admin/types/index.ts

// هذه هي الواجهة المركزية والوحيدة لـ Article
// كل الملفات الأخرى ستستخدم هذا التعريف
export interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  readtime: string;
  full_content: string;
}