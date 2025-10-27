const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function setupVercelDatabase() {
  try {
    console.log('🚀 بدء إعداد قاعدة بيانات Vercel...');
    
    const databaseUrl = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;
    
    if (!databaseUrl) {
      console.error('❌ DATABASE_URL أو POSTGRES_PRISMA_URL غير موجود!');
      console.log('💡 تأكد من سحب متغيرات البيئة من Vercel:');
      console.log('   npx vercel env pull .env.local');
      process.exit(1);
    }
    
    console.log('✅ اتصال قاعدة البيانات موجود');
    
    console.log('📋 تطبيق مخطط قاعدة البيانات...');
    console.log('💡 قم بتشغيل: npx prisma db push');
    console.log('');
    
    console.log('👤 إنشاء حساب المدير...');
    
    const adminData = {
      username: 'admin',
      password: 'aldeyar2024',
      email: 'admin@aldeyarksa.tech',
      fullName: 'مدير النظام'
    };
    
    const existingAdmin = await prisma.admins.findUnique({
      where: { username: adminData.username }
    });
    
    if (existingAdmin) {
      console.log('✅ حساب المدير موجود بالفعل');
    } else {
      const hashedPassword = await bcrypt.hash(adminData.password, 12);
      
      await prisma.admins.create({
        data: {
          id: `admin-${Date.now()}`,
          username: adminData.username,
          password: hashedPassword,
          email: adminData.email,
          fullName: adminData.fullName,
          role: 'ADMIN',
          status: 'ACTIVE',
          loginCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      });
      
      console.log('✅ تم إنشاء حساب المدير بنجاح!');
    }
    
    console.log('');
    console.log('🎉 تم إعداد قاعدة البيانات بنجاح!');
    console.log('');
    console.log('📋 بيانات تسجيل الدخول:');
    console.log('👤 اسم المستخدم: admin');
    console.log('🔑 كلمة المرور: aldeyar2024');
    console.log('📧 البريد الإلكتروني: admin@aldeyarksa.tech');
    console.log('');
    console.log('🔗 رابط لوحة التحكم: https://YOUR-DOMAIN.vercel.app/login');
    
  } catch (error) {
    console.error('❌ خطأ في إعداد قاعدة البيانات:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupVercelDatabase();
