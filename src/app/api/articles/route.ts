import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { normalizeArticleCategoryName } from '@/lib/categoryNormalizer';

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
      const categoryValidation = normalizeArticleCategoryName(category);
      if (categoryValidation.isValid && categoryValidation.normalizedCategory) {
        where.category = {
          contains: categoryValidation.normalizedCategory
        };
        if (categoryValidation.wasTransformed) {
          console.log(`✅ Articles GET - تم تحويل الفئة: "${category}" → "${categoryValidation.normalizedCategory}"`);
        }
      } else {
        where.category = {
          contains: category
        };
      }
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
    // @ts-expect-error - Prisma orderBy type

    let orderBy: Array<Record<string, unknown>> = [];
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
          // @ts-expect-error - Prisma orderBy type compatibility
          { article_likes: { _count: 'desc' } }
        ];
        break;
      case 'most-liked':
        orderBy = [
          { article_likes: { _count: 'desc' } },
          { views: 'desc' }
          // @ts-expect-error - Prisma orderBy type compatibility
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

    const articles = await prisma.articles.findMany({
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
    // @ts-expect-error - Prisma type compatibility

    const formattedArticles = articles.map((article: Record<string, unknown>) => {
    // @ts-expect-error - Prisma result type compatibility
      const _count = article._count as Record<string, unknown> | undefined;
      const content = article.content as string | undefined;
      const excerpt = article.excerpt as string | undefined;
      const title = article.title as string;
      const id = article.id as string;
      
      return {
        ...article,
        mediaItems: article.article_media_items || [],
        tags: article.article_tags || [],
        views: _count?.article_views || 0,
        likes: _count?.article_likes || 0,
        commentsCount: _count?.article_comments || 0,
        mediaCount: _count?.article_media_items || 0,
        excerpt: excerpt || (content || '').substring(0, 200) + '...',
        readTime: Math.ceil((content || '').length / 1000),
        slug: article.slug || generateSlug(title, id)
      };
    });

    const totalCount = await prisma.articles.count({ where });

    // إحصائيات إضافية
    const stats = {
      total: totalCount,
      featured: await prisma.articles.count({ where: { ...where, featured: true } }),
      categories: await prisma.articles.groupBy({
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

    // التحقق من صحة الفئة وتحويلها تلقائياً
    const categoryValidation = normalizeArticleCategoryName(category);
    if (!categoryValidation.isValid || !categoryValidation.normalizedCategory) {
      return NextResponse.json(
        { error: `الفئة "${category}" غير صالحة. الرجاء اختيار فئة من القائمة المتاحة.` },
        { status: 400 }
      );
    }

    const normalizedCategory = categoryValidation.normalizedCategory;
    
    if (categoryValidation.wasTransformed) {
      console.log(`✅ تم تحويل الفئة: "${category}" → "${normalizedCategory}"`);
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
        category: normalizedCategory,
        featured: featured || false,
        slug: finalSlug,
        metaTitle: metaTitle || title,
        metaDescription: metaDescription || (excerpt || content).substring(0, 160),
        keywords: keywords || `${category}, محترفين الديار, مقالات`,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
        updatedAt: new Date(),
        article_media_items: {
          // @ts-expect-error - Dynamic media properties

          create: mediaItems?.map((item: unknown, index: number) => {
            const mediaItem = item as Record<string, unknown>;
            // @ts-expect-error - Dynamic media item properties
            return {
              id: randomUUID(),
              type: mediaItem.type as string,
              src: (mediaItem.src || mediaItem.url) as string,
              thumbnail: (mediaItem.thumbnail || mediaItem.src || mediaItem.url) as string,
              title: (mediaItem.title || `ملف ${index + 1}`) as string,
              description: (mediaItem.description || '') as string,
              duration: (mediaItem.duration || null) as number | null,
              fileSize: (mediaItem.fileSize || null) as number | null,
              mimeType: (mediaItem.mimeType || null) as string | null,
              alt: (mediaItem.alt || title) as string,
              caption: (mediaItem.caption || '') as string,
              order: index
            };
          }) || []
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.aldeyarksa.tech';
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
