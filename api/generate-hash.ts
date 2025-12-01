// /api/generate-hash.ts
import bcrypt from 'bcrypt';

// كلمة المرور التي نريد تجزئتها يدوياً
const passwordToHash = 'اي حاجة';
const saltRounds = 10;

export async function GET(_request: Request) {
    try {
        const hash = await bcrypt.hash(passwordToHash, saltRounds);
        
        console.log(`[Hash Generator] The HASH for '${passwordToHash}' is: ${hash}`);
        
        // إظهار التجزئة في المتصفح لنسخها
        return new Response(
            `Successfully generated hash for '${passwordToHash}'. COPY THIS HASH: ${hash}`,
            { status: 200, headers: { 'Content-Type': 'text/plain' } }
        );
    } catch (err) {
        console.error('[Hash Generator] Error:', err);
        return new Response('Error generating hash.', { status: 500 });
    }
}