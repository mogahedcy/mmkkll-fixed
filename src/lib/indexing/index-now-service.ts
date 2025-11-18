/**
 * خدمة IndexNow المحسّنة - إشعار محركات البحث بالتحديثات الفورية
 * 
 * محركات البحث المدعومة:
 * - Bing, Yandex, Seznam.cz, Naver, Yep
 * ملاحظة: Google لا يدعم IndexNow (استخدم Google Indexing API بدلاً من ذلك)
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'aldeyarksa-indexnow-key-2024';

export interface IndexNowResult {
  success: boolean;
  status: number;
  message: string;
  urls_submitted: number;
  timestamp: string;
}

/**
 * إرسال عنوان URL واحد إلى IndexNow
 */
export async function submitToIndexNow(url: string): Promise<IndexNowResult> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  return submitMultipleToIndexNow([fullUrl]);
}

/**
 * إرسال عدة عناوين URL إلى IndexNow (حتى 10,000 URL)
 */
export async function submitMultipleToIndexNow(urls: string[]): Promise<IndexNowResult> {
  try {
    const fullUrls = urls.map(url => 
      url.startsWith('http') ? url : `${BASE_URL}${url}`
    );

    const payload = {
      host: new URL(BASE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/indexnow-key.txt`,
      urlList: fullUrls
    };

    console.log(`📤 إرسال ${fullUrls.length} رابط إلى IndexNow...`);

    const response = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'AlDeyar-Auto-Indexing/2.0 (+https://www.aldeyarksa.tech)'
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    const result: IndexNowResult = {
      success: response.ok || response.status === 202,
      status: response.status,
      message: '',
      urls_submitted: fullUrls.length,
      timestamp: new Date().toISOString()
    };

    if (result.success) {
      result.message = `تم إرسال ${fullUrls.length} رابط بنجاح إلى IndexNow (Bing, Yandex, Naver)`;
      console.log(`✅ ${result.message}`);
    } else {
      result.message = `فشل الإرسال - HTTP ${response.status}`;
      console.warn(`⚠️ ${result.message}`);
    }

    return result;

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
    console.error('❌ خطأ في IndexNow:', errorMessage);
    
    return {
      success: false,
      status: 0,
      message: `خطأ في الاتصال: ${errorMessage}`,
      urls_submitted: 0,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * إرسال إشعار حذف URL من IndexNow
 */
export async function deleteFromIndexNow(url: string): Promise<IndexNowResult> {
  // IndexNow doesn't have a specific delete endpoint
  // Just submit the deleted URL so search engines can discover it's 404
  return submitToIndexNow(url);
}
