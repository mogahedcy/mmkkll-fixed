import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { articlesIndex } from '@/data/articles-index';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const category = (searchParams.get('category') || '').trim();
    const location = (searchParams.get('location') || '').trim();

    // Fetch projects from DB
    const projects = await prisma.projects.findMany({
      where: {
        status: 'PUBLISHED',
        AND: [
          q
            ? {
                OR: [
                  { title: { contains: q, mode: 'insensitive' } },
                  { description: { contains: q, mode: 'insensitive' } },
                  { category: { contains: q, mode: 'insensitive' } },
                  { location: { contains: q, mode: 'insensitive' } }
                ]
              }
            : {},
          category ? { category: { contains: category, mode: 'insensitive' } } : {},
          location ? { location: { contains: location, mode: 'insensitive' } } : {}
        ]
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        category: true,
        location: true,
        media_items: {
          where: { type: 'IMAGE' },
          orderBy: { order: 'asc' },
          take: 1,
          select: { src: true, thumbnail: true, alt: true }
        }
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }]
    });

    const projectResults = projects.map((p) => ({
      id: String(p.id),
      type: 'project' as const,
      title: p.title,
      description: p.description,
      category: p.category,
      location: p.location,
      image: p.media_items?.[0]?.thumbnail || p.media_items?.[0]?.src || '/favicon.svg',
      slug: p.slug || String(p.id),
      url: `/portfolio/${p.slug || p.id}`
    }));

    // Filter articles index
    const filteredArticles = articlesIndex.filter((a) => {
      const matchesQ = q
        ? [a.title, a.excerpt, a.category, a.keywords || '', ...(a.tags || [])]
            .join(' ')
            .toLowerCase()
            .includes(q.toLowerCase())
        : true;
      const matchesCategory = category
        ? a.category.toLowerCase().includes(category.toLowerCase())
        : true;
      return matchesQ && matchesCategory;
    });

    const articleResults = filteredArticles.map((a) => ({
      id: String(a.id),
      type: 'article' as const,
      title: a.title,
      description: a.excerpt,
      category: a.category,
      location: 'جدة',
      image: a.image,
      slug: a.slug,
      url: `/articles/${a.slug}`
    }));

    // Merge and simple relevance sorting (projects first if q empty)
    const combined = [...projectResults, ...articleResults];

    return NextResponse.json({ success: true, results: combined, total: combined.length, query: q });
  } catch (error) {
    console.error('خطأ في البحث:', error);
    return NextResponse.json({ success: false, error: 'حدث خطأ في البحث', results: [], total: 0 }, { status: 500 });
  }
}
