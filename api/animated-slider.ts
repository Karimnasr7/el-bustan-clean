// api/animated-slider.ts
import { getConnection } from './db.js';
import { verifyAuth } from './_auth.js'; // استيراد المراقب

export async function GET() {
  try {
    const sql = await getConnection();

    // Fetch slides
    const { rows: slides } = await sql`
      SELECT id, img_url, texts, sort_order 
      FROM animated_slides 
      WHERE is_active = true 
      ORDER BY sort_order ASC, id ASC
    `;

    // Fetch section content
    const { rows: contentRows } = await sql`
      SELECT content_key, content_value 
      FROM site_content 
      WHERE content_key IN ('animated_slider_title', 'animated_slider_cta_text', 'animated_slider_cta_link')
    `;

    // Convert content rows to a key-value object
    const content = contentRows.reduce((acc, row) => {
      acc[row.content_key] = row.content_value;
      return acc;
    }, {} as Record<string, string>);

    const responseData = {
      slides,
      title: content.animated_slider_title || 'Default Title', 
      ctaText: content.animated_slider_cta_text || 'Contact Us', 
      ctaLink: content.animated_slider_cta_link || '#contact',
    };
    
    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to fetch animated slider data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch slider data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function POST(request: Request) {
  try {
    // 🛡️ فحص الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { img_url, texts, sort_order = 0 } = body;

    if (!img_url || !texts) {
      return new Response(JSON.stringify({ error: 'Missing required fields: img_url, texts' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      INSERT INTO animated_slides (img_url, texts, sort_order)
      VALUES (${img_url}, ${JSON.stringify(texts)}, ${sort_order})
      RETURNING *
    `;
    
    return new Response(JSON.stringify(rows[0]), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to create animated slide:', error);
    return new Response(JSON.stringify({ error: 'Failed to create slide' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(request: Request) {
  try {
    // 🛡️ فحص الهوية
    const isAuthorized = await verifyAuth(request);
    if (!isAuthorized) {
      return new Response(JSON.stringify({ error: 'غير مسموح لك بإجراء هذه العملية' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const body = await request.json();
    const { id, img_url, texts, sort_order } = body;

    if (!id || !img_url || !texts) {
      return new Response(JSON.stringify({ error: 'Missing required fields or ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const { rows } = await sql`
      UPDATE animated_slides
      SET img_url = ${img_url}, texts = ${JSON.stringify(texts)}, sort_order = ${sort_order}
      WHERE id = ${id}
      RETURNING *
    `;
    
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Slide not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify(rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to update animated slide:', error);
    return new Response(JSON.stringify({ error: 'Failed to update slide' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    // 🛡️ فحص الهوية
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
      return new Response(JSON.stringify({ error: 'Missing slide ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const sql = await getConnection();
    const result = await sql`DELETE FROM animated_slides WHERE id = ${id}`;
    
    if (result.rowCount === 0) {
      return new Response(JSON.stringify({ error: 'Slide not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({ message: 'Slide deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Failed to delete animated slide:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete slide' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}