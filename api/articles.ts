// api/articles.ts
import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; // الإضافة الوحيدة هي استيراد الحماية

// GET: جلب جميع المقالات (بدون تغيير حرف واحد)
export async function GET() {
  try {
    const sql = await getConnection();
    const { rows } = await sql`SELECT id, title, excerpt, image, author, readtime, full_content FROM articles ORDER BY id ASC;`;
    
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

// POST: إنشاء مقال جديد (مع إضافة سطر التحقق فقط)
export async function POST(request: Request) {
  try {
    // التحقق من الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإضافة مقالات' }), { status: 401 });
    }

    const body = await request.json();
    const { title, excerpt, image, author, readtime, full_content } = body;

    if (!title || !excerpt || !author || !full_content) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO articles (title, excerpt, image, author, "readtime", full_content)
      VALUES (${title}, ${excerpt}, ${image}, ${author}, ${readtime}, ${full_content})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create article:', error);
    return new Response(JSON.stringify({ error: 'Failed to create article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// PUT: تعديل مقال موجود (مع إضافة سطر التحقق فقط)
export async function PUT(request: Request) {
  try {
    // التحقق من الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بتعديل المقالات' }), { status: 401 });
    }

    const body = await request.json();
    const { id, title, excerpt, image, author, readtime, full_content } = body;

    if (!id || !title || !excerpt || !author || !full_content) {
      return new Response(JSON.stringify({ error: 'Missing required fields or ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE articles
      SET title = ${title}, excerpt = ${excerpt}, image = ${image}, author = ${author}, "readtime" = ${readtime}, full_content = ${full_content}
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update article:', error);
    return new Response(JSON.stringify({ error: 'Failed to update article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// DELETE: حذف مقال (مع إضافة سطر التحقق فقط)
export async function DELETE(request: Request) {
  try {
    // التحقق من الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بحذف المقالات' }), { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing article ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const result = await sql`DELETE FROM articles WHERE id = ${id}`;
    
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Article not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ message: 'Article deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete article:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete article' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}