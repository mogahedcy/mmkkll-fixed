# 🚀 دليل النشر على Vercel

## 📋 متغيرات البيئة المطلوبة

### 🗄️ قاعدة البيانات (مطلوب)
```bash
DATABASE_URL="postgresql://neondb_owner:npg_AKqw6stDEBU7@ep-frosty-snow-a8zl0yoj-pooler.eastus2.azure.neon.tech:5432/portfolio_db?sslmode=require"
```

### 🔐 المصادقة (مطلوب)
```bash
JWT_SECRET="aldeyar_global_jeddah_secret_2024_!@#$%^&*"
NEXTAUTH_SECRET="nextauth_secret_for_aldeyar_2024"
NEXTAUTH_URL="https://your-vercel-domain.vercel.app"
```

### 📸 Cloudinary (اختياري - للوسائط)
```bash
CLOUDINARY_CLOUD_NAME="dj6gk4wmy"
CLOUDINARY_API_KEY="716159954779798"
CLOUDINARY_API_SECRET="q_Y8NaKz2H5Q6D_9bAZZPklrJk0"
```

### 🌍 البيئة
```bash
NODE_ENV="production"
```

## 🔧 خطوات الإعداد في Vercel

### 1. ربط المستودع
- اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
- اضغط "Add New..." → "Project"
- اختر `mogahedcy/mmkkll-fixed` من GitHub

### 2. إضافة متغيرات البيئة
- في صفحة إعداد المشروع، اذهب إلى "Environment Variables"
- أضف كل متغير من القائمة أعلاه
- تأكد من تحديد "Production", "Preview", و "Development"

### 3. النشر
- اضغط "Deploy"
- انتظر اكتمال النشر

## ⚠️ ملاحظات مهمة

### DATABASE_URL
- تأكد من إضافة `:5432` (رقم المنفذ) في نهاية العنوان
- استخدم `sslmode=require` للاتصال الآمن

### NEXTAUTH_URL
- غيّر القيمة إلى رابط موقعك على Vercel
- مثال: `https://mmkkll-fixed.vercel.app`

### اختبار الاتصال
```bash
# للتأكد من صحة سلسلة الاتصال
psql "postgresql://neondb_owner:npg_AKqw6stDEBU7@ep-frosty-snow-a8zl0yoj-pooler.eastus2.azure.neon.tech:5432/portfolio_db?sslmode=require"
```

## 🐛 حل المشاكل الشائعة

### 1. خطأ Database Connection
- تحقق من صحة DATABASE_URL
- تأكد من إضافة رقم المنفذ `:5432`

### 2. خطأ Prisma Generation
- تأكد من تشغيل `prisma generate` في postinstall

### 3. خطأ Sitemap Generation
- تحقق من اتصال قاعدة البيانات
- قد تحتاج إلى تعطيل sitemap مؤقتاً

## 🚀 النشر الناجح

بعد إضافة جميع متغيرات البيئة:
1. ✅ المشروع سيتم بناؤه بنجاح
2. ✅ قاعدة البيانات ستكون متصلة
3. ✅ جميع الميزات ستعمل بشكل كامل

## 📞 الدعم
في حالة وجود مشاكل، تحقق من:
- [Vercel Logs](https://vercel.com/docs/observability/logs-overview)
- [Prisma Connection Issues](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/app/building-your-application/deploying)
