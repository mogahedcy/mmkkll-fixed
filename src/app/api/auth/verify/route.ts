import { type NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'غير مصرح بالدخول' },
        { status: 401 }
      );
    }

    // التحقق من صحة التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as { adminId: string };

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { id: decoded.adminId },
      select: {
        id: true,
        username: true,
        email: true,
        lastLogin: true
      }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'المستخدم غير موجود' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      admin,
      authenticated: true
    });

  } catch (error: unknown) {
    console.error('خطأ في التحقق من التوثيق:', error);
    return NextResponse.json(
      { error: 'توكن غير صالح' },
      { status: 401 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, sessionManager } from '@/lib/security';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value;
    const sessionId = request.cookies.get('session-id')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'لا يوجد token' },
        { status: 401 }
      );
    }

    // التحقق من صحة الtoken
    const decoded = verifyToken(token);

    // التحقق من صحة الجلسة
    if (sessionId) {
      const session = sessionManager.validateSession(sessionId);
      if (!session || session.adminId !== decoded.adminId) {
        return NextResponse.json(
          { error: 'جلسة غير صالحة' },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      user: {
        id: decoded.adminId,
        username: decoded.username
      }
    });

  } catch (error) {
    console.error('خطأ في التحقق من المصادقة:', error);
    return NextResponse.json(
      { error: 'token غير صالح' },
      { status: 401 }
    );
  }
}
