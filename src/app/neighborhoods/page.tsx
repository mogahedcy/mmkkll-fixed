'use client';

import Link from 'next/link';
import { jeddahNeighborhoods } from '@/lib/local-seo-strategy';
import { MapPin, ArrowLeft } from 'lucide-react';

export default function NeighborhoodsPage() {
  return (
    <>
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'الرئيسية',
                'item': 'https://www.aldeyarksa.tech'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'الأحياء',
                'item': 'https://www.aldeyarksa.tech/neighborhoods'
              }
            ]
          })
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent py-12 px-4 text-white">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">خدماتنا في أحياء جدة</h1>
            <p className="text-lg max-w-2xl mx-auto">
              نخدم جميع أحياء جدة بنفس الجودة والاحترافية. اختر حيك واعرف المزيد
            </p>
          </div>
        </div>

        {/* Neighborhoods Grid */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jeddahNeighborhoods.map((neighborhood) => (
              <Link
                key={neighborhood.name}
                href={`/neighborhoods/${encodeURIComponent(neighborhood.name)}`}
                className="group"
              >
                <div className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-primary hover:shadow-lg transition-all h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition">
                        {neighborhood.name}
                      </h2>
                      <p className="text-accent font-semibold">{neighborhood.category}</p>
                    </div>
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0" />
                  </div>
                  <p className="text-gray-600 mb-4">{neighborhood.description}</p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p className="mb-2">الكلمات المفتاحية:</p>
                    <div className="flex flex-wrap gap-2">
                      {neighborhood.keywords.slice(0, 2).map((keyword, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                    اعرف المزيد
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-primary text-white py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">لم تجد حيك؟</h2>
            <p className="mb-6">نحن نخدم جميع أحياء جدة والمناطق المحيطة</p>
            <a href="tel:+966553719009" className="inline-block bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-accent/90">
              اتصل بنا الآن
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
