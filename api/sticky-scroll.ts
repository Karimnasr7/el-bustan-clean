// api/sticky-scroll.ts
import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; // استيراد المراقب

// GET: جلب جميع عناصر القسم اللاصق (متاح للزوار)
export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`
      SELECT id, title, description, image_url, sort_order, crop, focal 
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

// POST: إنشاء عنصر جديد (محمي 🛡️)
export async function POST(request: Request) {
  try {
    // التحقق من الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { title, description, image_url, sort_order = 0, crop = null, focal = null } = body;

    if (!title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields: title, description, image_url' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO sticky_scroll_content
        (title, description, image_url, sort_order, crop, focal)
      VALUES
        (${title}, ${JSON.stringify(description)}, ${image_url}, ${sort_order},
         ${JSON.stringify(crop)}, ${JSON.stringify(focal)})
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

// PUT: تعديل عنصر موجود (محمي 🛡️)
export async function PUT(request: Request) {
  try {
    // التحقق من الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { id, title, description, image_url, sort_order, crop, focal } = body;

    if (!id || !title || !description || !image_url) {
      return new Response(JSON.stringify({ error: 'Missing required fields or ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE sticky_scroll_content
      SET title = ${title},
          description = ${JSON.stringify(description)},
          image_url = ${image_url},
          sort_order = ${sort_order},
          crop = ${JSON.stringify(crop)},
          focal = ${JSON.stringify(focal)}
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

// DELETE: حذف عنصر (محمي 🛡️)
// استبدل دالة DELETE في ملف api/sticky-scroll.ts بهذا الكود:
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
    // تنفيذ الحذف بدون انتظار rowCount لضمان التوافق مع Vercel/Neon
    await sql`DELETE FROM sticky_scroll_content WHERE id = ${id}`;
    
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