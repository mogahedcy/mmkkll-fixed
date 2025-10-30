export default function StructuredDataScript({ data }: { data?: any | any[] }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "محترفين الديار العالمية",
    "alternateName": "Al Deyar Professional Global",
    "url": baseUrl,
    "logo": `${baseUrl}/favicon.svg`,
    "image": `${baseUrl}/favicon.svg`,
    "description": "شركة رائدة في تركيب مظلات السيارات، البرجولات، السواتر، تنسيق الحدائق في جدة والمملكة العربية السعودية",
    "foundingDate": "2010",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966553719009",
      "contactType": "customer service",
      "areaServed": "SA",
      "availableLanguage": ["Arabic", "English"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع الأمير محمد بن عبدالعزيز",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "23442",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.4858,
      "longitude": 39.1925
    },
    "openingHours": "Mo-Sa 08:00-18:00",
    "priceRange": "$$",
    "serviceArea": { "@type": "City", "name": "جدة" },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات محترفين الديار",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "مظلات السيارات", "description": "تركيب مظلات السيارات بأعلى معايير الجودة" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "البرجولات", "description": "تصميم وتنفيذ برجولات خشبية وحديدية" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "السواتر", "description": "تركيب سواتر الخصوصية والحماية" } }
      ]
    },
    "sameAs": [
      "https://www.facebook.com/aldeyar.jeddah",
      "https://www.instagram.com/aldeyar.jeddah",
      "https://twitter.com/aldeyar_jeddah",
      "https://www.linkedin.com/company/aldeyar-global",
      "https://www.youtube.com/@aldeyar-jeddah",
      "https://share.google/GKcHjw3Gl5MX85WmQ"
    ],
    "hasMap": "https://share.google/GKcHjw3Gl5MX85WmQ"
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": "محترفين الديار العالمية",
    "image": `${baseUrl}/favicon.svg`,
    "url": baseUrl,
    "telephone": "+966553719009",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع الأمير سلطان",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "21423",
      "addressCountry": "SA"
    },
    "geo": { "@type": "GeoCoordinates", "latitude": 21.5433, "longitude": 39.1728 },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "125" },
    "sameAs": [
      "https://www.facebook.com/aldeyar.jeddah",
      "https://www.instagram.com/aldeyar.jeddah",
      "https://twitter.com/aldeyar_jeddah",
      "https://www.linkedin.com/company/aldeyar-global",
      "https://www.youtube.com/@aldeyar-jeddah",
      "https://share.google/GKcHjw3Gl5MX85WmQ"
    ],
    "hasMap": "https://share.google/GKcHjw3Gl5MX85WmQ"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "محترفين الديار العالمية",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "الرئيسية", "item": baseUrl },
      { "@type": "ListItem", "position": 2, "name": "خدماتنا", "item": `${baseUrl}/#services` },
      { "@type": "ListItem", "position": 3, "name": "معرض الأعمال", "item": `${baseUrl}/portfolio` },
      { "@type": "ListItem", "position": 4, "name": "اتصل بنا", "item": `${baseUrl}/contact` }
    ]
  };

  const extraData = Array.isArray(data) ? data : data ? [data] : [];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }} />
      {extraData.map((d, i) => (
        <script key={`structured-extra-${i}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}
    </>
  );
}
