// src/api/change-password.ts (النسخة النهائية لتطبيق التشفير)
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

    // 🛑 المقارنة المؤقتة: إذا لم تكن القيمة المخزنة تجزئة bcrypt، قارنها كنص عادي للمرة الأولى فقط.
    const dbHash = rows[0].password_hash;
    let isMatch = false;
    
    // التحقق مما إذا كانت القيمة المخزنة تبدو كتجزئة bcrypt (تبدأ بـ $2a$)
    if (dbHash.startsWith('$2a$') || dbHash.startsWith('$2b$')) {
        // إذا كانت تجزئة: استخدم المقارنة الآمنة (bcrypt)
        isMatch = await bcrypt.compare(currentPassword, dbHash);
    } else {
        // إذا كانت نص عادي (كما هي حالياً): قارنها كنص عادي لمرة واحدة
        isMatch = currentPassword === dbHash;
    }

    if (!isMatch) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    // 🔑 التشفير: تجزئة كلمة المرور الجديدة في كل الأحوال
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // تحديث كلمة المرور الآن بالقيمة المشفرة الجديدة
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