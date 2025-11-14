import Link from 'next/link';
import {
  ArrowLeft,
  Car,
  TreePine,
  Shield,
  Flower,
  Home,
  Wrench,
  Tent,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'mazallat',
    title: 'مظلات السيارات',
    description: 'حماية فاخرة بتصاميم عصرية',
    icon: Car,
    features: [
      'حماية كاملة من الشمس',
      'تصاميم متنوعة'
    ],
    href: '/services/mazallat',
    price: 'من 2,500 ر.س',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    badge: 'الأكثر طلباً',
    badgeColor: 'bg-red-500'
  },
  {
    id: 'sandwich-panel',
    title: 'ساندوتش بانل',
    description: 'عزل حراري وصوتي احترافي',
    icon: Home,
    features: [
      'عازل للحرارة والصوت',
      'مقاوم للحريق'
    ],
    href: '/services/sandwich-panel',
    price: 'حسب المساحة',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    id: 'renovation',
    title: 'ترميم الملحقات',
    description: 'تجديد شامل بأحدث التقنيات',
    icon: Wrench,
    features: [
      'ترميم فلل واستراحات',
      'صيانة شاملة'
    ],
    href: '/services/renovation',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
  },
  {
    id: 'pergolas',
    title: 'برجولات الحدائق',
    description: 'تصاميم فاخرة تضفي جمالاً استثنائياً',
    icon: TreePine,
    features: [
      'خشبية وحديدية',
      'تصاميم حصرية'
    ],
    href: '/services/pergolas',
    price: 'من 3,500 ر.س',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    badge: 'مميز',
    badgeColor: 'bg-amber-500'
  },
  {
    id: 'sawater',
    title: 'السواتر',
    description: 'خصوصية تامة وحماية مضمونة',
    icon: Shield,
    features: [
      'PVC وحديد وقماش',
      'خصوصية 100%'
    ],
    href: '/services/sawater',
    price: 'من 1,800 ر.س',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    id: 'byoot-shaar',
    title: 'بيوت الشعر',
    description: 'تراث أصيل بلمسة عصرية',
    icon: Home,
    features: [
      'تصنيع يدوي متقن',
      'تراث سعودي أصيل'
    ],
    href: '/services/byoot-shaar',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'landscaping',
    title: 'تنسيق الحدائق',
    description: 'تصميم احترافي وأنظمة ري ذكية',
    icon: Flower,
    features: [
      'تصميم عصري',
      'نباتات مناسبة للمناخ'
    ],
    href: '/services/landscaping',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'khayyam',
    title: 'الخيام الملكية',
    description: 'فخامة عالمية للمناسبات الخاصة',
    icon: Tent,
    features: [
      'تصاميم ملكية حصرية',
      'مناسبات وأفراح'
    ],
    href: '/services/khayyam',
    bgColor: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
];

export default function ServicesSection() {
  // Generate JSON-LD structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "خدمات محترفين الديار العالمية",
    "provider": {
      "@type": "Organization",
      "name": "محترفين الديار العالمية",
      "url": "https://www.aldeyarksa.tech"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "خدمات محترفين الديار العالمية",
      "itemListElement": services
        .filter(service => {
          // Only include services with valid numeric pricing
          const numericPrice = service.price ? service.price.replace(/[^\d]/g, '') : '';
          return numericPrice && numericPrice.length > 0;
        })
        .map(service => {
          const numericPrice = service.price!.replace(/[^\d]/g, '');
          
          return {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": service.title,
              "description": service.description,
              "serviceType": service.title,
              "url": `https://www.aldeyarksa.tech${service.href}`
            },
            "price": numericPrice,
            "priceCurrency": "SAR",
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "priceCurrency": "SAR",
              "price": numericPrice,
              "unitText": "ريال سعودي"
            },
            "description": service.price
          };
        })
    }
  };

  return (
    <section id="services" className="py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            خدماتنا الشاملة
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            نقدم 8 خدمات متخصصة ومتكاملة تشمل المظلات والبرجولات والسواتر والساندوتش بانل
            والترميم وتنسيق الحدائق وبيوت الشعر والخيام الملكية بأعلى معايير الجودة
          </p>
        </div>

        {/* محسّن للجوال - بطاقات مبسطة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-10 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group relative hover:shadow-2xl transition-all duration-500 bg-white rounded-xl md:rounded-2xl overflow-hidden border-2 border-transparent hover:border-accent hover:-translate-y-1 md:hover:-translate-y-2 active:scale-98">
                {/* Badge for Popular Services */}
                {service.badge && (
                  <div className={`absolute top-2 right-2 md:top-3 md:right-3 ${service.badgeColor} text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-bold shadow-lg z-10`}>
                    {service.badge}
                  </div>
                )}

                {/* Service Header - مبسط للجوال */}
                <div className={`${service.bgColor} p-5 md:p-8 text-center relative`}>
                  <div className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 ${service.iconColor} bg-white rounded-xl md:rounded-2xl mb-3 md:mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="w-8 h-8 md:w-10 md:h-10" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-primary leading-tight">
                    {service.title}
                  </h3>
                </div>

                {/* Service Content - محسن للقراءة على الجوال */}
                <div className="p-4 sm:p-6 md:p-8">
                  <p className="text-muted-foreground mb-4 md:mb-6 leading-relaxed text-sm md:text-base font-medium">
                    {service.description}
                  </p>

                  {/* Features - مخفي جزئياً على الجوال الصغير */}
                  <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <li key={`${service.id}-feature-${index}`} className="flex items-center text-xs md:text-sm text-muted-foreground">
                        <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-gradient-to-r from-accent to-amber-500 rounded-full ml-2 md:ml-3 flex-shrink-0 group-hover:scale-125 transition-transform" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Badge - محسن للجوال */}
                  {service.price && (
                    <div className="bg-gradient-to-r from-accent/10 to-amber-500/10 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 md:mb-6 text-center">
                      <p className="text-base md:text-lg font-bold bg-gradient-to-r from-accent to-amber-600 bg-clip-text text-transparent">
                        {service.price}
                      </p>
                    </div>
                  )}

                  {/* زر CTA محسّن للمس */}
                  <Button asChild variant="outline" size="default" className="w-full group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 font-bold shadow-md group-hover:shadow-xl">
                    <Link href={service.href} className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>مزيد من المعلومات</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA - محسن للجوال */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 md:mb-4 leading-tight">
            استشارة مجانية لجميع الخدمات
          </h3>
          <p className="text-muted-foreground mb-5 md:mb-6 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            فريقنا المتخصص جاهز لمساعدتك في اختيار الحل الأمثل لمشروعك
            وتقديم المشورة المهنية لضمان أفضل النتائج
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="https://wa.me/+966553719009" className="flex items-center justify-center space-x-2 space-x-reverse">
                <span>تواصل معنا الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/portfolio" className="flex items-center justify-center space-x-2 space-x-reverse">
                <span>شاهد أعمالنا</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
