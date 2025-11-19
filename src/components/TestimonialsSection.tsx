'use client';

import { useState, useEffect } from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReviewSchema from './ReviewSchema';

const testimonials = [
  {
    id: 1,
    name: 'أحمد المالكي',
    location: 'حي الروضة، جدة',
    service: 'مظلات سيارات',
    rating: 5,
    text: 'خدمة ممتازة من محترفين الديار. تم تركيب مظلات السيارات بجودة عالية وفي الوقت المحدد. أنصح بالتعامل معهم.',
    date: '2024'
  },
  {
    id: 2,
    name: 'فاطمة العتيبي',
    location: 'حي النسيم، جدة',
    service: 'برجولة حديقة',
    rating: 5,
    text: 'برجولة الحديقة تمت بإتقان شديد. التصميم رائع والخامات عالية الجودة. شكراً لفريق محترفين الديار.',
    date: '2024'
  },
  {
    id: 3,
    name: 'محمد الغامدي',
    location: 'حي الأندلس، جدة',
    service: 'ساندوتش بانل',
    rating: 5,
    text: 'تركيب ساندوتش بانل لمستودعي تم بمهنية عالية. العزل ممتاز والتنفيذ سريع. أفضل شركة في جدة.',
    date: '2023'
  },
  {
    id: 4,
    name: 'سارة القحطاني',
    location: 'حي الشاطئ، جدة',
    service: 'سواتر خصوصية',
    rating: 5,
    text: 'السواتر حققت الخصوصية المطلوبة بتصميم جميل. فريق العمل محترف والخدمة متميزة.',
    date: '2024'
  },
  {
    id: 5,
    name: 'عبدالله الحربي',
    location: 'شمال جدة',
    service: 'ترميم ملحقات',
    rating: 5,
    text: 'ترميم الملحق تم بشكل رائع. اهتمام بالتفاصيل ومواد عالية الجودة. النتيجة فاقت التوقعات.',
    date: '2024'
  },
  {
    id: 6,
    name: 'نورا السلمي',
    location: 'حي الزهراء، جدة',
    service: 'تنسيق حدائق',
    rating: 5,
    text: 'تنسيق الحديقة أصبح أجمل من المتوقع. النباتات مناسبة للمناخ ونظام الري ممتاز.',
    date: '2023'
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextTestimonial = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
  };

  const prevTestimonial = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
  };

  const currentTestimonial = testimonials[currentIndex];

  const reviewsForSchema = testimonials.map(t => ({
    author: t.name,
    rating: t.rating,
    reviewBody: t.text,
    datePublished: `${t.date}-01-01`,
    title: `تقييم ${t.service}`
  }));

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-accent/5">
      <ReviewSchema
        serviceName="خدمات محترفين الديار العالمية - مظلات وبرجولات جدة"
        itemType="LocalBusiness"
        serviceUrl="https://www.aldeyarksa.tech"
        aggregateRating={{
          ratingValue: 4.9,
          reviewCount: testimonials.length
        }}
        reviews={reviewsForSchema}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-6 py-3 rounded-full mb-6">
            <Star className="w-5 h-5 text-accent fill-current" />
            <span className="font-bold text-accent">تقييم 4.9 من 5</span>
            <Star className="w-5 h-5 text-accent fill-current" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">
            آراء عملائنا السعداء
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ثقة أكثر من 5000 عميل في جدة
          </p>
        </div>

        {/* Enhanced Main Testimonial Display */}
        <div className="max-w-5xl mx-auto mb-16">
          <div
            className="bg-gradient-to-br from-white to-accent/5 rounded-3xl shadow-2xl p-10 md:p-16 relative overflow-hidden border-2 border-accent/20"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(true)}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-accent/10 to-transparent rounded-full -mr-20 -mt-20" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tl from-amber-500/10 to-transparent rounded-full -ml-16 -mb-16" />

            {/* Quote Icon */}
            <div className="absolute top-8 right-8 text-accent/10">
              <Quote className="w-20 h-20" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center justify-center mb-8 gap-2">
              {[...Array(currentTestimonial.rating)].map((_, i) => (
                <Star key={`star-${currentTestimonial.id}-${i}`} className="w-8 h-8 text-amber-400 fill-current drop-shadow-lg" />
              ))}
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-2xl md:text-3xl text-center text-primary leading-relaxed mb-10 font-bold relative z-10">
              "{currentTestimonial.text}"
            </blockquote>

            {/* Enhanced Client Info */}
            <div className="text-center relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-accent to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold shadow-xl">
                {currentTestimonial.name.charAt(0)}
              </div>
              <div className="font-black text-xl text-primary mb-2">
                {currentTestimonial.name}
              </div>
              <div className="text-muted-foreground mb-3 font-medium">
                {currentTestimonial.location}
              </div>
              <div className="inline-flex items-center bg-gradient-to-r from-accent/20 to-amber-500/20 text-accent px-6 py-3 rounded-full text-sm font-bold border-2 border-accent/30">
                {currentTestimonial.service}
              </div>
            </div>

            {/* Enhanced Navigation Arrows */}
            <div className="absolute top-1/2 transform -translate-y-1/2 left-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:bg-accent hover:text-white border-2 w-12 h-12"
                aria-label="التقييم السابق"
              >
                <ArrowRight className="w-6 h-6" />
              </Button>
            </div>
            <div className="absolute top-1/2 transform -translate-y-1/2 right-6">
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 bg-white hover:bg-accent hover:text-white border-2 w-12 h-12"
                aria-label="التقييم التالي"
              >
                <ArrowLeft className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Testimonial Dots */}
        <div className="flex justify-center space-x-2 space-x-reverse mb-12" role="tablist" aria-label="اختيار التقييم">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-accent w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`عرض تقييم ${index + 1} من ${testimonials.length}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>

        {/* Enhanced All Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 cursor-pointer hover:-translate-y-2 ${
                index === currentIndex 
                  ? 'ring-4 ring-accent shadow-2xl scale-105' 
                  : 'hover:shadow-2xl'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              {/* Rating */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={`star-grid-${testimonial.id}-${i}`} className="w-5 h-5 text-amber-400 fill-current" />
                ))}
              </div>

              {/* Text */}
              <p className="text-base text-gray-700 mb-6 leading-relaxed font-medium min-h-[80px]">
                "{testimonial.text}"
              </p>

              {/* Enhanced Client Info */}
              <div className="border-t-2 border-gray-100 pt-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-primary text-base">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-accent/10 text-accent px-4 py-2 rounded-lg text-sm font-bold text-center">
                  {testimonial.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-primary mb-4">
            انضم إلى عملائنا الراضين
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            احصل على نفس مستوى الجودة والخدمة المتميزة التي حصل عليها آلاف العملاء قبلك
          </p>
          <Button size="lg" className="text-lg px-8 py-6 h-auto">
            احصل على استشارة مجانية الآن
          </Button>
        </div>
      </div>
    </section>
  );
}
