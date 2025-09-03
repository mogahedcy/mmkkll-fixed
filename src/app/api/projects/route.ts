import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';

// GET - جلب المشاريع مع إحصائيات التفاعل
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const page = searchParams.get('page');
    const sort = searchParams.get('sort') || 'newest';
    const search = searchParams.get('search');
    const status = searchParams.get('status') || 'PUBLISHED';

    const skip = page ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12) : 0;
    const take = limit ? Number.parseInt(limit) : 12;

    const where: Record<string, unknown> = {
      status: status
    };

    if (category && category !== 'all') {
      where.category = {
        contains: category
      };
    }

    if (featured === 'true') {
      where.featured = true;
    }

    if (search) {
      const searchLower = search.toLowerCase();
      where.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { location: { contains: search } },
        {
          tags: {
            some: {
              name: { contains: search }
            }
          }
        }
      ];
    }

    // تحديد ترتيب المشاريع
    let orderBy: Array<Record<string, string>> = [];
    switch (sort) {
      case 'newest':
        orderBy = [{ publishedAt: 'desc' }, { createdAt: 'desc' }];
        break;
      case 'oldest':
        orderBy = [{ publishedAt: 'asc' }, { createdAt: 'asc' }];
        break;
      case 'featured':
        orderBy = [{ featured: 'desc' }, { publishedAt: 'desc' }];
        break;
      case 'popular':
        orderBy = [{ views: 'desc' }, { likes: 'desc' }];
        break;
      case 'most-liked':
        orderBy = [{ likes: 'desc' }, { views: 'desc' }];
        break;
      case 'highest-rated':
        orderBy = [{ rating: 'desc' }, { views: 'desc' }];
        break;
      case 'alphabetical':
        orderBy = [{ title: 'asc' }];
        break;
      default:
        orderBy = [{ featured: 'desc' }, { publishedAt: 'desc' }];
    }

    const db: any = prisma as any;
    const Project = db.projects || db.project;

    if (!Project || !process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        projects: [],
        total: 0,
        stats: { total: 0, featured: 0, categories: [] },
        pagination: {
          total: 0,
          page: page ? Number.parseInt(page) : 1,
          limit: take,
          totalPages: 0,
          hasMore: false
        }
      });
    }

    const projects = await Project.findMany({
      where,
      include: {
        media_items: {
          orderBy: { order: 'asc' },
          take: 5
        },
        project_tags: {
          take: 10
        },
        _count: {
          select: {
            comments: {
              where: { status: 'APPROVED' }
            },
            project_likes: true,
            project_views: true,
            media_items: true
          }
        }
      },
      orderBy,
      skip,
      take
    });

    // تحسين البيانات المُرجعة
    const formattedProjects = projects.map((project: any) => ({
      ...project,
      mediaItems: project.media_items || [],
      tags: project.project_tags || [],
      views: project._count?.project_views || 0,
      likes: project._count?.project_likes || 0,
      commentsCount: project._count?.comments || 0,
      mediaCount: project._count?.media_items || 0,
      excerpt: (project.description || '').substring(0, 150) + '...',
      readTime: Math.ceil((project.description || '').length / 200),
      slug: project.slug || generateSlug(project.title, project.id)
    }));

    const totalCount = await Project.count({ where });

    // إحصائيات إضافية
    const stats = {
      total: totalCount,
      featured: await Project.count({ where: { ...where, featured: true } }),
      categories: await Project.groupBy({
        by: ['category'],
        where,
        _count: { category: true }
      })
    };

    return NextResponse.json({
      success: true,
      projects: formattedProjects,
      total: totalCount,
      stats,
      pagination: {
        total: totalCount,
        page: page ? Number.parseInt(page) : 1,
        limit: take,
        totalPages: Math.ceil(totalCount / take),
        hasMore: skip + take < totalCount
      }
    });

  } catch (error: unknown) {
    console.error('❌ خطأ في جلب المشاريع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المشاريع' },
      { status: 500 }
    );
  }
}

// POST - إضافة مشروع جديد
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    const {
      title,
      description,
      category,
      location,
      completionDate,
      client,
      featured,
      projectDuration,
      projectCost,
      mediaItems,
      tags,
      materials,
      metaTitle,
      metaDescription,
      keywords,
      status = 'PUBLISHED'
    } = data;

    // التحقق من صحة البيانات
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    // إنشاء slug فريد
    const slug = generateSlug(title);
    const existingSlug = await prisma.projects.findUnique({
      where: { slug }
    });

    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const project = await prisma.projects.create({
      data: {
        id: randomUUID(),
        title,
        description,
        category,
        location,
        completionDate: completionDate ? new Date(completionDate) : new Date(),
        client: client || null,
        featured: featured || false,
        projectDuration: projectDuration || '',
        projectCost: projectCost || '',
        slug: finalSlug,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || description.substring(0, 160),
        keywords: keywords || `${category}, ${location}, محترفين الديار`,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        updatedAt: new Date(),
        media_items: {
          create: mediaItems?.map((item: any, index: number) => ({
            id: randomUUID(),
            type: item.type,
            src: item.src || item.url,
            thumbnail: item.thumbnail || item.src || item.url,
            title: item.title || `ملف ${index + 1}`,
            description: item.description || '',
            duration: item.duration || null,
            fileSize: item.fileSize || null,
            mimeType: item.mimeType || null,
            alt: item.alt || title,
            caption: item.caption || '',
            order: index
          })) || []
        }
      },
      include: {
        media_items: true,
        _count: {
          select: {
            comments: true,
            project_likes: true,
            project_views: true
          }
        }
      }
    });

    // إ��شاء أول مشاهدة (من الإدارة)
    await prisma.project_views.create({
      data: {
        id: randomUUID(),
        projectId: project.id,
        ip,
        userAgent: headersList.get('user-agent') || 'unknown',
        source: 'admin'
      }
    });

    // تحديث عداد المشاهدات
    await prisma.projects.update({
      where: { id: project.id },
      data: { views: 1 }
    });

    // إشعار Google بالمحتوى الجديد
    try {
      await notifyGoogleNewContent(project.slug);
    } catch (error) {
      console.warn('فشل في إشعار Google:', error);
    }

    const formatted = {
      ...project,
      mediaItems: project.media_items,
      views: 1,
      likes: 0,
      commentsCount: 0
    };
    return NextResponse.json({ success: true, project: formatted, message: 'تم إضافة المشروع بنجاح' });

  } catch (error: unknown) {
    console.error('❌ خطأ في إضافة المشروع:', error);
    return NextResponse.json(
      { 
        error: 'حدث خطأ في إضافة المشروع',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

// Helper functions
function generateSlug(title: string, id?: string): string {
  const slug = title
    .replace(/[^\u0600-\u06FF\w\s-]/g, '') // إزالة الرموز ما عدا العربية والإنجليزية
    .replace(/\s+/g, '-') // استبدال المسافات بشرطات
    .toLowerCase()
    .trim();

  return id ? `${slug}-${id}` : slug;
}

async function notifyGoogleNewContent(slug: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech';
  const url = `${baseUrl}/portfolio/${slug}`;

  try {
    // إشعار Google بالصفحة الجديدة
    await fetch('https://www.google.com/ping?sitemap=' + encodeURIComponent(`${baseUrl}/sitemap.xml`));

    // يمكن إضافة Google Search Console API هنا
    console.log('✅ تم إشعار Google بالمحتوى الجديد:', url);
  } catch (error) {
    console.warn('⚠️ فشل في إشعار Google:', error);
  }
}
