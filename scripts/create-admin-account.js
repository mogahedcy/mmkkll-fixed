
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdminAccount() {
  try {
    console.log('🔐 إنشاء حساب المدير...');
    
    // بيانات المدير الافتراضية
    const adminData = {
      username: 'admin',
      password: 'admin123',
      email: 'admin@aldeyarksa.tech',
      fullName: 'مدير النظام',
      role: 'ADMIN'
    };

    // التحقق من وجود مدير مسبقاً
    const existingAdmin = await prisma.admins.findUnique({
      where: { username: adminData.username }
    });

    if (existingAdmin) {
      console.log('✅ حساب المدير موجود بالفعل');
      console.log(`اسم المستخدم: ${adminData.username}`);
      console.log(`كلمة المرور: ${adminData.password}`);
      return;
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(adminData.password, 12);

    // إنشاء المدير
    const admin = await prisma.admins.create({
      data: {
        id: `admin-${Date.now()}`,
        username: adminData.username,
        password: hashedPassword,
        email: adminData.email,
        fullName: adminData.fullName,
        role: adminData.role,
        status: 'ACTIVE',
        loginCount: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    console.log('✅ تم إنشاء حساب المدير بنجاح!');
    console.log('📋 بيانات تسجيل الدخول:');
    console.log(`🔸 اسم المستخدم: ${adminData.username}`);
    console.log(`🔸 كلمة المرور: ${adminData.password}`);
    console.log(`🔸 البريد الإلكتروني: ${adminData.email}`);
    console.log('🔗 رابط تسجيل الدخول: /login');

  } catch (error) {
    console.error('❌ خطأ في إنشاء حساب المدير:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminAccount();
