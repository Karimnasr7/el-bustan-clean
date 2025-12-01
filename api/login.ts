// api/change-password.ts
import { getConnection } from './db.js';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    const sql = await getConnection();
    const { rows } = await sql`
      SELECT password_hash
      FROM   admin_users
      LIMIT 1;
    `;

    if (rows.length === 0 || rows[0].password_hash !== currentPassword) {
      return Response.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 });
    }

    await sql`
      UPDATE admin_users
      SET    password_hash = ${newPassword}
      WHERE  id = 1;   -- أو WHERE TRUE إذا كان سجل واحد فقط
    `;

    return Response.json({ message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    console.error('Change password error:', err);
    return Response.json({ error: 'فشل تغيير كلمة المرور' }, { status: 500 });
  }
}