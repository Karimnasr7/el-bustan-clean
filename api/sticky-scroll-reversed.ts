import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js';

// GET: جلب البيانات (متاحة للعامة)
export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`
      SELECT id, title, description, image_url, sort_order 
      FROM sticky_scroll_reversed_content 
      WHERE is_active = true 
      ORDER BY sort_order ASC
    `;
    
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch sticky scroll reversed content:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch content' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// POST: إنشاء عنصر جديد (محمي )
export async function POST(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, description, image_url, sort_order = 0 } = body;

    if (!title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO sticky_scroll_reversed_content (title, description, image_url, sort_order)
      VALUES (${title}, ${JSON.stringify(description)}, ${image_url}, ${sort_order})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create item:', error);
    return new Response(JSON.stringify({ error: 'Failed to create item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: تعديل عنصر موجود (محمي )
export async function PUT(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { id, title, description, image_url, sort_order } = body;

    if (!id || !title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE sticky_scroll_reversed_content
      SET title = ${title}, 
          description = ${JSON.stringify(description)}, 
          image_url = ${image_url}, 
          sort_order = ${sort_order}
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
    console.error('Failed to update item:', error);
    return new Response(JSON.stringify({ error: 'Failed to update item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: حذف عنصر (محمي)
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing item ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    // تنفيذ الحذف مباشرة لضمان العمل على Neon/Vercel
    await sql`DELETE FROM sticky_scroll_reversed_content WHERE id = ${id}`;
    
    return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete item:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete item' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}