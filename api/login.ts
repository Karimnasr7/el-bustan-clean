// /api/login.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose'; 

// تحويل السكرت كي الذي وضعته في فيرسل لتنسيق بايتس
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

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

    if (!isMatch) {
      return Response.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
    }

    // إنشاء التوكن (التصريح)
    const token = await new SignJWT({ userId: rows[0].id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h') // صالح لمدة يوم
      .sign(JWT_SECRET);

    return Response.json({ 
      success: true, 
      token: token, // هذا هو التوكن الذي سيستخدمه الفرونت إند لاحقاً
      message: 'تم تسجيل الدخول بنجاح' 
    });

  } catch (err) {
    console.error('[login] error:', err);
    return Response.json({ error: 'فشل تسجيل الدخول' }, { status: 500 });
  }
}