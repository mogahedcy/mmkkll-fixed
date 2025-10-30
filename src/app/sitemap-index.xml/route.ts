import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
  const currentDate = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>1.0</priority>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-projects.xml</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.95</priority>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-articles.xml</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.9</priority>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-images.xml</loc>
    <lastmod>${currentDate}</lastmod>
    <priority>0.8</priority>
  </sitemap>
</sitemapindex>`;

  return new Response(sitemapIndex, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Robots-Tag': 'index, follow, all',
    },
  });
}
