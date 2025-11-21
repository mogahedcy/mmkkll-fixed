import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BreadcrumbSchema from '@/components/BreadcrumbSchema';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  params: Promise<{ id: string; videoId: string }>;
}

const getProjectWithVideo = cache(async (id: string, videoId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? (process.env.NEXT_PUBLIC_BASE_URL.startsWith('http') 
          ? process.env.NEXT_PUBLIC_BASE_URL 
          : `https://${process.env.NEXT_PUBLIC_BASE_URL}`)
      : 'http://localhost:5000';
    
    const response = await fetch(`${baseUrl}/api/projects/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const project = await response.json();
    
    // البحث عن الفيديو المطلوب
    const video = project.mediaItems?.find((item: any) => 
      item.type === 'VIDEO' && item.id === videoId
    );
    
    if (!video) {
      return null;
    }

    return { project, video };
  } catch (err) {
    console.error('خطأ في جلب المشروع أو الفيديو:', err);
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ id: string; videoId: string }> }): Promise<Metadata> {
  const { id, videoId } = await params;
  
  const data = await getProjectWithVideo(id, videoId);

  if (!data) {
    return {
      title: 'الفيديو غير موجود',
      robots: 'noindex, nofollow'
    };
  }

  const { project, video } = data;
  const videoTitle = `${video.title || project.title} - فيديو ${project.category}`;
  const videoDescription = `فيديو ${project.category} - ${project.title} في ${project.location}. ${video.description || project.description.substring(0, 100)}. تنفيذ محترفين الديار العالمية بجودة عالية.`;
  const videoUrl = `/portfolio/${project.slug || id}/video/${videoId}`;
  const fullUrl = `https://www.aldeyarksa.tech${videoUrl}`;
  const thumbnailUrl = video.thumbnail || 'https://www.aldeyarksa.tech/favicon.svg';

  return {
    title: videoTitle,
    description: videoDescription,
    keywords: [project.category, project.location, 'محترفين الديار', 'فيديو', video.title].filter(Boolean),
    authors: [{ name: 'محترفين الديار العالمية' }],
    robots: 'index, follow',
    canonical: fullUrl,
    openGraph: {
      title: videoTitle,
      description: videoDescription,
      url: fullUrl,
      type: 'video.other',
      images: [
        {
          url: thumbnailUrl,
          width: 1200,
          height: 630,
          alt: videoTitle
        }
      ],
      videos: [
        {
          url: video.src,
          type: 'video/mp4',
          width: 1920,
          height: 1080
        }
      ]
    },
    twitter: {
      card: 'player',
      title: videoTitle,
      description: videoDescription,
      images: [thumbnailUrl]
    }
  };
}

async function VideoPage({ params }: { params: Promise<{ id: string; videoId: string }> }) {
  const { id, videoId } = await params;
  
  const data = await getProjectWithVideo(id, videoId);

  if (!data) {
    notFound();
  }

  const { project, video } = data;
  const projectUrl = `/portfolio/${project.slug || id}`;
  const fullUrl = `https://www.aldeyarksa.tech/portfolio/${project.slug || id}/video/${videoId}`;
  
  // الحصول على صورة مصغرة: استخدام صورة الفيديو أو أول صورة من المشروع
  const getThumbnail = () => {
    if (video.thumbnail) {
      return video.thumbnail.startsWith('http') ? video.thumbnail : `https://www.aldeyarksa.tech${video.thumbnail}`;
    }
    // استخدام أول صورة من المشروع إذا لم يكن للفيديو صورة مصغرة
    const firstImage = project.mediaItems?.find((item: any) => item.type === 'IMAGE');
    if (firstImage?.src) {
      return firstImage.src.startsWith('http') ? firstImage.src : `https://www.aldeyarksa.tech${firstImage.src}`;
    }
    return 'https://www.aldeyarksa.tech/favicon.svg';
  };
  
  const thumbnailUrl = getThumbnail();

  return (
    <>
      <VideoStructuredData project={project} video={video} videoUrl={fullUrl} thumbnailUrl={thumbnailUrl} />
      <BreadcrumbSchema items={[
        { name: 'الرئيسية', url: 'https://www.aldeyarksa.tech' },
        { name: 'المحفظة', url: 'https://www.aldeyarksa.tech/portfolio' },
        { name: project.title, url: `https://www.aldeyarksa.tech${projectUrl}` },
        { name: video.title || 'الفيديو', url: fullUrl }
      ]} />
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-600">
            <Link href="/" className="hover:text-accent">الرئيسية</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/portfolio" className="hover:text-accent">المحفظة</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={projectUrl} className="hover:text-accent">{project.title}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-accent font-medium">{video.title || 'الفيديو'}</span>
          </div>

          {/* Video Container - Main Content */}
          <article className="mb-12">
            <header className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {video.title || `فيديو ${project.category}`}
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed">
                {video.description || `فيديو توضيحي لمشروع ${project.title} - ${project.category} في ${project.location}`}
              </p>
            </header>

            {/* Video Player */}
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-black aspect-video">
              <video
                controls
                width={1920}
                height={1080}
                className="w-full h-full"
                poster={video.thumbnail || 'https://www.aldeyarksa.tech/favicon.svg'}
              >
                <source src={video.src} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديوهات
              </video>
            </div>

            {/* Project Info */}
            <section className="bg-white rounded-lg shadow p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات المشروع</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">المشروع</h3>
                  <Link href={projectUrl} className="text-accent hover:underline">
                    {project.title}
                  </Link>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">الخدمة</h3>
                  <p className="text-gray-700">{project.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">الموقع</h3>
                  <p className="text-gray-700">{project.location}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">الشركة</h3>
                  <p className="text-gray-700">محترفين الديار العالمية</p>
                </div>
              </div>

              {project.description && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">وصف المشروع</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              )}
            </section>

            {/* Back to Project */}
            <div className="text-center">
              <Link 
                href={projectUrl}
                className="inline-block px-8 py-3 bg-accent text-white rounded-lg hover:bg-accent-dark transition-colors"
              >
                العودة إلى المشروع
              </Link>
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </>
  );
}

interface VideoStructuredDataProps {
  project: any;
  video: any;
  videoUrl: string;
  thumbnailUrl: string;
}

function VideoStructuredData({ project, video, videoUrl, thumbnailUrl }: VideoStructuredDataProps) {
  // تنسيق الصورة المصغرة كـ array من الصور (مطلوب من Google)
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title || `${project.category} - ${project.title}`,
    "description": video.description || `فيديو ${project.category} - ${project.title} في ${project.location}`,
    "thumbnailUrl": [thumbnailUrl],
    "uploadDate": new Date().toISOString(),
    "duration": video.duration || "PT2M",
    "url": videoUrl,
    "contentUrl": video.src,
    "inLanguage": "ar-SA",
    "author": {
      "@type": "Organization",
      "name": "محترفين الديار العالمية",
      "url": "https://www.aldeyarksa.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.aldeyarksa.tech/favicon.svg",
        "width": 250,
        "height": 250
      }
    },
    "keywords": [project.category, project.location, project.title].filter(Boolean).join(", "),
    "isPartOf": {
      "@type": "WebPage",
      "name": project.title,
      "url": `https://www.aldeyarksa.tech/portfolio/${project.slug || project.id}`
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
    />
  );
}

export default VideoPage;
