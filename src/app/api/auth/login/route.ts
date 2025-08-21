import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // البحث عن المستخدم
    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'بيانات تسجيل الدخول غير صحيحة' },
        { status: 401 }
      );
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'بيانات تسجيل الدخول غير صحيحة' },
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

    // إعداد الكوكيز
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 ساعة
    });

    return response;

  } catch (error) {
    console.error('خطأ في تسجيل الدخول:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تسجيل الدخول' },
      { status: 500 }
    );
  }
}

// POST لإنشاء حساب إدارة جديد (للاستخدام مرة واحدة)
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
import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateToken, sessionManager, auditLogger, getClientIP } from '@/lib/security';
import { sanitizeInput } from '@/lib/security';
import { cookies } from 'next/headers';

// بيانات المدير الافتراضية (في الإنتاج، يجب أن تكون في قاعدة البيانات)
const ADMIN_CREDENTIALS = {
  id: 'admin-1',
  username: process.env.ADMIN_USERNAME || 'admin',
  passwordHash: '$2a$14$8K.QK5K5K5K5K5K5K5K5K5u' // This should be the hash of 'aldeyar2024'
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // تنظيف المدخلات
    const cleanUsername = sanitizeInput(username);
    const cleanPassword = sanitizeInput(password);

    if (!cleanUsername || !cleanPassword) {
      return NextResponse.json(
        { error: 'اسم المستخدم وكلمة المرور مطلوبان' },
        { status: 400 }
      );
    }

    // التحقق من بيانات الدخول
    if (cleanUsername !== ADMIN_CREDENTIALS.username) {
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

    // للبساطة، سنتحقق من كلمة المرور مباشرة (في الإنتاج، استخدم hash)
    if (cleanPassword !== (process.env.ADMIN_PASSWORD || 'aldeyar2024')) {
      // تسجيل محاولة فاشلة
      auditLogger.log({
        adminId: ADMIN_CREDENTIALS.id,
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
    const token = generateToken({
      adminId: ADMIN_CREDENTIALS.id,
      username: ADMIN_CREDENTIALS.username
    });

    // إنشاء جلسة
    const sessionId = sessionManager.createSession(
      ADMIN_CREDENTIALS.id,
      getClientIP(request),
      request.headers.get('user-agent') || 'unknown'
    );

    // تسجيل نجاح الدخول
    auditLogger.log({
      adminId: ADMIN_CREDENTIALS.id,
      action: 'LOGIN_SUCCESS',
      resource: 'auth',
      ipAddress: getClientIP(request),
      userAgent: request.headers.get('user-agent') || 'unknown',
      success: true
    });

    // إنشاء response وإضافة cookies
    const response = NextResponse.json(
      { 
        success: true, 
        message: 'تم تسجيل الدخول بنجاح',
        user: {
          id: ADMIN_CREDENTIALS.id,
          username: ADMIN_CREDENTIALS.username
        }
      },
      { status: 200 }
    );

    // إضافة cookies آمنة
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 ساعة
      path: '/'
    });

    response.cookies.set('session-id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 ساعة
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
