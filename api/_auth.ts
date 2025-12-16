// api/_auth.ts
import { jwtVerify } from 'jose';

// جلب السكرت كي من متغيرات البيئة في فيرسل
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function verifyAuth(request: Request) {
  try {
    // 1. جلب الهيدر الذي يحتوي على التوكن
    const authHeader = request.headers.get('authorization');
    
    // 2. التأكد من أن الهيدر يبدأ بكلمة Bearer وبعدها التوكن
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false;
    }

    const token = authHeader.split(' ')[1];

    // 3. التحقق من صحة التوكن وفك شفرته باستخدام السكرت كي
    await jwtVerify(token, JWT_SECRET);
    
    // إذا وصلنا هنا، يعني التوكن سليم 100%
    return true;
  } catch (err) {
    // إذا التوكن منتهي أو مزور أو السكرت كي خطأ
    console.error('Auth verification failed:', err);
    return false;
  }
}