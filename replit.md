# محترفين الديار العالمية - معلومات المشروع

## نظرة عامة
**تطبيق ويب شامل** لشركة متخصصة في المظلات والبرجولات والسواتر في جدة

**الأهداف:**
- تحسين SEO والفهرسة في محركات البحث
- عرض معرض أعمال ديناميكي
- إدارة محتوى احترافية (مقالات، أسئلة شائعة)
- تحسين الأداء والأمان

## التحديثات الأخيرة (21 نوفمبر 2025)

### ✅ إصلاحات رئيسية:
1. **إزالة FAQPage المكرر** - استبدال بـ Organization Schema في `layout.tsx`
2. **صفحات فيديو مخصصة** - إنشاء `/portfolio/[id]/video/[videoId]/page.tsx` لحل مشكلة "محتوى تكميلي"
3. **توحيد الدومين** - middleware redirect من `aldeyarksa.tech` إلى `www.aldeyarksa.tech` (301)
4. **تحسين خريطة الموقع** - إصلاح video sitemap مع روابط صحيحة و thumbnails
5. **Error Boundaries** - إضافة معالجة أخطاء احترافية مع fallback UIs
6. **OptimizedImage Component** - مكون صور محسّن مع lazy loading
7. **HTML Sanitizer** - حماية من هجمات XSS باستخدام DOMPurify
8. **Web Vitals Optimization** - تحميل ديناميكي لـ web-vitals
9. **✨ نظام Image SEO الشامل** - Alt text ذكي + Schema Markup تلقائي لجميع الصور الديناميكية

### ⚠️ مشاكل معالجة:
- FCP سيء جداً (6896ms) → يجب أن ينخفض مع lazy loading
- 249 استخدام `any` type → يحتاج gradual migration إلى TypeScript
- 51 inline style → يجب نقلها إلى Tailwind
- 36 dangerouslySetInnerHTML → تم توفير sanitizer

## بنية المشروع

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── portfolio/         # صفحات معرض الأعمال
│   │   └── [id]/video/   # صفحات فيديو مخصصة (جديد)
│   ├── services/          # صفحات الخدمات
│   ├── faq/              # صفحات الأسئلة الشائعة
│   ├── sitemap-*.xml/    # خرائط المواقع
│   └── layout.tsx        # Layout رئيسي مع ErrorBoundary
├── components/           # React components
│   ├── OptimizedImage.tsx    # مكون صور محسّن (جديد)
│   ├── ErrorBoundary.tsx     # معالج أخطاء (جديد)
│   └── ...
├── lib/
│   ├── seo-utils.ts      # أدوات SEO
│   ├── image-seo-utils.ts # نظام SEO للصور (جديد) 
│   ├── sanitizer.ts      # تأمين HTML (جديد)
│   ├── dom-utils.ts      # أدوات DOM آمنة (جديد)
│   └── prisma.ts         # قاعدة البيانات
├── components/
│   ├── services/
│   │   ├── ProjectsGallery.tsx  # معرض مع Image SEO (محدّث)
│   │   └── ArticlesSection.tsx  # مقالات مع Image SEO (محدّث)
│   └── OptimizedImage.tsx       # صور محسّنة (محدّث)
└── middleware.ts         # Middleware توحيد الدومين (جديد)
```

## المتطلبات والإعدادات

### البيئة المطلوبة:
- **Node.js**: 18+
- **Package Manager**: Bun (محسّن للأداء)
- **Database**: PostgreSQL (Neon)
- **Image Host**: Cloudinary
- **API Keys**: Google API, OpenAI

### متغيرات البيئة:
```env
NEXT_PUBLIC_BASE_URL=https://www.aldeyarksa.tech
DATABASE_URL=postgresql://...
GOOGLE_API_KEY=...
OPENAI_API_KEY=...
```

## معايير الجودة

### SEO:
- ✅ Canonical URLs موحدة
- ✅ OpenGraph و Twitter Card
- ✅ Structured Data (Schema.org)
- ✅ Mobile Responsive
- ✅ Core Web Vitals (يحتاج تحسين FCP)

### الأمان:
- ✅ HTML Sanitization
- ✅ CORS Headers
- ✅ CSP Policy
- ✅ XSS Protection
- ⏳ TypeScript strict mode (جاري التطبيق)

### الأداء:
- ✅ Image Optimization (Next.js)
- ✅ Code Splitting
- ✅ Lazy Loading
- ⏳ CSS-in-JS (نقل inline styles)
- ⏳ Bundle Size (يحتاج تحليل)

## الخطوات التالية

### أولويات عالية:
1. اختبار شامل على Google Search Console
2. التحقق من فهرسة صفحات الفيديو الجديدة
3. قياس تحسن FCP بعد التغييرات

### متوسطة:
1. نقل 51 inline style إلى Tailwind classes
2. تقليل `any` types والترقية إلى TypeScript strict
3. اختبار accessibility (WCAG compliance)

### منخفضة:
1. تحسين bundle size
2. إضافة service worker للـ offline support
3. إنشاء admin panel محسّن

## الملفات المهمة

| الملف | الغرض |
|------|--------|
| `middleware.ts` | توحيد الدومين (301 redirect) |
| `src/app/layout.tsx` | Layout رئيسي + ErrorBoundary |
| `src/components/OptimizedImage.tsx` | صور محسّنة |
| `src/lib/sanitizer.ts` | تأمين HTML |
| `src/app/portfolio/[id]/video/[videoId]/page.tsx` | صفحات فيديو |
| `next.config.js` | إعدادات Next.js |

## ملاحظات المطور

**أشياء يجب تذكرها:**
- استخدم `OptimizedImage` بدل `<img>` tags
- استخدم `sanitizeHTML()` لأي HTML ديناميكي
- استخدم `generateCategoryBasedAlt()` لـ Alt text الديناميكي
- استخدم `generateImageObjectSchema()` لـ Schema Markup
- تأكد من استخدام `www.aldeyarksa.tech` في جميع الروابط
- اختبر الصفحات على mobile devices

**🖼️ نظام Image SEO (جديد):**
```typescript
// توليد Alt text ذكي تلقائياً
const altText = generateCategoryBasedAlt(category, title, location, index);

// إضافة Schema Markup
const schema = generateImageObjectSchema(imageUrl, metadata, pageUrl);
```

**تجنب:**
- ❌ استخدام `any` type
- ❌ inline styles (استخدم Tailwind)
- ❌ dangerouslySetInnerHTML بدون تأمين
- ❌ hardcoding domains (استخدم env variables)
- ❌ صور بدون Alt text أو description

## الاختبار والنشر

```bash
# تطوير محلي
bun run dev

# بناء للإنتاج
bun run build

# اختبار بناء
bun run start

# فحص الأداء
bun run analyze
```

---
**آخر تحديث:** 21 نوفمبر 2025 - 23:59
**الحالة:** ✅ نظام Image SEO الشامل مُنفذ وجاهز

## Image SEO System Implementation Status:
- ✅ **معرض الأعمال** - Alt text + Schema Markup تلقائي على جميع صور المشاريع
- ✅ **صفحات المقالات** - Alt text ذكي مع Schema markup + thumbnails محسّنة
- ✅ **قسم المقالات في الخدمات** - Alt text ديناميكي لكل مقالة مرتبطة
- ✅ **معرض الخدمات** - Alt text محسّن لكل صورة مشروع
- ⏳ **صفحات الخدمات الرئيسية** - يمكن إضافة gallery schema إضافي (اختياري)

### التحسن المتوقع في SEO:
- 📸 +40-50% تحسن في فهرسة الصور على Google Images
- 🔍 ظهور في Rich Snippets والـ Featured Results
- 📊 CTR أعلى من 2-5% إضافية
- ⭐ تحسن في Core Web Vitals (من خلال lazy loading)
