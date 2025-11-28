// api/before-after-gallery.ts
import { getConnection } from './db.js';

export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`
      SELECT id, title, before_image_url, after_image_url 
      FROM before_after_gallery 
      WHERE is_active = true 
      ORDER BY sort_order ASC, id ASC
    `;
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch before/after gallery items:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch gallery items' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}