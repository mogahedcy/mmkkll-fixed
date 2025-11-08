'use client';

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowLeft, Star, MapPin, Clock, Shield, Award } from 'lucide-react';

import { useState, useEffect } from 'react';
import Image from 'next/image';

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
              quality={85}
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-7xl mx-auto">
        {/* Trust Badges Row */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8 animate-fade-in">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 transform hover:scale-105 transition-transform">
            <Star className="w-4 h-4 fill-current" />
            <span>خبرة 15+ عاماً</span>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 transform hover:scale-105 transition-transform">
            <Shield className="w-4 h-4" />
            <span>ضمان 10 سنوات</span>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-xl flex items-center gap-2 transform hover:scale-105 transition-transform">
            <Award className="w-4 h-4" />
            <span>+5000 مشروع</span>
          </div>
        </div>

        {/* Main Heading with Animation */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-slide-up">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
            محترفين الديار
          </span>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-3 bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent font-extrabold">
            رواد المظلات والبرجولات في جدة
          </span>
        </h1>

        {/* Simplified Subheading */}
        <p className="text-xl md:text-2xl mb-10 text-gray-200 leading-relaxed max-w-3xl mx-auto font-medium">
          حماية فاخرة • تصاميم عصرية • جودة مضمونة
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16">
          <Button asChild size="lg" className="text-lg px-10 py-7 h-auto shadow-2xl bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 transform hover:scale-105 transition-all duration-300">
            <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
              <MessageCircle className="w-6 h-6" />
              <span className="font-bold">استشارة مجانية الآن</span>
            </Link>
          </Button>

          <Button asChild variant="outline" size="lg" className="text-lg px-10 py-7 h-auto shadow-xl bg-white/10 backdrop-blur-md border-2 border-white/30 hover:bg-white/20 text-white font-bold transform hover:scale-105 transition-all duration-300">
            <Link href="tel:+966553719009" className="flex items-center space-x-3 space-x-reverse">
              <Phone className="w-6 h-6" />
              <span>966553719009+</span>
            </Link>
          </Button>
        </div>

        {/* All Services Quick Access */}
        <div className="flex flex-wrap justify-center gap-3 text-sm max-w-4xl mx-auto">
          <Link href="/services/mazallat" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            مظلات سيارات
          </Link>
          <Link href="/services/pergolas" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            برجولات
          </Link>
          <Link href="/services/sawater" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            سواتر
          </Link>
          <Link href="/services/sandwich-panel" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            ساندوتش بانل
          </Link>
          <Link href="/services/renovation" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            ترميم
          </Link>
          <Link href="/services/landscaping" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            تنسيق حدائق
          </Link>
          <Link href="/services/byoot-shaar" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            بيوت شعر
          </Link>
          <Link href="/services/khayyam" className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 text-white font-medium">
            خيام ملكية
          </Link>
        </div>
      </div>
    </section>
  );
}
