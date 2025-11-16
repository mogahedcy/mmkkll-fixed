import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ReviewSchema from '@/components/ReviewSchema';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  generateServiceSchema, 
  generateFAQSchema,
  generateProductSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  generateRobotsMetadata,
  generateCanonicalUrl
} from '@/lib/seo-utils';
import {
  Car,
  Shield,
  Sun,
  Droplets,
  CheckCircle,
  Phone,
  MessageCircle,
  ArrowLeft,
  Plus,
  Minus,
  Eye,
  Star,
  Award,
  Users,
  Clock,
  MapPin,
  Zap,
  ThumbsUp,
  Target,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { prisma } from '@/lib/prisma';

const pageTitle = 'مظلات سيارات جدة - ضمان 10 سنوات | محترفين الديار';
const pageDescription = 'تركيب مظلات سيارات وحدائق بجدة بضمان 10 سنوات. مظلات PVC مقاومة للأشعة والأمطار. أسعار تبدأ من 2,500 ريال. استشارة مجانية';
const pageUrl = '/services/mazallat';
const pageImage = 'https://www.aldeyarksa.tech/uploads/mazallat-1.webp';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: 'مظلات سيارات جدة، مظلات PVC، مظلات حديد، تركيب مظلات، شركة مظلات، أسعار مظلات سيارات',
  authors: [{ name: 'محترفين الديار العالمية' }],
  openGraph: generateOpenGraphMetadata({
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    image: pageImage,
    imageAlt: 'مظلات سيارات جدة - محترفين الديار العالمية',
    type: 'website'
  }),
  twitter: generateTwitterMetadata({
    title: pageTitle,
    description: pageDescription,
    image: pageImage
  }),
  alternates: {
    canonical: generateCanonicalUrl(pageUrl),
  },
  robots: generateRobotsMetadata(),
};

const heroFeatures = [
  { icon: MapPin, text: 'نخدم جميع أحياء جدة' },
  { icon: Clock, text: 'ضمان 10 سنوات شامل' },
  { icon: Star, text: 'أكثر من 5000 مشروع ناجح' }
];

const whyChooseUsFeatures = [
  {
    icon: Award,
    title: 'خبرة 15 عاماً',
    description: 'نحن رواد في مجال المظلات بخبرة تمتد لأكثر من 15 عاماً',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: Shield,
    title: 'ضمان شامل 10 سنوات',
    description: 'ضمان طويل المدى على جميع أعمالنا وخاماتنا المستخدمة',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Users,
    title: 'فريق متخصص',
    description: 'مهندسون وفنيون متخصصون ومدربون على أعلى مستوى',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    icon: Zap,
    title: 'تنفيذ سريع',
    description: 'سرعة في التنفيذ مع الحفاظ على أعلى معايير الجودة',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    icon: ThumbsUp,
    title: 'رضا العملاء',
    description: 'نسبة رضا عملاء تصل إلى 99% وتقييمات ممتازة',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    icon: Target,
    title: 'أسعار تنافسية',
    description: 'أفضل الأسعار في السوق مع جودة عالية لا تُضاهى',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  }
];

const shadeTypes = [
  {
    id: 'cars',
    title: 'مظلات سيارات',
    description: 'مظلات مواقف السيارات بمختلف المقاسات والأشكال، توفر حماية كاملة للسيارات من أشعة الشمس والأمطار.',
    features: ['حماية من الأشعة فوق البنفسجية', 'مقاومة للأمطار', 'تصاميم متنوعة'],
    price: 'تبدأ من 2,500 ريال',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    icon: Car
  },
  {
    id: 'gardens',
    title: 'مظلات حدائق',
    description: 'مظلات للحدائق المنزلية والعامة بتصميمات عصرية وخامات عالية الجودة تضيف لمسة جمالية للمكان.',
    features: ['تصاميم جمالية', 'مقاومة للعوامل الجوية', 'ألوان متنوعة'],
    price: 'تبدأ من 3,000 ريال',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    icon: Sun
  },
  {
    id: 'schools',
    title: 'مظلات مدارس',
    description: 'مظلات للمدارس والمؤسسات التعليمية، توفر بيئة آمنة للطلاب والمعلمين وتحميهم من العوامل الجوية.',
    features: ['مساحات واسعة', 'أمان عالي', 'متانة ممتازة'],
    price: 'تبدأ من 5,000 ريال',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    icon: Shield
  },
  {
    id: 'pools',
    title: 'مظلات مسابح',
    description: 'مظلات للمسابح تحمي من أشعة الشمس وتحافظ على نظافة المسبح، مع توفير تهوية مناسبة.',
    features: ['حماية المسبح', 'تهوية ممتازة', 'مقاومة للكلور'],
    price: 'تبدأ من 4,000 ريال',
    bgColor: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    icon: Droplets
  }
];

const stats = [
  { number: '5000+', label: 'مشروع مكتمل' },
  { number: '15+', label: 'سنة خبرة' },
  { number: '99%', label: 'رضا العملاء' },
  { number: '24/7', label: 'خدمة العملاء' }
];

const testimonials = [
  {
    id: 1,
    name: 'أحمد المحمدي',
    role: 'صاحب فيلا - حي الزهراء',
    content: 'خدمة ممتازة وجودة عالية في التنفيذ. فريق محترف والتزام في المواعيد. أنصح بشدة بالتعامل مع محترفين الديار.',
    rating: 5,
  },
  {
    id: 2,
    name: 'سارة العتيبي',
    role: 'مديرة مدرسة - حي النعيم',
    content: 'ركبوا لنا مظلات للمدرسة بجودة عالية وسعر مناسب. الطلاب محميين من الشمس والأمطار. شكراً لفريق محترفين الديار.',
    rating: 5,
  },
  {
    id: 3,
    name: 'محمد الغامدي',
    role: 'مالك مجمع تجاري - وسط جدة',
    content: 'تم تركيب مظلات مواقف السيارات للمجمع التجاري. العمل احترافي والخامات ممتازة. العملاء راضين جداً.',
    rating: 5,
  }
];


const relatedServices = [
  {
    id: 'sawater',
    title: 'السواتر',
    description: 'تركيب سواتر بمختلف الأنواع والخامات لتوفير الخصوصية والحماية.',
    href: '/services/sawater',
    features: ['سواتر قماش', 'سواتر حديد', 'سواتر خشبية']
  },
  {
    id: 'pergolas',
    title: 'البرجولات',
    description: 'تصميم وتنفيذ برجولات خشبية وحديدية بأشكال عصرية.',
    href: '/services/pergolas',
    features: ['برجولات خشبية', 'برجولات حديدية', 'برجولات مختلطة']
  },
  {
    id: 'khayyam',
    title: 'خيام ملكية',
    description: 'تصميم وتنفيذ خيام ملكية فاخرة للمناسبات والاحتفالات.',
    href: '/services/khayyam',
    features: ['خيام أفراح', 'خيام استراحات', 'خيام مناسبات']
  }
];

// جلب المشاريع والمقالات والأسئلة الشائعة المتعلقة بالمظلات من قاعدة البيانات
async function getRelatedContent() {
  try {
    if (!process.env.DATABASE_URL) {
      return { projects: [], articles: [], faqs: [] };
    }

    // جلب الأسئلة الشائعة المتعلقة بالمظلات
    const faqs = await prisma.faqs.findMany({
      where: {
        status: 'PUBLISHED',
        category: 'مظلات'
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ],
      take: 10
    });

    // جلب المشاريع المتعلقة بالمظلات
    const projects = await prisma.projects.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: 'مظلات' } },
          { title: { contains: 'مظلة' } },
          { description: { contains: 'مظلات' } },
          { category: { contains: 'مظلات' } },
        ]
      },
      include: {
        media_items: {
          orderBy: { order: 'asc' },
          take: 1
        },
        _count: {
          select: {
            project_views: true,
            project_likes: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: 6
    });

    // جلب المقالات المتعلقة بالمظلات
    const articles = await prisma.articles.findMany({
      where: {
        status: 'PUBLISHED',
        OR: [
          { title: { contains: 'مظلات' } },
          { title: { contains: 'مظلة' } },
          { content: { contains: 'مظلات' } },
          { category: { contains: 'مظلات' } },
        ]
      },
      include: {
        article_media_items: {
          orderBy: { order: 'asc' },
          take: 1
        },
        _count: {
          select: {
            article_views: true,
            article_likes: true
          }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ],
      take: 6
    });

    return { projects, articles, faqs };
  } catch (error) {
    console.error('خطأ في جلب المحتوى المتعلق بالمظلات:', error);
    // في حالة الخطأ، نعيد مصفوفات فارغة لتجنب كسر الصفحة
    return { projects: [], articles: [], faqs: [] };
  }
}

export default async function MazallatPage() {
  const breadcrumbItems = [
    { label: 'خدماتنا', href: '/#services' },
    { label: 'مظلات السيارات', href: '/services/mazallat', current: true }
  ];

  // جلب المحتوى المتعلق
  const { projects, articles, faqs } = await getRelatedContent();

  const serviceSchema = generateServiceSchema({
    name: 'مظلات سيارات جدة',
    description: 'أفضل مظلات سيارات في جدة من محترفين الديار. مظلات PVC، مظلات حدائق، مظلات مدارس ومسابح. ضمان 10 سنوات وخبرة 15 عاماً.',
    areaServed: 'جدة',
    priceRange: '2500-10000',
    image: 'https://www.aldeyarksa.tech/uploads/mazallat-1.webp',
    url: '/services/mazallat'
  });

  const faqSchema = generateFAQSchema(faqs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  })));

  const productSchema = generateProductSchema({
    name: 'مظلات سيارات PVC - جدة',
    description: 'مظلات سيارات عالية الجودة مصنوعة من PVC مقاوم للحرارة والأشعة فوق البنفسجية. ضمان 10 سنوات على الخامات والتركيب.',
    image: ['https://www.aldeyarksa.tech/uploads/mazallat-1.webp'],
    category: 'مظلات خارجية',
    brand: 'محترفين الديار',
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 167
    }
  });

  const reviewSchemaData = {
    serviceName: 'مظلات سيارات جدة - محترفين الديار',
    aggregateRating: {
      ratingValue: 4.9,
      reviewCount: 167
    }
  };

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <ReviewSchema {...reviewSchemaData} />

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/10 py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex mb-8">
                <Breadcrumb items={breadcrumbItems} className="bg-accent/10 text-accent px-4 py-2 rounded-full font-medium" />
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                أفضل مظلات سيارات في{' '}
                <span className="text-accent">جدة</span>
                <br />
                جودة عالية وأسعار منافسة
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                محترفين الديار - خبرة 15 عاماً في تركيب أفضل مظلات السيارات والحدائق والمدارس في جدة.
                مظلات PVC عالية الجودة، تصاميم عصرية، وضمان شامل 10 سنوات
              </p>

              <div className="flex flex-wrap justify-center items-center gap-6 mb-10 text-sm text-muted-foreground">
                {heroFeatures.map((feature, index) => (
                  <div key={`mazallat-hero-${feature.text.replace(/\s+/g, '-')}`} className="flex items-center space-x-2 space-x-reverse">
                    <feature.icon className="w-4 h-4 text-accent" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link href="tel:+966553719009">
                  <Button size="lg" className="text-lg px-8 py-4">
                    <Phone className="w-5 h-5 mr-2" />
                    اتصل للاستشارة المجانية
                  </Button>
                </Link>
                <Link href="https://wa.me/+966553719009" target="_blank">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    واتساب الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute top-1/4 left-8 w-16 h-16 bg-accent/10 rounded-full blur-xl" />
          <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-primary/10 rounded-full blur-xl" />
        </section>

        {/* Services Types Section - نصية بدون صور */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                أنواع المظلات المتخصصة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نقدم مجموعة شاملة من المظلات عالية الجودة تناسب جميع الاحتياجات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {shadeTypes.map((service) => (
                <div
                  key={service.id}
                  className="group hover:shadow-xl transition-all duration-300 bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className={`${service.bgColor} p-6 text-center relative`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 ${service.iconColor} rounded-full bg-white/80 mb-4`}>
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-primary">{service.title}</h3>
                  </div>

                  <div className="p-6">
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, index) => (
                        <li key={`mazallat-service-feature-${feature.substring(0, 10).replace(/\s+/g, '-')}-${index}`} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="text-lg font-bold text-accent mb-4">
                      {service.price}
                    </div>

                    <Link href={`https://wa.me/+966553719009?text=أرغب في الحصول على معلومات عن ${service.title}`} target="_blank">
                      <Button className="w-full group-hover:bg-accent transition-colors">
                        مزيد من المعلومات
                        <ArrowLeft className="w-4 h-4 mr-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* معرض أعمالنا في المظلات - ديناميكي */}
        {projects.length > 0 && (
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  معرض أعمالنا في المظلات
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  اطلع على مشاريعنا المنجزة في مجال المظلات بمختلف أنواعها
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any) => (
                  <Link 
                    key={project.id} 
                    href={`/portfolio/${project.slug || project.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                      {project.media_items && project.media_items[0] && (
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={project.media_items[0].src}
                            alt={project.media_items[0].alt || project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {project.featured && (
                            <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                              مميز
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {project._count?.project_views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {project._count?.project_likes || 0}
                            </span>
                          </div>
                          <span className="text-accent font-medium flex items-center gap-1">
                            عرض المشروع
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/portfolio?category=مظلات">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    عرض جميع مشاريع المظلات
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* مقالات متعلقة بالمظلات - ديناميكي */}
        {articles.length > 0 && (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  مقالات متعلقة بالمظلات
                </h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  اقرأ مقالاتنا المتخصصة في مجال المظلات والنصائح المفيدة
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article: any) => (
                  <Link 
                    key={article.id} 
                    href={`/articles/${article.slug || article.id}`}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                      {article.article_media_items && article.article_media_items[0] && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={article.article_media_items[0].src}
                            alt={article.article_media_items[0].alt || article.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {article.featured && (
                            <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
                              مميز
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString('ar-SA')}</span>
                        </div>
                        
                        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                          {article.title}
                        </h3>
                        
                        {article.excerpt && (
                          <p className="text-muted-foreground mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4 text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {article._count?.article_views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />
                              {article._count?.article_likes || 0}
                            </span>
                          </div>
                          <span className="text-accent font-medium flex items-center gap-1">
                            قراءة المقال
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/articles?category=مظلات">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-2">
                    عرض جميع مقالات المظلات
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                لماذا تختار محترفين الديار؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                نجمع بين الخبرة الطويلة والجودة العالية لنقدم لك أفضل خدمات المظلات في جدة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {whyChooseUsFeatures.map((feature, index) => (
                <div
                  key={`mazallat-why-choose-${feature.title.substring(0, 10).replace(/\s+/g, '-')}`}
                  className={`${feature.bgColor} p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.iconColor} rounded-full bg-white/80 mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={`mazallat-stat-${index}`} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                آراء عملائنا
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                اقرأ تجارب عملائنا مع خدماتنا في تركيب المظلات
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-bold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                الأسئلة الشائعة
              </h2>
              <p className="text-lg text-muted-foreground">
                إجابات على أكثر الأسئلة شيوعاً حول مظلات السيارات
              </p>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <details
                  key={faq.id}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-primary pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <Plus className="w-6 h-6 text-accent group-open:hidden" />
                      <Minus className="w-6 h-6 text-accent hidden group-open:block" />
                    </div>
                  </summary>
                  <p className="mt-4 text-muted-foreground leading-relaxed pr-4">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                خدمات ذات صلة
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                تعرف على المزيد من خدماتنا المتخصصة
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={service.href}
                  className="group"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 p-8">
                    <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="text-accent font-bold flex items-center gap-2">
                      اكتشف المزيد
                      <ArrowLeft className="w-5 h-5 group-hover:translate-x-[-4px] transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              جاهزون لخدمتك على مدار الساعة
            </h2>
            <p className="text-xl mb-8 text-white/90">
              احصل على استشارة مجانية وعرض سعر فوري لمشروع المظلات الخاص بك
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="tel:+966553719009">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                  <Phone className="w-5 h-5 mr-2" />
                  اتصل الآن: 0553719009
                </Button>
              </Link>
              <Link href="https://wa.me/+966553719009" target="_blank">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 bg-white/10 border-white hover:bg-white hover:text-primary">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  واتساب
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
