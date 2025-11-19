import React from 'react';
import StructuredDataScript from './StructuredDataScript';

interface ProductSchemaProps {
  name: string;
  description: string;
  image?: string;
  price: string;
  currency?: string;
  availability?: string;
  rating?: {
    ratingValue: number;
    reviewCount: number;
  };
  brand?: string;
  sku?: string;
}

export default function ProductSchema({ 
  name, 
  description, 
  image = 'https://www.aldeyarksa.tech/images/hero-bg.webp',
  price,
  currency = 'SAR',
  availability = 'https://schema.org/InStock',
  rating,
  brand = 'محترفين الديار العالمية',
  sku
}: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": image,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.aldeyarksa.tech",
      "priceCurrency": currency,
      "price": price,
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": availability,
      "itemCondition": "https://schema.org/NewCondition"
    },
    ...(sku && { "sku": sku }),
    ...(rating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": rating.ratingValue,
        "reviewCount": rating.reviewCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    })
  };

  return <StructuredDataScript data={schema} />;
}
