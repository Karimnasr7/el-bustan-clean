// src/lib/db.ts
import { sql } from '@vercel/postgres';

// هذا الكود يقوم بتصدير دالة للاتصال بقاعدة البيانات.
// المكتبة ستستخدم متغير البيئة POSTGRES_URL الذي أضافه Vercel تلقائياً.
export async function getConnection() {
  return sql;
}