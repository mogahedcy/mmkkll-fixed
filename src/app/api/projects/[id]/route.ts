import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - جلب مشروع واحد
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = resolvedParams.id;

    const project = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        media_items: {
          orderBy: { order: 'asc' }
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
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // زيادة عدد المشاهدات
    await prisma.projects.update({
      where: { id: projectId },
      data: { views: { increment: 1 } }
    });

    console.log('📖 تم جلب المشروع:', project.title);

    return NextResponse.json({
      ...project,
      mediaItems: (project as any).media_items,
      tags: (project as any).project_tags || [],
      materials: (project as any).project_materials || [],
      views: (project.views || 0) + 1,
      likes: project.likes || 0,
      rating: project.rating || 0
    });

  } catch (error) {
    console.error('❌ خطأ في جلب المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في جلب المشروع' },
      { status: 500 }
    );
  }
}

// PUT - تعديل مشروع
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = resolvedParams.id;
    const data = await request.json();
    console.log('🔧 تعديل المشروع:', projectId, data);

    const {
      title,
      description,
      category,
      location,
      completionDate,
      client,
      featured,
      projectDuration,
      projectCost,
      mediaItems,
      tags,
      materials
    } = data;

    // التحقق من صحة البيانات
    if (!title || !description || !category || !location) {
      return NextResponse.json(
        { error: 'البيانات الأساسية مطلوبة' },
        { status: 400 }
      );
    }

    // التحقق من وجود المشروع
    const existingProject = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        mediaItems: true,
        tags: true,
        materials: true
      }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    // حذف الوسائط والعلامات والمواد القديمة
    await prisma.media_items.deleteMany({
      where: { projectId }
    });

    await prisma.project_tags.deleteMany({
      where: { projectId }
    });

    await prisma.project_materials.deleteMany({
      where: { projectId }
    });

    // تحديث المشروع مع البيانات الجديدة
    const updatedProject = await prisma.projects.update({
      where: { id: projectId },
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
          create: mediaItems?.map((item: { type: string; src: string; thumbnail?: string; title?: string; description?: string; duration?: number }, index: number) => ({
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
          create: tags?.map((tag: string | { name: string }) => ({
            name: typeof tag === 'string' ? tag : tag.name
          })) || []
        },
        project_materials: {
          create: materials?.map((material: string | { name: string }) => ({
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

    // إش��ار جوجل بالتحديث
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sitemap/refresh`, {
        method: 'POST'
      });
    } catch (error) {
      console.warn('تعذر إشعار جوجل بالتحديث:', error);
    }

    return NextResponse.json({
      success: true,
      project: { ...updatedProject, mediaItems: (updatedProject as any).media_items },
      message: 'تم تحديث المشروع بنجاح'
    });

  } catch (error: unknown) {
    console.error('❌ خطأ في تحديث المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في تحديث المشروع' },
      { status: 500 }
    );
  }
}

// DELETE - حذف مشروع
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const projectId = resolvedParams.id;

    // التحقق من وجود المشروع
    const existingProject = await prisma.projects.findUnique({
      where: { id: projectId },
      include: {
        media_items: true,
        project_tags: true,
        project_materials: true,
        comments: true
      }
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: 'المشروع غير موجود' },
        { status: 404 }
      );
    }

    console.log('🗑️ حذف المشروع:', existingProject.title);

    // حذف البيانات المرتبطة أولاً
    await prisma.comments.deleteMany({
      where: { projectId }
    });

    await prisma.media_items.deleteMany({
      where: { projectId }
    });

    await prisma.project_tags.deleteMany({
      where: { projectId }
    });

    await prisma.project_materials.deleteMany({
      where: { projectId }
    });

    // حذف المشروع
    await prisma.projects.delete({
      where: { id: projectId }
    });

    console.log('✅ تم حذف المشر��ع بنجاح');

    // إشعار جوجل بالحذف
    try {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/sitemap/refresh`, {
        method: 'POST'
      });
    } catch (error) {
      console.warn('تعذر إشعار جوجل بالحذف:', error);
    }

    return NextResponse.json({
      success: true,
      message: 'تم حذف المشروع بنجاح'
    });

  } catch (error: unknown) {
    console.error('❌ خطأ في حذف المشروع:', error);
    return NextResponse.json(
      { error: 'حدث خطأ في حذف الم��روع' },
      { status: 500 }
    );
  }
}
