
import { type NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { auditLogger, getClientIP, sanitizeInput, sessionManager } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // تنظيف المدخلات
    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);

    if (!cleanUsername || !cleanPassword) {
      return NextResponse.json(
        { error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // البحث عن المدير في قاعدة البيانات
    const admin = await prisma.admin.findUnique({
      where: { username: cleanUsername }
    });

    if (!admin) {
      // تسجيل محاولة فاشلة
      auditLogger.log({
        adminId: 'unknown',
        action: 'LOGIN_FAILED',
        resource: 'auth',
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { reason: 'invalid_username', username: cleanUsername }
      });

      return NextResponse.json(
        { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(cleanPassword, admin.password);

    if (!isPasswordValid) {
      // تسجيل محاولة فاشلة
      auditLogger.log({
        adminId: admin.id,
        action: 'LOGIN_FAILED',
        resource: 'auth',
        ipAddress: getClientIP(request),
        userAgent: request.headers.get('user-agent') || 'unknown',
        success: false,
        details: { reason: 'invalid_password' }
      });

      return NextResponse.json(
        { error: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
        { status: 401 }
      );
    }

    // إنشاء JWT token
    const token = jwt.sign(
      {
        adminId: admin.id,
        username: admin.username
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    // تحديث تاريخ آخر تسجيل دخول
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() }
    });

    // إنشاء جلسة
    const sessionId = sessionManager.createSession(
      admin.id,
      getClientIP(request),
      request.headers.get('user-agent') || 'unknown'
    );

    // تسجيل نجاح الدخول
    auditLogger.log({
      adminId: admin.id,
      action: 'LOGIN_SUCCESS',
      resource: 'auth',
      ipAddress: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown',
      success: true
    });

    // إنشاء الاستجابة مع الكوكيز
    const response = NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      },
      message: 'تم تسجيل الدخول بنجاح'
    });

    // إعداد الكوكيز الآمنة
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      path: '/'
    });

    response.cookies.set('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 ساعة
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في الخادم' },
      { status: 500 }
    );
  }
}

// إنشاء حساب إدارة جديد
export async function PUT(request: NextRequest) {
  try {
    const { username, password, email } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // التحقق من وجود المستخدم
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'اسم المستخدم موجود بالفعل' },
        { status: 400 }
      );
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 12);

    // إنشاء حساب الإدارة
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        email: email || null
      }
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email
      },
      message: 'تم إنشاء حساب الإدارة بنجاح'
    });

  } catch (error) {
    console.error('خطأ في إنشاء حساب الإدارة:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في إنشاء حساب الإدارة' },
      { status: 500 }
    );
  }
}
