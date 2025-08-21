
import { prisma } from '@/lib/prisma';

// بيانات المقالات المحدثة مع كلمات مفتاحية غنية
const articlesData = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024 - دليل شامل للاختيار والتركيب',
    lastModified: '2024-12-15T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'مظلات سيارات جدة، أفضل مظلات السيارات، تركيب مظلات جدة، مظلات حديد، مظلات قماش'
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'صيانة البرجولة الخشبية في المناخ الساحلي - نصائح من خبراء جدة',
    lastModified: '2024-12-10T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly',
    keywords: 'برجولة خشبية جدة، صيانة برجولات، برجولات حدائق، تصميم برجولات جدة'
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    lastModified: '2024-12-05T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'ساندوتش بانل جدة، عزل حراري، ألواح ساندوتش بانل، تركيب ساندوتش بانل السعودية'
  },
  {
    id: 4,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية في جدة: خصوصية وأناقة وتقنية حديثة',
    lastModified: '2024-12-01T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'سواتر جدة، سواتر خصوصية، سواتر حديد، تركيب سواتر، سواتر قماش جدة'
  },
  {
    id: 5,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة في جدة: دليل التصميم والتنفيذ للمناسبات الخاصة',
    lastModified: '2024-11-25T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'خيام ملكية جدة، خيام فاخرة، تأجير خيام، خيام مناسبات جدة'
  },
  {
    id: 6,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية في جدة: تجسيد الأصالة مع لمسة عصرية',
    lastModified: '2024-11-20T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'بيوت شعر جدة، خيام تراثية، بيوت شعر تراثية، خيام بدوية جدة'
  },
  {
    id: 7,
    slug: 'garden-design-trends-saudi-2024',
    title: 'أحدث اتجاهات تصميم وتنسيق الحدائق في جدة والمملكة 2024',
    lastModified: '2024-12-12T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly',
    keywords: 'تنسيق حدائق جدة، تصميم حدائق، شركة تنسيق حدائق، حدائق منزلية جدة'
  },
  {
    id: 8,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات بأحدث التقنيات - دليل شامل من خبراء جدة',
    lastModified: '2024-12-08T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'ترميم ملحقات جدة، تجديد ملحقات، شركة ترميم، ترميم منازل جدة'
  }
];

export async function GET() {
  const baseUrl = 'https://www.aldeyarksa.tech';

  // الصفحات الثابتة مع أولوية SEO محسنة وكلمات مفتاحية
  const staticPages = [
    { 
      url: '', 
      priority: '1.0', 
      changefreq: 'daily',
      keywords: 'مظلات جدة، سواتر، برجولات، تنسيق حدائق، محترفين الديار العالمية'
    },
    { 
      url: '/services/mazallat', 
      priority: '0.95', 
      changefreq: 'weekly',
      keywords: 'مظلات سيارات جدة، تركيب مظلات، مظلات حديد، مظلات قماش'
    },
    { 
      url: '/services/pergolas', 
      priority: '0.95', 
      changefreq: 'weekly',
      keywords: 'برجولات جدة، تصميم برجولات، برجولات خشبية، برجولات حديد'
    },
    { 
      url: '/services/sawater', 
      priority: '0.95', 
      changefreq: 'weekly',
      keywords: 'سواتر جدة، سواتر خصوصية، سواتر حديد، سواتر قماش'
    },
    { 
      url: '/services/sandwich-panel', 
      priority: '0.95', 
      changefreq: 'weekly',
      keywords: 'ساندوتش بانل جدة، عزل حراري، ألواح ساندوتش بانل'
    },
    { 
      url: '/services/renovation', 
      priority: '0.9', 
      changefreq: 'weekly',
      keywords: 'ترميم ملحقات جدة، تجديد ملحقات، شركة ترميم'
    },
    { 
      url: '/services/landscaping', 
      priority: '0.9', 
      changefreq: 'weekly',
      keywords: 'تنسيق حدائق جدة، تصميم حدائق، شركة تنسيق حدائق'
    },
    { 
      url: '/services/byoot-shaar', 
      priority: '0.9', 
      changefreq: 'weekly',
      keywords: 'بيوت شعر جدة، خيام تراثية، بيوت شعر تراثية'
    },
    { 
      url: '/services/khayyam', 
      priority: '0.9', 
      changefreq: 'weekly',
      keywords: 'خيام جدة، خيام ملكية، خيام فاخرة، تأجير خيام'
    },
    { 
      url: '/portfolio', 
      priority: '0.85', 
      changefreq: 'daily',
      keywords: 'أعمال مظلات جدة، مشاريع سواتر، معرض أعمال الديار'
    },
    { 
      url: '/portfolio/reviews', 
      priority: '0.8', 
      changefreq: 'weekly',
      keywords: 'تقييمات العملاء، آراء العملاء، تجارب العملاء جدة'
    },
    { 
      url: '/about', 
      priority: '0.8', 
      changefreq: 'monthly',
      keywords: 'محترفين الديار العالمية، شركة مظلات جدة، عن الشركة'
    },
    { 
      url: '/articles', 
      priority: '0.85', 
      changefreq: 'daily',
      keywords: 'مقالات مظلات، نصائح تركيب، دليل شامل'
    },
    { 
      url: '/contact', 
      priority: '0.8', 
      changefreq: 'monthly',
      keywords: 'اتصل بنا، رقم تليفون، عنوان الشركة جدة'
    },
    { 
      url: '/quote', 
      priority: '0.9', 
      changefreq: 'monthly',
      keywords: 'طلب عرض سعر، احسب التكلفة، أسعار مظلات جدة'
    },
    { 
      url: '/search', 
      priority: '0.7', 
      changefreq: 'monthly',
      keywords: 'بحث في الموقع، البحث عن خدمات'
    },
    { 
      url: '/faq', 
      priority: '0.75', 
      changefreq: 'monthly',
      keywords: 'أسئلة شائعة، الأسئلة المتكررة، استفسارات'
    }
  ];

  let projects = [];

  // جلب المشاريع مع معالجة الأخطاء
  try {
    projects = await prisma.project.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        updatedAt: true,
        createdAt: true,
        category: true,
        location: true,
        featured: true,
        mediaItems: {
          select: {
            src: true,
            type: true,
            title: true,
            description: true,
            alt: true,
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
    projects = [];
  }

  // إنشاء sitemap للصفحات الثابتة
  const staticSitemap = staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>${baseUrl}/images/logo.png</image:loc>
      <image:caption><![CDATA[${page.keywords}]]></image:caption>
      <image:title><![CDATA[محترفين الديار العالمية - ${page.keywords}]]></image:title>
    </image:image>
  </url>`
    )
    .join('');

  // إنشاء sitemap للمقالات مع البيانات المنظمة الغنية
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
      <news:keywords><![CDATA[${article.keywords}]]></news:keywords>
    </news:news>
    <image:image>
      <image:loc>${baseUrl}/images/articles/${article.slug}-main.webp</image:loc>
      <image:caption><![CDATA[${article.title}]]></image:caption>
      <image:title><![CDATA[${article.title}]]></image:title>
    </image:image>
  </url>`
    )
    .join('');

  // إنشاء sitemap للمشاريع مع الوسائط المحسنة
  const projectsSitemap = projects
    .map(
      (project) => {
        const images = project.mediaItems
          ?.filter(media => media.type === 'IMAGE')
          .slice(0, 15) // زيادة عدد الصور المفهرسة
          .map(media => `
      <image:image>
        <image:loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</image:loc>
        <image:caption><![CDATA[${media.alt || media.title || project.title} - ${project.category} في ${project.location}]]></image:caption>
        <image:title><![CDATA[${project.title} - محترفين الديار العالمية جدة]]></image:title>
        <image:geo_location><![CDATA[جدة، المملكة العربية السعودية]]></image:geo_location>
      </image:image>`)
          .join('') || '';

        const videos = project.mediaItems
          ?.filter(media => media.type === 'VIDEO')
          .slice(0, 8) // زيادة عدد الفيديوهات
          .map(media => `
      <video:video>
        <video:content_loc>${media.src.startsWith('http') ? media.src : `${baseUrl}${media.src}`}</video:content_loc>
        <video:title><![CDATA[${project.title} - ${project.category} في ${project.location}]]></video:title>
        <video:description><![CDATA[${project.description || project.title} - مشروع ${project.category} منفذ من قبل محترفين الديار العالمية في ${project.location}]]></video:description>
        <video:thumbnail_loc>${project.mediaItems?.find(m => m.type === 'IMAGE')?.src || `${baseUrl}/images/default-thumbnail.webp`}</video:thumbnail_loc>
        <video:publication_date>${project.createdAt.toISOString()}</video:publication_date>
        <video:family_friendly>yes</video:family_friendly>
        <video:live>no</video:live>
      </video:video>`)
          .join('') || '';

        const priority = project.featured ? '0.85' : '0.75';

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
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=43200',
      'CDN-Cache-Control': 'max-age=1800',
      'Vercel-CDN-Cache-Control': 'max-age=1800',
      'X-Robots-Tag': 'index, follow, all',
    },
  });
}
