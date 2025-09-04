
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'aldeyar2024';
    const email = 'admin@aldeyarksa.tech';

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 12);

    // إنشاء حساب المدير
    const admin = await prisma.admins.create({
      data: {
        id: 'admin-2024-01',
        username,
        password: hashedPassword,
        email,
        updatedAt: new Date()
      }
    });

    console.log('✅ تم إنشاء حساب المدير بنجاح:');
    console.log(`👤 اسم المستخدم: ${admin.username}`);
    console.log(`🔑 كلمة المرور: ${password}`);
    console.log(`📧 الإيميل: ${admin.email}`);
    console.log(`🆔 المعرف: ${admin.id}`);

  } catch (error) {
    if (error.code === 'P2002') {
      console.log('⚠️ المدير موجود بالفعل');
    } else {
      console.error('❌ خطأ في إنشاء المدير:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
