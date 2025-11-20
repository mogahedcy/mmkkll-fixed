'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Phone, MessageCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  order: number;
  featured: boolean;
}

const categories = ['الكل', 'مظلات سيارات', 'سواتر', 'خيم ملكية', 'بيوت شعر ملكي', 'برجولات', 'تنسيق حدائق', 'هناجر', 'شبوك', 'قراميد', 'ساندوتش بانل'];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // جلب الأسئلة من API
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/faqs?status=PUBLISHED&limit=50');
        const data = await response.json();
        
        if (data.success && data.faqs) {
          setFaqs(data.faqs);
          console.log('✅ تم جلب الأسئلة الشائعة:', data.faqs.length);
          // فتح أول سؤال تلقائياً
          if (data.faqs.length > 0) {
            setOpenFAQ(data.faqs[0].id);
          }
        }
      } catch (error) {
        console.error('❌ خطأ في جلب الأسئلة الشائعة:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const filteredFAQs = selectedCategory === 'الكل'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-accent mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">جاري تحميل الأسئلة الشائعة...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            الأسئلة الشائعة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            إجابات شاملة على أكثر الأسئلة التي يطرحها عملاؤنا حول خدمات محترفين الديار.
            لم تجد إجابة لسؤالك؟ تواصل معنا مباشرة
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'hover:bg-accent/10 hover:border-accent'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        {filteredFAQs.length > 0 ? (
          <div className="space-y-4 mb-12">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full text-right p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      faq.category === 'مظلات' ? 'bg-blue-100 text-blue-700' :
                      faq.category === 'ساندوتش بانل' ? 'bg-orange-100 text-orange-700' :
                      faq.category === 'ترميم' ? 'bg-green-100 text-green-700' :
                      faq.category === 'تنسيق حدائق' ? 'bg-emerald-100 text-emerald-700' :
                      faq.category === 'أسعار' ? 'bg-purple-100 text-purple-700' :
                      faq.category === 'خدمة عملاء' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-primary text-right">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {openFAQ === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-accent" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {openFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-xl p-4 border-r-4 border-accent">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">لا توجد أسئلة متاحة في هذه الفئة</p>
          </div>
        )}

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-accent/10 via-primary/5 to-accent/10 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-primary mb-4">
            لم تجد إجابة لسؤالك؟
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            فريق خدمة العملاء في محترفين الديار جاهز للإجابة على جميع استفساراتكم
            وتقديم الاستشارة المجانية المناسبة لاحتياجاتكم
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <MessageCircle className="w-5 h-5" />
                <span>تواصل عبر الواتساب</span>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 h-auto">
              <Link href="tel:+966553719009" className="flex items-center space-x-3 space-x-reverse">
                <Phone className="w-5 h-5" />
                <span>اتصال مباشر</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
