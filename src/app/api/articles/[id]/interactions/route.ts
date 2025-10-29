import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const articleId = resolvedParams.id;
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';

    const article = await prisma.articles.findUnique({
      where: { id: articleId },
      select: {
        views: true,
        _count: {
          select: {
            article_likes: true,
            article_comments: {
              where: { status: 'APPROVED' }
            }
          }
        }
      }
    });

    if (!article) {
      return NextResponse.json({ error: 'المقالة غير موجودة' }, { status: 404 });
    }

    const isLiked = await prisma.article_likes.findFirst({
      where: {
        articleId,
        ip
      }
    });

    return NextResponse.json({
      success: true,
      interactions: {
        views: article.views,
        likes: article._count.article_likes,
        comments: article._count.article_comments,
        isLiked: !!isLiked
      }
    });
  } catch (error) {
    console.error('خطأ في جلب التفاعلات:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const articleId = resolvedParams.id;
    const data = await request.json();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer') || 'direct';

    const { type, action } = data;

    const article = await prisma.articles.findUnique({
      where: { id: articleId }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'المقالة غير موجودة' },
        { status: 404 }
      );
    }

    if (type === 'view') {
      const existingView = await prisma.article_views.findFirst({
        where: {
          articleId,
          ip,
          createdAt: {
            gte: new Date(Date.now() - 24 * 60 * 60 * 1000)
          }
        }
      });

      if (!existingView) {
        await prisma.article_views.create({
          data: {
            id: randomUUID(),
            articleId,
            ip,
            userAgent,
            source: getSource(referrer),
            referrer
          }
        });

        const updatedArticle = await prisma.articles.update({
          where: { id: articleId },
          data: { views: { increment: 1 } },
          select: { views: true }
        });

        return NextResponse.json({
          type: 'view',
          success: true,
          newCount: updatedArticle.views,
          isNew: true
        });
      }

      return NextResponse.json({
        type: 'view',
        success: true,
        newCount: article.views,
        isNew: false
      });
    }

    if (type === 'like' && action === 'toggle') {
      const existingLike = await prisma.article_likes.findFirst({
        where: { articleId, ip }
      });

      if (existingLike) {
        await prisma.article_likes.delete({
          where: { id: existingLike.id }
        });

        const newCount = await prisma.article_likes.count({
          where: { articleId }
        });

        await prisma.articles.update({
          where: { id: articleId },
          data: { likes: newCount }
        });

        return NextResponse.json({
          success: true,
          action: 'removed',
          isLiked: false,
          newCount
        });
      } else {
        await prisma.article_likes.create({
          data: {
            id: randomUUID(),
            articleId,
            ip,
            userAgent
          }
        });

        const newCount = await prisma.article_likes.count({
          where: { articleId }
        });

        await prisma.articles.update({
          where: { id: articleId },
          data: { likes: newCount }
        });

        return NextResponse.json({
          success: true,
          action: 'added',
          isLiked: true,
          newCount
        });
      }
    }

    return NextResponse.json({ error: 'نوع غير صالح' }, { status: 400 });
  } catch (error) {
    console.error('خطأ في التفاعل:', error);
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

function getSource(referrer: string): string {
  if (referrer.includes('google.com')) return 'google';
  if (referrer.includes('facebook.com')) return 'facebook';
  if (referrer.includes('instagram.com')) return 'instagram';
  if (referrer.includes('twitter.com') || referrer.includes('x.com')) return 'twitter';
  if (referrer.includes('linkedin.com')) return 'linkedin';
  if (referrer.includes('youtube.com')) return 'youtube';
  if (referrer.includes('tiktok.com')) return 'tiktok';
  if (referrer === 'direct') return 'direct';
  return 'other';
}
