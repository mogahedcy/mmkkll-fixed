'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'en', label: 'English', flag: '🇬🇧' }
  ];

  const handleLanguageChange = (lang: 'ar' | 'en') => {
    setLanguage(lang);
    setIsOpen(false);
    // Force page reload to apply language across all components
    window.location.reload();
  };

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors flex items-center gap-1"
        aria-label="تبديل اللغة"
        title={language === 'ar' ? 'تبديل إلى الإنجليزية' : 'Switch to Arabic'}
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-semibold">{language.toUpperCase()}</span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className={`absolute top-full ${language === 'ar' ? 'left-0' : 'right-0'} mt-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden`}
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code as 'ar' | 'en')}
                whileHover={{ backgroundColor: lang.code === language ? undefined : '#f3f4f6' }}
                className={`w-full px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  lang.code === language
                    ? 'bg-primary text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
                {lang.code === language && (
                  <span className="mr-auto">✓</span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
