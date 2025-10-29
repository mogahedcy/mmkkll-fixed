import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { verifyToken } from '@/lib/jwt';

interface CommentRequest {
  name: string;
  email?: string;
  message: string;
  rating: number;
}

function validateComment(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.name || typeof data.name !== 'string' || !data.name.trim()) {
    errors.push('الاسم مطلوب ولا يمكن أن يكون فارغاً');
  } else {
    const nameLength = data.name.trim().length;
    if (nameLength < 2) {
      errors.push('الاسم يجب أن يكون على الأقل حرفين');
    } else if (nameLength > 50) {
      errors.push('الاسم يجب أن يكون أقل من 50 حرف');
    }
  }

  if (data.email && typeof data.email === 'string' && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  if (!data.message || typeof data.message !== 'string' || !data.message.trim()) {
    errors.push('التعليق مطلوب ولا يمكن أن يكون فارغاً');
  } else {
    const messageLength = data.message.trim().length;
    if (messageLength < 5) {
      errors.push('التعليق يجب أن يكون على الأقل 5 أحرف');
    } else if (messageLength > 500) {
      errors.push('التعليق يجب أن يكون أقل من 500 حرف');
    }
  }

  if (data.rating === null || data.rating === undefined || typeof data.rating !== 'number') {
    errors.push('التقييم مطلوب');
  } else if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.push('التقييم يجب أن يكون رقم صحيح بين 1 و 5');
  }

  return { valid: errors.length === 0, errors };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params;

    const article = await prisma.articles.findUnique({
      where: { id: articleId },
      select: { id: true }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'المقالة غير موجودة' },
        { status: 404 }
      );
    }

    const comments = await prisma.article_comments.findMany({
      where: { articleId, status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true
      }
    });

    const mapped = comments.map(c => ({
      ...c,
      createdAt: c.createdAt.toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=059669&color=fff`
    }));

    return NextResponse.json({ success: true, comments: mapped });
  } catch (error) {
    console.error('خطأ في جلب التعليقات:', error);
    return NextResponse.json(
      { error: 'خطأ في جلب التعليقات' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const articleId = resolvedParams.id;
    const body = await request.json();
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';

    const validation = validateComment(body);
    if (!validation.valid) {
      return NextResponse.json(
        {
          error: 'بيانات غير صحيحة',
          details: validation.errors
        },
        { status: 400 }
      );
    }

    const { name, email, message, rating } = body;

    const article = await prisma.articles.findUnique({
      where: { id: articleId }
    });

    if (!article) {
      return NextResponse.json(
        { error: 'المقالة غير موجودة' },
        { status: 404 }
      );
    }

    const recentComment = await prisma.article_comments.findFirst({
      where: {
        articleId,
        name: name.trim(),
        createdAt: {
          gte: new Date(Date.now() - 10 * 60 * 1000)
        }
      }
    });

    if (recentComment) {
      return NextResponse.json(
        { error: 'لقد أضفت تعليقاً مؤخراً. يرجى الانتظار قبل إضافة تعليق آخر' },
        { status: 429 }
      );
    }

    const newComment = await prisma.article_comments.create({
      data: {
        id: randomUUID(),
        articleId,
        name: name.trim(),
        email: email?.trim() || null,
        message: message.trim(),
        rating,
        ip,
        userAgent
      },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true
      }
    });

    const allComments = await prisma.article_comments.findMany({
      where: { articleId, status: 'APPROVED' },
      select: { rating: true }
    });

    if (allComments.length > 0) {
      const averageRating = allComments.reduce((sum, comment) => sum + comment.rating, 0) / allComments.length;

      await prisma.articles.update({
        where: { id: articleId },
        data: { rating: averageRating }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'تم إضافة التعليق بنجاح',
      comment: {
        ...newComment,
        createdAt: newComment.createdAt.toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.name)}&background=059669&color=fff`
      }
    }, { status: 201 });

  } catch (error) {
    console.error('خطأ في إضافة التعليق:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إضافة التعليق' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params;
    const token = request.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    try {
      verifyToken(token);
    } catch {
      return NextResponse.json({ error: 'جلسة غير صالحة' }, { status: 401 });
    }

    const { commentId, status } = await request.json();
    if (!commentId || !status) {
      return NextResponse.json({ error: 'بيانات ناقصة' }, { status: 400 });
    }

    const updated = await prisma.article_comments.update({
      where: { id: commentId },
      data: { status }
    });

    await recalculateArticleRating(articleId);

    return NextResponse.json({ success: true, comment: { id: updated.id, status: updated.status } });
  } catch (error) {
    console.error('خطأ في تحديث التعليق:', error);
    return NextResponse.json({ error: 'فشل في تحديث التعليق' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: articleId } = await params;
    const commentId = request.nextUrl.searchParams.get('commentId');

    const token = request.cookies.get('admin-token')?.value;
    if (!token) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    try {
      verifyToken(token);
    } catch {
      return NextResponse.json({ error: 'جلسة غير صالحة' }, { status: 401 });
    }

    if (!commentId) {
      return NextResponse.json({ error: 'commentId مطلوب' }, { status: 400 });
    }

    await prisma.article_comments.delete({ where: { id: commentId } });
    await recalculateArticleRating(articleId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في حذف التعليق:', error);
    return NextResponse.json({ error: 'فشل في حذف التعليق' }, { status: 500 });
  }
}

async function recalculateArticleRating(articleId: string): Promise<void> {
  const approvedComments = await prisma.article_comments.findMany({
    where: { articleId, status: 'APPROVED' },
    select: { rating: true }
  });

  if (approvedComments.length > 0) {
    const averageRating = approvedComments.reduce((sum, comment) => sum + comment.rating, 0) / approvedComments.length;
    await prisma.articles.update({
      where: { id: articleId },
      data: { rating: averageRating }
    });
  } else {
    await prisma.articles.update({
      where: { id: articleId },
      data: { rating: 0 }
    });
  }
}
