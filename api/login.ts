// /api/login.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt'; // <--- استيراد bcrypt

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const sql = await getConnection();
    
    // الاستعلام في سطر واحد لتجنب خطأ 500
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`; 

    if (rows.length === 0) {
      return Response.json({ error: 'لم يتم العثور على مستخدم إداري' }, { status: 401 });
    }

    // 🛑 التغيير الأهم: مقارنة التجزئات
    const dbHash = rows[0].password_hash;
    // مقارنة كلمة المرور المدخلة (password) مع التجزئة المخزنة (dbHash)
    const isMatch = await bcrypt.compare(password.trim(), dbHash);
    
    // (لم نعد بحاجة لـ .trim() على التجزئة المخزنة، ولكن أضفناها للمقارنة المدخلة كإجراء وقائي)

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