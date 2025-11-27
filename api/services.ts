// api/services.ts
import { getConnection } from './db.js';
export default async function handler(_request: Request) {  try {
    const sql = await getConnection();
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