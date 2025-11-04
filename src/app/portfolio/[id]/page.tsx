import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import { 
  generateCreativeWorkSchema,
  generateOpenGraphMetadata,
  generateTwitterMetadata,
  generateRobotsMetadata 
} from '@/lib/seo-utils';
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
    const pageUrl = `/portfolio/${id}`;

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
      openGraph: generateOpenGraphMetadata({
        title: seoTitle,
        description: seoDescription,
        url: pageUrl,
        type: 'article',
        image: mainImage?.src,
        imageAlt: `${project.title} - محترفين الديار العالمية جدة`
      }),
      twitter: generateTwitterMetadata({
        title: seoTitle,
        description: seoDescription.substring(0, 200),
        image: mainImage?.src
      }),
      alternates: {
        canonical: generateCanonicalUrl(pageUrl)
      },
      robots: generateRobotsMetadata()
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

  const breadcrumbItems = [
    { label: 'المشاريع', href: '/portfolio' },
    { label: project.title, href: `/portfolio/${project.slug || id}`, current: true }
  ];

  const structuredData = generateCreativeWorkSchema({
    name: project.title,
    description: project.description,
    url: `/portfolio/${project.slug || id}`,
    category: project.category,
    location: project.location,
    dateCreated: project.createdAt,
    dateModified: project.updatedAt,
    images: images.map((item: any) => ({
      url: item.src,
      caption: item.title || project.title
    })),
    videos: videos.map((item: any) => ({
      name: item.title || project.title,
      description: item.description || project.description,
      contentUrl: item.src,
      uploadDate: project.createdAt
    }))
  });

  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <Navbar />
      <ProjectDetailsClient project={project} projectId={id} />
      <Footer />
    </>
  );
}
