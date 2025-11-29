// api/upload.ts

// لسنا بحاجة إلى أي شيء من 'next/server'
// نحن نستخدم واجهات برمجة التطبيقات القياسية للويب (Web APIs)
import { put } from '@vercel/blob';

// الدالة تستخدم 'Request' و 'Response' القياسيين، وهما متاحان في بيئة Vercel
export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      // نستخدم 'Response' القياسي لإرجاع الأخطاء
      return Response.json({ error: 'No file uploaded.' }, { status: 400 });
    }

    // إنشاء اسم فريد للملف
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.name.replace(/\s+/g, '-');
    const uniqueFilename = `uploads/${uniqueSuffix}-${filename}`;

    // رفع الملف إلى Vercel Blob
    // دالة 'put' يمكنها استقبال كائن 'File' مباشرة
    const blob = await put(uniqueFilename, file, {
      access: 'public',
    });

    // إرجاع الرابط العام للملف المرفوع
    return Response.json({ url: blob.url });

  } catch (error) {
    console.error('Error uploading file:', error);
    return Response.json({ error: 'فشل في رفع الملف.' }, { status: 500 });
  }
}