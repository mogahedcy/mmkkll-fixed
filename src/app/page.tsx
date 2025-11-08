import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import { generateLocalBusinessSchema, generateOrganizationSchema } from '@/lib/seo-utils';

export const metadata: Metadata = {
  title: 'محترفين الديار | مظلات وبرجولات - ضمان 10 سنوات',
  description: 'تركيب مظلات، برجولات، سواتر في جدة بخبرة +15 سنة. ضمان 10 سنوات، خدمة 24/7. اتصل الآن: 0553719009',
  keywords: 'مظلات سيارات جدة، برجولات خشبية، سواتر خصوصية، تركيب مظلات، برجولات حدائق، مظلات حديد، سواتر معدنية، ساندوتش بانل، تنسيق حدائق، بيوت شعر، خيام ملكية',
  authors: [{ name: 'محترفين الديار العالمية' }],
  robots: 'index, follow',
  alternates: {
    canonical: '/',
    languages: {
      'ar-SA': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    title: 'محترفين الديار | مظلات وبرجولات جدة',
    description: 'الشركة الرائدة لتركيب المظلات والبرجولات في جدة. خبرة 15 عاماً، ضمان 10 سنوات، تركيب احترافي، أسعار منافسة',
    url: 'https://www.aldeyarksa.tech',
    siteName: 'محترفين الديار العالمية',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://www.aldeyarksa.tech/images/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'محترفين الديار العالمية - مظلات وبرجولات جدة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'محترفين الديار | مظلات وبرجولات جدة',
    description: 'الشركة الرائدة لتركيب المظلات والبرجولات في جدة. خبرة 15 عاماً، ضمان 10 سنوات',
    images: ['https://www.aldeyarksa.tech/images/hero-bg.webp'],
  },
};

export default function HomePage() {
  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'محترفين الديار العالمية',
    description: 'شركة رائدة في جدة متخصصة في تصميم وتركيب المظلات، البرجولات، السواتر، تنسيق الحدائق وبيوت الشعر. خبرة 15 عاماً، ضمان شامل 10 سنوات، أسعار منافسة.',
    image: 'https://www.aldeyarksa.tech/images/hero-bg.webp',
    priceRange: '$$'
  });

  const organizationSchema = generateOrganizationSchema({
    name: 'محترفين الديار العالمية',
    description: 'محترفين الديار العالمية - شركة رائدة في مجال تركيب المظلات والبرجولات والسواتر في جدة. نقدم خدمات متميزة بأعلى معايير الجودة.',
    logo: 'https://www.aldeyarksa.tech/favicon.svg'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
