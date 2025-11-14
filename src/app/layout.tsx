import type { Metadata } from 'next';
import { Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import StructuredDataScript from "@/components/StructuredDataScript";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import BottomNavigation from "@/components/BottomNavigation";
import FloatingCallButton from "@/components/FloatingCallButton";
import { WebVitals } from "./web-vitals";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import ReviewSchema from "@/components/ReviewSchema";

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aldeyarksa.tech'),
  title: {
    default: "محترفين الديار العالمية | أفضل مظلات وبرجولات جدة - خبرة 15 عام",
    template: "%s | محترفين الديار العالمية"
  },
  description:
    "🏆 الشركة الرائدة في جدة لتركيب المظلات والبرجولات والسواتر. خبرة 15 عاماً ✅ ضمان 10 سنوات ✅ تركيب احترافي ✅ أسعار منافسة. اتصل الآن للحصول على استشارة مجانية!",
  keywords:
    "مظلات سيارات جدة، برجولات خشبية جدة، سواتر خصوصية جدة، محترفين الديار العالمية، تركيب مظلات جدة، برجولات حدائق، مظلات حديد، سواتر معدنية، ساندوتش بانل جدة، تنسيق حدائق جدة، بيوت شعر تراثية، خيام ملكية جدة، مقاول مظلات جدة، شركة برجول��ت جدة، أفضل مظلات جدة، تركيب برجولات احترافي، مظلات بأسعار منافسة، برجولات ألومنيوم جدة",
  authors: [{ name: "محترفين الديار العالمية" }],
  robots: "index, follow",
  alternates: {
    languages: {
      "ar-SA": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "محترفين الديار العالمية - خدمات شاملة في جدة",
    description: "شركة متخصصة في المظلات، البرجولات، السواتر، وتنسيق الحدائق في جدة",
    url: "https://www.aldeyarksa.tech",
    siteName: "محترفين الديار العالمية",
    locale: "ar_SA",
    type: "website",
    images: [
      {
        url: "https://www.aldeyarksa.tech/images/slider1.webp",
        width: 1200,
        height: 630,
        alt: "محترفين الديار العالمية - مظلات وبرجولات جدة",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "محترفين الديار العالمية",
    description: "خدمات شاملة في المظلات والبرجولات والسواتر في جدة",
    images: ["https://www.aldeyarksa.tech/images/slider1.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "ما هي الخدمات التي تقدمها شركة محترفين الديار؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نقدم 8 خدمات متخصصة شاملة: مظلات سيارات، برجولات حدائق، سواتر خصوصية، ساندوتش بانل، ترميم ملحقات، تنسيق حدائق، بيوت شعر تراثية، وخيام ملكية. جميع خدماتنا متاحة في جدة والمناطق المحيطة."
      }
    },
    {
      "@type": "Question",
      "name": "كم تبلغ مدة الضمان على مظلات السيارات؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نقدم ضمان شامل لمدة 10 سنوات على جميع مظلات السيارات، يشمل الهيكل المعدني والقماش والتركيب. كما نوفر صيانة دورية مجانية خلال السنة الأولى."
      }
    },
    {
      "@type": "Question",
      "name": "كم تستغرق عملية تركيب المظلات أو البرجولات؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "عادة ما تستغرق عملية التركيب من يوم إلى 3 أيام حسب حجم المشروع وتعقيده. مظلات السيارات العادية تحتاج يوم واحد، بينما البرجولات الكبيرة قد تحتاج إلى 2-3 أيام."
      }
    },
    {
      "@type": "Question",
      "name": "هل ساندوتش بانل مناسب للمناخ الحار في جدة؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، ساندوتش بانل مثالي للمناخ الحار في جدة. يوفر عزل حراري ممتاز يقلل استهلاك الكهرباء بنسبة تصل إلى 40%، ومقاوم للرطوبة والحرارة العالية."
      }
    },
    {
      "@type": "Question",
      "name": "هل تقدمون عروض أسعار مجانية؟",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "نعم، نقدم عروض أسعار مجانية ومفصلة لجميع خدماتنا. يمكنكم طلب الزيارة المجانية عبر الواتساب أو الاتصال المباشر، وسيقوم مهندسنا بالزيارة وأخذ القياسات وتقديم العرض."
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" data-scroll-behavior="smooth" className={notoSansArabic.variable}>
      <head>
        <meta name="theme-color" content="#059669" />
        <meta name="google-site-verification" content="Ne3Na-oIDWC4Bg9C4hlb9fNtyvJED1iLI5A9fHnVTnc" />
        
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link
          rel="preload"
          as="image"
          href="/images/slider1.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="preconnect" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech'} />
        <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech'} />
        
        <link rel="prefetch" href="/portfolio" />
        <link rel="prefetch" href="/contact" />
        <link rel="prefetch" href="/api/projects?limit=50&sort=newest" />
        
        <StructuredDataScript data={faqPageSchema} />
      </head>
      <body className="antialiased font-arabic pb-16 lg:pb-0" suppressHydrationWarning={true}>
        <GoogleAnalytics />
        <ServiceWorkerRegister />
        <WebVitals />
        <ClientBody>{children}</ClientBody>
        <WhatsAppWidget />
        <FloatingCallButton />
        <BottomNavigation />
      </body>
    </html>
  );
}
