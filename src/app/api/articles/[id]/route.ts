import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { randomUUID } from 'crypto';

// GET - جلب مقالة واحدة
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const param = resolvedParams.id;

    // السماح باستخدام المعرف أو الslug
    let article = await prisma.articles.findUnique({
      where: { id: param },
      include: {
        article_media_items: { orderBy: { order: 'asc' } },
        article_tags: true,
        _count: { select: { article_comments: true, article_likes: true } }
      }
    });

    if (!article) {
      article = await prisma.articles.findUnique({
        where: { slug: param },
        include: {
          article_media_items: { orderBy: { order: 'asc' } },
          article_tags: true,
          _count: { select: { article_comments: true, article_likes: true } }
        }
      });
    }

    if (!article) {
      return NextResponse.json({ error: 'المقالة غير موجودة' }, { status: 404 });
    }

    // زيادة عدد المشاهدات باستخدام معرف المقالة الحقيقي
    await prisma.articles.update({
      where: { id: article.id },
      data: { views: { increment: 1 } }
    });

    console.log('📖 تم جلب المقالة:', article.title);

    return NextResponse.json({
      ...article,
      mediaItems: (article as any).article_media_items,
      tags: (article as any).article_tags || [],
      views: (article.views || 0) + 1,
      likes: (article._count as any)?.article_likes || 0,
      commentsCount: (article._count as any)?.article_comments || 0,
      rating: article.rating || 0,
      readTime: Math.ceil((article.content || '').length / 1000)
    });

  } catch (error) {
    console.error('❌ خطأ في جلب المقالة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المقالة' },
      { status: 500 }
    );
  }
}

// PUT - تعديل مقالة
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const articleId = resolvedParams.id;
    const data = await request.json();
    console.log('🔧 تعديل المقالة:', articleId, data);

    const {
      title,
      content,
      excerpt,
      author,
      category,
      featured,
      mediaItems,
      tags
    } = data;

    // التحقق من صحة البيانات
    if (!title || !content || !category) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    // التحقق من وجود المقالة
    const existingArticle = await prisma.articles.findUnique({
      where: { id: articleId },
      include: {
        article_media_items: true,
        article_tags: true
      }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'المقالة غير موجودة' },
        { status: 404 }
      );
    }

    // حذف الوسائط والعلامات القديمة
    await prisma.article_media_items.deleteMany({
      where: { articleId }
    });

    await prisma.article_tags.deleteMany({
      where: { articleId }
    });

    // تحديث المقالة مع البيانات الجديدة
    const updatedArticle = await prisma.articles.update({
      where: { id: articleId },
      data: {
        title,
        content,
        excerpt: excerpt || content.substring(0, 200),
        author: author || 'محترفين الديار العالمية',
        category,
        featured: featured || false,
        updatedAt: new Date(),
        article_media_items: {
          create: mediaItems?.map((item: { type: string; src: string; thumbnail?: string; title?: string; description?: string; duration?: number }, index: number) => ({
            id: randomUUID(),
            type: item.type,
            src: item.src,
            thumbnail: item.thumbnail || item.src,
            title: item.title || `ملف ${index + 1}`,
            description: item.description || '',
            duration: item.duration || null,
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

    console.log('✅ تم تحديث المقالة بنجاح:', updatedArticle.title);

    // إشعار محركات البحث بالتحديث
    try {
      const origin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
      await fetch(`${origin}/api/sitemap/refresh`, { method: 'POST' });
      const pageUrl = `${origin}/articles/${updatedArticle.slug || updatedArticle.id}`;
      await fetch(`${origin}/api/indexnow`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ urls: [pageUrl] })
      });
    } catch (error) {
      console.warn('تعذر إشعار محركات البحث بالتحديث:', error);
    }

    return NextResponse.json({
      success: true,
      article: { 
        ...updatedArticle, 
        mediaItems: (updatedArticle as any).article_media_items,
        tags: (updatedArticle as any).article_tags
      },
      message: 'تم تحديث المقالة بنجاح'
    });

  } catch (error: unknown) {
    console.error('❌ خطأ في تحديث المقالة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المقالة' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مقالة
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const articleId = resolvedParams.id;

    // التحقق من وجود المقالة
    const existingArticle = await prisma.articles.findUnique({
      where: { id: articleId },
      include: {
        article_media_items: true,
        article_tags: true,
        article_comments: true
      }
    });

    if (!existingArticle) {
      return NextResponse.json(
        { error: 'المقالة غير موجودة' },
        { status: 404 }
      );
    }

    console.log('🗑️ حذف المقالة:', existingArticle.title);

    // حذف البيانات المرتبطة أولاً
    await prisma.article_comments.deleteMany({
      where: { articleId }
    });

    await prisma.article_media_items.deleteMany({
      where: { articleId }
    });

    await prisma.article_tags.deleteMany({
      where: { articleId }
    });

    await prisma.article_views.deleteMany({
      where: { articleId }
    });

    await prisma.article_likes.deleteMany({
      where: { articleId }
    });

    // حذف المقالة
    await prisma.articles.delete({
      where: { id: articleId }
    });

    console.log('✅ تم حذف المقالة بنجاح');

    // إشعار جوجل بالحذف
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sitemap/refresh`, {
        method: 'POST'
      });
    } catch (error) {
      console.warn('تعذر إشعار جوجل بالحذف:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'تم حذف المقالة بنجاح'
    });

  } catch (error: unknown) {
    console.error('❌ خطأ في حذف المقالة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف المقالة' },
      { status: 500 }
    );
  }
}
