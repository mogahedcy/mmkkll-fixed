import React from 'react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  views?: number;
}

interface FAQStructuredDataProps {
  faqs: FAQ[];
  totalRating?: number;
  totalReviews?: number;
}

export default function FAQStructuredData({ 
  faqs, 
  totalRating = 4.8,
  totalReviews = 450
}: FAQStructuredDataProps) {
  // إنشاء FAQPage schema مع aggregate rating
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, idx) => ({
      "@type": "Question",
      "@id": `https://www.aldeyarksa.tech/faq#question-${faq.id}`,
      "position": idx + 1,
      "name": faq.question,
      "text": faq.question,
      "keywords": [faq.category, "محترفين الديار", "جدة"].filter(Boolean),
      "author": {
        "@type": "Organization",
        "name": "محترفين الديار العالمية"
      },
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
        "url": `https://www.aldeyarksa.tech/faq#answer-${faq.id}`,
        "author": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية",
          "url": "https://www.aldeyarksa.tech"
        },
        "inLanguage": "ar-SA"
      },
      ...(faq.views && { "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": Math.min(5, 3 + (faq.views / 100)),
        "reviewCount": Math.floor(faq.views / 10) || 1,
        "bestRating": "5",
        "worstRating": "1"
      }})
    })),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": totalRating,
      "reviewCount": totalReviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "isPartOf": {
      "@type": "WebSite",
      "@id": "https://www.aldeyarksa.tech/",
      "name": "محترفين الديار العالمية"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
    />
  );
}
