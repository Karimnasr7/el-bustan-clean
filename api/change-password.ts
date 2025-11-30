// api/change-password.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Current and new passwords are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const userResult = await sql`SELECT password_hash FROM admin_users LIMIT 1`;

    if (userResult.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Admin user not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const storedHash = userResult.rows[0].password_hash;
    const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, storedHash);

    if (!isCurrentPasswordCorrect) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const saltRounds = 10;
    const newHashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await sql`UPDATE admin_users SET password_hash = ${newHashedPassword}`;

    return new Response(JSON.stringify({ message: 'Password changed successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Change password error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}