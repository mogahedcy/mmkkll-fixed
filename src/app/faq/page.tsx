import type { Metadata } from 'next';
import { Suspense } from 'react';
import FAQPageClient from './FAQPageClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';
import { generateCanonicalUrl } from '@/lib/seo-utils';
import { prisma } from '@/lib/prisma';
import EnhancedFAQSchema from '@/components/EnhancedFAQSchema';

export const metadata: Metadata = {
  title: 'الأسئلة الشائعة | محترفين الديار العالمية - إجابات شاملة',
  description: 'إجابات شاملة على الأسئلة الشائعة حول خدمات محترفين الديار العالمية في جدة. المظلات، السواتر، البرجولات، الخيام، الأسعار، الضمان، التركيب والصيانة.',
  keywords: 'أسئلة شائعة جدة، مظلات أسئلة، سواتر أسئلة، أسعار مظلات، ضمان مظلات، محترفين الديار العالمية',
  authors: [{ name: 'محترفين الديار العالمية' }],
  creator: 'محترفين الديار العالمية',
  publisher: 'محترفين الديار العالمية',
  robots: 'index, follow',
  openGraph: {
    title: 'الأسئلة الشائعة | محترفين الديار العالمية',
    description: 'إجابات شاملة على الأسئلة الشائعة حول خدماتنا في جدة',
    url: generateCanonicalUrl('/faq'),
    siteName: 'محترفين الديار العالمية',
    images: [
      {
        url: 'https://www.aldeyarksa.tech/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'الأسئلة الشائعة - محترفين الديار العالمية'
      }
    ],
    locale: 'ar_SA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'الأسئلة الشائعة | محترفين الديار العالمية',
    description: 'إجابات شاملة على الأسئلة الشائعة حول خدماتنا',
    images: ['https://www.aldeyarksa.tech/favicon.svg']
  },
  alternates: {
    canonical: '/faq'
  }
};

async function getFAQs() {
  try {
    const faqs = await prisma.faqs.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: [
        { featured: 'desc' },
        { order: 'asc' },
        { views: 'desc' }
      ],
      select: {
        id: true,
        question: true,
        answer: true,
        category: true,
        slug: true,
        metaTitle: true,
        keywords: true,
        featured: true,
        order: true,
        views: true,
        helpfulness: true,
        createdAt: true
      }
    });
    
    return faqs;
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return [];
  }
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
        <p className="text-gray-600">جاري تحميل الأسئلة الشائعة...</p>
      </div>
    </div>
  );
}

export default async function FAQPage() {
  const faqs = await getFAQs();
  
  return (
    <>
      <EnhancedFAQSchema faqs={faqs} />
      <Navbar />
      <Suspense fallback={<LoadingFallback />}>
        <FAQPageClient initialFAQs={faqs} />
      </Suspense>
      <Footer />
    </>
  );
}
