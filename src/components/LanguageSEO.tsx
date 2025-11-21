'use client';

import { useEffect } from 'react';

export function LanguageSEO() {
  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.pathname : '';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';

    // Add hreflang links for Arabic
    let arLink = document.querySelector("link[hreflang='ar']");
    if (!arLink) {
      arLink = document.createElement('link');
      arLink.rel = 'alternate';
      arLink.hreflang = 'ar';
      document.head.appendChild(arLink);
    }
    arLink.href = `${baseUrl}${currentUrl}?lang=ar`;

    // Add hreflang links for English
    let enLink = document.querySelector("link[hreflang='en']");
    if (!enLink) {
      enLink = document.createElement('link');
      enLink.rel = 'alternate';
      enLink.hreflang = 'en';
      document.head.appendChild(enLink);
    }
    enLink.href = `${baseUrl}${currentUrl}?lang=en`;

    // Add x-default
    let xDefaultLink = document.querySelector("link[hreflang='x-default']");
    if (!xDefaultLink) {
      xDefaultLink = document.createElement('link');
      xDefaultLink.rel = 'alternate';
      xDefaultLink.hreflang = 'x-default';
      document.head.appendChild(xDefaultLink);
    }
    xDefaultLink.href = `${baseUrl}${currentUrl}`;

    // Update canonical
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${baseUrl}${currentUrl}`;
  }, []);

  return null;
}
