export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/
Disallow: /_next/
Disallow: /test-*
Disallow: /.well-known/
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*

# Allow specific API endpoints that are safe for indexing
Allow: /api/sitemap/

# Google Bot
User-agent: Googlebot
Allow: /
Crawl-delay: 1
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/

# Bing Bot
User-agent: bingbot
Allow: /
Crawl-delay: 1
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/

# Yandex Bot
User-agent: YandexBot
Allow: /
Crawl-delay: 2
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/

# Baidu Bot
User-agent: Baiduspider
Allow: /
Crawl-delay: 2
Disallow: /dashboard/
Disallow: /api/
Disallow: /login/

# Block unwanted bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: CCBot
Disallow: /

# Sitemaps
Sitemap: https://www.aldeyarksa.tech/sitemap.xml

# Host directive (helps with canonical URL)
Host: https://www.aldeyarksa.tech`;

  return new Response(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'CDN-Cache-Control': 'max-age=86400',
      'Vercel-CDN-Cache-Control': 'max-age=86400',
    },
  });
}
