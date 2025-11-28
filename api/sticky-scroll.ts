// api/sticky-scroll.ts
import { getConnection } from './db.js';

export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`
      SELECT id, title, description, image_url 
      FROM sticky_scroll_content 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `;
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch sticky scroll content:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}