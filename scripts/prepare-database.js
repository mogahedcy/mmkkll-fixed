
const { execSync } = require('child_process');

console.log('🔧 تحضير قاعدة البيانات للإنتاج...');

try {
  // التحقق من وجود DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL غير موجود في متغيرات البيئة');
    console.log('💡 يرجى إعداد قاعدة بيانات PostgreSQL في Replit');
    process.exit(1);
  }

  // توليد Prisma Client
  console.log('⚙️ توليد Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // تطبيق المايجريشن
  console.log('📋 تطبيق مايجريشن قاعدة البيانات...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  console.log('✅ تم تحضير قاعدة البيانات بنجاح!');
} catch (error) {
  console.error('❌ خطأ في تحضير قاعدة البيانات:', error.message);
  
  // إذا فشل المايجريشن، جرب إنشاء مايجريشن جديد
  try {
    console.log('🔄 محاولة إنشاء مايجريشن جديد...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
    console.log('✅ تم إنشاء المايجريشن بنجاح!');
  } catch (migrateError) {
    console.error('❌ فشل في إنشاء المايجريشن:', migrateError.message);
    process.exit(1);
  }
}
