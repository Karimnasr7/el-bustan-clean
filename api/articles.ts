// api/articles.ts
import { getConnection } from './db.js';

export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`SELECT id, title, excerpt, image, author, "readTime", full_content FROM articles ORDER BY id ASC;`;
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch articles:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch articles' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}