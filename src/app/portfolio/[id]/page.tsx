import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectDetailsClient from './ProjectDetailsClient';

interface Props {
  params: Promise<{ id: string }>;
}

// دالة لجلب بيانات المشروع من API
async function getProject(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? (process.env.NEXT_PUBLIC_BASE_URL.startsWith('http') 
          ? process.env.NEXT_PUBLIC_BASE_URL 
          : `https://${process.env.NEXT_PUBLIC_BASE_URL}`)
      : 'http://localhost:5000';
    const response = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store', // تجديد ��لبيانات في كل طلب
    });

    if (!response.ok) {
      return null;
    }

    const project = await response.json();
    return project; // إرجاع المشروع مباشرة
  } catch (err) {
    const error = err as { message?: string; status?: number };
    console.error('خطأ في جلب المشروع:', error);

    // في حالة 404
    if (error?.message?.includes('404') || error?.status === 404) {
      notFound();
    }

    // في حالة خطأ آخر
    if (error?.message?.includes('500') || error?.status >= 500) {
      return null;
    }

    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    // جلب بيانات المشروع
    const project = await getProject(id);

    if (!project) {
      return {
        title: 'المشروع غير موجود | محترفين الديار العالمية',
        description: 'المشروع المطلوب غير متوفر'
      };
    }

    const mainImage = project.mediaItems?.find(item => item.type === 'IMAGE');
    const seoTitle = `${project.title} في ${project.location} | محترفين الديار العالمية جدة`;
    const seoDescription = `${project.description.substring(0, 150)}... مشروع ${project.category} في ${project.location} من محترفين الديار العالمية - أفضل شركة مظلات وسواتر في جدة`;

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: [
        project.category,
        'جدة',
        'السعودية',
        'مظلات',
        'سواتر',
        'برجولات',
        'تنسيق حدائق',
        'محترفين الديار',
        project.location,
        project.title
      ].join(', '),
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        type: 'article',
        url: `https://aldeyarksa.tech/portfolio/${id}`,
        siteName: 'محترفين الديار العالمية',
        locale: 'ar_SA',
        images: project.mediaItems?.filter((item: any) => item.type === 'IMAGE').map((item: any) => ({
          url: item.src,
          width: 1200,
          height: 630,
          alt: `${project.title} - محترفين الديار العالمية جدة`,
          type: 'image/webp'
        })) || []
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription.substring(0, 200),
        images: mainImage ? [mainImage.src] : []
      },
      alternates: {
        canonical: `/portfolio/${id}`
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1
        }
      }
    };
  } catch (error) {
    return {
      title: 'خطأ | محترفين الديار العالمية',
      description: 'حدث خطأ في تحميل المشروع'
    };
  }
}

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
  };
}

export default async function ProjectDetailsPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  // إعداد structured data
  const images = project.mediaItems?.filter((item: any) => item.type === 'IMAGE') || [];
  const videos = project.mediaItems?.filter((item: any) => item.type === 'VIDEO') || [];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "url": `https://aldeyarksa.tech/portfolio/${project.slug || id}`,
    "creator": {
      "@type": "Organization",
      "name": "محترفين الديار العالمية",
      "url": "https://aldeyarksa.tech"
    },
    "dateCreated": project.createdAt,
    "dateModified": project.updatedAt,
    "locationCreated": {
      "@type": "Place",
      "name": project.location
    },
    "category": project.category,
    "image": images.map((item: any) => ({
      "@type": "ImageObject",
      "url": item.src,
      "caption": item.title || project.title,
      "encodingFormat": "image/jpeg"
    })),
    "video": videos.map((item: any) => ({
      "@type": "VideoObject",
      "name": item.title || project.title,
      "description": item.description || project.description,
      "contentUrl": item.src,
      "encodingFormat": "video/mp4",
      "uploadDate": project.createdAt
    }))
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "الرئيسية", "item": "https://aldeyarksa.tech"},
      {"@type": "ListItem", "position": 2, "name": "المشاريع", "item": "https://aldeyarksa.tech/portfolio"},
      {"@type": "ListItem", "position": 3, "name": project.title, "item": `https://aldeyarksa.tech/portfolio/${project.slug || id}`}
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbs),
        }}
      />
      <Navbar />
      <ProjectDetailsClient project={project} projectId={id} />
      <Footer />
    </>
  );
}
