// api/services.ts (نسخة اختبار)

export default async function handler(_request: Request) {
  console.log("API function started!"); // هذا السجل سيساعدنا

  try {
    // بدلاً من الاتصال بقاعدة البيانات، سنرجع بيانات ثابتة للاختبار
    const staticData = [
      {
        "id": 1,
        "title": "تنظيف شامل (اختبار)",
        "description": "هذا وصف اختبار للتحقق من أن الـ API يعمل",
        "icon_name": "Sparkles",
        "color": "cyan"
      },
      {
        "id": 2,
        "title": "تعقيم بالبخار (اختبار)",
        "description": "هذا وصف اختبار آخر",
        "icon_name": "Droplets",
        "color": "blue"
      }
    ];

    console.log("Returning static data successfully");
    
    return new Response(JSON.stringify(staticData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("An error occurred in the test API:", error);
    return new Response(JSON.stringify({ error: 'Test API failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}