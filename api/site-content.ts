// api/site-content.ts
import { getConnection } from './db.js';  

interface SiteContentRow {
  content_key: string;
  content_value: string;
}

export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`SELECT content_key, content_value FROM site_content;`;
    
    const contentRows = rows as SiteContentRow[];

    const contentObject = contentRows.reduce((acc: Record<string, string>, row: SiteContentRow) => {
      acc[row.content_key] = row.content_value;
      return acc;
    }, {});
    
    return new Response(JSON.stringify(contentObject), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch site content:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch site content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}