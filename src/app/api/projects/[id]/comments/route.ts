import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { verifyToken } from '@/lib/jwt';

// نموذج التحقق من بيانات التعليق
interface CommentRequest {
  name: string;
  email?: string;
  message: string;
  rating: number;
}

// دالة التحقق من صحة البيانات
function validateComment(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // التحقق من الاسم
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

  // التحقق من البريد الإلكتروني (اختياري)
  if (data.email && typeof data.email === 'string' && data.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('البريد الإلكتروني غير صحيح');
    }
  }

  // التحقق من التعليق
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

  // التحقق من التقييم
  if (data.rating === null || data.rating === undefined || typeof data.rating !== 'number') {
    errors.push('التقييم مطلوب');
  } else if (!Number.isInteger(data.rating) || data.rating < 1 || data.rating > 5) {
    errors.push('التقييم يجب أن يكون رقم صحيح بين 1 و 5');
  }

  return { valid: errors.length === 0, errors };
}

// GET - جلب التعليقات
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;

    // التحقق من وجود المشروع أولاً
    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      select: { id: true }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    const comments = await prisma.comments.findMany({
      where: { projectId, status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
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

// POST - إضافة تعليق جديد
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = resolvedParams.id;
    const body = await request.json();

    // التحقق من صحة البيانات
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

    // التحقق من وجود المشروع
    const project = await prisma.projects.findUnique({
      where: { id: projectId }
    });

    if (!project) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // منع التعليقات المكررة من نفس الاسم في فترة قصيرة (10 دقائق)
    const recentComment = await prisma.comments.findFirst({
      where: {
        projectId,
        name: name.trim(),
        createdAt: {
          gte: new Date(Date.now() - 10 * 60 * 1000) // آخر 10 دقائق
        }
      }
    });

    if (recentComment) {
      return NextResponse.json(
        { error: 'لقد أضفت تعليقاً مؤخراً. يرجى الانتظار قبل إضافة تعليق آخر' },
        { status: 429 }
      );
    }

    // إضافة التعليق
    const newComment = await prisma.comments.create({
      data: {
        id: randomUUID(),
        projectId,
        name: name.trim(),
        email: email?.trim() || null,
        message: message.trim(),
        rating
      },
      select: {
        id: true,
        name: true,
        message: true,
        rating: true,
        createdAt: true
      }
    });

    // تحديث متوسط التقييم للمشروع
    const allComments = await prisma.comments.findMany({
      where: { projectId },
      select: { rating: true }
    });

    if (allComments.length > 0) {
      const averageRating = allComments.reduce((sum, comment) => sum + comment.rating, 0) / allComments.length;

      await prisma.projects.update({
        where: { id: projectId },
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

// PATCH - اعتماد/تحديث حالة تعليق (للمشرف)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
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

    const updated = await prisma.comments.update({
      where: { id: commentId },
      data: { status }
    });

    return NextResponse.json({ success: true, comment: { id: updated.id, status: updated.status } });
  } catch (error) {
    console.error('خطأ في تحديث التعليق:', error);
    return NextResponse.json({ error: 'فشل في تحديث التعليق' }, { status: 500 });
  }
}

// DELETE - حذف تعليق (للمشرف)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: projectId } = await params;
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

    await prisma.comments.delete({ where: { id: commentId } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('خطأ في حذف التعليق:', error);
    return NextResponse.json({ error: 'فشل في حذف التعليق' }, { status: 500 });
  }
}
