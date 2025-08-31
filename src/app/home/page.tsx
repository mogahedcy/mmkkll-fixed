import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ServiceAreasSection from '@/components/ServiceAreasSection';
import FAQSection from '@/components/FAQSection';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';

export default function HomeAppPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="relative">
          <h1 className="sr-only">محترفين الديار العالمية - أفضل شركة مظلات وبرجولات في جدة</h1>
          <HeroSection />
        </section>
        <ServicesSection />
        <PortfolioSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <ServiceAreasSection />
        <FAQSection />
        <QuoteSection />
      </main>
      <Footer />
    </>
  );
}
