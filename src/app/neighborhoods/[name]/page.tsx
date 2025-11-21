'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin, Phone, Mail, Check } from 'lucide-react';
import { jeddahNeighborhoods, generateLocalSEOTitle, generateLocalSEOMetaDescription } from '@/lib/local-seo-strategy';
import { OptimizedImage } from '@/components/OptimizedImage';
import { generateCategoryBasedAlt, generateImageObjectSchema } from '@/lib/image-seo-utils';

export default function NeighborhoodPage() {
  const params = useParams();
  const neighborhoodName = decodeURIComponent(params.name as string);
  const neighborhood = jeddahNeighborhoods.find(n => n.name === neighborhoodName);

  if (!neighborhood) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">الحي غير موجود</h1>
          <Link href="/" className="text-primary hover:underline">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            'name': `محترفين الديار - ${neighborhood.name}`,
            'description': neighborhood.description,
            'areaServed': neighborhood.name,
            'url': `https://www.aldeyarksa.tech/neighborhoods/${encodeURIComponent(neighborhood.name)}`,
            'telephone': '+966553719009',
            'image': 'https://www.aldeyarksa.tech/logo.png',
            'priceRange': '2500-50000'
          })
        }}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4 px-4">
        <div className="container mx-auto">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-primary hover:underline">الرئيسية</Link>
            <span className="text-gray-400">/</span>
            <Link href="/neighborhoods" className="text-primary hover:underline">الأحياء</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-700">{neighborhood.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 px-4 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {neighborhood.category} في {neighborhood.name}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            {neighborhood.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+966553719009" className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100">
              اتصل الآن
            </a>
            <a href="#contact" className="border-2 border-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary">
              اطلب عرض سعر
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Service Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">لماذا تختار محترفين الديار في {neighborhood.name}؟</h2>
              <div className="space-y-4 text-gray-700">
                <p className="leading-relaxed">
                  نحن متخصصون في تقديم خدمات {neighborhood.category} عالية الجودة في حي {neighborhood.name} منذ أكثر من 15 سنة.
                  مع فريق محترف وخبرة واسعة، نضمن أفضل النتائج لكل مشروع.
                </p>
                <p className="leading-relaxed">
                  كل مشروع يتم بعناية فائقة واهتمام بالتفاصيل، مع ضمان 10 سنوات على جميع الأعمال.
                </p>
              </div>
            </section>

            {/* Services */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">خدماتنا المتخصصة</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: 'التصميم والاستشارة', desc: 'تصميم مخصص حسب احتياجاتك' },
                  { title: 'التركيب الاحترافي', desc: 'تركيب بدقة عالية وسرعة' },
                  { title: 'الصيانة والدعم', desc: 'دعم ما بعد البيع المميز' },
                  { title: 'الضمان الموسع', desc: 'ضمان 10 سنوات شامل' }
                ].map((service, idx) => (
                  <div key={idx} className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition">
                    <div className="flex items-start gap-3">
                      <Check className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                        <p className="text-gray-600">{service.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Portfolio */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">مشاريعنا في {neighborhood.name}</h2>
              <p className="text-gray-700 mb-6">
                شاهد نماذج من الأعمال الناجحة التي نفذناها في هذا الحي
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="rounded-lg overflow-hidden border-2 border-gray-200 hover:shadow-lg transition">
                    <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-gray-400">صورة المشروع {item}</span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold mb-2">مشروع {neighborhood.category} #{item}</h3>
                      <p className="text-sm text-gray-600">مشروع ناجح في {neighborhood.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Pricing */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6">نطاق الأسعار</h2>
              <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-lg border-l-4 border-primary">
                <p className="text-lg mb-4">
                  تختلف الأسعار حسب نوع الخدمة والحجم والمواد المستخدمة
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>الاستشارة والتصميم: مجاني</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>التركيب: من 2,500 ريال</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>المشاريع الكبرى: حسب المتطلبات</span>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            {/* Contact Box */}
            <div className="bg-primary text-white p-8 rounded-lg sticky top-20">
              <h3 className="text-2xl font-bold mb-6">تواصل معنا</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-primary-light">الهاتف</p>
                    <a href="tel:+966553719009" className="font-bold hover:text-primary-light">
                      +966 55 371 9009
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-primary-light">البريد الإلكتروني</p>
                    <a href="mailto:ksaaldeyar@gmail.com" className="font-bold hover:text-primary-light break-all">
                      ksaaldeyar@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-primary-light">الخدمة</p>
                    <p className="font-bold">{neighborhood.name}, جدة</p>
                  </div>
                </div>
              </div>
              <button className="w-full bg-accent text-primary font-bold py-3 rounded mt-6 hover:bg-accent/90">
                اطلب عرض سعر الآن
              </button>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 p-6 rounded-lg mt-6 border-2 border-gray-200">
              <h4 className="font-bold mb-4">معلومات سريعة</h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>خبرة 15 سنة</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>ضمان 10 سنوات</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>فريق محترف</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span>أسعار منافسة</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Keywords Section (Hidden but indexed) */}
      <div className="sr-only">
        <h2>Keywords</h2>
        {neighborhood.keywords.map((keyword, idx) => (
          <span key={idx}>{keyword} </span>
        ))}
      </div>
    </>
  );
}
