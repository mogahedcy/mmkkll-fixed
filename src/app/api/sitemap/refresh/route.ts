export async function POST(request: Request) {
  try {
    const { urls } = await request.json().catch(() => ({}));
    const sitemapUrl = 'https://aldeyarksa.tech/sitemap.xml';
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
        name: 'IndexNow (Microsoft/Yandex)',
        url: 'https://api.indexnow.org/indexnow',
        method: 'POST',
        data: {
          host: 'aldeyarksa.tech',
          key: 'aldeyarksa-indexnow-key-2024',
          keyLocation: 'https://aldeyarksa.tech/aldeyarksa-indexnow-key-2024.txt',
          urlList: urls || [
            'https://aldeyarksa.tech/',
            'https://aldeyarksa.tech/services/mazallat/',
            'https://aldeyarksa.tech/services/pergolas/',
            'https://aldeyarksa.tech/services/sawater/',
            'https://aldeyarksa.tech/portfolio/',
            'https://aldeyarksa.tech/articles/'
          ]
        }
      }
    ];

    // إرسال ping لجميع محركات البحث
    const pingPromises = searchEngines.map(async (engine) => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 ثواني timeout

        let response;
        if (engine.method === 'POST' && engine.data) {
          response = await fetch(engine.url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent': 'aldeyarksa.tech SEO-Bot/1.0'
            },
            body: JSON.stringify(engine.data),
            signal: controller.signal
          });
        } else {
          response = await fetch(engine.url, {
            method: 'GET',
            headers: {
              'User-Agent': 'aldeyarksa.tech SEO-Bot/1.0'
            },
            signal: controller.signal
          });
        }

        clearTimeout(timeoutId);

        results.push({
          service: engine.name,
          success: response.ok,
          response: response.ok ? 'تم الإشعار بنجاح' : `خطأ: ${response.status}`
        });

      } catch (error) {
        results.push({
          service: engine.name,
          success: false,
          error: error instanceof Error ? error.message : 'خطأ غير معروف'
        });
      }
    });

    await Promise.all(pingPromises);

    const successful = results.filter(r => r.success).length;
    const total = results.length;

    // إنشاء ملف IndexNow key
    try {
      // يمكن إضافة منطق لإنشاء ملف المفتاح هنا إذا لزم الأمر
    } catch (keyError) {
      console.error('خطأ في إنشاء مفتاح IndexNow:', keyError);
    }

    return Response.json({
      success: true,
      message: `تم إشعار ${successful} من أصل ${total} محرك بحث بنجاح`,
      timestamp: new Date().toISOString(),
      sitemap_url: sitemapUrl,
      summary: {
        total,
        successful,
        failed: total - successful
      },
      details: results,
      next_steps: [
        'راقب Google Search Console خلال الـ 24-48 ساعة القادمة',
        'تحقق من Bing Webmaster Tools للحصول على التحديثات',
        'استخدم /api/seo/indexing-status للتحقق من حالة الفهرسة',
        successful < total ? 'أعد المحاولة للمحركات التي فشلت' : 'جميع المحركات تم إشعارها بنجاح'
      ]
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Timestamp': new Date().toISOString(),
        'X-Success-Rate': `${Math.round((successful/total) * 100)}%`
      }
    });

  } catch (error) {
    console.error('خطأ في إشعار محركات البحث:', error);

    return Response.json({
      success: false,
      message: 'فشل في إشعار محركات البحث',
      error: error instanceof Error ? error.message : 'خطأ غير معروف',
      timestamp: new Date().toISOString(),
      recommendations: [
        'تأكد من اتصال الإنترنت',
        'تحقق من صحة رابط الموقع',
        'أعد المحاولة بعد بضع دقائق',
        'راجع لوحة المطور للمزيد من التفاصيل'
      ]
    }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-Error': 'sitemap-refresh-failed'
      }
    });
  }
}

export async function GET() {
  return Response.json({
    message: 'استخدم POST method لإشعار محركات البحث',
    endpoints: {
      refresh_sitemap: 'POST /api/sitemap/refresh',
      check_indexing: 'GET /api/seo/indexing-status',
      monitor_seo: '/seo-monitor'
    },
    documentation: 'https://aldeyarksa.tech/api-docs'
  });
}