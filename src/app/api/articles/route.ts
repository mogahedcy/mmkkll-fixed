import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';

// GET - جلب المقالات مع إحصائيات التفاعل
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
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { excerpt: { contains: search } },
        {
          article_tags: {
            some: {
              name: { contains: search }
            }
          }
        }
      ];
    }

    // تحديد ترتيب المقالات
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
        orderBy = [
          { views: 'desc' },
          { article_likes: { _count: 'desc' } } as any
        ];
        break;
      case 'most-liked':
        orderBy = [
          { article_likes: { _count: 'desc' } } as any,
          { views: 'desc' }
        ];
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
    const Article = db.articles || db.article;

    if (!Article || !process.env.DATABASE_URL) {
      return NextResponse.json({
        success: true,
        articles: [],
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

    const articles = await Article.findMany({
      where,
      include: {
        article_media_items: {
          orderBy: { order: 'asc' },
          take: 5
        },
        article_tags: {
          take: 10
        },
        _count: {
          select: {
            article_comments: {
              where: { status: 'APPROVED' }
            },
            article_likes: true,
            article_views: true,
            article_media_items: true
          }
        }
      },
      orderBy,
      skip,
      take
    });

    // تحسين البيانات المُرجعة
    const formattedArticles = articles.map((article: any) => ({
      ...article,
      mediaItems: article.article_media_items || [],
      tags: article.article_tags || [],
      views: article._count?.article_views || 0,
      likes: article._count?.article_likes || 0,
      commentsCount: article._count?.article_comments || 0,
      mediaCount: article._count?.article_media_items || 0,
      excerpt: article.excerpt || (article.content || '').substring(0, 200) + '...',
      readTime: Math.ceil((article.content || '').length / 1000),
      slug: article.slug || generateSlug(article.title, article.id)
    }));

    const totalCount = await Article.count({ where });

    // إحصائيات إضافية
    const stats = {
      total: totalCount,
      featured: await Article.count({ where: { ...where, featured: true } }),
      categories: await Article.groupBy({
        by: ['category'],
        where,
        _count: { category: true }
      })
    };

    return NextResponse.json({
      success: true,
      articles: formattedArticles,
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
    console.error('❌ خطأ في جلب المقالات:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المقالات' },
      { status: 500 }
    );
  }
}

// POST - إضافة مقالة جديدة
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    const {
      title,
      content,
      excerpt,
      author,
      category,
      featured,
      mediaItems,
      tags,
      metaTitle,
      metaDescription,
      keywords,
      status = 'PUBLISHED'
    } = data;

    // التحقق من صحة البيانات
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    // إنشاء slug فريد
    const slug = generateSlug(title);
    const existingSlug = await prisma.articles.findUnique({
      where: { slug }
    });

    const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;

    const article = await prisma.articles.create({
      data: {
        id: randomUUID(),
        title,
        content,
        excerpt: excerpt || content.substring(0, 200),
        author: author || 'محترفين الديار العالمية',
        category,
        featured: featured || false,
        slug: finalSlug,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || (excerpt || content).substring(0, 160),
        keywords: keywords || `${category}, محترفين الديار, مقالات`,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        updatedAt: new Date(),
        article_media_items: {
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
        },
        article_tags: {
          create: tags?.map((tag: string | { name: string }) => ({
            name: typeof tag === 'string' ? tag : tag.name
          })) || []
        }
      },
      include: {
        article_media_items: true,
        article_tags: true,
        _count: {
          select: {
            article_comments: true,
            article_likes: true,
            article_views: true
          }
        }
      }
    });

    // إنشاء أول مشاهدة (من الإدارة)
    await prisma.article_views.create({
      data: {
        id: randomUUID(),
        articleId: article.id,
        ip,
        userAgent: headersList.get('user-agent') || 'unknown',
        source: 'admin'
      }
    });

    // تحديث عداد المشاهدات
    await prisma.articles.update({
      where: { id: article.id },
      data: { views: 1 }
    });

    // إشعار Google بالمحتوى الجديد
    try {
      if (article.slug) {
        await notifyGoogleNewContent(article.slug);
      }
    } catch (error) {
      console.warn('فشل في إشعار Google:', error);
    }

    const formatted = {
      ...article,
      mediaItems: article.article_media_items,
      tags: article.article_tags,
      views: 1,
      likes: 0,
      commentsCount: 0
    };
    return NextResponse.json({ success: true, article: formatted, message: 'تم إضافة المقالة بنجاح' });

  } catch (error: unknown) {
    console.error('❌ خطأ في إضافة المقالة:', error);
    return NextResponse.json(
      { 
        error: 'حدث خطأ في إضافة المقالة',
        details: process.env.NODE_ENV === 'development' ? String(error) : undefined
      },
      { status: 500 }
    );
  }
}

// Helper functions
function generateSlug(title: string, id?: string): string {
  const slug = title
    .replace(/[^\u0600-\u06FF\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
    .trim();

  return id ? `${slug}-${id}` : slug;
}

async function notifyGoogleNewContent(slug: string): Promise<void> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech';
  const url = `${baseUrl}/articles/${slug}`;

  try {
    await fetch('https://www.google.com/ping?sitemap=' + encodeURIComponent(`${baseUrl}/sitemap.xml`));

    try {
      await fetch(`${baseUrl}/api/indexnow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [url] })
      });
    } catch (e) {
      console.warn('IndexNow submit failed:', e);
    }

    console.log('✅ تمت إشعارات الفهرسة:', url);
  } catch (error) {
    console.warn('⚠️ فشل في إشعار محركات البحث:', error);
  }
}
