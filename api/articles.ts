// api/articles.ts
import { getConnection } from './db.js';// استيراد الأنواع باستخدام `import type`
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // إضافة رؤوس CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const sql = await getConnection();
    // التأكد من أن id هو نص واحد دائمًا
    const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;

    switch (req.method) {
      case 'GET': {
        const { rows } = await sql`
          SELECT id, title, excerpt, image, author, "readtime", full_content 
          FROM articles 
          ORDER BY id ASC
        `;
        return res.status(200).json(rows);
      }

      case 'POST': {
        const { title, excerpt, full_content, image, author, readtime } = req.body;
        if (!title || !full_content) {
          return res.status(400).json({ error: 'العنوان والمحتوى الكامل مطلوبان' });
        }
        const newArticleResult = await sql`
          INSERT INTO articles (title, excerpt, full_content, image, author, "readtime")
          VALUES (${title}, ${excerpt}, ${full_content}, ${image}, ${author}, ${readtime})
          RETURNING *;
        `;
        // الوصول للصف الأول عبر .rows[0]
        return res.status(201).json(newArticleResult.rows[0]);
      }

      case 'PUT': {
        if (!id) {
          return res.status(400).json({ error: 'معرف المقال (ID) مطلوب للتعديل' });
        }
        const updateData = req.body;
        const updatedArticleResult = await sql`
          UPDATE articles
          SET title = ${updateData.title}, 
              excerpt = ${updateData.excerpt}, 
              full_content = ${updateData.full_content}, 
              image = ${updateData.image}, 
              author = ${updateData.author}, 
              "readtime" = ${updateData.readtime}
          WHERE id = ${id}
          RETURNING *;
        `;
        // التحقق من الطول عبر .rows.length
        if (updatedArticleResult.rows.length === 0) {
          return res.status(404).json({ error: 'المقال غير موجود' });
        }
        return res.status(200).json(updatedArticleResult.rows[0]);
      }

      case 'DELETE': {
        if (!id) {
          return res.status(400).json({ error: 'معرف المقال (ID) مطلوب للحذف' });
        }
        const deleteResult = await sql`DELETE FROM articles WHERE id = ${id};`;
        if (deleteResult.rowCount === 0) {
          return res.status(404).json({ error: 'المقال غير موجود' });
        }
        return res.status(200).json({ message: 'تم حذف المقال بنجاح' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('خطأ في API:', error);
    return res.status(500).json({ error: 'خطأ في الخادم الداخلي' });
  }
}