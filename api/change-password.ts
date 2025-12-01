// /api/change-password.ts (النسخة النهائية والآمنة بعد التحديث اليدوي)
import { getConnection } from './db.js';
import bcrypt from 'bcrypt'; 

const saltRounds = 10; 

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const sql = await getConnection();
    
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`;

    if (rows.length === 0) {
      return Response.json({ error: 'لم يتم العثور على مستخدم إداري' }, { status: 401 });
    }

    // 🛑 المقارنة الآمنة والمباشرة الآن (لأن القيمة مشفرة يدوياً)
    const dbHash = rows[0].password_hash;
    const isMatch = await bcrypt.compare(currentPassword, dbHash); 
    // لا نحتاج لـ isMatch = currentPassword === dbHash بعد الآن

    if (!isMatch) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    // 🔑 التشفير: تجزئة كلمة المرور الجديدة 
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // تحديث كلمة المرور 
    await sql`
      UPDATE admin_users
      SET password_hash = ${newHashedPassword}
      WHERE id = ${rows[0].id};
    `;

    return Response.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('[change-password] error:', err);
    return Response.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}