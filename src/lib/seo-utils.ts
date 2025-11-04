import { Metadata } from 'next';

const BASE_URL = 'https://www.aldeyarksa.tech';
const SITE_NAME = 'محترفين الديار العالمية';

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  noindex?: boolean;
}

export function generateCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_URL}${cleanPath}`;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords,
    image = `${BASE_URL}/favicon.svg`,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    noindex = false
  } = config;

  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = url ? generateCanonicalUrl(url) : undefined;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords,
    authors: author ? [{ name: author }] : [{ name: SITE_NAME }],
    robots: noindex ? 'noindex, nofollow' : 'index, follow',
    alternates: canonicalUrl ? {
      canonical: url,
      languages: {
        'ar-SA': url,
        'x-default': url,
      },
    } : undefined,
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: 'ar_SA',
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
    },
  };

  return metadata;
}

export function generateArticleSchema(data: {
  title: string;
  description: string;
  author: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  keywords?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.image || `${BASE_URL}/favicon.svg`,
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "author": {
      "@type": "Organization",
      "name": data.author,
      "url": BASE_URL
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/favicon.svg`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    },
    ...(data.keywords && { keywords: data.keywords.join(', ') })
  };
}

export function generateServiceSchema(data: {
  name: string;
  description: string;
  areaServed?: string;
  priceRange?: string;
  image?: string;
  url?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": SITE_NAME,
      "image": data.image || `${BASE_URL}/favicon.svg`,
      "telephone": "+966553719009",
      "email": "info@aldeyarksa.tech",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "شارع الأمير سلطان",
        "addressLocality": "جدة",
        "addressRegion": "منطقة مكة المكرمة",
        "postalCode": "21423",
        "addressCountry": "SA"
      }
    },
    "areaServed": {
      "@type": "City",
      "name": data.areaServed || "جدة"
    },
    ...(data.priceRange && {
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "SAR",
        "price": data.priceRange
      }
    }),
    ...(data.url && { "url": generateCanonicalUrl(data.url) })
  };
}

export function generateProductSchema(data: {
  name: string;
  description: string;
  image?: string[];
  category?: string;
  brand?: string;
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": data.name,
    "description": data.description,
    "image": data.image || [`${BASE_URL}/favicon.svg`],
    "brand": {
      "@type": "Organization",
      "name": data.brand || SITE_NAME
    },
    ...(data.category && { "category": data.category }),
    ...(data.aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": data.aggregateRating.ratingValue,
        "reviewCount": data.aggregateRating.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

export function generateReviewSchema(reviews: Array<{
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
}>) {
  return reviews.map((review) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished
  }));
}

export function generateImageObjectSchema(images: Array<{
  url: string;
  caption?: string;
  width?: number;
  height?: number;
}>) {
  return images.map((img) => ({
    "@type": "ImageObject",
    "url": img.url,
    "caption": img.caption,
    ...(img.width && { "width": img.width }),
    ...(img.height && { "height": img.height })
  }));
}

export function generateVideoObjectSchema(videos: Array<{
  name: string;
  description: string;
  contentUrl: string;
  thumbnailUrl?: string;
  uploadDate?: string;
  duration?: string;
}>) {
  return videos.map((video) => ({
    "@type": "VideoObject",
    "name": video.name,
    "description": video.description,
    "contentUrl": video.contentUrl,
    "thumbnailUrl": video.thumbnailUrl,
    "uploadDate": video.uploadDate,
    ...(video.duration && { "duration": video.duration })
  }));
}
