/**
 * نظام الفهرسة التلقائية - يرسل التحديثات إلى محركات البحث تلقائياً
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'aldeyarksa-indexnow-key-2024';

export interface IndexingResult {
  success: boolean;
  submitted_urls: string[];
  engines: {
    indexnow: { success: boolean; error?: string };
    google: { success: boolean; error?: string };
  };
}

/**
 * إرسال عنوان URL واحد للفهرسة الفورية
 */
export async function submitUrlForIndexing(url: string): Promise<IndexingResult> {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  const result: IndexingResult = {
    success: false,
    submitted_urls: [fullUrl],
    engines: {
      indexnow: { success: false },
      google: { success: false }
    }
  };

  // إرسال إلى IndexNow (Bing, Yandex, Seznam.cz, Naver)
  try {
    const indexNowPayload = {
      host: new URL(BASE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/indexnow-key.txt`,
      urlList: [fullUrl]
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'AlDeyar-Auto-Indexing/2.0'
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (response.ok || response.status === 202) {
      result.engines.indexnow.success = true;
      console.log('✅ تم إرسال الرابط إلى IndexNow:', fullUrl);
    } else {
      result.engines.indexnow.error = `HTTP ${response.status}`;
      console.warn('⚠️ فشل الإرسال إلى IndexNow:', response.status, response.statusText);
    }
  } catch (error: any) {
    result.engines.indexnow.error = error.message;
    console.error('❌ خطأ في IndexNow:', error);
  }

  result.success = result.engines.indexnow.success;

  return result;
}

/**
 * إرسال عدة عناوين URL للفهرسة دفعة واحدة
 */
export async function submitMultipleUrlsForIndexing(urls: string[]): Promise<IndexingResult> {
  const fullUrls = urls.map(url => 
    url.startsWith('http') ? url : `${BASE_URL}${url}`
  );
  
  const result: IndexingResult = {
    success: false,
    submitted_urls: fullUrls,
    engines: {
      indexnow: { success: false },
      google: { success: false }
    }
  };

  // إرسال إلى IndexNow
  try {
    const indexNowPayload = {
      host: new URL(BASE_URL).hostname,
      key: INDEXNOW_KEY,
      keyLocation: `${BASE_URL}/indexnow-key.txt`,
      urlList: fullUrls
    };

    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'AlDeyar-Auto-Indexing/2.0'
      },
      body: JSON.stringify(indexNowPayload)
    });

    if (response.ok || response.status === 202) {
      result.engines.indexnow.success = true;
      console.log(`✅ تم إرسال ${fullUrls.length} رابط إلى IndexNow`);
    } else {
      result.engines.indexnow.error = `HTTP ${response.status}`;
      console.warn('⚠️ فشل الإرسال إلى IndexNow:', response.status);
    }
  } catch (error: any) {
    result.engines.indexnow.error = error.message;
    console.error('❌ خطأ في IndexNow:', error);
  }

  result.success = result.engines.indexnow.success;

  return result;
}

/**
 * إرسال مشروع منشور حديثاً للفهرسة
 */
export async function indexNewProject(projectSlug: string): Promise<IndexingResult> {
  const projectUrl = `/portfolio/${projectSlug}`;
  const sitemapUrl = '/sitemap-projects.xml';
  
  const result = await submitMultipleUrlsForIndexing([projectUrl, sitemapUrl]);
  
  console.log(`📝 تم طلب فهرسة المشروع: ${projectSlug}`);
  
  return result;
}

/**
 * إرسال مقال منشور حديثاً للفهرسة
 */
export async function indexNewArticle(articleSlug: string): Promise<IndexingResult> {
  const articleUrl = `/articles/${articleSlug}`;
  const sitemapUrl = '/sitemap-articles.xml';
  
  const result = await submitMultipleUrlsForIndexing([articleUrl, sitemapUrl]);
  
  console.log(`📝 تم طلب فهرسة المقال: ${articleSlug}`);
  
  return result;
}

/**
 * إرسال جميع الصفحات المهمة للفهرسة
 */
export async function indexAllImportantPages(): Promise<IndexingResult> {
  const importantPages = [
    '/',
    '/portfolio',
    '/articles',
    '/services',
    '/about',
    '/contact',
    '/sitemap.xml',
    '/sitemap-index.xml',
    '/sitemap-projects.xml',
    '/sitemap-articles.xml',
    '/sitemap-images.xml'
  ];
  
  const result = await submitMultipleUrlsForIndexing(importantPages);
  
  console.log('📋 تم طلب فهرسة جميع الصفحات المهمة');
  
  return result;
}
