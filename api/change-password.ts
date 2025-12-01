// /api/change-password.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt'; 

const saltRounds = 10; // مستوى الأمان القياسي للتشفير

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const sql = await getConnection();
    
    // [Fix: SQL Syntax Error] - استعلام SELECT مضغوط في سطر واحد
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`;

    if (rows.length === 0) {
      return Response.json({ error: 'لم يتم العثور على مستخدم إداري' }, { status: 401 });
    }

    // 🛑 المقارنة الآمنة: يجب أن تكون القيمة الزفت  المخزنة تجزئة الآن (بسبب التحديث اليدوي المفروض يعني)
    const dbHash = rows[0].password_hash;
    const isMatch = await bcrypt.compare(currentPassword, dbHash); 
    
    if (!isMatch) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // [Fix: SQL Syntax Error] - استعلام UPDATE مضغوط في سطر واحد
    await sql`UPDATE admin_users SET password_hash = ${newHashedPassword} WHERE id = ${rows[0].id};`;

    return Response.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('[change-password] error:', err);
    return Response.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}