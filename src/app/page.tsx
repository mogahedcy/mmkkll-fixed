import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import FAQSection from '@/components/FAQSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';
import HomePageBreadcrumb from '@/components/HomePageBreadcrumb';
import ReviewSchema from '@/components/ReviewSchema';
import SearchActionSchema from '@/components/SearchActionSchema';
import HowToSchema from '@/components/HowToSchema';
import ProductSchema from '@/components/ProductSchema';

const PortfolioSection = dynamic(() => import('@/components/PortfolioSection'), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-gray-100" />,
  ssr: true
});

const StickyWhatsApp = dynamic(() => import('@/components/StickyWhatsApp'));

export const metadata: Metadata = {
  title: 'مظلات وسواتر جدة | محترفين الديار - ضمان 10 سنوات',
  description: 'شركة محترفين الديار العالمية - تركيب مظلات سيارات، برجولات، سواتر، ساندوتش بانل، تنسيق حدائق، بيوت شعر بجدة. خبرة 15 عام، ضمان 10 سنوات. اتصل: 0553719009',
  keywords: 'مظلات سيارات جدة، برجولات خشبية جدة، سواتر جدة، ساندوتش بانل جدة، تنسيق حدائق جدة، بيوت شعر جدة، خيام ملكية، ترميم ملحقات جدة، مظلات لكسان، سواتر حديد، سواتر قماش، برجولات حدائق، هناجر جدة، مستودعات جدة، تركيب مظلات، مقاول مظلات جدة، أسعار المظلات في جدة، افضل شركة مظلات جدة، مظلات متحركة، تركيب مظلات حدائق منزلية، مظلات خشبية فاخرة، مظلات مواقف سيارات',
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
    title: 'مظلات وسواتر جدة | محترفين الديار - ضمان 10 سنوات',
    description: 'محترفين الديار العالمية - تركيب مظلات سيارات، برجولات حدائق، سواتر، ساندوتش بانل، تنسيق حدائق، بيوت شعر بجدة. خبرة 15 عام، ضمان 10 سنوات، أسعار منافسة',
    url: 'https://www.aldeyarksa.tech',
    siteName: 'محترفين الديار العالمية',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://www.aldeyarksa.tech/images/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'محترفين الديار العالمية - مظلات سيارات وبرجولات وسواتر جدة',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'مظلات وسواتر جدة | محترفين الديار - ضمان 10 سنوات',
    description: 'محترفين الديار العالمية - تركيب مظلات سيارات، برجولات، سواتر، ساندوتش بانل، تنسيق حدائق بجدة. خبرة 15 عام، ضمان 10 سنوات',
    images: ['https://www.aldeyarksa.tech/images/hero-bg.webp'],
  },
};

export default function HomePage() {
  return (
    <>
      <HomePageBreadcrumb />
      <ReviewSchema 
        serviceName="مظلات وبرجولات وسواتر جدة - محترفين الديار العالمية"
        itemType="LocalBusiness"
        serviceUrl="https://www.aldeyarksa.tech"
        aggregateRating={{ ratingValue: 4.9, reviewCount: 287 }}
      />
      <SearchActionSchema />
      <HowToSchema 
        name="كيفية تركيب مظلات السيارات"
        description="دليل شامل لتركيب مظلات السيارات بطريقة احترافية"
        totalTime="P1D"
        steps={[
          {
            name: "الاستشارة والمعاينة",
            text: "نقوم بزيارة الموقع وأخذ القياسات الدقيقة وتحديد نوع المظلة المناسب حسب المساحة والميزانية"
          },
          {
            name: "التصميم والتخطيط",
            text: "نقدم تصميم ثلاثي الأبعاد للمظلة ونختار الخامات الأفضل جودة من PVC أو القماش المقاوم للحرارة"
          },
          {
            name: "تجهيز الموقع",
            text: "نجهز القواعد الخرسانية والأعمدة الحديدية بمقاسات مدروسة لتحمل الرياح والأحمال"
          },
          {
            name: "التركيب والتشطيب",
            text: "نركب الهيكل المعدني ونشد القماش بطريقة احترافية مع التأكد من الميول الصحيحة لتصريف المياه"
          }
        ]}
      />
      <ProductSchema 
        name="مظلات سيارات PVC - جودة عالمية"
        description="مظلات سيارات من خامات PVC عالمية، مقاومة للحرارة والأمطار، بضمان 10 سنوات"
        price="2500"
        rating={{ ratingValue: 4.9, reviewCount: 287 }}
        sku="CAR-SHADE-001"
      />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <HowItWorksSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <StickyWhatsApp />
      <Footer />
    </>
  );
}
