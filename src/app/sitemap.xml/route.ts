import { NextResponse } from 'next/server';

// مقالات الخدمات المحسنة لـ SEO
const serviceArticlesData = [
  {
    id: 'mazallat-guide',
    slug: 'complete-car-shades-guide-jeddah-2024',
    title: 'دليل مظلات السيارات الشامل في جدة 2024 - أنواع وأسعار وتركيب',
    lastModified: '2025-10-20T10:00:00.000Z',
    priority: '0.95',
    changefreq: 'weekly',
    keywords: 'مظلات سيارات جدة، أسعار مظلات السيارات، تركيب مظلات جدة، مظلات PVC، مظلات حديد'
  },
  {
    id: 'pergolas-guide',
    slug: 'wooden-pergolas-design-installation-jeddah',
    title: 'البرجولات الخشبية في جدة: التصميم والتركيب والصيانة',
    lastModified: '2025-10-18T09:00:00.000Z',
    priority: '0.95',
    changefreq: 'weekly',
    keywords: 'برجولات خشبية جدة، تصميم برجولات، برجولات حدائق، تركيب برجولات جدة'
  },
  {
    id: 'sawater-guide',
    slug: 'privacy-screens-installation-jeddah-2024',
    title: 'السواتر في جدة: أفضل الأنواع والأسعار والتركيب المحترف',
    lastModified: '2025-10-16T08:00:00.000Z',
    priority: '0.95',
    changefreq: 'weekly',
    keywords: 'سواتر جدة، سواتر خصوصية، سواتر حديد، سواتر قماش، تركيب سواتر'
  },
  {
    id: 'landscaping-guide',
    slug: 'garden-landscaping-jeddah-complete-guide',
    title: 'تنسيق الحدائق في جدة: دليل شامل للتصميم والتنفيذ',
    lastModified: '2025-10-14T07:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'تنسيق حدائق جدة، تصميم حدائق، شركة تنسيق حدائق، حدائق منزلية'
  }
];

// بيانات المقالات المحدثة مع كلمات مفتاحية غنية
const articlesData = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024 - دليل شامل للاختيار والتركيب',
    lastModified: '2025-10-12T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'مظلات سيارات جدة، أفضل مظلات السيارات، تركيب مظلات جدة، مظلات حديد، مظلات قماش'
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'صيانة البرجولة الخشبية في المناخ الساحلي - نصائح من خبراء جدة',
    lastModified: '2025-10-10T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly',
    keywords: 'برجولة خشبية جدة، صيانة برجولات، برجولات حدائق، تصميم برجولات جدة'
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    lastModified: '2025-10-08T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'ساندوتش بانل جدة، عزل حراري، ألواح ساندوتش بانل، تركيب ساندوتش بانل السعودية'
  },
  {
    id: 4,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية في جدة: خصوصية وأناقة وتقنية حديثة',
    lastModified: '2025-10-06T10:00:00.000Z',
    priority: '0.9',
    changefreq: 'weekly',
    keywords: 'سواتر جدة، سواتر خصوصية، سواتر حديد، تركيب سواتر، سواتر قماش جدة'
  },
  {
    id: 5,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة في جدة: دليل التصميم والتنفيذ للمناسبات الخاصة',
    lastModified: '2025-09-28T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'خيام ملكية جدة، خيام فاخرة، تأجير خيام، خيام مناسبات جدة'
  },
  {
    id: 6,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية في جدة: تجسيد الأصالة مع لمسة عصرية',
    lastModified: '2025-09-26T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'بيوت شعر جدة، خيام تراثية، بيوت شعر تراثية، خيام بدوية جدة'
  },
  {
    id: 7,
    slug: 'garden-design-trends-saudi-2024',
    title: 'أحدث اتجاهات تصميم وتنسيق الحدائق في جدة والمملكة 2024',
    lastModified: '2025-09-24T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'weekly',
    keywords: 'تنسيق حدائق جدة، تصميم حدائق، شركة تنسيق حدائق، حدائق منزلية جدة'
  },
  {
    id: 8,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات بأحدث التقنيات - دليل شامل من خبراء جدة',
    lastModified: '2025-09-22T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'ترميم ملحقات جدة، تجديد ملحقات، شركة ترميم، ترميم منازل جدة'
  },
  {
    id: 9,
    slug: 'pergola-materials-comparison-jeddah',
    title: 'مقارنة شاملة لمواد البرجولات في جدة: الخشب مقابل الحديد مقابل الألومنيوم',
    lastModified: '2025-09-20T10:00:00.000Z',
    priority: '0.8',
    changefreq: 'monthly',
    keywords: 'برجولات خشبية جدة، برجولات حديد، برجولات ألومنيوم، مقارنة مواد البرجولات'
  },
  {
    id: 10,
    slug: 'seasonal-garden-maintenance-saudi',
    title: 'صيانة الحدائق الموسمية في السعودية: دليل العناية الشاملة',
    lastModified: '2025-09-18T10:00:00.000Z',
    priority: '0.7',
    changefreq: 'monthly',
    keywords: 'صيانة حدائق جدة، العناية بالحدائق، تنسيق حدائق موسمي، ري الحدائق'
  }
];

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

  // الصفحات الثابتة مع أولوية SEO محسنة وك��مات مفتاحية
  const staticPages = [
    { 
      url: '', 
      priority: '1.0', 
      changefreq: 'daily',
      keywords: 'مظلات جدة، سواتر، برجولات، تنسيق حدائق، محترفين الديار العالمية'
    },
    { 
      url: '/services/mazallat', 
      priority: '0.9', 
      changefreq: 'daily',
      keywords: 'مظلات سيارات جدة، تركيب مظلات، مظلات حديد، مظلات قماش، أسعار مظلات السيارات، شركة مظلات جدة'
    },
    { 
      url: '/services/pergolas', 
      priority: '0.9', 
      changefreq: 'daily',
      keywords: 'برجولات جدة، تصميم برجولات، برجولات خشبية، برجولات حديد، برجولات حدائق، تركيب برجولات جدة'
    },
    { 
      url: '/services/sawater', 
      priority: '0.9', 
      changefreq: 'daily',
      keywords: 'سواتر جدة، سواتر خصوصية، سواتر حديد، سواتر قماش، تركيب سواتر جدة، أسعار السواتر'
    },
    { 
      url: '/services/sandwich-panel', 
      priority: '0.9', 
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
      priority: '0.8', 
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
      priority: '0.7', 
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

  // تم نقل المشاريع إلى sitemap منفصل لتحسين الأداء

  // إنشاء sitemap للصفحات الثابتة
  const staticSitemap = staticPages
    .map((page) => `<url><loc>${baseUrl}${page.url}</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>${page.changefreq}</changefreq><priority>${page.priority}</priority><image:image><image:loc>${baseUrl}/images/logo.png</image:loc><image:caption><![CDATA[${page.keywords}]]></image:caption><image:title><![CDATA[محترفين الديار العالمية - ${page.keywords}]]></image:title></image:image></url>`)
    .join('\n  ');

  // إنشاء sitemap للمقالات العامة
  const generalArticlesSitemap = articlesData
    .map((article) => {
      const encodedSlug = encodeURIComponent(article.slug);
      return `<url><loc>${baseUrl}/articles/${encodedSlug}</loc><lastmod>${article.lastModified}</lastmod><changefreq>${article.changefreq}</changefreq><priority>${article.priority}</priority><news:news><news:publication><news:name>محترفين الديار العالمية</news:name><news:language>ar</news:language></news:publication><news:publication_date>${article.lastModified}</news:publication_date><news:title><![CDATA[${article.title}]]></news:title><news:keywords><![CDATA[${article.keywords}]]></news:keywords></news:news><image:image><image:loc>${baseUrl}/images/articles/${encodedSlug}-main.webp</image:loc><image:caption><![CDATA[${article.title}]]></image:caption><image:title><![CDATA[${article.title}]]></image:title></image:image></url>`;
    })
    .join('\n  ');

  // إنشاء sitemap لمقالات الخدمات
  const serviceArticlesSitemap = serviceArticlesData
    .map((article) => {
      const encodedSlug = encodeURIComponent(article.slug);
      return `<url><loc>${baseUrl}/articles/${encodedSlug}</loc><lastmod>${article.lastModified}</lastmod><changefreq>${article.changefreq}</changefreq><priority>${article.priority}</priority><news:news><news:publication><news:name>محترفين الديار العالمية</news:name><news:language>ar</news:language></news:publication><news:publication_date>${article.lastModified}</news:publication_date><news:title><![CDATA[${article.title}]]></news:title><news:keywords><![CDATA[${article.keywords}]]></news:keywords></news:news><image:image><image:loc>${baseUrl}/images/articles/${encodedSlug}-main.webp</image:loc><image:caption><![CDATA[${article.title}]]></image:caption><image:title><![CDATA[${article.title}]]></image:title></image:image></url>`;
    })
    .join('\n  ');

  // تم نقل sitemap المشاريع إلى ملف منفصل /sitemap-projects.xml

  // إضافة روابط الـ sitemaps المنفصلة
  const sitemapReferences = `<url><loc>${baseUrl}/sitemap-projects.xml</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.95</priority></url>
  <url><loc>${baseUrl}/sitemap-articles.xml</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${baseUrl}/sitemap-images.xml</loc><lastmod>${new Date().toISOString()}</lastmod><changefreq>weekly</changefreq><priority>0.8</priority></url>`;

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${staticSitemap}
  ${generalArticlesSitemap}
  ${serviceArticlesSitemap}
  ${sitemapReferences}
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
