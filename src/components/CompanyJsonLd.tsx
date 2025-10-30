'use client';

import { useEffect } from 'react';

export default function CompanyJsonLd() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${baseUrl}/#organization`,
      name: 'محترفين الديار العالمية',
      alternateName: ['Aldeyar Global Professionals', 'الديار العالمية', 'محترفين الديار'],
      description:
        'الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر وتنسيق الحدائق. خبرة 15 عاماً وضمان شامل على جميع الأعمال.',
      url: baseUrl,
      telephone: ['+966553719009'],
      email: 'info@aldeyarksa.tech',
      logo: `${baseUrl}/favicon.svg`,
      image: [`${baseUrl}/favicon.svg`],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'شارع الأمير سلطان',
        addressLocality: 'جدة',
        addressRegion: 'منطقة مكة المكرمة',
        postalCode: '22233',
        addressCountry: 'SA',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 21.485811,
        longitude: 39.192505,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '22:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Friday',
          opens: '16:00',
          closes: '22:00',
        },
      ],
      priceRange: 'SAR 150 - SAR 5000',
      paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer', 'Check'],
      currenciesAccepted: 'SAR',
      areaServed: [
        { '@type': 'City', name: 'جدة' },
        { '@type': 'City', name: 'مكة المكرمة' },
        { '@type': 'City', name: 'الطائف' },
      ],
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: { '@type': 'GeoCoordinates', latitude: 21.485811, longitude: 39.192505 },
        geoRadius: '100000',
      },
      foundingDate: '2009',
      employees: { '@type': 'QuantitativeValue', value: 25 },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'خدمات محترفين الديار',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب مظلات السيارات',
              description: 'تركيب مظلات سيارات عالية الجودة مع ضمان شامل 10 سنوات',
              category: 'مظلات',
              areaServed: 'جدة',
              provider: { '@id': `${baseUrl}/#organization` },
            },
            price: '500',
            priceCurrency: 'SAR',
            availability: 'InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب البرجولات',
              description: 'تصميم وتركيب برجولات خشبية وحديدية للحدائق والفلل',
              category: 'برجولات',
              areaServed: 'جدة',
            },
            price: '1200',
            priceCurrency: 'SAR',
            availability: 'InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تركيب السواتر',
              description: 'تركيب سواتر الخصوصية والحماية بتصاميم عصرية ومواد عالية الجودة',
              category: 'سواتر',
              areaServed: 'جدة',
            },
            price: '350',
            priceCurrency: 'SAR',
            availability: 'InStock',
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'تنسيق الحدائق',
              description: 'تصميم وتنسيق الحدائق المنزلية والتجارية مع أنظمة الري الحديثة',
              category: 'تنسيق حدائق',
              areaServed: 'جدة',
            },
            price: '200',
            priceCurrency: 'SAR',
            availability: 'InStock',
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '247',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'أحمد المحمد' },
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody:
            'خدمة ممتازة وجودة عالية في تركيب مظلة السيارة. فريق محترف ومواعيد دقيقة.',
          datePublished: '2024-11-15',
        },
      ],
      sameAs: [
        'https://www.facebook.com/aldeyar.jeddah',
        'https://www.instagram.com/aldeyar.jeddah',
        'https://twitter.com/aldeyar_jeddah',
        'https://www.linkedin.com/company/aldeyar-global',
        'https://www.youtube.com/@aldeyar-jeddah',
        'https://share.google/GKcHjw3Gl5MX85WmQ',
      ],
      hasMap: 'https://share.google/GKcHjw3Gl5MX85WmQ',
      keywords:
        'مظلات جدة، سواتر جدة، برجولات جدة، تنسيق حدائق جدة، ساندوتش بانل، بيوت شعر، خيام م��كية، ترميم ملحقات',
      knowsAbout: [
        'تركيب المظلات',
        'تصميم البرجولات',
        'تركيب السواتر',
        'تنسيق الحدائق',
        'العزل الحراري',
        'بيوت الشعر التراثية',
      ],
      memberOf: { '@type': 'Organization', name: 'اتحاد شركات المقاولات السعودية' },
      award: ['أفضل شركة مظلات في جدة 2023', 'جائزة التميز في خدمة العملاء 2022'],
    };

    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'محترفين الديار العالمية',
      description:
        'موقع الشركة الرائدة في جدة لخدمات المظلات والسواتر والبرجولات وتنسيق الحدائق',
      publisher: { '@id': `${baseUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${baseUrl}/search?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'ar-SA',
      copyrightYear: '2024',
      copyrightHolder: { '@id': `${baseUrl}/#organization` },
    };

    const webPageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${baseUrl}/#webpage`,
      url: baseUrl,
      name: 'الصفحة الرئيسية - محترفين الديار العالمية',
      description:
        'الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر وتنسيق الحدائق مع ضمان شامل',
      isPartOf: { '@id': `${baseUrl}/#website` },
      about: { '@id': `${baseUrl}/#organization` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${baseUrl}/favicon.svg` },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      inLanguage: 'ar-SA',
    };

    const combinedSchema = {
      '@context': 'https://schema.org',
      '@graph': [localBusinessSchema, websiteSchema, webPageSchema],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(combinedSchema, null, 2);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null;
}
