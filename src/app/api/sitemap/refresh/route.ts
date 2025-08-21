
export async function POST(request: Request) {
  try {
    const { urls } = await request.json().catch(() => ({}));
    const sitemapUrl = 'https://www.aldeyarksa.tech/sitemap.xml';
    const results: Array<{service: string, success: boolean, error?: string, response?: string}> = [];

    // قائمة شاملة لمحركات البحث العالمية والعربية
    const searchEngines = [
      {
        name: 'Google',
        url: `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        method: 'GET'
      },
      {
        name: 'Bing', 
        url: `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        method: 'GET'
      },
      {
        name: 'Yandex',
        url: `https://webmaster.yandex.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`,
        method: 'GET'
      },
      {
        name: 'Baidu',
        url: `http://ping.baidu.com/ping/RPC2`,
        method: 'POST',
        data: sitemapUrl
      }
    ];

    // إرسال ping لجميع محركات البحث
    const pingPromises = searchEngines.map(async (engine) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 ثانية

        const fetchOptions: RequestInit = {
          method: engine.method,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; Aldeyar-SEO-Bot/2.0; +https://www.aldeyarksa.tech)',
            'Accept': 'application/xml, text/xml, text/plain, */*',
            'Accept-Language': 'ar,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
          },
          signal: controller.signal
        };

        if (engine.method === 'POST' && engine.data) {
          fetchOptions.headers = {
            ...fetchOptions.headers,
            'Content-Type': 'application/x-www-form-urlencoded',
          };
          fetchOptions.body = `sitemap=${encodeURIComponent(engine.data)}`;
        }

        const response = await fetch(engine.url, fetchOptions);
        clearTimeout(timeoutId);

        const responseText = await response.text().catch(() => 'تم الإرسال بنجاح');
        
        results.push({
          service: engine.name,
          success: response.ok,
          error: response.ok ? undefined : `HTTP ${response.status}: ${response.statusText}`,
          response: response.ok ? responseText.substring(0, 200) : undefined
        });
      } catch (error) {
        results.push({
          service: engine.name,
          success: false,
          error: error instanceof Error ? error.message : 'خطأ غير معروف'
        });
      }
    });

    // انتظار جميع الطلبات
    await Promise.allSettled(pingPromises);

    // إشعار IndexNow API للفهرسة السريعة
    try {
      const indexNowKey = process.env.INDEXNOW_KEY || 'aldeyar-indexnow-key-2024';
      const urlsToSubmit = urls || [
        sitemapUrl,
        'https://www.aldeyarksa.tech/',
        'https://www.aldeyarksa.tech/portfolio/',
        'https://www.aldeyarksa.tech/services/mazallat/',
        'https://www.aldeyarksa.tech/services/pergolas/',
        'https://www.aldeyarksa.tech/services/sawater/',
        'https://www.aldeyarksa.tech/articles/'
      ];

      const indexNowResponse = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'Aldeyar-IndexNow-Bot/2.0'
        },
        body: JSON.stringify({
          host: 'www.aldeyarksa.tech',
          key: indexNowKey,
          keyLocation: `https://www.aldeyarksa.tech/${indexNowKey}.txt`,
          urlList: urlsToSubmit
        })
      });

      results.push({
        service: 'IndexNow (Microsoft/Yandex)',
        success: indexNowResponse.ok || indexNowResponse.status === 200,
        error: indexNowResponse.ok ? undefined : `HTTP ${indexNowResponse.status}`,
        response: indexNowResponse.ok ? `تم إشعار ${urlsToSubmit.length} رابط` : undefined
      });
    } catch (error) {
      results.push({
        service: 'IndexNow',
        success: false,
        error: error instanceof Error ? error.message : 'فشل في IndexNow'
      });
    }

    // إشعار Google Search Console API (إضافي)
    try {
      const searchConsoleResponse = await fetch(`https://www.googleapis.com/indexing/v3/urlNotifications:publish`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.GOOGLE_API_TOKEN || ''}`
        },
        body: JSON.stringify({
          url: sitemapUrl,
          type: 'URL_UPDATED'
        })
      });

      if (process.env.GOOGLE_API_TOKEN) {
        results.push({
          service: 'Google Search Console API',
          success: searchConsoleResponse.ok,
          error: searchConsoleResponse.ok ? undefined : `HTTP ${searchConsoleResponse.status}`
        });
      }
    } catch (error) {
      // تجاهل خطأ Google API إذا لم يكن مكون
    }

    // حساب الإحصائيات
    const successCount = results.filter(r => r.success).length;
    const totalCount = results.length;

    return Response.json({
      success: successCount > 0,
      message: `تم إشعار ${successCount} من أصل ${totalCount} محرك بحث بنجاح`,
      timestamp: new Date().toISOString(),
      sitemap_url: sitemapUrl,
      results: results,
      summary: {
        total: totalCount,
        successful: successCount,
        failed: totalCount - successCount,
        successRate: Math.round((successCount / totalCount) * 100)
      },
      seo_impact: {
        estimated_indexing_time: '24-72 ساعة',
        coverage: 'محركات البحث العالمية والعربية',
        priority: 'عالية'
      }
    }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json; charset=utf-8',
        'X-SEO-Status': 'success'
      }
    });

  } catch (error) {
    console.error('خطأ في إشعار محركات البحث:', error);
    return Response.json({
      success: false,
      error: 'فشل في إشعار محركات البحث',
      timestamp: new Date().toISOString(),
      details: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, {
      status: 500,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}

// GET method للاختبار والمراقبة
export async function GET() {
  return Response.json({
    message: 'Sitemap Refresh API v2.0 - جاهز للعمل',
    sitemap_url: 'https://www.aldeyarksa.tech/sitemap.xml',
    last_updated: new Date().toISOString(),
    available_methods: ['POST', 'GET'],
    supported_engines: [
      'Google Search',
      'Bing/Microsoft',
      'Yandex',
      'Baidu',
      'IndexNow API'
    ],
    usage: {
      endpoint: '/api/sitemap/refresh',
      method: 'POST',
      body: '{"urls": ["array of specific URLs to index"]}'
    },
    seo_features: [
      'فهرسة فورية',
      'دعم محركات البحث المتعددة',
      'تقارير مفصلة',
      'معدل نجاح عالي'
    ]
  }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
