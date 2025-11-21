/**
 * White Hat SEO Strategy for Local Business
 * Focus on neighborhood-specific content and local authority
 */

export const jeddahNeighborhoods = [
  {
    name: "المرجان",
    category: "مظلات سيارات",
    keywords: ["مظلات سيارات المرجان", "تركيب مظلات المرجان", "أسعار مظلات المرجان"],
    description: "أفضل خدمات تركيب مظلات السيارات في حي المرجان بجدة"
  },
  {
    name: "الروضة",
    category: "برجولات",
    keywords: ["برجولات خشبية الروضة", "تصميم برجولات الروضة", "برجولات حدائق الروضة"],
    description: "تصميم وتنفيذ برجولات فاخرة في الروضة جدة"
  },
  {
    name: "المنار",
    category: "سواتر",
    keywords: ["سواتر حديد المنار", "سواتر خصوصية المنار", "سواتر المنار جدة"],
    description: "سواتر عالية الجودة توفر الخصوصية في حي المنار"
  },
  {
    name: "النعيم",
    category: "مظلات حدائق",
    keywords: ["مظلات حدائق النعيم", "تنسيق حدائق النعيم", "حدائق فلل النعيم"],
    description: "خدمات تنسيق حدائق واستراتيجية تظليل في النعيم"
  },
  {
    name: "البشائر",
    category: "ساندوتش بانل",
    keywords: ["ساندوتش بانل البشائر", "ملاحق ساندوتش بانل", "بناء ملاحق البشائر"],
    description: "بناء ملاحق بجودة عالية في حي البشائر"
  },
  {
    name: "الزهراء",
    category: "تنسيق حدائق",
    keywords: ["تنسيق حدائق الزهراء", "حدائق منزلية الزهراء", "فلل الزهراء"],
    description: "تنسيق وتصميم حدائق منزلية في الزهراء"
  },
  {
    name: "الفيصلية",
    category: "بيوت شعر",
    keywords: ["بيوت شعر الفيصلية", "خيام ملكية الفيصلية", "ضيافة فاخرة"],
    description: "بيوت شعر تراثية وحديثة للمناسبات في الفيصلية"
  },
  {
    name: "أبحر الشمالية",
    category: "مظلات مدارس",
    keywords: ["مظلات مدارس أبحر", "ملاعب مدارس أبحر", "حماية من الشمس"],
    description: "مظلات متخصصة لمدارس وملاعب أبحر الشمالية"
  },
  {
    name: "الشاطئ",
    category: "هناجر تجارية",
    keywords: ["هناجر الشاطئ", "مستودعات الشاطئ", "هناجر معدنية"],
    description: "هناجر قوية وآمنة للاستخدام التجاري"
  },
  {
    name: "الاندلس",
    category: "سواتر قماشية",
    keywords: ["سواتر قماش الاندلس", "سواتر قابلة للطي", "حماية من الغبار"],
    description: "سواتر قماشية عصرية في حي الاندلس"
  }
];

export interface LocalArticleMetadata {
  neighborhood: string;
  category: string;
  keywords: string[];
  internalLinks: string[];
  relatedServices: string[];
  citywide: boolean;
}

/**
 * Generate optimized article metadata for local neighborhoods
 */
export function generateLocalArticleMetadata(
  neighborhood: string,
  category: string
): LocalArticleMetadata {
  const neighborhoodData = jeddahNeighborhoods.find(n => n.name === neighborhood);
  
  if (!neighborhoodData) {
    throw new Error(`Unknown neighborhood: ${neighborhood}`);
  }

  // Internal linking strategy
  const internalLinks = [
    `/services/mazallat`,
    `/services/sawater`,
    `/services/pergolas`,
    `/portfolio`,
    `/`
  ];

  // Related services in the same category
  const relatedServices = jeddahNeighborhoods
    .filter(n => n.category === category && n.name !== neighborhood)
    .map(n => n.name);

  return {
    neighborhood,
    category,
    keywords: neighborhoodData.keywords,
    internalLinks,
    relatedServices,
    citywide: false
  };
}

/**
 * SEO Best Practices for Local Content
 */
export const localSEOBestPractices = {
  titleLength: "50-60 characters",
  metaDescriptionLength: "150-160 characters",
  contentLength: "2000-3000 words minimum",
  headingStructure: "H1 -> H2 -> H3",
  internalLinksPerArticle: "3-5 contextual links",
  keywordDensity: "1-2%",
  images: "At least 5 optimized images",
  schema: ["LocalBusiness", "Article", "ImageObject", "Breadcrumb"]
};

/**
 * Title tag optimization for local SEO
 */
export function generateLocalSEOTitle(
  neighborhood: string,
  category: string,
  keyword: string
): string {
  return `${keyword} في ${neighborhood} - محترفين الديار العالمية`;
}

/**
 * Meta description optimization
 */
export function generateLocalSEOMetaDescription(
  neighborhood: string,
  category: string
): string {
  return `أفضل خدمات ${category} في ${neighborhood} جدة. تركيب احترافي، ضمان 10 سنوات، استشارة مجانية. اتصل الآن!`;
}

/**
 * Generate FAQ schema for local neighborhoods
 */
export function generateLocalFAQSchema(neighborhood: string, faqs: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
}

/**
 * Multi-location schema for citywide service
 */
export function generateMultiLocationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "محترفين الديار العالمية",
    "description": "شركة متخصصة في المظلات والبرجولات والسواتر في جدة",
    "areaServed": jeddahNeighborhoods.map(n => ({
      "@type": "City",
      "name": n.name,
      "addressRegion": "جدة"
    })),
    "serviceArea": "جدة، السعودية",
    "url": "https://www.aldeyarksa.tech",
    "telephone": "+966553719009",
    "email": "ksaaldeyar@gmail.com",
    "priceRange": "2500-50000",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150+"
    }
  };
}
