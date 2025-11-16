import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumb from '@/components/Breadcrumb';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import ReviewSchema from '@/components/ReviewSchema';
import ProjectsGallery from '@/components/services/ProjectsGallery';
import ArticlesSection from '@/components/services/ArticlesSection';
import FAQSection from '@/components/services/FAQSection';
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
import { buildCategoryWhereClause, getServiceNameAr } from '@/lib/services-categories-mapping';

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

export const revalidate = 3600;

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
    // جلب جميع الأسئلة الشائعة المتعلقة بالمظلات (بدون حد للأرشفة الكاملة)
    const faqs = await prisma.faqs.findMany({
      where: {
        status: 'PUBLISHED',
        category: 'مظلات'
      },
      orderBy: [
        { order: 'asc' },
        { createdAt: 'desc' }
      ]
    });

    // جلب جميع المشاريع المتعلقة بالمظلات (بدون حد للأرشفة الكاملة)
    // استخدام النظام الجديد للربط بين الخدمات والفئات
    const categoryWhere = buildCategoryWhereClause('mazallat');
    const projects = await prisma.projects.findMany({
      where: {
        status: 'PUBLISHED',
        ...categoryWhere
      },
      select: {
        id: true,
        title: true,
        description: true,
        slug: true,
        featured: true,
        category: true,
        location: true,
        createdAt: true,
        publishedAt: true,
        media_items: {
          orderBy: { order: 'asc' },
          select: {
            src: true,
            alt: true,
            title: true,
            type: true
          }
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
      ]
    });

    // جلب جميع المقالات المتعلقة بالمظلات (بدون حد للأرشفة الكاملة)
    const { buildArticleCategoryWhereClause } = await import('@/lib/services-categories-mapping');
    const articleCategoryWhere = buildArticleCategoryWhereClause('mazallat');
    const articles = await prisma.articles.findMany({
      where: {
        status: 'PUBLISHED',
        ...articleCategoryWhere
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        slug: true,
        featured: true,
        publishedAt: true,
        createdAt: true,
        category: true,
        article_media_items: {
          orderBy: { order: 'asc' },
          select: {
            src: true,
            alt: true,
            title: true,
            type: true
          }
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
      ]
    });

    console.log('✅ تم جلب المحتوى من قاعدة البيانات:', {
      projectsCount: projects.length,
      articlesCount: articles.length,
      faqsCount: faqs.length
    });
    return { projects, articles, faqs };
  } catch (error) {
    console.error('❌ خطأ في جلب المحتوى المتعلق بالمظلات:', error);
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

  // إنشاء ItemList Schema للمشاريع مع جميع الصور لمحركات البحث
  const projectsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "مشاريع مظلات السيارات في جدة - محترفين الديار",
    "description": "معرض أعمالنا في تركيب مظلات السيارات والحدائق في جدة",
    "numberOfItems": projects.length,
    "itemListElement": projects.map((project, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "ImageObject",
        "name": project.title,
        "description": project.description,
        "url": `https://www.aldeyarksa.tech/portfolio/${project.slug || project.id}`,
        "contentUrl": project.media_items?.[0]?.src || '',
        "thumbnailUrl": project.media_items?.[0]?.src || '',
        "caption": project.media_items?.[0]?.alt || project.title,
        "width": "1200",
        "height": "800",
        "uploadDate": new Date().toISOString(),
        "author": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية"
        },
        "publisher": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.aldeyarksa.tech/favicon.svg"
          }
        },
        "copyrightHolder": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية"
        },
        "license": "https://www.aldeyarksa.tech/terms",
        "acquireLicensePage": "https://www.aldeyarksa.tech/contact"
      }
    }))
  };

  // إنشاء ItemList Schema للمقالات مع جميع الصور
  const articlesListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "مقالات عن مظلات السيارات في جدة",
    "description": "دليل شامل ومقالات تعليمية عن مظلات السيارات والحدائق",
    "numberOfItems": articles.length,
    "itemListElement": articles.map((article, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "url": `https://www.aldeyarksa.tech/articles/${article.slug || article.id}`,
        "image": article.article_media_items?.[0]?.src || '',
        "author": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية"
        },
        "publisher": {
          "@type": "Organization",
          "name": "محترفين الديار العالمية",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.aldeyarksa.tech/favicon.svg"
          }
        },
        "datePublished": article.publishedAt || article.createdAt,
        "dateModified": article.publishedAt || article.createdAt
      }
    }))
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articlesListSchema) }}
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
        <ProjectsGallery projects={projects} categoryName="المظلات" />

        {/* مقالات متعلقة بالمظلات - ديناميكي */}
        <ArticlesSection articles={articles} categoryName="المظلات" />

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

        {/* FAQ Section */}
        <FAQSection faqs={faqs} categoryName="المظلات" />

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
