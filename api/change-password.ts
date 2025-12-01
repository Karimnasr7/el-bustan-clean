// src/api/change-password.ts
import { getConnection } from './db.js';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const sql = await getConnection();
    
    // استخدام الأسماء الصحيحة مع الشرطة السفلية
    const { rows } = await sql`
      SELECT id, password_hash
      FROM admin_users
      LIMIT 1;
    `;

    // طباعة للتأكد من القيم (اختياري، يمكنك حذفها لاحقاً)
    console.log('[change-password] DB password:', rows[0]?.password_hash);
    console.log('[change-password] entered  :', currentPassword); // هذا الآن سيوضح أكثر
    console.log('[change-password] entered current password:', currentPassword);

    if (rows.length === 0 || rows[0].password_hash !== currentPassword) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    // تحديث كلمة المرور باستخدام الأسماء الصحيحة
    await sql`
      UPDATE admin_users
      SET password_hash = ${newPassword}
      WHERE id = ${rows[0].id};
    `;

    return Response.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('[change-password] error:', err);
    return Response.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}