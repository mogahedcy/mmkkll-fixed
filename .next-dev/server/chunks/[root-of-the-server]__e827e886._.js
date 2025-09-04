module.exports = [
"[project]/.next-internal/server/app/api/projects/[id]/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

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
"[project]/src/app/api/projects/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "PUT",
    ()=>PUT
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs)");
;
;
const prisma = new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$29$__["PrismaClient"]();
async function GET(request, { params }) {
    try {
        const resolvedParams = await params;
        const param = resolvedParams.id;
        // السماح باستخدام المعرف أو الslug
        let project = await prisma.projects.findUnique({
            where: {
                id: param
            },
            include: {
                media_items: {
                    orderBy: {
                        order: 'asc'
                    }
                },
                project_tags: true,
                project_materials: true,
                _count: {
                    select: {
                        comments: true,
                        project_likes: true
                    }
                }
            }
        });
        if (!project) {
            project = await prisma.projects.findUnique({
                where: {
                    slug: param
                },
                include: {
                    media_items: {
                        orderBy: {
                            order: 'asc'
                        }
                    },
                    project_tags: true,
                    project_materials: true,
                    _count: {
                        select: {
                            comments: true,
                            project_likes: true
                        }
                    }
                }
            });
        }
        if (!project) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'المشروع غير موجود'
            }, {
                status: 404
            });
        }
        // زيادة عدد المشاهدات باستخدام معرف المشروع الحقيقي
        await prisma.projects.update({
            where: {
                id: project.id
            },
            data: {
                views: {
                    increment: 1
                }
            }
        });
        console.log('📖 تم جلب المشروع:', project.title);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ...project,
            mediaItems: project.media_items,
            tags: project.project_tags || [],
            materials: project.project_materials || [],
            views: (project.views || 0) + 1,
            likes: project._count?.project_likes || 0,
            rating: project.rating || 0
        });
    } catch (error) {
        console.error('❌ خطأ في جلب المشروع:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في جلب المشروع'
        }, {
            status: 500
        });
    }
}
async function PUT(request, { params }) {
    try {
        const resolvedParams = await params;
        const projectId = resolvedParams.id;
        const data = await request.json();
        console.log('🔧 تعديل المشروع:', projectId, data);
        const { title, description, category, location, completionDate, client, featured, projectDuration, projectCost, mediaItems, tags, materials } = data;
        // التحقق من صحة البيانات
        if (!title || !description || !category || !location) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'البيانات الأساسية مطلوبة'
            }, {
                status: 400
            });
        }
        // التحقق من وجود المشروع
        const existingProject = await prisma.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                mediaItems: true,
                tags: true,
                materials: true
            }
        });
        if (!existingProject) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'المشروع غير موجود'
            }, {
                status: 404
            });
        }
        // حذف الوسائط والعلامات والمواد القديمة
        await prisma.media_items.deleteMany({
            where: {
                projectId
            }
        });
        await prisma.project_tags.deleteMany({
            where: {
                projectId
            }
        });
        await prisma.project_materials.deleteMany({
            where: {
                projectId
            }
        });
        // تحديث المشروع مع البيانات الجديدة
        const updatedProject = await prisma.projects.update({
            where: {
                id: projectId
            },
            data: {
                title,
                description,
                category,
                location,
                completionDate: new Date(completionDate),
                client: client || null,
                featured: featured || false,
                projectDuration: projectDuration || '',
                projectCost: projectCost || '',
                updatedAt: new Date(),
                media_items: {
                    create: mediaItems?.map((item, index)=>({
                            type: item.type,
                            src: item.src,
                            thumbnail: item.thumbnail || item.src,
                            title: item.title || `ملف ${index + 1}`,
                            description: item.description || '',
                            duration: item.duration || null,
                            order: index
                        })) || []
                },
                project_tags: {
                    create: tags?.map((tag)=>({
                            name: typeof tag === 'string' ? tag : tag.name
                        })) || []
                },
                project_materials: {
                    create: materials?.map((material)=>({
                            name: typeof material === 'string' ? material : material.name
                        })) || []
                }
            },
            include: {
                media_items: true,
                project_tags: true,
                project_materials: true,
                _count: {
                    select: {
                        comments: true,
                        project_likes: true,
                        project_views: true
                    }
                }
            }
        });
        console.log('✅ تم تحديث المشروع بنجاح:', updatedProject.title);
        // إشعار محركات البحث بالتحديث
        try {
            const origin = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
            await fetch(`${origin}/api/sitemap/refresh`, {
                method: 'POST'
            });
            const pageUrl = `${origin}/portfolio/${updatedProject.slug || updatedProject.id}`;
            await fetch(`${origin}/api/indexnow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    urls: [
                        pageUrl
                    ]
                })
            });
        } catch (error) {
            console.warn('تعذر إشعار محركات البحث بالتحديث:', error);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            project: {
                ...updatedProject,
                mediaItems: updatedProject.media_items
            },
            message: 'تم تحديث المشروع بنجاح'
        });
    } catch (error) {
        console.error('❌ خطأ في تحديث المشروع:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في تحديث المشروع'
        }, {
            status: 500
        });
    }
}
async function DELETE(request, { params }) {
    try {
        const resolvedParams = await params;
        const projectId = resolvedParams.id;
        // التحقق من وجود المشروع
        const existingProject = await prisma.projects.findUnique({
            where: {
                id: projectId
            },
            include: {
                media_items: true,
                project_tags: true,
                project_materials: true,
                comments: true
            }
        });
        if (!existingProject) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'المشروع غير موجود'
            }, {
                status: 404
            });
        }
        console.log('🗑️ حذف المشروع:', existingProject.title);
        // حذف البيانات المرتبطة أولاً
        await prisma.comments.deleteMany({
            where: {
                projectId
            }
        });
        await prisma.media_items.deleteMany({
            where: {
                projectId
            }
        });
        await prisma.project_tags.deleteMany({
            where: {
                projectId
            }
        });
        await prisma.project_materials.deleteMany({
            where: {
                projectId
            }
        });
        // حذف المشروع
        await prisma.projects.delete({
            where: {
                id: projectId
            }
        });
        console.log('✅ تم حذف المشروع بنجاح');
        // إشعار جوجل بالحذف
        try {
            await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sitemap/refresh`, {
                method: 'POST'
            });
        } catch (error) {
            console.warn('تعذر إشعار جوجل بالحذف:', error);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            message: 'تم حذف المشروع بنجاح'
        });
    } catch (error) {
        console.error('❌ خطأ في حذف المشروع:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'حدث خطأ في حذف الم��روع'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e827e886._.js.map