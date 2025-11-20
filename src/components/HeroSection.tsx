'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle, ArrowLeft, Star, MapPin, Clock, Shield, Award } from 'lucide-react';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    url: '/images/slider1.webp',
    alt: 'مظلات وبرجولات حدائق فاخرة - تركيب برجولات خشبية ومظلات سيارات جدة',
  },
  {
    url: '/images/slider2.webp',
    alt: 'تركيب مظلات سيارات لكسان وحديد - محترفين الديار جدة',
  },
  {
    url: '/images/slider3.webp',
    alt: 'سواتر حديد وقماش - تنسيق حدائق وساندوتش بانل جدة',
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const slideCount = slides.length;

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, slideCount]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black" aria-label="قسم البطل الرئيسي">
      {/* Background Video/Image Slider */}
      <div className="absolute inset-0 z-0" role="img" aria-label={slides[currentSlide].alt}>
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
              quality={index === 0 ? 75 : 65}
              priority={index === 0}
              fetchPriority={index === 0 ? 'high' : 'low'}
              loading={index === 0 ? 'eager' : 'lazy'}
              sizes="100vw"
              aria-hidden="true"
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyMzI3MmEiLz48L3N2Zz4="
              decoding="async"
            />
          </div>
        ))}
      </div>

      {/* Enhanced Overlay - Improved contrast for accessibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/65 to-black/75 z-10" />

      {/* Slider Controls - WCAG Accessibility */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="bg-white/20 backdrop-blur-md hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 shadow-lg focus-visible-ring"
          aria-label={isPlaying ? 'إيقاف السلايدر' : 'تشغيل السلايدر'}
          aria-pressed={isPlaying}
          type="button"
        >
          {isPlaying ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
        <div className="flex gap-2" role="tablist" aria-label="اختيار الصورة">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              type="button"
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible-ring ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
              aria-label={`الصورة ${index + 1}`}
              aria-selected={index === currentSlide}
              aria-current={index === currentSlide ? 'true' : 'false'}
              role="tab"
              tabIndex={index === currentSlide ? 0 : -1}
            />
          ))}
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-7xl mx-auto">
        {/* Trust Badges - محسن للجوال */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8 animate-fade-in px-4">
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center gap-1.5 sm:gap-2 transform hover:scale-105 transition-transform">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-current flex-shrink-0" />
            <span className="whitespace-nowrap">خبرة 15+ عاماً</span>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center gap-1.5 sm:gap-2 transform hover:scale-105 transition-transform">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">ضمان 10 سنوات</span>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 rounded-full text-xs sm:text-sm font-bold shadow-xl flex items-center gap-1.5 sm:gap-2 transform hover:scale-105 transition-transform">
            <Award className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="whitespace-nowrap">+5000 مشروع</span>
          </div>
        </div>

        {/* Main Heading - محسن للقراءة على الجوال */}
        <h1 className="hero-title text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 leading-tight animate-slide-up px-4">
          <span className="bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent block drop-shadow-lg">
            محترفين الديار
          </span>
          <span className="hero-subtitle block text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl mt-2 sm:mt-3 bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent font-extrabold drop-shadow-lg">
            مظلات وسواتر وبرجولات وساندوتش بانل جدة
          </span>
        </h1>

        {/* Subheading - مبسط للجوال */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 sm:mb-10 text-gray-100 leading-relaxed max-w-4xl mx-auto font-medium px-4 drop-shadow-md">
          تركيب مظلات سيارات • برجولات حدائق • سواتر • ساندوتش بانل • تنسيق حدائق • بيوت شعر • خيام ملكية • ترميم
        </p>

        {/* أزرار CTA محسّنة للجوال - أكبر وأوضح */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 justify-center items-stretch sm:items-center mb-8 sm:mb-12 md:mb-16 px-4 max-w-2xl mx-auto">
          <Button 
            asChild 
            size="lg" 
            className="w-full sm:w-auto text-lg sm:text-xl font-bold shadow-2xl bg-gradient-to-r from-accent to-amber-500 hover:from-accent/90 hover:to-amber-500/90 transform hover:scale-105 transition-all duration-300 active:scale-95 py-6 sm:py-7 px-8 sm:px-10 rounded-xl focus-visible-ring"
            aria-label="تواصل معنا عبر واتساب للحصول على استشارة مجانية"
          >
            <Link href="https://wa.me/+966553719009" className="flex items-center justify-center space-x-3 sm:space-x-4 space-x-reverse">
              <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
              <span>استشارة مجانية الآن</span>
            </Link>
          </Button>

          <Button 
            asChild 
            variant="outline" 
            size="lg" 
            className="w-full sm:w-auto text-lg sm:text-xl shadow-xl bg-white/20 backdrop-blur-md border-2 border-white/50 hover:bg-white/30 text-white font-bold transform hover:scale-105 transition-all duration-300 active:scale-95 py-6 sm:py-7 px-8 sm:px-10 rounded-xl focus-visible-ring"
            aria-label="اتصل بنا على رقم الهاتف"
          >
            <Link href="tel:+966553719009" className="flex items-center justify-center space-x-3 sm:space-x-4 space-x-reverse">
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 flex-shrink-0" />
              <span className="text-base sm:text-lg">966553719009+</span>
            </Link>
          </Button>
        </div>

        {/* روابط سريعة للخدمات - محسن للجوال مع تباين أفضل */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3 text-xs sm:text-sm max-w-4xl mx-auto px-4">
          <Link href="/services/mazallat" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target">
            مظلات سيارات جدة
          </Link>
          <Link href="/services/pergolas" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target">
            برجولات حدائق جدة
          </Link>
          <Link href="/services/sawater" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target">
            سواتر خصوصية جدة
          </Link>
          <Link href="/services/sandwich-panel" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target">
            ساندوتش بانل جدة
          </Link>
          <Link href="/services/landscaping" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target hidden sm:flex">
            تنسيق حدائق جدة
          </Link>
          <Link href="/services/byoot-shaar" className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 active:bg-white/35 transition-all duration-300 text-white font-medium whitespace-nowrap touch-target hidden sm:flex">
            بيوت شعر تراثية
          </Link>
        </div>
      </div>
    </section>
  );
}
