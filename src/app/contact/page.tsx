import type { Metadata } from 'next'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  User,
  MessageSquare,
  Home,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import StructuredDataScript from '@/components/StructuredDataScript'
import BreadcrumbSchema from '@/components/BreadcrumbSchema'
import { generateCanonicalUrl } from '@/lib/seo-utils'

export const metadata: Metadata = {
  title: 'تواصل معنا | محترفين الديار العالمية - خدمة العملاء 24/7',
  description: 'تواصل مع فريق محترفين الديار العالمية في جدة عبر الهاتف أو واتساب. خدمة عملاء متميزة 24/7، استشارة مجانية فورية، وردود سريعة على جميع استفساراتكم.',
  keywords: 'تواصل معنا جدة، خدمة العملاء، استشارة مجانية، رقم تواصل مظلات، واتساب مظلات، محترفين الديار العالمية',
  authors: [{ name: 'محترفين الديار العالمية' }],
  robots: 'index, follow',
  alternates: {
    canonical: generateCanonicalUrl('/contact'),
    languages: {
      'ar-SA': '/contact',
      'x-default': '/contact',
    },
  },
  openGraph: {
    title: 'تواصل معنا | محترفين الديار العالمية',
    description: 'تواصل مع فريق محترفين الديار العالمية في جدة. خدمة عملاء متميزة 24/7 واستشارة مجانية.',
    url: generateCanonicalUrl('/contact'),
    siteName: 'محترفين الديار العالمية',
    type: 'website',
    locale: 'ar_SA',
    images: [
      {
        url: 'https://www.aldeyarksa.tech/favicon.svg',
        width: 1200,
        height: 630,
        alt: 'تواصل معنا - محترفين الديار العالمية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تواصل معنا | محترفين الديار العالمية',
    description: 'خدمة عملاء متميزة 24/7 واستشارة مجانية في جدة',
    images: ['https://www.aldeyarksa.tech/favicon.svg'],
  }
}

const contactMethods = [
  {
    icon: Phone,
    title: 'اتصل بنا',
    description: 'متاح 24/7 للرد على استفساراتك',
    value: '+966 55 371 9009',
    action: 'tel:+966553719009',
    buttonText: 'اتصل الآن'
  },
  {
    icon: MessageCircle,
    title: 'واتساب',
    description: 'تواصل مباشر وسريع عبر واتساب',
    value: '+966 55 371 9009',
    action: 'https://wa.me/966553719009?text=السلام عليكم، أريد الاستفسار عن خدماتكم',
    buttonText: 'راسلنا'
  },
  {
    icon: Mail,
    title: 'البريد الإلكتروني',
    description: 'نرد خلال 24 ساعة كحد أقصى',
    value: 'ksaaldeyar@gmail.com',
    action: 'mailto:ksaaldeyar@gmail.com',
    buttonText: 'أرسل إيميل'
  },
  {
    icon: MapPin,
    title: 'موقعنا',
    description: 'زيارة مكتبنا في جدة',
    value: 'جدة، المملكة العربية السعودية',
    action: '#location',
    buttonText: 'عرض الخريطة'
  }
];

const workingHours = [
  { day: 'الأحد - الخميس', hours: '8:00 ص - 6:00 م' },
  { day: 'الجمعة', hours: '2:00 م - 6:00 م' },
  { day: 'السبت', hours: '9:00 ص - 5:00 م' },
  { day: 'خدمة الطوارئ', hours: '24/7' }
];

const serviceAreas = [
  'شمال جدة', 'جنوب جدة', 'شرق جدة', 'غرب جدة',
  'وسط جدة', 'الكورنيش', 'حي الصفا', 'حي النزهة',
  'حي الروضة', 'حي المرجان', 'حي الشاطئ', 'حي السلامة'
];

export default function ContactPage() {
  const whatsappMessage = "السلام عليكم، أريد الاستفسار عن خدماتكم والحصول على عرض سعر."
  const whatsappURL = `https://wa.me/966553719009?text=${encodeURIComponent(whatsappMessage)}`

  const breadcrumbItems = [
    { label: 'تواصل معنا', href: '/contact' }
  ];

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "محترفين الديار العالمية",
              "telephone": "+966553719009",
              "email": "ksaaldeyar@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "جدة",
                "addressCountry": "SA"
              },
              "openingHours": [
                "Su-Th 08:00-18:00",
                "Fr 14:00-18:00",
                "Sa 09:00-17:00"
              ],
              "areaServed": "جدة"
            }
          })
        }}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      <Navbar />

      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600 mb-8">
              <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-primary font-medium">تواصل معنا</span>
            </nav>

            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                تواصل مع <span className="text-primary">محترفين الديار</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                نحن هنا لخدمتكم على مدار الساعة. فريق متخصص جاهز للرد على استفساراتكم وتقديم الاستشارة المجانية
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={whatsappURL} target="_blank">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب مباشر
                  </Button>
                </Link>
                <Link href="tel:+966553719009">
                  <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    <Phone className="w-5 h-5 mr-2" />
                    اتصل الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                طرق التواصل معنا
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                اختر الطريقة الأنسب لك للتواصل معنا
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <div key={`contact-method-${method.title}-${index}`} className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center border border-gray-100">
                  <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                  <p className="text-gray-800 font-medium mb-4 text-sm">{method.value}</p>
                  <Link href={method.action} target={method.action.startsWith('http') ? '_blank' : undefined}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-sm">
                      {method.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">

              {/* Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  أرسل لنا رسالة
                </h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <div className="relative">
                        <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="أدخل اسمك الكامل"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الهاتف *
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          required
                          className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          placeholder="05xxxxxxxx"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع الخدمة المطلوبة
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent">
                      <option value="">اختر نوع الخدمة</option>
                      <option value="mazallat">مظلات سيارات</option>
                      <option value="sawater">سواتر خصوصية</option>
                      <option value="pergolas">برجولات حدائق</option>
                      <option value="khayyam">خيام ملكية</option>
                      <option value="byoot-shaar">بيوت شعر</option>
                      <option value="sandwich-panel">ساندوتش بانل</option>
                      <option value="landscaping">تنسيق حدائق</option>
                      <option value="renovation">ترميم ملحقات</option>
                      <option value="consultation">استشارة عامة</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العنوان/المنطقة
                    </label>
                    <div className="relative">
                      <Home className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="حي السلامة، جدة"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تفاصيل المشروع *
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                      <textarea
                        rows={4}
                        required
                        className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        placeholder="اكتب تفاصيل مشروعك، المساحة، التصميم المطلوب، أو أي متطلبات خاصة..."
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 py-3">
                    <Send className="w-5 h-5 mr-2" />
                    إرسال الرسالة
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">

                {/* Working Hours */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Clock className="w-6 h-6 text-primary mr-3" />
                    ساعات العمل
                  </h3>
                  <div className="space-y-3">
                    {workingHours.map((schedule, index) => (
                      <div key={`schedule-${schedule.day}-${index}`} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-gray-700 font-medium">{schedule.day}</span>
                        <span className="text-gray-600">{schedule.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 text-primary mr-3" />
                    المناطق المخدومة
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {serviceAreas.map((area) => (
                      <div key={`service-area-${area}`} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                        {area}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">
                    تحتاج مساعدة فورية؟
                  </h3>
                  <p className="mb-4 opacity-90">
                    فريق خدمة العملاء متاح الآن للرد على استفساراتك
                  </p>
                  <div className="space-y-3">
                    <Link href="tel:+966553719009" className="block">
                      <Button className="w-full bg-white text-primary hover:bg-gray-100">
                        <Phone className="w-5 h-5 mr-2" />
                        اتصل الآن: 9009 371 55 966+
                      </Button>
                    </Link>
                    <Link href={whatsappURL} target="_blank" className="block">
                      <Button variant="outline" className="w-full border-white text-white hover:bg-white/20">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        واتساب فوري
                      </Button>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section id="location" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                موقعنا في جدة
              </h2>
              <p className="text-xl text-gray-600">
                محترفين الديار العالمية - في خدمتكم في جميع أنحاء جدة
              </p>
            </div>

            <div className="relative rounded-lg overflow-hidden h-96 shadow-xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.5678!2d39.192505!3d21.485811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDI5JzA4LjkiTiAzOcKwMTEnMzMuMCJF!5e0!3m2!1sar!2ssa!4v1234567890123!5m2!1sar!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع محترفين الديار العالمية في جدة"
                className="grayscale-0 hover:grayscale-0 transition-all"
              />
              <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-primary mr-2 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-900">محترفين الديار العالمية</h4>
                    <p className="text-sm text-gray-600 mt-1">جدة، المملكة العربية السعودية</p>
                    <a 
                      href="https://maps.google.com/?q=21.485811,39.192505" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline mt-2 inline-block"
                    >
                      فتح في خرائط جوجل ←
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              أسئلة شائعة؟
            </h2>
            <p className="text-gray-600 mb-8">
              ربما تجد إجابة سؤالك في صفحة الأسئلة الشائعة
            </p>
            <Link href="/faq">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                عرض الأسئلة الشائعة
              </Button>
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}
