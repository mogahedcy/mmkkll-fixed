import type { Metadata } from 'next';
import { Suspense } from 'react';
import ArticlesPageClient from './ArticlesPageClient';
import StructuredDataScript from '@/components/StructuredDataScript';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'أرشيف المقالات | محترفين الديار العالمية - مقالات ونصائح في المظلات والبرجولات',
  description: 'اكتشف أحدث المقالات والنصائح حول المظلات، البرجولات، السواتر، وتنسيق الحدائق من خبراء محترفين الديار العالمية في جدة.',
  keywords: 'مقالات مظلات, نصائح برجولات, مقالات تنسيق حدائق, مظلات جدة, برجولات جدة, محترفين الديار العالمية',
  authors: [{ name: 'محترفين الديار العالمية' }],
  creator: 'محترفين الديار العالمية',
  publisher: 'محترفين الديار العالمية',
  robots: 'index, follow',
  openGraph: {
    title: 'أرشيف المقالات | محترفين الديار العالمية',
    description: 'اكتشف مقالاتنا المتخصصة في المظلات والبرجولات والسواتر وتنسيق الحدائق',
    url: 'https://www.aldeyarksa.tech/articles',
    siteName: 'محترفين الديار العالمية',
    images: [
      {
        url: 'https://www.aldeyarksa.tech/uploads/mazallat-1.webp',
        width: 1200,
        height: 630,
        alt: 'أرشيف مقالات محترفين الديار العالمية'
      }
    ],
    locale: 'ar_SA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'أرشيف المقالات | محترفين الديار العالمية',
    description: 'اكتشف مقالاتنا المتخصصة في المظلات والبرجولات',
    images: ['https://www.aldeyarksa.tech/uploads/mazallat-1.webp']
  },
  alternates: {
    canonical: '/articles'
  }
};

const articlesStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'أرشيف المقالات - محترفين الديار العالمية',
  description: 'مقالات متخصصة في المظلات والبرجولات والسواتر وتنسيق الحدائق',
  url: 'https://www.aldeyarksa.tech/articles',
  publisher: {
    '@type': 'Organization',
    name: 'محترفين الديار العالمية',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.aldeyarksa.tech/logo.svg'
    }
  }
};

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
        <p className="text-gray-600">جاري تحميل المقالات...</p>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  return (
    <>
      <StructuredDataScript data={articlesStructuredData} />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <ArticlesPageClient />
      </Suspense>
      <Footer />
    </>
  );
}
