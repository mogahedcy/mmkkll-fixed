
const { execSync } = require('child_process');
const path = require('path');

console.log('🔧 تحضير قاعدة البيانات للإنتاج...');

try {
  // إنشاء قاعدة البيانات إذا لم تكن موجودة
  console.log('📋 إنشاء قاعدة البيانات...');
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  // توليد Prisma Client
  console.log('⚙️ توليد Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // فحص اتصال قاعدة البيانات
  console.log('🔍 فحص اتصال قاعدة البيانات...');
  execSync('npx prisma db pull --force', { stdio: 'inherit' });
  
  console.log('✅ تم تحضير قاعدة البيانات بنجاح!');
} catch (error) {
  console.error('❌ خطأ في تحضير قاعدة البيانات:', error.message);
  process.exit(1);
}
