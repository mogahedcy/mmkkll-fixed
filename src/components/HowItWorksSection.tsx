'use client';

import { MessageCircle, Ruler, FileText, Hammer } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const steps = [
  {
    number: '1',
    icon: MessageCircle,
    title: 'استشارة مجانية',
    description: 'تواصل معنا عبر WhatsApp أو الهاتف. مهندس متخصص يستمع لاحتياجاتك في المظلات، البرجولات، السواتر، ساندوتش بانل، أو أي خدمة أخرى ويقدم الحل الأمثل خلال 30 دقيقة.',
    details: [
      '⏱️ 30 دقيقة',
      '📱 عبر WhatsApp أو زيارة',
      '🎁 مجاناً 100%'
    ],
    color: 'from-blue-500 to-blue-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600'
  },
  {
    number: '2',
    icon: Ruler,
    title: 'زيارة وقياس دقيق',
    description: 'فني متخصص يزور موقعك، يأخذ قياسات دقيقة لمظلات السيارات أو برجولة الحديقة أو الساتر، ويعرض عليك نماذج وتصاميم متنوعة. كل هذا مجاناً.',
    details: [
      '⏱️ ساعة واحدة',
      '📐 قياس دقيق 3D',
      '🎨 عرض تصاميم متنوعة'
    ],
    color: 'from-green-500 to-green-600',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    number: '3',
    icon: FileText,
    title: 'عرض سعر شفاف',
    description: 'تستلم عرض سعر تفصيلي شامل كل شيء - المواد، التركيب، الضمان. بدون تكاليف خفية. إمكانية الدفع بالتقسيط عبر تمارا وتابي لجميع خدماتنا.',
    details: [
      '💰 أسعار تنافسية',
      '📄 عقد موثق',
      '💳 دفع بالتقسيط متاح'
    ],
    color: 'from-amber-500 to-amber-600',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600'
  },
  {
    number: '4',
    icon: Hammer,
    title: 'تركيب احترافي سريع',
    description: 'فريق من 4-6 فنيين محترفين يبدأ تركيب مظلتك، برجولتك، ساترك، أو مشروعك بجودة عالية. عمل نظيف ومرتب. ضمان 10 سنوات يبدأ فوراً.',
    details: [
      '⏱️ 1-3 أيام حسب المشروع',
      '👷 فريق محترف متخصص',
      '✅ ضمان شامل 10 سنوات'
    ],
    color: 'from-red-500 to-red-600',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600'
  }
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50 opacity-50" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center px-4 py-2 bg-accent/10 rounded-full mb-4">
            <span className="text-accent font-bold text-sm">كيف نعمل؟</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            رحلتك معنا من <span className="text-accent">البداية للنهاية</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            4 خطوات بسيطة للحصول على مظلتك، برجولتك، أو أي مشروع بجودة فاخرة وضمان 10 سنوات
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="space-y-8 md:space-y-12 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 1;
            
            return (
              <div 
                key={index}
                className={`flex flex-col ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-8 items-center`}
              >
                {/* Step Content */}
                <div className={`flex-1 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border-2 border-gray-100 hover:border-accent transition-all duration-300 group">
                    {/* Step Number Badge */}
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white font-black text-xl mb-4 shadow-lg`}>
                      {step.number}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-accent transition-colors">
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {step.description}
                    </p>
                    
                    {/* Details */}
                    <div className="flex flex-wrap gap-3">
                      {step.details.map((detail, idx) => (
                        <span 
                          key={idx}
                          className="inline-flex items-center px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-700 font-medium"
                        >
                          {detail}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Step Icon */}
                <div className="flex-shrink-0">
                  <div className={`relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full ${step.iconBg} shadow-2xl border-4 border-white`}>
                    <Icon className={`w-12 h-12 md:w-16 md:h-16 ${step.iconColor}`} />
                    
                    {/* Connector Line - Hidden on mobile, shown on desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-gray-300 to-transparent" />
                    )}
                  </div>
                </div>

                {/* Spacer for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            );
          })}
        </div>

        {/* CTA Box */}
        <div className="bg-gradient-to-br from-accent via-amber-500 to-accent rounded-2xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />
          
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-4">
              ابدأ رحلتك معنا الآن! 🚀
            </h3>
            <p className="text-lg md:text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              خلال 48 ساعة فقط تبدأ مشروعك في المظلات، البرجولات، السواتر، أو أي خدمة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button asChild size="lg" className="bg-white text-accent hover:bg-gray-100 font-bold shadow-xl text-lg px-8">
                <Link href="https://wa.me/+966553719009">
                  📞 اتصل الآن واحصل على خصم 15%
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8">
                <Link href="/contact">
                  📝 احجز استشارة مجانية
                </Link>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/90">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                بدون التزام
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                استشارة مجانية
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                عرض سعر فوري
              </span>
            </div>
          </div>
        </div>

        {/* Services Keywords */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            جميع خدماتنا: مظلات سيارات • برجولات • سواتر • ساندوتش بانل • 
            تنسيق حدائق • بيوت شعر • خيام ملكية • ترميم
          </p>
        </div>
      </div>
    </section>
  );
}
