import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

  let projects: any[] = [];

  // جلب المشاريع مع معالجة الأخطاء
  try {
    // استيراد مؤجل لتجنب مشاكل البناء
    const { prisma } = await import('@/lib/prisma');
    projects = await prisma.projects.findMany({
      where: { status: 'PUBLISHED' },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        location: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
        publishedAt: true,
        views: true,
        likes: true,
        rating: true,
        metaTitle: true,
        metaDescription: true,
        keywords: true,
        media_items: {
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
        project_tags: {
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
    console.error('خطأ في جلب المشاريع للخريطة:', error);
    projects = [];
  }

  // إنشاء sitemap للمشاريع مع الوسائط المحسنة
  const projectsSitemap = projects
    .map((project) => {
      // تشفير slug لتجنب الفراغات والأحرف الخاصة
      const encodedSlug = encodeURIComponent(project.slug || project.id);
      
      const mediaContent = project.media_items?.map((media: any) => {
        if (media.type === 'IMAGE') {
          const imageUrl = media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`;
          // تشفير الروابط للتأكد من عدم وجود فراغات
          const encodedImageUrl = imageUrl.includes(' ') ? imageUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : imageUrl;
          return `<image:image><image:loc>${encodedImageUrl}</image:loc><image:caption><![CDATA[${media.alt || media.title || project.title} - ${project.category} في ${project.location} من محترفين الديار العالمية]]></image:caption><image:title><![CDATA[${project.title} - محترفين الديار العالمية جدة]]></image:title><image:geo_location><![CDATA[${project.location}, المملكة العربية السعودية]]></image:geo_location><image:license><![CDATA[${baseUrl}/terms]]></image:license></image:image>`;
        } else if (media.type === 'VIDEO') {
          const videoUrl = media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`;
          const thumbnailUrl = media.thumbnail ? (media.thumbnail.startsWith('http') ? media.thumbnail : `${baseUrl}${media.thumbnail}`) : `${baseUrl}/images/video-placeholder.jpg`;
          // تشفير الروابط للتأكد من عدم وجود فراغات
          const encodedVideoUrl = videoUrl.includes(' ') ? videoUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : videoUrl;
          const encodedThumbnailUrl = thumbnailUrl.includes(' ') ? thumbnailUrl.split('/').map((part: string) => part.includes(' ') ? encodeURIComponent(part) : part).join('/') : thumbnailUrl;
          return `<video:video><video:thumbnail_loc>${encodedThumbnailUrl}</video:thumbnail_loc><video:title><![CDATA[${project.title} - فيديو ${project.category} في ${project.location}]]></video:title><video:description><![CDATA[${media.description || project.description} - محترفين الديار العالمية جدة]]></video:description><video:content_loc>${encodedVideoUrl}</video:content_loc><video:player_loc allow_embed="yes">${baseUrl}/portfolio/${encodedSlug}</video:player_loc><video:family_friendly>yes</video:family_friendly><video:uploader info="${baseUrl}">محترفين الديار العالمية</video:uploader></video:video>`;
        }
        return '';
      }).join('') || '';

      const priority = project.featured ? '0.9' : '0.8';
      const changefreq = project.featured ? 'weekly' : 'monthly';
      
      // تحسين الكلمات المفتاحية
      const keywords = project.keywords ? project.keywords : 
        `${project.category} ${project.location}, مظلات جدة, سواتر جدة, برجولات جدة, محترفين الديار العالمية`;
      
      // تحسين العنوان والوصف
      const seoTitle = project.metaTitle || `${project.title} في ${project.location} | محترفين الديار العالمية`;
      const seoDescription = project.metaDescription || 
        `${project.description.substring(0, 150)}... مشروع ${project.category} في ${project.location} من محترفين الديار العالمية - أفضل شركة مظلات وسواتر في جدة`;

      // البيانات المنظمة للمشروع
      const structuredData = `
    <PageMap>
      <DataObject type="project">
        <Attribute name="title">${seoTitle}</Attribute>
        <Attribute name="description">${seoDescription}</Attribute>
        <Attribute name="category">${project.category}</Attribute>
        <Attribute name="location">${project.location}</Attribute>
        <Attribute name="company">محترفين الديار العالمية</Attribute>
        <Attribute name="featured">${project.featured}</Attribute>
        <Attribute name="views">${project.views || 0}</Attribute>
        <Attribute name="likes">${project.likes || 0}</Attribute>
        <Attribute name="rating">${project.rating || 0}</Attribute>
        <Attribute name="keywords">${keywords}</Attribute>
        <Attribute name="publishedDate">${project.publishedAt?.toISOString() || project.createdAt.toISOString()}</Attribute>
        <Attribute name="lastModified">${project.updatedAt.toISOString()}</Attribute>
        <Attribute name="tags">${project.project_tags?.map((tag: any) => tag.name).join(', ') || ''}</Attribute>
        <Attribute name="serviceArea">جدة، مكة المكرمة، المملكة العربية السعودية</Attribute>
        <Attribute name="businessType">تركيب مظلات وسواتر وبرجولات</Attribute>
      </DataObject>
    </PageMap>`;

      return `<url><loc>${baseUrl}/portfolio/${encodedSlug}</loc><lastmod>${project.updatedAt.toISOString()}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority><rs:ln rel="canonical" href="${baseUrl}/portfolio/${encodedSlug}" /><rs:ln rel="alternate" hreflang="ar" href="${baseUrl}/portfolio/${encodedSlug}" />${mediaContent}${structuredData}</url>`;
    })
    .join('');

  // إضافة صفحة المعرض الرئيسية
  const portfolioIndexPage = `<url><loc>${baseUrl}/portfolio</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority><rs:ln rel="canonical" href="${baseUrl}/portfolio" /><rs:ln rel="alternate" hreflang="ar" href="${baseUrl}/portfolio" /><image:image><image:loc>${baseUrl}/images/portfolio-hero.webp</image:loc><image:caption><![CDATA[معرض أعمال محترفين الديار العالمية - مشاريع مظلات وسواتر متميزة في جدة]]></image:caption><image:title><![CDATA[معرض أعمال محترفين الديار العالمية]]></image:title><image:geo_location><![CDATA[جدة، المملكة العربية السعودية]]></image:geo_location></image:image><PageMap><DataObject type="collection"><Attribute name="title">معرض أعمال محترفين الديار العالمية</Attribute><Attribute name="description">اكتشف أعمالنا المتميزة في المظلات والبرجولات والسواتر وجميع خدماتنا في جدة</Attribute><Attribute name="projectsCount">${projects.length}</Attribute><Attribute name="location">جدة، المملكة العربية السعودية</Attribute><Attribute name="company">محترفين الديار العالمية</Attribute><Attribute name="services">مظلات، سواتر، برجولات، ساندوتش بانل، تنسيق حدائق، ترميم</Attribute></DataObject></PageMap></url>`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:rs="http://www.robotstxt.org/schemas/sitemap-extensions/1.0">
  ${portfolioIndexPage}
  ${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=43200',
      'CDN-Cache-Control': 'max-age=1800',
      'Vercel-CDN-Cache-Control': 'max-age=1800',
      'X-Robots-Tag': 'index, follow, all',
      'X-Projects-Count': projects.length.toString(),
      'X-Last-Updated': new Date().toISOString(),
      'Vary': 'Accept-Encoding',
      'ETag': `"projects-sitemap-${Date.now()}"`,
    },
  });
}