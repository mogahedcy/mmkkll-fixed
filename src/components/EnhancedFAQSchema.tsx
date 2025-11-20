interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  slug?: string | null;
  metaTitle?: string | null;
  keywords?: string | null;
}

interface EnhancedFAQSchemaProps {
  faqs: FAQ[];
  baseUrl?: string;
}

export default function EnhancedFAQSchema({ faqs, baseUrl = 'https://www.aldeyarksa.tech' }: EnhancedFAQSchemaProps) {
  if (!faqs || faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'الأسئلة الشائعة - محترفين الديار العالمية',
    description: 'إجابات شاملة على الأسئلة الشائعة حول خدمات المظلات والبرجولات والسواتر في جدة',
    url: `${baseUrl}/faq`,
    inLanguage: 'ar',
    publisher: {
      '@type': 'Organization',
      name: 'محترفين الديار العالمية',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/favicon.svg`
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'جدة',
        addressRegion: 'منطقة مكة المكرمة',
        addressCountry: 'SA'
      }
    },
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      text: faq.question,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        author: {
          '@type': 'Organization',
          name: 'محترفين الديار العالمية'
        }
      },
      ...(faq.keywords && {
        keywords: faq.keywords
      }),
      ...(faq.slug && {
        url: `${baseUrl}/faq/${faq.slug}`
      })
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: baseUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'الأسئلة الشائعة',
        item: `${baseUrl}/faq`
      }
    ]
  };

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'الأسئلة الشائعة',
    description: 'إجابات على أكثر الأسئلة شيوعاً حول خدماتنا',
    url: `${baseUrl}/faq`,
    inLanguage: 'ar',
    isPartOf: {
      '@type': 'WebSite',
      name: 'محترفين الديار العالمية',
      url: baseUrl
    },
    breadcrumb: breadcrumbSchema
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
    </>
  );
}
