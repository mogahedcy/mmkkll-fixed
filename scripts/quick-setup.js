
const { execSync } = require('child_process');
const fs = require('fs');

console.log('🚀 بدء الإعداد السريع...');

try {
  // التأكد من وجود مجلد prisma
  if (!fs.existsSync('prisma')) {
    fs.mkdirSync('prisma', { recursive: true });
  }

  // إنشاء قاعدة البيانات
  console.log('📋 إنشاء قاعدة البيانات...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  execSync('npx prisma migrate deploy', { stdio: 'inherit' });
  
  console.log('✅ تم الإعداد بنجاح!');
} catch (error) {
  console.error('❌ خطأ في الإعداد:', error.message);
  process.exit(1);
}
