export const translations = {
  ar: {
    // Navigation
    home: 'الرئيسية',
    about: 'من نحن',
    portfolio: 'معرض الأعمال',
    blog: 'المدونة',
    contact: 'اتصل بنا',
    services: 'الخدمات',
    search: 'البحث',
    call: 'اتصل الآن',
    
    // Services
    carShades: 'مظلات السيارات',
    pergolas: 'البرجولات',
    sawater: 'السواتر',
    landscaping: 'تنسيق الحدائق',
    sandwichPanel: 'ساندوتش بانل',
    tents: 'الخيام والبيوت الشعر',
    
    // Common
    language: 'اللغة',
    theme: 'المظهر',
    menu: 'القائمة',
    close: 'إغلاق',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'نجح',
    
    // CTA
    getQuote: 'اطلب عرض سعر',
    contactUs: 'تواصل معنا',
    learnMore: 'اعرف المزيد',
    
    // Common descriptions
    companyName: 'محترفين الديار العالمية',
    tagline: 'خبرة +15 عاماً في جدة والمملكة'
  },
  en: {
    // Navigation
    home: 'Home',
    about: 'About Us',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
    services: 'Services',
    search: 'Search',
    call: 'Call Now',
    
    // Services
    carShades: 'Car Shades',
    pergolas: 'Pergolas',
    sawater: 'Sawater',
    landscaping: 'Landscaping',
    sandwichPanel: 'Sandwich Panel',
    tents: 'Tents & Bedouin Tents',
    
    // Common
    language: 'Language',
    theme: 'Theme',
    menu: 'Menu',
    close: 'Close',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // CTA
    getQuote: 'Get Quote',
    contactUs: 'Contact Us',
    learnMore: 'Learn More',
    
    // Common descriptions
    companyName: 'Al Deyar Global',
    tagline: 'Experience +15 years in Jeddah and Saudi Arabia'
  }
};

export function t(key: string, language: 'ar' | 'en'): string {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return typeof value === 'string' ? value : key;
}
