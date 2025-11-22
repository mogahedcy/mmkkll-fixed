# 🚀 دليل النشر الكامل في Vercel

## 📋 المتطلبات الأساسية
✅ حساب Vercel
✅ حساب GitHub
✅ قاعدة بيانات Neon (جاهزة)
✅ حساب Cloudinary (جاهز)
✅ مفتاح GROQ API
✅ الدومين: aldeyarksa.tech

---

## 🔧 الخطوة 1: رفع الكود إلى GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

---

## 🌐 الخطوة 2: إعداد المشروع في Vercel

### 1. استيراد المشروع
- اذهب إلى [Vercel Dashboard](https://vercel.com/dashboard)
- اضغط **New Project**
- اختر repository من GitHub
- اضغط **Import**

### 2. إعدادات Build
```
Framework Preset: Next.js
Build Command: bun run build
Output Directory: .next
Install Command: bun install
Node.js Version: 20.x
```

---

## 🔐 الخطوة 3: متغيرات البيئة (Environment Variables)

اذهب إلى **Settings → Environment Variables** وأضف:

### قاعدة البيانات (Neon)
```
DATABASE_URL=<من حساب Neon>
POSTGRES_PRISMA_URL=<من حساب Neon>
```

### Cloudinary
```
CLOUDINARY_CLOUD_NAME=dj6gk4wmy
CLOUDINARY_API_KEY=<من حساب Cloudinary>
CLOUDINARY_API_SECRET=<من حساب Cloudinary>
```

### الذكاء الاصطناعي
```
GROQ_API_KEY=<مفتاح Groq API>
```

### الأمان
```
JWT_SECRET=<مفتاح عشوائي آمن>
```

### رابط الموقع
```
NEXT_PUBLIC_BASE_URL=https://aldeyarksa.tech
```

**⚠️ مهم**: اختر **Production, Preview, Development** لكل متغير

---

## 🌍 الخطوة 4: ربط الدومين aldeyarksa.tech

### 1. في Vercel
- اذهب إلى **Settings → Domains**
- اضغط **Add Domain**
- أدخل: `aldeyarksa.tech`
- أضف أيضاً: `www.aldeyarksa.tech`

### 2. في إعدادات DNS لديك
أضف هذه السجلات:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

أو استخدم Vercel Nameservers (موصى به):
```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

---

## 🎯 الخطوة 5: النشر

1. اضغط **Deploy**
2. انتظر اكتمال البناء (5-10 دقائق)
3. افتح الموقع من الرابط المؤقت
4. بعد نجاح النشر، سيعمل على `aldeyarksa.tech`

---

## ✅ التحقق من النشر

افحص هذه الصفحات:
- ✅ الصفحة الرئيسية: https://aldeyarksa.tech
- ✅ المشاريع: https://aldeyarksa.tech/portfolio
- ✅ API: https://aldeyarksa.tech/api/healthcheck
- ✅ Sitemap: https://aldeyarksa.tech/sitemap.xml

---

## 🔄 التحديثات المستقبلية

عند عمل تحديثات:
```bash
git add .
git commit -m "تحديث المشروع"
git push
```

Vercel سينشر التحديثات تلقائياً! ✨

---

## 🐛 حل المشاكل الشائعة

### 1. خطأ في قاعدة البيانات
- تأكد من `DATABASE_URL` صحيح
- تحقق من اتصال Neon

### 2. الصور لا تظهر
- تحقق من متغيرات Cloudinary
- افحص CORS settings

### 3. API لا يعمل
- تأكد من `NEXT_PUBLIC_BASE_URL` صحيح
- افحص Environment Variables

---

## 📞 الدعم

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Neon Docs](https://neon.tech/docs)

---

**🎉 مبروك! موقعك الآن على الإنترنت! 🚀**
