// api/animated-slider.ts
import { getConnection } from './db.js';

export async function GET() {
  try {
    const sql = await getConnection();

    // Fetch slides
    const { rows: slides } = await sql`
      SELECT id, img_url, texts 
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
      ctaLink: content.animated_slider_cta_link || '#contact', // Provide a fallback
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