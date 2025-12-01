// /api/login.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt'; // <--- استيراد bcrypt

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const sql = await getConnection();
    
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`; 

    if (rows.length === 0) {
      return Response.json({ error: 'لم يتم العثور على مستخدم إداري' }, { status: 401 });
    }

    const dbHash = rows[0].password_hash;
    const isMatch = await bcrypt.compare(password.trim(), dbHash);
    

    console.log(`[login] Attempting login. Match: ${isMatch}`);

    if (!isMatch) {
      return Response.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
    }

    return Response.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
  } catch (err) {
    console.error('[login] error:', err);
    return Response.json({ error: 'فشل تسجيل الدخول' }, { status: 500 });
  }
}