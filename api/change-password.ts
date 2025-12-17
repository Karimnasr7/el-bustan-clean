import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; 
import bcrypt from 'bcrypt'; 

const saltRounds = 10;

export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'يجب تسجيل الدخول أولاً لتغيير كلمة المرور' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { currentPassword, newPassword } = await request.json();
    const sql = await getConnection();
    
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`;

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'لم يتم العثور على مستخدم إداري' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const dbHash = rows[0].password_hash;
    const isMatch = await bcrypt.compare(currentPassword, dbHash); 
    
    if (!isMatch) {
      return new Response(JSON.stringify({ error: 'كلمة المرور الحالية غير صحيحة' }), { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await sql`UPDATE admin_users SET password_hash = ${newHashedPassword} WHERE id = ${rows[0].id};`;

    return new Response(JSON.stringify({ message: 'تم تغيير كلمة المرور بنجاح' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('[change-password] error:', err);
    return new Response(JSON.stringify({ error: 'فشل تغيير كلمة المرور' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}