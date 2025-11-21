import { prisma } from '@/lib/prisma';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
  
  let videosByPage = new Map<string, any[]>();

  try {
    // جلب جميع المشاريع المنشورة مع الفيديوهات
    const projects = await prisma.projects.findMany({
      where: {
        status: 'PUBLISHED'
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        location: true,
        createdAt: true,
        publishedAt: true,
        media_items: {
          where: {
            type: 'VIDEO'
          },
          orderBy: {
            order: 'asc'
          },
          select: {
            src: true,
            title: true,
            description: true,
            thumbnail: true,
            duration: true
          }
        }
      }
    });

    // تجميع الفيديوهات حسب صفحة المشروع
    projects.forEach(project => {
      if (project.media_items.length > 0) {
        const pageUrl = `${baseUrl}/portfolio/${project.slug || project.id}`;
        videosByPage.set(pageUrl, project.media_items.map((media, idx) => ({
          ...media,
          project: {
            title: project.title,
            category: project.category,
            location: project.location,
            description: project.description
          },
          index: idx
        })));
      }
    });

  } catch (error) {
    console.error('خطأ في جلب الفيديوهات:', error);
  }

  // بناء sitemap للفيديوهات
  const videosSitemap = Array.from(videosByPage.entries())
    .map(([pageUrl, videos]) => {
      const videoElements = videos
        .map((video, idx) => {
          const videoUrl = video.src.startsWith('http') ? video.src : `${baseUrl}${video.src}`;
          const thumbnailUrl = video.thumbnail 
            ? (video.thumbnail.startsWith('http') ? video.thumbnail : `${baseUrl}${video.thumbnail}`)
            : `${baseUrl}/favicon.svg`;
          
          // تنظيف الـ URL من المسافات
          const cleanVideoUrl = videoUrl.replace(/\s+/g, '');
          const cleanThumbnailUrl = thumbnailUrl.replace(/\s+/g, '');
          
          // حساب المدة (افتراضي PT2M إذا لم تكن موجودة)
          const duration = video.duration || 'PT2M';
          
          // استخراج المدة من الصيغة ISO 8601 (PT2M مثلاً)
          const durationMatch = duration.match(/PT(\d+)M/);
          const durationSeconds = durationMatch ? parseInt(durationMatch[1]) * 60 : 120;
          
          return `<video:video>
        <video:thumbnail_loc>${cleanThumbnailUrl}</video:thumbnail_loc>
        <video:title><![CDATA[${video.title || `${video.project.category} - ${video.project.title}`}]]></video:title>
        <video:description><![CDATA[${video.description || `فيديو توضيحي لمشروع ${video.project.title} - ${video.project.category} في ${video.project.location}. تنفيذ محترفين الديار العالمية بجودة عالية وضمان 10 سنوات`}]]></video:description>
        <video:content_loc>${cleanVideoUrl}</video:content_loc>
        <video:player_loc>${cleanVideoUrl}</video:player_loc>
        <video:duration>${durationSeconds}</video:duration>
        <video:expiration_date>${new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</video:expiration_date>
        <video:publication_date>${new Date().toISOString()}</video:publication_date>
        <video:tag>محترفين الديار</video:tag>
        <video:tag>${video.project.category}</video:tag>
        <video:tag>${video.project.location}</video:tag>
        <video:category>أعمال</video:category>
      </video:video>`;
        })
        .join('\n      ');

      return `<url>
    <loc>${pageUrl}</loc>
    ${videoElements}
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`;
    })
    .join('\n  ');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${videosSitemap || '<url><loc>' + baseUrl + '/portfolio</loc></url>'}
</urlset>`;

  return new Response(sitemap, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=900, s-maxage=900, stale-while-revalidate=3600',
      'CDN-Cache-Control': 'max-age=900',
      'X-Robots-Tag': 'index, follow, noarchive',
      'X-Total-Videos': videosByPage.values().reduce((acc, videos) => acc + videos.length, 0).toString(),
      'X-Total-Pages': videosByPage.size.toString(),
      'X-Last-Updated': new Date().toISOString(),
      'Vary': 'Accept-Encoding',
      'ETag': `"videos-sitemap-${new Date().getTime()}"`,
    },
  });
}
