import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

  let articles: any[] = [];

  // جلب المقالات من قاعدة البيانات
  try {
    const { prisma } = await import('@/lib/prisma');
    articles = await prisma.articles.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
        excerpt: true,
        author: true,
        category: true,
        featured: true,
        views: true,
        likes: true,
        rating: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true,
        article_media_items: {
          select: { 
            type: true,
            src: true, 
            alt: true, 
            title: true,
            description: true,
            thumbnail: true
          },
          take: 10,
          orderBy: { order: 'asc' }
        },
        article_tags: {
          select: { name: true }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  } catch (error) {
    console.error('خطأ في جلب المقالات للخريطة:', error);
    articles = [];
  }

  // إنشاء sitemap للمقالات مع الوسائط المحسنة
  const articlesSitemap = articles
    .map((article) => {
      const encodedSlug = encodeURIComponent(article.slug || article.id);
      
      const mediaContent = article.article_media_items?.map((media: any) => {
        if (media.type === 'IMAGE') {
          const imageUrl = media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`;
          const encodedImageUrl = imageUrl.includes(' ') ? imageUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : imageUrl;
          return `<image:image><image:loc>${encodedImageUrl}</image:loc><image:caption><![CDATA[${media.alt || media.title || article.title} - ${article.category} من محترفين الديار العالمية]]></image:caption><image:title><![CDATA[${article.title} - محترفين الديار العالمية جدة]]></image:title><image:geo_location><![CDATA[جدة، المملكة العربية السعودية]]></image:geo_location><image:license><![CDATA[${baseUrl}/terms]]></image:license></image:image>`;
        } else if (media.type === 'VIDEO') {
          const videoUrl = media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`;
          const thumbnailUrl = media.thumbnail ? (media.thumbnail.startsWith('http') ? media.thumbnail : `${baseUrl}${media.thumbnail}`) : `${baseUrl}/images/video-placeholder.jpg`;
          const encodedVideoUrl = videoUrl.includes(' ') ? videoUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : videoUrl;
          const encodedThumbnailUrl = thumbnailUrl.includes(' ') ? thumbnailUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : thumbnailUrl;
          return `<video:video><video:thumbnail_loc>${encodedThumbnailUrl}</video:thumbnail_loc><video:title><![CDATA[${article.title} - فيديو ${article.category}]]></video:title><video:description><![CDATA[${media.description || article.excerpt || article.content.substring(0, 200)} - محترفين الديار العالمية جدة]]></video:description><video:content_loc>${encodedVideoUrl}</video:content_loc><video:player_loc allow_embed="yes">${baseUrl}/articles/${encodedSlug}</video:player_loc><video:family_friendly>yes</video:family_friendly><video:uploader info="${baseUrl}">محترفين الديار العالمية</video:uploader></video:video>`;
        }
        return '';
      }).join('') || '';

      const priority = article.featured ? '0.9' : '0.8';
      const changefreq = article.featured ? 'weekly' : 'monthly';
      const readTime = Math.ceil((article.content || '').length / 1000);
      
      const keywords = article.keywords ? article.keywords : 
        `${article.category}, محترفين الديار العالمية, مقالات جدة`;
      
      const seoTitle = article.metaTitle || `${article.title} | محترفين الديار العالمية`;
      const seoDescription = article.metaDescription || article.excerpt || 
        `${article.content.substring(0, 160)}... مقالة متخصصة في ${article.category} من محترفين الديار العالمية`;

      const newsMarkup = `<news:news><news:publication><news:name>محترفين الديار العالمية</news:name><news:language>ar</news:language></news:publication><news:publication_date>${article.publishedAt?.toISOString() || article.createdAt.toISOString()}</news:publication_date><news:title><![CDATA[${seoTitle}]]></news:title><news:keywords><![CDATA[${keywords}]]></news:keywords></news:news>`;

      const structuredData = `<PageMap><DataObject type="article"><Attribute name="title">${seoTitle}</Attribute><Attribute name="description">${seoDescription}</Attribute><Attribute name="author">${article.author}</Attribute><Attribute name="category">${article.category}</Attribute><Attribute name="company">محترفين الديار العالمية</Attribute><Attribute name="featured">${article.featured}</Attribute><Attribute name="views">${article.views || 0}</Attribute><Attribute name="likes">${article.likes || 0}</Attribute><Attribute name="rating">${article.rating || 0}</Attribute><Attribute name="readTime">${readTime} دقائق</Attribute><Attribute name="keywords">${keywords}</Attribute><Attribute name="publishedDate">${article.publishedAt?.toISOString() || article.createdAt.toISOString()}</Attribute><Attribute name="lastModified">${article.updatedAt.toISOString()}</Attribute><Attribute name="tags">${article.article_tags?.map((tag: any) => tag.name).join(', ') || ''}</Attribute><Attribute name="location">جدة، المملكة العربية السعودية</Attribute><Attribute name="serviceType">مقالات متخصصة في المظلات والبرجولات</Attribute></DataObject></PageMap>`;

      return `<url><loc>${baseUrl}/articles/${encodedSlug}</loc><lastmod>${article.updatedAt.toISOString()}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority><rs:ln rel="canonical" href="${baseUrl}/articles/${encodedSlug}" /><rs:ln rel="alternate" hreflang="ar" href="${baseUrl}/articles/${encodedSlug}" />${mediaContent}${newsMarkup}${structuredData}</url>`;
    })
    .join('');

  // إضافة صفحة المقالات الرئيسية
  const articlesIndexPage = `<url><loc>${baseUrl}/articles</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority><rs:ln rel="canonical" href="${baseUrl}/articles" /><rs:ln rel="alternate" hreflang="ar" href="${baseUrl}/articles" /><image:image><image:loc>${baseUrl}/uploads/mazallat-1.webp</image:loc><image:caption><![CDATA[أرشيف مقالات محترفين الديار العالمية - مقالات متخصصة في المظلات والبرجولات]]></image:caption><image:title><![CDATA[أرشيف مقالات محترفين الديار العالمية]]></image:title><image:geo_location><![CDATA[جدة، المملكة العربية السعودية]]></image:geo_location></image:image><PageMap><DataObject type="collection"><Attribute name="title">أرشيف مقالات محترفين الديار العالمية</Attribute><Attribute name="description">اكتشف أحدث المقالات والنصائح المتخصصة في مجال المظلات والبرجولات والساندوتش بانل</Attribute><Attribute name="articlesCount">${articles.length}</Attribute><Attribute name="location">جدة، المملكة العربية السعودية</Attribute><Attribute name="company">محترفين الديار العالمية</Attribute><Attribute name="topics">مظلات، برجولات، سواتر، ساندوتش بانل، تنسيق حدائق، ترميم</Attribute></DataObject></PageMap></url>`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:rs="http://www.robotstxt.org/schemas/sitemap-extensions/1.0">
  ${articlesIndexPage}
  ${articlesSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=43200',
      'CDN-Cache-Control': 'max-age=1800',
      'Vercel-CDN-Cache-Control': 'max-age=1800',
      'X-Robots-Tag': 'index, follow, all',
      'X-Articles-Count': articles.length.toString(),
      'X-Last-Updated': new Date().toISOString(),
      'Vary': 'Accept-Encoding',
      'ETag': `"articles-sitemap-${Date.now()}"`,
    },
  });
}
