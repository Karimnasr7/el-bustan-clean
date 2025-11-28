// api/sticky-scroll.ts
import { getConnection } from './db.js';

// GET: جلب جميع عناصر القسم اللاصق
export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`
      SELECT id, title, description, image_url, sort_order 
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

// POST: إنشاء عنصر جديد
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, image_url, sort_order = 0 } = body;

    if (!title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields: title, description, image_url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO sticky_scroll_content (title, description, image_url, sort_order)
      VALUES (${title}, ${JSON.stringify(description)}, ${image_url}, ${sort_order})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create sticky scroll item:', error);
    return new Response(JSON.stringify({ error: 'Failed to create item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: تعديل عنصر موجود
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, description, image_url, sort_order } = body;

    if (!id || !title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields or ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE sticky_scroll_content
      SET title = ${title}, description = ${JSON.stringify(description)}, image_url = ${image_url}, sort_order = ${sort_order}
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update sticky scroll item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: حذف عنصر
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const result = await sql`DELETE FROM sticky_scroll_content WHERE id = ${id}`;
    
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete sticky scroll item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}