export async function POST() {
  try {
    const sitemapUrl = 'https://www.aldeyarksa.tech/sitemap.xml';
    const results: Array<{service: string, success: boolean, error?: string}> = [];

    // قائمة محركات البحث للإشعار
    const searchEngines = [
      {
        name: 'Google',
        url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      },
      {
        name: 'Bing',
        url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      },
      {
        name: 'Yandex',
        url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
      }
    ];

    // إرسال ping لجميع محركات البحث
    const pingPromises = searchEngines.map(async (engine) => {
      try {
        const response = await fetch(engine.url, {
          method: 'GET',
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Aldeyar-Sitemap-Bot/1.0)'
          },
          timeout: 10000 // 10 ثواني timeout
        });

        results.push({
          service: engine.name,
          success: response.ok,
          error: response.ok ? undefined : `HTTP ${response.status}`
        });
      } catch (error) {
        results.push({
          service: engine.name,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });

    // انتظار اكتمال جميع الطلبات
    await Promise.allSettled(pingPromises);

    // حساب الإحصائيات
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;

    // إضافة إشعار لـ IndexNow (Microsoft/Yandex)
    try {
      const indexNowUrl = 'https://api.indexnow.org/indexnow';
      const indexNowResponse = await fetch(indexNowUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          host: 'www.aldeyarksa.tech',
          key: process.env.INDEXNOW_KEY || 'fallback-key-123',
          keyLocation: `https://www.aldeyarksa.tech/${process.env.INDEXNOW_KEY || 'fallback-key-123'}.txt`,
          urlList: [sitemapUrl]
        })
      });

      results.push({
        service: 'IndexNow',
        success: indexNowResponse.ok,
        error: indexNowResponse.ok ? undefined : `HTTP ${indexNowResponse.status}`
      });
    } catch (error) {
      results.push({
        service: 'IndexNow',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    return Response.json({
      success: successCount > 0,
      message: `تم إشعار ${successCount} من أصل ${totalCount} محرك بحث`,
      timestamp: new Date().toISOString(),
      sitemap_url: sitemapUrl,
      results: results,
      summary: {
        total: results.length,
        successful: results.filter(r => r.success).length,
        failed: results.filter(r => !r.success).length
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('خطأ في إشعار محركات البحث:', error);
    return Response.json({
      success: false,
      error: 'فشل في إشعار محركات البحث',
      timestamp: new Date().toISOString(),
      details: error instanceof Error ? error.message : 'Unknown error'
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  }
}

// إضافة GET method للاختبار
export async function GET() {
  return Response.json({
    message: 'Sitemap refresh API is working',
    sitemap_url: 'https://www.aldeyarksa.tech/sitemap.xml',
    last_updated: new Date().toISOString(),
    available_methods: ['POST'],
    description: 'Use POST to refresh sitemap in search engines'
  }, {
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Content-Type': 'application/json'
    }
  });
}
