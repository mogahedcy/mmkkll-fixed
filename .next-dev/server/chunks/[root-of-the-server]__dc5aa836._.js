module.exports = {

"[project]/.next-internal/server/app/robots.txt/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[project]/src/app/robots.txt/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET)
});
async function GET() {
    const robotsTxt = `User-agent: *
Allow: /
Allow: /sitemap.xml
Allow: /images/
Allow: /uploads/
Allow: /portfolio/
Allow: /services/
Allow: /articles/
Allow: /api/sitemap/

# منع فهرسة المناطق الحساسة والإدارية
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /api/upload/
Disallow: /login/
Disallow: /_next/
Disallow: /test-*
Disallow: /.well-known/
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*
Disallow: /*?*ref=*
Disallow: /*?*source=*
Disallow: /*?*campaign=*
Disallow: /api/dashboard/

# السماح لمحركات البحث الرئيسية بالفهرسة المكثفة
User-agent: Googlebot
Allow: /
Crawl-delay: 0.5
Request-rate: 1/1s
Visit-time: 0600-2300
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /login/

User-agent: Googlebot-Image
Allow: /
Allow: /images/
Allow: /uploads/
Crawl-delay: 0.5

User-agent: Googlebot-Video
Allow: /
Allow: /uploads/
Crawl-delay: 0.5

# Bing Bot - محرك البحث الثاني في السعودية
User-agent: bingbot
Allow: /
Crawl-delay: 0.5
Request-rate: 1/1s
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /login/

# Yandex Bot - مهم للأسواق الدولية
User-agent: YandexBot
Allow: /
Crawl-delay: 1
Request-rate: 1/2s
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /login/

# Baidu Bot للأسواق الآسيوية والعمالة الآسيوية في السعودية
User-agent: Baiduspider
Allow: /
Crawl-delay: 1
Disallow: /dashboard/
Disallow: /api/auth/
Disallow: /login/

# DuckDuckGo Bot - محرك بحث صاعد
User-agent: DuckDuckBot
Allow: /
Crawl-delay: 1

# محركات البحث العربية المحلية
User-agent: *
Allow: /ar/
Allow: /arabic/

# حظر البوتات الضارة وغير المرغوب فيها
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: ZoomBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: MauiBot
Disallow: /

User-agent: PetalBot
Disallow: /

User-agent: Bytespider
Disallow: /

# خرائط المواقع المتعددة والمحدثة
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech'}/sitemap-index.xml
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech'}/sitemap.xml
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech'}/sitemap-articles.xml
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech'}/sitemap-images.xml

# توجيه canonical المضيف
Host: https://aldeyarksa.tech

# معلومات إضافية للمطورين ومحركات البحث
# Contact: info@aldeyarksa.tech
# Website: https://aldeyarksa.tech
# Company: محترفين الديار العالمية
# Location: جدة، المملكة العربية السعودية
# Services: مظلات، برجولات، سواتر، تنسيق حدائق`;
    return new Response(robotsTxt, {
        status: 200,
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=43200, s-maxage=43200',
            'CDN-Cache-Control': 'max-age=43200',
            'Vercel-CDN-Cache-Control': 'max-age=43200',
            'X-Robots-Tag': 'index, follow',
            'Last-Modified': new Date().toUTCString()
        }
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__dc5aa836._.js.map