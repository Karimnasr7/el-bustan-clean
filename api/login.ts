// /api/login.ts (تعديل إضافة .trim())
import { getConnection } from './db.js';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    const sql = await getConnection();
    
    const { rows } = await sql`SELECT id, password_hash FROM admin_users LIMIT 1;`;

    if (rows.length === 0) {
      return Response.json({ error: 'لم يتم العثور على مستخدم إداري' }, { status: 401 });
    }

    // القيمة المخزنة في قاعدة البيانات
    const dbPassword = rows[0].password_hash;
    
    // إزالة المسافات البيضاء من كلا الجانبين قبل المقارنة
    const cleanedDBPassword = dbPassword.trim();
    const cleanedEnteredPassword = password.trim();

    console.log(`[login] DB Cleaned: '${cleanedDBPassword}'`);
    console.log(`[login] Entered Cleaned: '${cleanedEnteredPassword}'`);


    // المقارنة الآن تتم بعد تنظيف المسافات البيضاء
    if (cleanedDBPassword !== cleanedEnteredPassword) {
      return Response.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 });
    }

    return Response.json({ success: true, message: 'تم تسجيل الدخول بنجاح' });
  } catch (err) {
    console.error('[login] error:', err);
    return Response.json({ error: 'فشل تسجيل الدخول' }, { status: 500 });
  }
}