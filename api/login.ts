// api/login.ts
import { getConnection } from './db.js';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return new Response(JSON.stringify({ error: 'Password is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const result = await sql`SELECT password_hash FROM admin_users LIMIT 1`;

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Admin user not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const storedHash = result.rows[0].password_hash;
    const isPasswordCorrect = await bcrypt.compare(password, storedHash);

    if (isPasswordCorrect) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}