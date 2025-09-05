import { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'محترفين الديار العالمية | أفضل مظلات وبرجولات جدة - خبرة 15 عام',
  description: '🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر. خبرة 15 عاماً ✅ ضمان 10 سنوات ✅ تركيب احترافي ✅ أسعار منافسة. اتصل الآن للحصول على استشارة مجانية!',
  keywords: 'مظلات سيارات جدة، برجولات خشبية جدة، سواتر خصوصية جدة، محترفين الديار العالمية، تركيب مظلات جدة، برجولات حدائق، مظلات حديد، سواتر معدنية، ساندوتش بانل جدة، تنسيق حدائق جدة، بيوت شعر تراثية، خيام ملكية جدة، مقاول مظلات جدة، شركة برجولات جدة، أفضل مظلات جدة، تركيب برجولات احترافي، مظلات بأسعار منافسة، برجولات ألومنيوم جدة',
  authors: [{ name: 'محترفين الديار العالمية' }],
  robots: 'index, follow',
  alternates: {
    canonical: 'https://aldeyarksa.tech/',
    languages: {
      'ar-SA': 'https://aldeyarksa.tech/',
    },
  },
  openGraph: {
    title: 'محترفين الديار العالمية - أفضل مظلات وبرجولات جدة',
    description: '🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر. خبرة 15 عاماً ✅ ضمان 10 سنوات ✅ تركيب احترافي ✅ أسعار منافسة',
    url: 'https://aldeyarksa.tech/',
    siteName: 'محترفين الديار العالمية',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://aldeyarksa.tech/images/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'محترفين الديار العالمية - مظلات وبرجولات جدة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'محترفين الديار العالمية - أفضل مظلات وبرجولات جدة',
    description: '🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر. خبرة 15 عاماً ✅ ضمان 10 سنوات',
    images: ['https://aldeyarksa.tech/images/hero-bg.webp'],
  },
  verification: {
    google: 'تم التحقق من Google Search Console',
  },
  other: {
    'google-site-verification': 'تم التحقق من الموقع',
    'msvalidate.01': 'تم التحقق من Bing',
    'yandex-verification': 'تم التحقق من Yandex',
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <Footer />
    </>
  );
}