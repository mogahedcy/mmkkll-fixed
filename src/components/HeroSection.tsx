'use client';

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowLeft, Star, MapPin, Clock } from 'lucide-react';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    url: '/images/slider1.webp',
    alt: 'مظلات وبرجولات حدائق فاخرة في جدة',
  },
  {
    url: '/images/slider2.webp',
    alt: 'تركيب مظلات سيارات عصرية بجودة عالية',
  },
  {
    url: '/images/slider3.webp',
    alt: 'سواتر خصوصية وتنسيق حدائق احترافي',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, mounted]);

  if (!mounted) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white">
          <div className="animate-pulse">جاري التحميل...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Background Video/Image Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={`slide-${slide.url}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={slide.url}
              alt={slide.alt}
              fill
              style={{ objectFit: 'cover' }}
              quality={90}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 space-x-reverse bg-accent/10 text-accent px-6 py-3 rounded-full text-sm font-medium mb-8">
          <Star className="w-4 h-4 fill-current" />
          <span>الشركة الرائدة في المملكة العربية السعودية منذ 15 عاماً</span>
          <Star className="w-4 h-4 fill-current" />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          محترفين الديار العالمية
          <span className="block text-3xl md:text-5xl mt-2 text-primary">
            رواد الخدمات المعمارية والتصميمية في جدة
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
          خبرة 15 عاماً في تركيب المظلات والبرجولات والسواتر وتنسيق الحدائق
          <br />
          ضمان شامل 10 سنوات • تركيب احترافي • أسعار تنافسية • خدمة عملاء 24/7
        </p>

        {/* Key Features */}
        <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="font-medium">8 خدمات متخصصة بالمدينة وضواحيها</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            <Clock className="w-5 h-5 text-accent" />
            <span className="font-medium">ضمان شامل 10 سنوات على كافة الأعمال</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse bg-white/20 px-4 py-2 rounded-full shadow-sm backdrop-blur-sm">
            <Star className="w-5 h-5 text-accent" />
            <span className="font-medium">أكثر من 5000 مشروع منجز بنجاح</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
            <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
              <MessageCircle className="w-5 h-5" />
              <span>استشارة مجانية عبر واتساب</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
            <Link href="tel:+966553719009" className="flex items-center space-x-3 space-x-reverse">
              <Phone className="w-5 h-5" />
              <span>اتصال مباشر: 966553719009+</span>
            </Link>
          </Button>
        </div>

        {/* Quick Access Links */}
        <div className="flex flex-wrap justify-center gap-3 text-sm">
          <Link href="/services/mazallat" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>مظلات سيارات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/pergolas" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>برجولات حدائق</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/sawater" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>سواتر خصوصية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/sandwich-panel" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>ساندوتش بانل</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/renovation" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>ترميم ملحقات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/landscaping" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>تنسيق حدائق</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/byoot-shaar" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>بيوت شعر</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <Link href="/services/khayyam" className="flex items-center space-x-2 space-x-reverse text-accent hover:text-accent/80 transition-colors">
            <span>خيام ملكية</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
