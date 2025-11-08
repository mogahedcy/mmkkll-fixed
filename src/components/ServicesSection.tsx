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
      "url": "https://yourdomain.com"
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
              "url": `https://yourdomain.com${service.href}`
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
    <section className="py-20 bg-background">
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

        {/* Enhanced Services Grid with More Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="group relative hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl overflow-hidden border-2 border-transparent hover:border-accent hover:-translate-y-2">
                {/* Badge for Popular Services */}
                {service.badge && (
                  <div className={`absolute top-3 right-3 ${service.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10 animate-pulse`}>
                    {service.badge}
                  </div>
                )}

                {/* Service Header */}
                <div className={`${service.bgColor} p-8 text-center relative`}>
                  <div className={`inline-flex items-center justify-center w-20 h-20 ${service.iconColor} bg-white rounded-2xl mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <IconComponent className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {service.title}
                  </h3>
                </div>

                {/* Service Content with More Padding */}
                <div className="p-8">
                  <p className="text-muted-foreground mb-6 leading-relaxed text-base font-medium">
                    {service.description}
                  </p>

                  {/* Minimal Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={`${service.id}-feature-${index}`} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-2.5 h-2.5 bg-gradient-to-r from-accent to-amber-500 rounded-full ml-3 group-hover:scale-125 transition-transform" />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Badge */}
                  {service.price && (
                    <div className="bg-gradient-to-r from-accent/10 to-amber-500/10 rounded-xl p-4 mb-6 text-center">
                      <p className="text-lg font-bold bg-gradient-to-r from-accent to-amber-600 bg-clip-text text-transparent">
                        {service.price}
                      </p>
                    </div>
                  )}

                  {/* Enhanced CTA Button */}
                  <Button asChild variant="outline" className="w-full group-hover:bg-gradient-to-r group-hover:from-accent group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent transition-all duration-500 py-6 font-bold shadow-md group-hover:shadow-xl">
                    <Link href={service.href} className="flex items-center justify-center space-x-2 space-x-reverse">
                      <span>التفاصيل</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-accent/10 to-primary/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-primary mb-4">
            استشارة مجانية لجميع الخدمات
          </h3>
          <p className="text-muted-foreground mb-6">
            فريقنا المتخصص جاهز لمساعدتك في اختيار الحل الأمثل لمشروعك
            وتقديم المشورة المهنية لضمان أفضل النتائج
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="https://wa.me/+966553719009" className="flex items-center space-x-2 space-x-reverse">
                <span>تواصل معنا الآن</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio" className="flex items-center space-x-2 space-x-reverse">
                <span>شاهد جميع أعمالنا المتنوعة</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
