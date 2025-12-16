// api/services.ts
import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; // استيراد المراقب

// GET: جلب جميع الخدمات (متاحة للجميع)
export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`SELECT id, title, description, icon_name, color, sort_order FROM services ORDER BY sort_order ASC, id ASC;`;
    
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

// POST: إنشاء خدمة جديدة (محمي )
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
    const { title, description, icon_name, color, sort_order } = body;

    if (!title || !description || !icon_name || !color) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO services (title, description, icon_name, color, sort_order)
      VALUES (${title}, ${description}, ${icon_name}, ${color}, ${sort_order})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create service:', error);
    return new Response(JSON.stringify({ error: 'Failed to create service' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: تعديل خدمة موجودة (محمي )
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
    const { id, title, description, icon_name, color, sort_order } = body;

    if (!id || !title || !description || !icon_name || !color) {
      return new Response(JSON.stringify({ error: 'Missing required fields or ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE services
      SET title = ${title}, description = ${description}, icon_name = ${icon_name}, color = ${color}, sort_order = ${sort_order}
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Service not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update service:', error);
    return new Response(JSON.stringify({ error: 'Failed to update service' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: حذف خدمة (محمي )
// في ملف api/services.ts - دالة DELETE فقط
export async function DELETE(request: Request) {
  try {
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing service ID' }), { status: 400 });
    }

    const sql = await getConnection();
    // تعديل بسيط هنا لضمان التوافق
    await sql`DELETE FROM services WHERE id = ${id}`;
    
    return new Response(JSON.stringify({ message: 'Service deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Failed to delete service:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete service' }), { status: 500 });
  }
}