
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkUrls = searchParams.get('urls')?.split(',') || [];
  
  const defaultUrls = [
    'https://www.aldeyarksa.tech/',
    'https://www.aldeyarksa.tech/services/mazallat/',
    'https://www.aldeyarksa.tech/services/pergolas/',
    'https://www.aldeyarksa.tech/services/sawater/',
    'https://www.aldeyarksa.tech/portfolio/',
    'https://www.aldeyarksa.tech/articles/'
  ];

  const urlsToCheck = checkUrls.length > 0 ? checkUrls : defaultUrls;
  const results = [];

  for (const url of urlsToCheck) {
    try {
      // فحص فهرسة Google
      const googleCheck = await fetch(`https://www.google.com/search?q=site:${encodeURIComponent(url)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)'
        }
      });

      // فحص فهرسة Bing
      const bingCheck = await fetch(`https://www.bing.com/search?q=site:${encodeURIComponent(url)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEO-Checker/1.0)'
        }
      });

      results.push({
        url,
        google_indexed: googleCheck.ok && !googleCheck.url.includes('no-results'),
        bing_indexed: bingCheck.ok && !bingCheck.url.includes('no-results'),
        last_checked: new Date().toISOString(),
        status: googleCheck.ok && bingCheck.ok ? 'good' : 'needs_attention'
      });

    } catch (error) {
      results.push({
        url,
        google_indexed: 'unknown',
        bing_indexed: 'unknown',
        error: error instanceof Error ? error.message : 'خطأ في الفحص',
        last_checked: new Date().toISOString(),
        status: 'error'
      });
    }
  }

  const summary = {
    total_urls: results.length,
    google_indexed: results.filter(r => r.google_indexed === true).length,
    bing_indexed: results.filter(r => r.bing_indexed === true).length,
    needs_attention: results.filter(r => r.status === 'needs_attention').length,
    last_update: new Date().toISOString()
  };

  return Response.json({
    success: true,
    summary,
    results,
    recommendations: [
      'استخدم /api/sitemap/refresh لإشعار محركات البحث',
      'تأكد من تحديث المحتوى بانتظام',
      'راجع Google Search Console للمزيد من التفاصيل'
    ]
  }, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800' // 30 دقيقة
    }
  });
}
