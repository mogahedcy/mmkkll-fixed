interface ArticleSchemaProps {
  headline: string;
  description: string;
  author: {
    name: string;
    url?: string;
  };
  datePublished: string;
  dateModified?: string;
  image?: string | string[];
  url: string;
  publisher?: {
    name: string;
    logo?: string;
    url?: string;
  };
  articleBody?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
}

export default function ArticleSchema({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  image,
  url,
  publisher,
  articleBody,
  keywords,
  articleSection,
  wordCount
}: ArticleSchemaProps) {
  const defaultPublisher = {
    name: 'محترفين الديار العالمية',
    logo: 'https://www.aldeyarksa.tech/favicon.svg',
    url: 'https://www.aldeyarksa.tech'
  };

  const publisherData = publisher || defaultPublisher;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Person",
      "name": author.name,
      ...(author.url && { "url": author.url })
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "publisher": {
      "@type": "Organization",
      "name": publisherData.name,
      "logo": {
        "@type": "ImageObject",
        "url": publisherData.logo
      },
      ...(publisherData.url && { "url": publisherData.url })
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    ...(image && {
      "image": Array.isArray(image) ? image : [image]
    }),
    ...(articleBody && { "articleBody": articleBody }),
    ...(keywords && keywords.length > 0 && { "keywords": keywords.join(", ") }),
    ...(articleSection && { "articleSection": articleSection }),
    ...(wordCount && { "wordCount": wordCount }),
    "inLanguage": "ar-SA",
    "isAccessibleForFree": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
  );
}
