module.exports = {

"[project]/.next-internal/server/app/sitemap-images.xml/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "prisma": (()=>prisma)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : ("TURBOPACK unreachable", undefined)
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}}),
"[project]/src/app/sitemap-images.xml/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
async function GET() {
    const baseUrl = 'https://www.aldeyarksa.tech';
    // الصور الأساسية للموقع
    const staticImages = [
        {
            url: '/images/logo.png',
            caption: 'شعار محترفين الديار العالمية - أفضل شركة مظلات وسواتر في جدة',
            title: 'محترفين الديار العالمية',
            location: 'جدة، السعودية'
        },
        {
            url: '/images/hero-bg.jpg',
            caption: 'الصفحة الرئيسية - مظلات وسواتر وبرجولات عالية الجودة في جدة',
            title: 'خدمات المظلات والسواتر في جدة',
            location: 'جدة، السعودية'
        }
    ];
    // صور الخدمات
    const serviceImages = [
        {
            url: '/uploads/mazallat-1.webp',
            caption: 'مظلات سيارات عالية الجودة - تركيب احترافي في جدة',
            title: 'مظلات سيارات جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/pergola-1.jpg',
            caption: 'برجولات خشبية وحديدية للحدائق - تصميم وتنفيذ في جدة',
            title: 'برجولات حدائق جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/sawater-1.webp',
            caption: 'سواتر خصوصية وحماية - أحدث التصاميم في جدة',
            title: 'سواتر جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/sandwich-panel-1.jpg',
            caption: 'ساندوتش بانل للعزل الحراري - حلول متقدمة في جدة',
            title: 'ساندوتش بانل جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/landscaping-1.webp',
            caption: 'تنسيق وتصميم الحدائق - خدمات شاملة في جدة',
            title: 'تنسيق حدائق جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/byoot-shaar-1.webp',
            caption: 'بيوت شعر تراثية - أصالة وجودة في جدة',
            title: 'بيوت شعر جدة',
            location: 'جدة، السعودية'
        },
        {
            url: '/uploads/khayyam-1.webp',
            caption: 'خيام ملكية فاخرة - للمناسبات الخاصة في جدة',
            title: 'خيام ملكية جدة',
            location: 'جدة، السعودية'
        }
    ];
    let projectImages = [];
    try {
        // جلب صور المشاريع من قاعدة البيانات
        const projects = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                category: true,
                location: true,
                mediaItems: {
                    where: {
                        type: 'IMAGE'
                    },
                    select: {
                        src: true,
                        title: true,
                        description: true,
                        alt: true
                    }
                }
            }
        });
        projectImages = projects.flatMap((project)=>project.mediaItems.map((media)=>({
                    url: media.src.startsWith('http') ? media.src : media.src,
                    caption: `${media.alt || media.title || project.title} - ${project.category} في ${project.location}`,
                    title: `${project.title} - محترفين الديار العالمية`,
                    location: `${project.location}, السعودية`,
                    project_url: `${baseUrl}/portfolio/${project.id}`
                })));
    } catch (error) {
        console.error('خطأ في جلب صور المشاريع:', error);
    }
    // دمج جميع الصور
    const allImages = [
        ...staticImages,
        ...serviceImages,
        ...projectImages
    ];
    const imagesSitemap = allImages.map((image)=>`
  <url>
    <loc>${baseUrl}${image.url}</loc>
    <image:image>
      <image:loc>${image.url.startsWith('http') ? image.url : `${baseUrl}${image.url}`}</image:loc>
      <image:caption><![CDATA[${image.caption}]]></image:caption>
      <image:title><![CDATA[${image.title}]]></image:title>
      <image:geo_location><![CDATA[${image.location}]]></image:geo_location>
      <image:license><![CDATA[https://www.aldeyarksa.tech/terms]]></image:license>
    </image:image>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('');
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${imagesSitemap}
</urlset>`;
    return new Response(sitemap, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600, s-maxage=3600',
            'X-Images-Count': allImages.length.toString()
        }
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__30ca12ca._.js.map