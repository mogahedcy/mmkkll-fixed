
import { prisma } from '@/lib/prisma';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
  
  // الصور الأساسية للموقع
  const staticImages = [
    {
      url: '/images/logo.png',
      caption: 'شعار محترفين الديار العالمية - أفضل شركة مظلات وسواتر في جدة',
      title: 'محترفين الديار العالمية',
      location: 'جدة، السعودية'
    },
    {
      url: '/images/hero-bg.jpg',
      caption: 'الصفحة الرئيسية - مظلات وسواتر وبرجولات عالية الجودة في جدة',
      title: 'خدمات المظلات والسواتر في جدة',
      location: 'جدة، السعودية'
    }
  ];

  // صور الخدمات
  const serviceImages = [
    {
      url: '/uploads/mazallat-1.webp',
      caption: 'مظلات سيارات عالية الجودة - تركيب احترافي في جدة',
      title: 'مظلات سيارات جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/pergola-1.jpg',
      caption: 'برجولات خشبية وحديدية للحدائق - تصميم وتنفيذ في جدة',
      title: 'برجولات حدائق جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/sawater-1.webp',
      caption: 'سواتر خصوصية وحماية - أحدث التصاميم في جدة',
      title: 'سواتر جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/sandwich-panel-1.jpg',
      caption: 'ساندوتش بانل للعزل الحراري - حلول متقدمة في جدة',
      title: 'ساندوتش بانل جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/landscaping-1.webp',
      caption: 'تنسيق وتصميم الحدائق - خدمات شاملة في جدة',
      title: 'تنسيق حدائق جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/byoot-shaar-1.webp',
      caption: 'بيوت شعر تراثية - أصالة وجودة في جدة',
      title: 'بيوت شعر جدة',
      location: 'جدة، السعودية'
    },
    {
      url: '/uploads/khayyam-1.webp',
      caption: 'خيام ملكية فاخرة - للمناسبات الخاصة في جدة',
      title: 'خيام ملكية جدة',
      location: 'جدة، السعودية'
    }
  ];

  let projectImages: any[] = [];

  try {
    // جلب صور المشاريع من قاعدة البيانات
    const projects = await prisma.projects.findMany({
      where: {
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        location: true,
        createdAt: true,
        publishedAt: true,
        media_items: {
          where: {
            type: 'IMAGE'
          },
          orderBy: {
            order: 'asc'
          },
          select: {
            src: true,
            title: true,
            description: true,
            alt: true
          }
        }
      }
    });

    projectImages = projects.flatMap(project => 
      project.media_items.map((media, index) => {
        // توليد alt text محسّن إذا لم يكن موجود
        const optimizedAlt = media.alt || 
          `${project.title} - ${project.category} في ${project.location} - صورة ${index + 1} | محترفين الديار العالمية`;
        
        // توليد caption مفصل
        const caption = media.description || 
          `صورة توضيحية لمشروع ${project.title} من نوع ${project.category} في ${project.location}. تنفيذ محترفين الديار العالمية بجودة عالية وضمان 10 سنوات`;
        
        // توليد title للصورة
        const imageTitle = media.title || 
          `${project.category} - ${project.title} | محترفين الديار`;

        return {
          url: media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`,
          caption,
          title: imageTitle,
          alt: optimizedAlt,
          location: `${project.location}, السعودية`,
          project_url: `${baseUrl}/portfolio/${project.slug || project.id}`,
          category: project.category,
          uploadDate: project.publishedAt || project.createdAt
        };
      })
    );
  } catch (error) {
    console.error('خطأ في جلب صور المشاريع:', error);
  }

  // دمج جميع الصور
  const allImages = [...staticImages, ...serviceImages, ...projectImages];

  const imagesSitemap = allImages
    .map(image => {
      const imageUrl = image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`;
      const pageUrl = image.project_url || `${baseUrl}/portfolio`;
      const uploadDate = image.uploadDate ? new Date(image.uploadDate).toISOString() : new Date().toISOString();
      
      // تنظيف URL من المسافات
      const cleanImageUrl = imageUrl.replace(/\s+/g, '');
      const cleanPageUrl = pageUrl.replace(/\s+/g, '');
      
      // إضافة معلومات محسّنة للصور (بدون image:description لأنه غير مدعوم)
      const imageXml = `<url>
    <loc>${cleanPageUrl}</loc>
    <image:image>
      <image:loc>${cleanImageUrl}</image:loc>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:geo_location><![CDATA[${image.location}]]></image:geo_location>
      <image:license><![CDATA[${baseUrl}/terms]]></image:license>
    </image:image>
    <lastmod>${uploadDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      
      return imageXml;
    })
    .join('\n  ');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${imagesSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=43200',
      'CDN-Cache-Control': 'max-age=1800',
      'Vercel-CDN-Cache-Control': 'max-age=1800',
      'X-Robots-Tag': 'index, follow, all',
      'X-Images-Count': allImages.length.toString(),
      'X-Last-Updated': new Date().toISOString(),
      'Vary': 'Accept-Encoding',
      'ETag': `"images-sitemap-${Date.now()}"`,
    },
  });
}
