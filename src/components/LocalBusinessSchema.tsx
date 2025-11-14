export default function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.aldeyarksa.tech/#organization",
    "name": "محترفين الديار العالمية",
    "alternateName": "محترفين الديار | مظلات وبرجولات جدة",
    "description": "شركة متخصصة في تركيب المظلات والبرجولات والسواتر والساندوتش بانل وتنسيق الحدائق في جدة مع خبرة 15 عاماً وضمان 10 سنوات",
    "url": "https://www.aldeyarksa.tech",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.aldeyarksa.tech/images/logo.png",
      "width": "250",
      "height": "250"
    },
    "image": [
      "https://www.aldeyarksa.tech/images/slider1.webp",
      "https://www.aldeyarksa.tech/images/slider2.webp",
      "https://www.aldeyarksa.tech/images/slider3.webp"
    ],
    "telephone": "+966553719009",
    "email": "ksaaldeyar@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "جدة",
      "addressLocality": "جدة",
      "addressRegion": "منطقة مكة المكرمة",
      "postalCode": "21442",
      "addressCountry": {
        "@type": "Country",
        "name": "SA"
      }
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "21.5433",
      "longitude": "39.1728"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "جدة",
        "containedIn": {
          "@type": "AdministrativeArea",
          "name": "منطقة مكة المكرمة"
        }
      }
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday"
        ],
        "opens": "08:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Friday",
        "opens": "14:00",
        "closes": "22:00"
      }
    ],
    "paymentAccepted": "نقداً، بطاقات ائتمان، تحويل بنكي",
    "currenciesAccepted": "SAR",
    "foundingDate": "2010",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "287",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات محترفين الديار",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تركيب مظلات سيارات",
            "description": "تركيب مظلات سيارات بتصاميم عصرية وخامات عالية الجودة",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تركيب برجولات حدائق",
            "description": "تركيب برجولات خشبية وحديدية للحدائق والاستراحات",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تركيب سواتر",
            "description": "تركيب سواتر للخصوصية والحماية بأنواع متعددة",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "ساندوتش بانل",
            "description": "تركيب ساندوتش بانل للعزل الحراري والصوتي",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "تنسيق حدائق",
            "description": "تصميم وتنسيق الحدائق بأحدث الأساليب",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "بيوت شعر تراثية",
            "description": "تصنيع وتركيب بيوت شعر تراثية أصيلة",
            "provider": {
              "@id": "https://www.aldeyarksa.tech/#organization"
            }
          }
        }
      ]
    },
    "slogan": "خبرة 15 عاماً في خدمتكم - ضمان 10 سنوات",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+966553719009",
        "contactType": "خدمة العملاء",
        "areaServed": "SA",
        "availableLanguage": ["ar", "Arabic"],
        "contactOption": "TollFree"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/aldiyarglobal",
      "https://wa.me/966553719009"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
    />
  );
}
