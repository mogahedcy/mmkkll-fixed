import { prisma } from '@/lib/prisma';

// بيانات المقالات المحدثة لخريطة الموقع
const articlesData = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024',
    lastModified: '2024-11-15T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'كيفية صيانة البرجولة الخشبية في المناخ الساحلي',
    lastModified: '2024-11-10T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    lastModified: '2024-11-05T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    id: 4,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية: خصوصية وأناقة في آن واحد',
    lastModified: '2024-10-25T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly'
  },
  {
    id: 5,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة: دليل التصميم للمناسبات الخاصة',
    lastModified: '2024-10-20T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    id: 6,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية: جمع الأصالة والحداثة',
    lastModified: '2024-10-18T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'monthly'
  },
  {
    id: 7,
    slug: 'garden-design-trends-saudi-2024',
    title: 'اتجاهات تصميم الحدائق في المملكة 2024',
    lastModified: '2024-11-01T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'weekly'
  },
  {
    id: 8,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات بأحدث التقنيات',
    lastModified: '2024-10-28T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'monthly'
  }
];

export async function GET() {
  const baseUrl = 'https://www.aldeyarksa.tech';

  // الصفحات الثابتة مع أولوية SEO محسنة
  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/services/mazallat', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/pergolas', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/sawater', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/sandwich-panel', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/renovation', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/landscaping', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/byoot-shaar', priority: '0.9', changefreq: 'weekly' },
    { url: '/services/khayyam', priority: '0.9', changefreq: 'weekly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'daily' },
    { url: '/portfolio/reviews', priority: '0.7', changefreq: 'weekly' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/articles', priority: '0.8', changefreq: 'daily' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/quote', priority: '0.8', changefreq: 'monthly' },
    { url: '/search', priority: '0.6', changefreq: 'monthly' },
    { url: '/faq', priority: '0.6', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
  ];

  let projects = [];

  // جلب جميع المشاريع مع الوسائط مع معالجة الأخطاء
  try {
    projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      updatedAt: true,
      createdAt: true,
      category: true,
      featured: true,
      mediaItems: {
        select: {
          src: true,
          type: true,
          title: true,
          description: true,
          updatedAt: true
        }
      }
    },
    orderBy: {
      updatedAt: 'desc'
    }
  });
  } catch (error) {
    console.error('خطأ في جلب المشاريع للخريطة:', error);
    // استخدام مصفوفة فارغة في حالة فشل الاتصال بقاعدة البيانات
    projects = [];
  }

  const staticSitemap = staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('');

  // إضافة صفحات المقالات مع البيانات المنظمة
  const articlesSitemap = articlesData
    .map(
      (article) => `
  <url>
    <loc>${baseUrl}/articles/${article.slug}</loc>
    <lastmod>${article.lastModified}</lastmod>
    <changefreq>${article.changefreq}</changefreq>
    <priority>${article.priority}</priority>
    <news:news>
      <news:publication>
        <news:name>محترفين الديار العالمية</news:name>
        <news:language>ar</news:language>
      </news:publication>
      <news:publication_date>${article.lastModified}</news:publication_date>
      <news:title><![CDATA[${article.title}]]></news:title>
    </news:news>
  </url>`
    )
    .join('');

  // إضافة صفحات المشاريع مع الصور والفيديوهات
  const projectsSitemap = projects
    .map(
      (project) => {
        const images = project.mediaItems
          .filter(media => media.type === 'IMAGE')
          .slice(0, 10) // حد أقصى 10 صور لكل مشروع
          .map(media => `
      <image:image>
        <image:loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</image:loc>
        <image:caption><![CDATA[${media.title || media.description || project.title}]]></image:caption>
        <image:title><![CDATA[${project.title}]]></image:title>
      </image:image>`)
          .join('');

        const videos = project.mediaItems
          .filter(media => media.type === 'VIDEO')
          .slice(0, 5) // حد أقصى 5 فيديوهات لكل مشروع
          .map(media => `
      <video:video>
        <video:content_loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</video:content_loc>
        <video:title><![CDATA[${project.title}]]></video:title>
        <video:description><![CDATA[${project.description || project.title}]]></video:description>
        <video:thumbnail_loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</video:thumbnail_loc>
        <video:publication_date>${project.createdAt.toISOString()}</video:publication_date>
      </video:video>`)
          .join('');

        const priority = project.featured ? '0.8' : '0.7';

        return `
  <url>
    <loc>${baseUrl}/portfolio/${project.id}</loc>
    <lastmod>${project.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>${images}${videos}
  </url>`;
      }
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${staticSitemap}
  ${articlesSitemap}
  ${projectsSitemap}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'CDN-Cache-Control': 'max-age=3600',
      'Vercel-CDN-Cache-Control': 'max-age=3600',
    },
  });
}
