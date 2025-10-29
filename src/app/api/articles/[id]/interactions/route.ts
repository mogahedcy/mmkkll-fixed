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
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const { type, action } = data;

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

        return NextResponse.json({
          success: true,
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

        return NextResponse.json({
          success: true,
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
