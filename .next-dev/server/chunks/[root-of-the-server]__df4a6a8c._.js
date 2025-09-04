module.exports = {

"[project]/.next-internal/server/app/api/sitemap/refresh/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/sitemap/refresh/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const SEARCH_ENGINES = [
    {
        name: 'Google',
        url: 'https://www.google.com/ping?sitemap='
    },
    {
        name: 'Bing',
        url: 'https://www.bing.com/ping?sitemap='
    },
    {
        name: 'Yandex',
        url: 'https://webmaster.yandex.com/ping?sitemap='
    }
];
async function notifySearchEngine(engineUrl, sitemapUrl, engineName) {
    try {
        const response = await fetch(`${engineUrl}${encodeURIComponent(sitemapUrl)}`, {
            method: 'GET',
            headers: {
                'User-Agent': 'AlDeyar-SEO-Bot/1.0 (+https://aldeyarksa.tech)'
            },
            signal: AbortSignal.timeout(10000)
        });
        return {
            engine: engineName,
            success: response.ok,
            status: response.status,
            message: response.ok ? 'تم الإشعار بنجاح' : `خطأ: ${response.status}`
        };
    } catch (error) {
        return {
            engine: engineName,
            success: false,
            status: 0,
            message: `خطأ في الاتصال: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`
        };
    }
}
async function POST(request) {
    const sitemapUrl = 'https://aldeyarksa.tech/sitemap.xml';
    try {
        const results = await Promise.allSettled(SEARCH_ENGINES.map((engine)=>notifySearchEngine(engine.url, sitemapUrl, engine.name)));
        const notifications = results.map((result)=>result.status === 'fulfilled' ? result.value : {
                engine: 'Unknown',
                success: false,
                message: 'فشل في معالجة الطلب'
            });
        const successCount = notifications.filter((n)=>n.success).length;
        const totalCount = notifications.length;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: `تم إشعار ${successCount} من أصل ${totalCount} محرك بحث`,
            timestamp: new Date().toISOString(),
            sitemap_url: sitemapUrl,
            notifications,
            summary: {
                total: totalCount,
                successful: successCount,
                failed: totalCount - successCount
            }
        });
    } catch (error) {
        console.error('خطأ في إشعار محركات البحث:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            message: 'فشل في إشعار محركات البحث',
            error: error instanceof Error ? error.message : 'خطأ غير معروف',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        message: 'API إشعار محركات البحث - استخدم POST لإرسال الإشعارات',
        endpoints: {
            refresh: 'POST /api/sitemap/refresh',
            sitemap: 'GET /sitemap.xml'
        },
        supported_engines: SEARCH_ENGINES.map((engine)=>engine.name)
    });
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__df4a6a8c._.js.map