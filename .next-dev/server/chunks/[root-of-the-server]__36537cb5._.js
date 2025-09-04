module.exports = [
"[project]/.next-internal/server/app/api/dashboard/stats/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/@prisma/client [external] (@prisma/client, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("@prisma/client", () => require("@prisma/client"));

module.exports = mod;
}),
"[project]/src/lib/prisma.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
}),
"[project]/src/app/api/dashboard/stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-route] (ecmascript)");
;
;
async function GET() {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        // جلب الإحصائيات الأساسية
        const [totalProjects, publishedProjects, featuredProjects, totalViews, totalLikes, totalComments, recentViews, pendingComments] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.count(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.count({
                where: {
                    status: 'PUBLISHED'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.count({
                where: {
                    featured: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.aggregate({
                _sum: {
                    views: true
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_likes.count(),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comments.count({
                where: {
                    status: 'APPROVED'
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_views.count({
                where: {
                    createdAt: {
                        gte: sevenDaysAgo
                    }
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comments.count({
                where: {
                    status: 'PENDING'
                }
            })
        ]);
        // اتجاهات 7 أيام
        const last7Days = Array.from({
            length: 7
        }).map((_, idx)=>{
            const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - idx));
            const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - idx) + 1);
            return {
                dayStart,
                dayEnd
            };
        });
        const [viewsByDay, likesByDay, commentsByDay] = await Promise.all([
            Promise.all(last7Days.map(({ dayStart, dayEnd })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_views.count({
                    where: {
                        createdAt: {
                            gte: dayStart,
                            lt: dayEnd
                        }
                    }
                }))),
            Promise.all(last7Days.map(({ dayStart, dayEnd })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_likes.count({
                    where: {
                        createdAt: {
                            gte: dayStart,
                            lt: dayEnd
                        }
                    }
                }))),
            Promise.all(last7Days.map(({ dayStart, dayEnd })=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comments.count({
                    where: {
                        createdAt: {
                            gte: dayStart,
                            lt: dayEnd
                        },
                        status: 'APPROVED'
                    }
                })))
        ]);
        const trends = last7Days.map(({ dayStart }, i)=>({
                date: dayStart.toISOString().slice(0, 10),
                views: viewsByDay[i],
                likes: likesByDay[i],
                comments: commentsByDay[i]
            }));
        // مصادر الزيارات آخر 30 يوم
        const sourcesGroup = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_views.groupBy({
            by: [
                'source'
            ],
            where: {
                createdAt: {
                    gte: thirtyDaysAgo
                }
            },
            _count: {
                source: true
            }
        });
        const sources = Object.fromEntries(sourcesGroup.map((s)=>[
                s.source || 'other',
                s._count.source
            ]));
        // أفضل المشاريع آخر 30 يوم (حسب المشاهدات)
        const topViews = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].project_views.groupBy({
            by: [
                'projectId'
            ],
            where: {
                createdAt: {
                    gte: thirtyDaysAgo
                }
            },
            _count: {
                projectId: true
            },
            orderBy: {
                _count: {
                    projectId: 'desc'
                }
            },
            take: 5
        });
        const topProjectIds = topViews.map((v)=>v.projectId);
        const topProjectsRaw = topProjectIds.length ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].projects.findMany({
            where: {
                id: {
                    in: topProjectIds
                }
            },
            include: {
                media_items: {
                    take: 1,
                    orderBy: {
                        order: 'asc'
                    }
                }
            }
        }) : [];
        const topProjects = topViews.map((v)=>{
            const p = topProjectsRaw.find((pr)=>pr.id === v.projectId);
            return p ? {
                id: p.id,
                title: p.title,
                slug: p.slug,
                cover: p.media_items?.[0]?.src || null,
                views: v._count.projectId
            } : {
                id: v.projectId,
                title: 'مشروع',
                slug: v.projectId,
                cover: null,
                views: v._count.projectId
            };
        });
        // أحدث التعليقات
        const recentComments = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].comments.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            take: 5,
            include: {
                projects: {
                    select: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        });
        // حساب معدل التفاعل
        const totalInteractions = (totalLikes || 0) + (totalComments || 0);
        const engagement = totalProjects > 0 ? Math.round(totalInteractions / totalProjects * 100) / 100 : 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            stats: {
                totalProjects,
                publishedProjects,
                totalViews: totalViews._sum.views || 0,
                totalLikes: totalLikes || 0,
                totalComments,
                featuredProjects,
                recentViews,
                pendingComments,
                engagement
            },
            trends,
            sources,
            topProjects,
            recentComments: recentComments.map((c)=>({
                    id: c.id,
                    name: c.name,
                    message: c.message,
                    rating: c.rating,
                    status: c.status,
                    createdAt: c.createdAt.toISOString(),
                    project: c.projects
                }))
        });
    } catch (error) {
        console.error('❌ خطأ في جلب الإحصائيات:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في جلب الإحصائيات',
            stats: {
                totalProjects: 0,
                publishedProjects: 0,
                totalViews: 0,
                totalLikes: 0,
                totalComments: 0,
                featuredProjects: 0,
                recentViews: 0,
                pendingComments: 0,
                engagement: 0
            },
            trends: [],
            sources: {},
            topProjects: [],
            recentComments: []
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__36537cb5._.js.map