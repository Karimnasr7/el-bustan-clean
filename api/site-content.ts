// api/site-content.ts
import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; // إضافة المراقب

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

export async function PUT(request: Request) {
  try {
    //  التحقق من الهوية أولاً
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بتعديل محتوى الموقع' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { content_key, content_value } = body;

    if (!content_key || content_value === undefined) {
      return new Response(JSON.stringify({ error: 'Missing content_key or content_value' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO site_content (content_key, content_value) 
      VALUES (${content_key}, ${content_value})
      ON CONFLICT (content_key) 
      DO UPDATE SET content_value = EXCLUDED.content_value
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update site content:', error);
    return new Response(JSON.stringify({ error: 'Failed to update site content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}