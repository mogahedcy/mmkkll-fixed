
const { execSync } = require('child_process');

console.log('🔧 تحضير قاعدة البيانات للإنتاج...');

try {
  // التحقق من وجود DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.log('⚠️ DATABASE_URL غير موجود في متغيرات البيئة');
    console.log('💡 يرجى إعداد قاعدة بيانات PostgreSQL في Replit');
    console.log('📝 للمتابعة بدون قاعدة بيانات، سيتم استخدام SQLite مؤقتاً');
    
    // استخدام SQLite كبديل مؤقت
    process.env.DATABASE_URL = "file:./dev.db";
  }

  // توليد Prisma Client
  console.log('⚙️ توليد Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // محاولة الاتصال بقاعدة البيانات أولاً
  console.log('🔗 فحص الاتصال بقاعدة البيانات...');
  
  try {
    // اختبار الاتصال
    execSync('npx prisma db pull --force', { stdio: 'pipe' });
    console.log('✅ الاتصال بقاعدة البيانات ناجح!');
    
    // تطبيق المايجريشن
    console.log('📋 تطبيق مايجريشن قاعدة البيانات...');
    execSync('npx prisma migrate deploy', { stdio: 'inherit' });
    
  } catch (connectionError) {
    console.warn('⚠️ فشل الاتصال بقاعدة البيانات، محاولة إنشاء مايجريشن جديد...');
    
    // إنشاء مايجريشن جديد للتطوير
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });
  }
  
  console.log('✅ تم تحضير قاعدة البيانات بنجاح!');
  
} catch (error) {
  console.error('❌ خطأ في تحضير قاعدة البيانات:', error.message);
  
  // محاولة أخيرة مع SQLite
  console.log('🔄 محاولة أخيرة مع SQLite...');
  try {
    process.env.DATABASE_URL = "file:./dev.db";
    execSync('npx prisma generate', { stdio: 'inherit' });
    execSync('npx prisma migrate dev --name fallback_init', { stdio: 'inherit' });
    console.log('✅ تم إعداد قاعدة بيانات SQLite بديلة!');
  } catch (fallbackError) {
    console.error('❌ فشل في إنشاء قاعدة بيانات بديلة:', fallbackError.message);
    console.log('💡 يرجى التحقق من إعدادات قاعدة البيانات في Replit');
    process.exit(1);
  }
}
