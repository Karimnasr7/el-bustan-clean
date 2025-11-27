// api/services.ts
import { sql } from '@vercel/postgres';

export async function GET(_request: Request) {
  try {
    const { rows } = await sql`SELECT id, title, description, icon_name, color FROM services ORDER BY id ASC;`;
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch services:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch services' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}