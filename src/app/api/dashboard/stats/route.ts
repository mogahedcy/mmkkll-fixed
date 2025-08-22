
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // جلب الإحصائيات الأساسية
    const [
      totalProjects,
      publishedProjects,
      featuredProjects,
      totalViews,
      totalLikes,
      totalComments,
      recentViews
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'PUBLISHED' } }),
      prisma.project.count({ where: { featured: true } }),
      prisma.project.aggregate({ _sum: { views: true } }),
      prisma.project.aggregate({ _sum: { likes: true } }),
      prisma.comment.count({ where: { status: 'APPROVED' } }),
      prisma.projectView.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // آخر 7 أيام
          }
        }
      })
    ]);

    // حساب معدل التفاعل
    const totalInteractions = (totalLikes._sum.likes || 0) + (totalComments || 0);
    const engagement = totalProjects > 0 
      ? Math.round((totalInteractions / totalProjects) * 100) / 100
      : 0;

    const stats = {
      totalProjects,
      publishedProjects,
      totalViews: totalViews._sum.views || 0,
      totalLikes: totalLikes._sum.likes || 0,
      totalComments,
      featuredProjects,
      recentViews,
      engagement
    };

    return NextResponse.json({
      success: true,
      stats
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
          engagement: 0
        }
      },
      { status: 500 }
    );
  }
}
