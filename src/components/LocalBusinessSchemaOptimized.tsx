'use client';

import { useEffect } from 'react';

export default function LocalBusinessSchemaOptimized() {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "محترفين الديار العالمية",
      "url": "https://www.aldeyarksa.tech",
      "telephone": "+966553719009",
      "serviceArea": ["المرجان", "الروضة", "المنار", "النعيم", "البشائر"],
      "aggregateRating": {"ratingValue": 4.8, "reviewCount": 150}
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
  }, []);

  return null;
}
