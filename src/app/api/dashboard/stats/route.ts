import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // جلب الإحصائيات الأساسية
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalViews,
      totalLikes,
      totalComments,
      recentViews,
      pendingComments
    ] = await Promise.all([
      prisma.projects.count(),
      prisma.projects.count({ where: { status: 'PUBLISHED' } }),
      prisma.projects.count({ where: { featured: true } }),
      prisma.projects.aggregate({ _sum: { views: true } }),
      prisma.project_likes.count(),
      prisma.comments.count({ where: { status: 'APPROVED' } }),
      prisma.project_views.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.comments.count({ where: { status: 'PENDING' } })
    ]);

    // اتجاهات 7 أيام
    const last7Days = Array.from({ length: 7 }).map((_, idx) => {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - idx));
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (6 - idx) + 1);
      return { dayStart, dayEnd };
    });

    const [viewsByDay, likesByDay, commentsByDay] = await Promise.all([
      Promise.all(
        last7Days.map(({ dayStart, dayEnd }) =>
          prisma.project_views.count({ where: { createdAt: { gte: dayStart, lt: dayEnd } } })
        )
      ),
      Promise.all(
        last7Days.map(({ dayStart, dayEnd }) =>
          prisma.project_likes.count({ where: { createdAt: { gte: dayStart, lt: dayEnd } } })
        )
      ),
      Promise.all(
        last7Days.map(({ dayStart, dayEnd }) =>
          prisma.comments.count({ where: { createdAt: { gte: dayStart, lt: dayEnd }, status: 'APPROVED' } })
        )
      )
    ]);

    const trends = last7Days.map(({ dayStart }, i) => ({
      date: dayStart.toISOString().slice(0, 10),
      views: viewsByDay[i],
      likes: likesByDay[i],
      comments: commentsByDay[i]
    }));

    // مصادر الزيارات آخر 30 يوم
    const sourcesGroup = await prisma.project_views.groupBy({
      by: ['source'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { source: true }
    });
    const sources = Object.fromEntries(sourcesGroup.map(s => [s.source || 'other', s._count.source]));

    // أفضل المشاريع آخر 30 يوم (حسب المشاهدات)
    const topViews = await prisma.project_views.groupBy({
      by: ['projectId'],
      where: { createdAt: { gte: thirtyDaysAgo } },
      _count: { projectId: true },
      orderBy: { _count: { projectId: 'desc' } },
      take: 5
    });
    const topProjectIds = topViews.map(v => v.projectId);
    const topProjectsRaw = topProjectIds.length
      ? await prisma.projects.findMany({
          where: { id: { in: topProjectIds } },
          include: { media_items: { take: 1, orderBy: { order: 'asc' } } }
        })
      : [];
    const topProjects = topViews.map(v => {
      const p = topProjectsRaw.find(pr => pr.id === v.projectId);
      return p
        ? {
            id: p.id,
            title: p.title,
            slug: p.slug,
            cover: p.media_items?.[0]?.src || null,
            views: v._count.projectId
          }
        : { id: v.projectId, title: 'مشروع', slug: v.projectId, cover: null, views: v._count.projectId };
    });

    // أحدث التعليقات
    const recentComments = await prisma.comments.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { projects: { select: { id: true, title: true, slug: true } } }
    });

    // حساب معدل التفاعل
    const totalInteractions = (totalLikes || 0) + (totalComments || 0);
    const engagement = totalProjects > 0
      ? Math.round((totalInteractions / totalProjects) * 100) / 100
      : 0;

    return NextResponse.json({
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
      recentComments: recentComments.map(c => ({
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
    return NextResponse.json(
      {
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
      },
      { status: 500 }
    );
  }
}
