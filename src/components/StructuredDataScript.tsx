export default function StructuredDataScript() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "محترفين الديار العالمية",
    "alternateName": "Al Deyar Professional Global",
    "url": "https://aldeyarksa.tech",
    "logo": "https://aldeyarksa.tech/images/logo.png",
    "image": "https://aldeyarksa.tech/images/logo.png",
    "description": "شركة رائدة في تركيب مظلات السيارات، البرجولات، السواتر، تنسيق الحدائق في جدة والمملكة العربية السعودية",
    "foundingDate": "2010",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+966-50-123-4567",
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
    "serviceArea": {
      "@type": "City",
      "name": "جدة"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات محترفين الديار",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "مظلات السيارات",
            "description": "تركيب مظلات السيارات بأعلى معايير الجودة"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "البرجولات",
            "description": "تصميم وتنفيذ برجولات خشبية وحديدية"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "السواتر",
            "description": "تركيب سواتر الخصوصية والحماية"
          }
        }
      ]
    }
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://aldeyarksa.tech/#organization",
    "name": "محترفين الديار العالمية",
    "image": "https://aldeyarksa.tech/favicon.svg",
    "url": "https://aldeyarksa.tech",
    "telephone": "+966-12-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "شارع الأمير سلطان",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "21423",
      "addressCountry": "SA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.5433,
      "longitude": 39.1728
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "125"
    }
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "محترفين الديار العالمية",
    "url": "https://aldeyarksa.tech",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://aldeyarksa.tech/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://aldeyarksa.tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "خدماتنا",
        "item": "https://aldeyarksa.tech/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "معرض الأعمال",
        "item": "https://aldeyarksa.tech/portfolio"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "اتصل بنا",
        "item": "https://aldeyarksa.tech/contact"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbData),
        }}
      />
    </>
  );
}