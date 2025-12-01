// api/change-password.ts
import { getConnection } from './db.js';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const sql = await getConnection();
    // تأكد أننا نأخذ السجل الصحيح (يمكنك استخدام WHERE id = 1 إذا كنت تدير سجلاً واحداً)
    const { rows } = await sql`
      SELECT id, password_hash
      FROM   admin_users
      LIMIT 1;
    `;

    // طباعة مؤقتة للتأكد من القيمة الفعلية
    console.log('[change-password] DB rows  :', rows);
    console.log('[change-password] entered  :', currentPassword);
    console.log('[change-password] DB hash  :', rows[0]?.password_hash);

    if (rows.length === 0 || rows[0].password_hash !== currentPassword) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    // تحديث السجل نفسه الذي قرأناه
    await sql`
      UPDATE admin_users
      SET    password_hash = ${newPassword}
      WHERE  id = ${rows[0].id};
    `;

    return Response.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('[change-password] error:', err);
    return Response.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}