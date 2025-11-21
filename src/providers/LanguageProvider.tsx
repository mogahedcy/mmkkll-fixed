'use client';

import React, { createContext, useEffect, useState, type ReactNode } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const [isMounted, setIsMounted] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language | null;
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'ar';
    
    const initialLanguage = savedLanguage || browserLang || 'ar';
    setLanguageState(initialLanguage);
    applyLanguage(initialLanguage);
  }, []);

  // Apply language changes
  const applyLanguage = (lang: Language) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('language', lang);
    
    // Update canonical and alternate links for SEO
    updateCanonicalLinks(lang);
  };

  const updateCanonicalLinks = (lang: Language) => {
    const currentUrl = window.location.pathname;
    
    // Update canonical
    let canonicalLink = document.querySelector("link[rel='canonical']") as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      (canonicalLink as HTMLLinkElement).rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    (canonicalLink as HTMLLinkElement).href = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech'}${currentUrl}?lang=${lang}`;
    
    // Update alternate links
    const languages = [
      { code: 'ar', hreflang: 'ar' },
      { code: 'en', hreflang: 'en' }
    ];
    
    languages.forEach(({ code, hreflang }) => {
      let altLink = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement;
      if (!altLink) {
        altLink = document.createElement('link');
        (altLink as HTMLLinkElement).rel = 'alternate';
        (altLink as any).hreflang = hreflang;
        document.head.appendChild(altLink);
      }
      (altLink as HTMLLinkElement).href = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech'}${currentUrl}?lang=${code}`;
    });

    // Add x-default
    let xDefaultLink = document.querySelector("link[hreflang='x-default']") as HTMLLinkElement;
    if (!xDefaultLink) {
      xDefaultLink = document.createElement('link');
      (xDefaultLink as HTMLLinkElement).rel = 'alternate';
      (xDefaultLink as any).hreflang = 'x-default';
      document.head.appendChild(xDefaultLink);
    }
    (xDefaultLink as HTMLLinkElement).href = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech'}${currentUrl}`;
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    applyLanguage(lang);
  };

  // Prevent flash of unstyled content
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL: language === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
}
