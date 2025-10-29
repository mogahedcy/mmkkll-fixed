module.exports = {

"[project]/.next-internal/server/app/api/projects/route/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

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
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/app/api/projects/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "GET": (()=>GET),
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
;
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const category = searchParams.get('category');
        const featured = searchParams.get('featured');
        const limit = searchParams.get('limit');
        const page = searchParams.get('page');
        const sort = searchParams.get('sort') || 'newest';
        const search = searchParams.get('search');
        const status = searchParams.get('status') || 'PUBLISHED';
        const skip = page ? (Number.parseInt(page) - 1) * (limit ? Number.parseInt(limit) : 12) : 0;
        const take = limit ? Number.parseInt(limit) : 12;
        const where = {
            status: status
        };
        if (category && category !== 'all') {
            where.category = {
                contains: category
            };
        }
        if (featured === 'true') {
            where.featured = true;
        }
        if (search) {
            const searchLower = search.toLowerCase();
            where.OR = [
                {
                    title: {
                        contains: search
                    }
                },
                {
                    description: {
                        contains: search
                    }
                },
                {
                    location: {
                        contains: search
                    }
                },
                {
                    tags: {
                        some: {
                            name: {
                                contains: search
                            }
                        }
                    }
                }
            ];
        }
        // تحديد ترتيب المشاريع
        let orderBy = [];
        switch(sort){
            case 'newest':
                orderBy = [
                    {
                        publishedAt: 'desc'
                    },
                    {
                        createdAt: 'desc'
                    }
                ];
                break;
            case 'oldest':
                orderBy = [
                    {
                        publishedAt: 'asc'
                    },
                    {
                        createdAt: 'asc'
                    }
                ];
                break;
            case 'featured':
                orderBy = [
                    {
                        featured: 'desc'
                    },
                    {
                        publishedAt: 'desc'
                    }
                ];
                break;
            case 'popular':
                orderBy = [
                    {
                        views: 'desc'
                    },
                    // ترتيب ثانوي حسب عدد الإعجابات الفعلية
                    {
                        project_likes: {
                            _count: 'desc'
                        }
                    }
                ];
                break;
            case 'most-liked':
                orderBy = [
                    {
                        project_likes: {
                            _count: 'desc'
                        }
                    },
                    {
                        views: 'desc'
                    }
                ];
                break;
            case 'highest-rated':
                orderBy = [
                    {
                        rating: 'desc'
                    },
                    {
                        views: 'desc'
                    }
                ];
                break;
            case 'alphabetical':
                orderBy = [
                    {
                        title: 'asc'
                    }
                ];
                break;
            default:
                orderBy = [
                    {
                        featured: 'desc'
                    },
                    {
                        publishedAt: 'desc'
                    }
                ];
        }
        const db = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"];
        const Project = db.projects || db.project;
        if (!Project || !process.env.DATABASE_URL) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                projects: [],
                total: 0,
                stats: {
                    total: 0,
                    featured: 0,
                    categories: []
                },
                pagination: {
                    total: 0,
                    page: page ? Number.parseInt(page) : 1,
                    limit: take,
                    totalPages: 0,
                    hasMore: false
                }
            });
        }
        const projects = await Project.findMany({
            where,
            include: {
                media_items: {
                    orderBy: {
                        order: 'asc'
                    },
                    take: 5
                },
                project_tags: {
                    take: 10
                },
                _count: {
                    select: {
                        comments: {
                            where: {
                                status: 'APPROVED'
                            }
                        },
                        project_likes: true,
                        project_views: true,
                        media_items: true
                    }
                }
            },
            orderBy,
            skip,
            take
        });
        // تحسين البيانات المُرجعة
        const formattedProjects = projects.map((project)=>({
                ...project,
                mediaItems: project.media_items || [],
                tags: project.project_tags || [],
                views: project._count?.project_views || 0,
                likes: project._count?.project_likes || 0,
                commentsCount: project._count?.comments || 0,
                mediaCount: project._count?.media_items || 0,
                excerpt: (project.description || '').substring(0, 150) + '...',
                readTime: Math.ceil((project.description || '').length / 200),
                slug: project.slug || generateSlug(project.title, project.id)
            }));
        const totalCount = await Project.count({
            where
        });
        // إحصائيات إضافية
        const stats = {
            total: totalCount,
            featured: await Project.count({
                where: {
                    ...where,
                    featured: true
                }
            }),
            categories: await Project.groupBy({
                by: [
                    'category'
                ],
                where,
                _count: {
                    category: true
                }
            })
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            projects: formattedProjects,
            total: totalCount,
            stats,
            pagination: {
                total: totalCount,
                page: page ? Number.parseInt(page) : 1,
                limit: take,
                totalPages: Math.ceil(totalCount / take),
                hasMore: skip + take < totalCount
            }
        });
    } catch (error) {
        console.error('❌ خطأ في جلب المشاريع:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في جلب المشاريع'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const data = await request.json();
        const headersList = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["headers"])();
        const ip = headersList.get('x-forwarded-for') || 'unknown';
        const { title, description, category, location, completionDate, client, featured, projectDuration, projectCost, mediaItems, tags, materials, metaTitle, metaDescription, keywords, status = 'PUBLISHED' } = data;
        // التحقق من صحة البيانات
        if (!title || !description || !category || !location) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'البيانات الأساسية مطلوبة'
            }, {
                status: 400
            });
        }
        // إنشاء slug فريد
        const slug = generateSlug(title);
        const existingSlug = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.findUnique({
            where: {
                slug
            }
        });
        const finalSlug = existingSlug ? `${slug}-${Date.now()}` : slug;
        const project = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.create({
            data: {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])(),
                title,
                description,
                category,
                location,
                completionDate: completionDate ? new Date(completionDate) : new Date(),
                client: client || null,
                featured: featured || false,
                projectDuration: projectDuration || '',
                projectCost: projectCost || '',
                slug: finalSlug,
                metaTitle: metaTitle || title,
                metaDescription: metaDescription || description.substring(0, 160),
                keywords: keywords || `${category}, ${location}, محترفين الديار`,
                status,
                publishedAt: status === 'PUBLISHED' ? new Date() : null,
                updatedAt: new Date(),
                media_items: {
                    create: mediaItems?.map((item, index)=>({
                            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])(),
                            type: item.type,
                            src: item.src || item.url,
                            thumbnail: item.thumbnail || item.src || item.url,
                            title: item.title || `ملف ${index + 1}`,
                            description: item.description || '',
                            duration: item.duration || null,
                            fileSize: item.fileSize || null,
                            mimeType: item.mimeType || null,
                            alt: item.alt || title,
                            caption: item.caption || '',
                            order: index
                        })) || []
                }
            },
            include: {
                media_items: true,
                _count: {
                    select: {
                        comments: true,
                        project_likes: true,
                        project_views: true
                    }
                }
            }
        });
        // إ��شاء أول مشاهدة (من الإدارة)
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_views.create({
            data: {
                id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["randomUUID"])(),
                projectId: project.id,
                ip,
                userAgent: headersList.get('user-agent') || 'unknown',
                source: 'admin'
            }
        });
        // تحديث عداد المشاهدات
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.update({
            where: {
                id: project.id
            },
            data: {
                views: 1
            }
        });
        // إشعار Google بالمحتوى الجديد
        try {
            await notifyGoogleNewContent(project.slug);
        } catch (error) {
            console.warn('فشل في إشعار Google:', error);
        }
        const formatted = {
            ...project,
            mediaItems: project.media_items,
            views: 1,
            likes: 0,
            commentsCount: 0
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            project: formatted,
            message: 'تم إضافة المشروع بنجاح'
        });
    } catch (error) {
        console.error('❌ خطأ في إضافة المشروع:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في إضافة المشروع',
            details: ("TURBOPACK compile-time truthy", 1) ? String(error) : ("TURBOPACK unreachable", undefined)
        }, {
            status: 500
        });
    }
}
// Helper functions
function generateSlug(title, id) {
    const slug = title.replace(/[^\u0600-\u06FF\w\s-]/g, '') // إزالة الرموز ما عدا العربية والإنجليزية
    .replace(/\s+/g, '-') // استبدال المسافات بشرطات
    .toLowerCase().trim();
    return id ? `${slug}-${id}` : slug;
}
async function notifyGoogleNewContent(slug) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://aldeyarksa.tech';
    const url = `${baseUrl}/portfolio/${slug}`;
    try {
        // إشعار Google بتحديث ال sitemap
        await fetch('https://www.google.com/ping?sitemap=' + encodeURIComponent(`${baseUrl}/sitemap.xml`));
        // إرسال IndexNow بعنوان الصفحة مباشرة
        try {
            await fetch(`${baseUrl}/api/indexnow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    urls: [
                        url
                    ]
                })
            });
        } catch (e) {
            console.warn('IndexNow submit failed:', e);
        }
        console.log('✅ تمت إشعارات الفهرسة:', url);
    } catch (error) {
        console.warn('⚠️ فشل في إشعار محركات البحث:', error);
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__df5114a0._.js.map