import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { articlesIndex } from '@/data/articles-index';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    const category = (searchParams.get('category') || '').trim();
    const location = (searchParams.get('location') || '').trim();
    const type = (searchParams.get('type') || 'all').toLowerCase();
    const sortBy = (searchParams.get('sortBy') || 'relevance').toLowerCase();
    const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1'));
    const limit = Math.min(50, Math.max(1, Number.parseInt(searchParams.get('limit') || '12')));
    const skip = (page - 1) * limit;

    let projects: any[] = [];
    let projectsTotal = 0;
    try {
      if (type === 'all' || type === 'projects') {
        projectsTotal = await prisma.projects.count({
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
          }
        });

        projects = await prisma.projects.findMany({
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
            createdAt: true,
            featured: true,
            media_items: {
              where: { type: 'IMAGE' },
              orderBy: { order: 'asc' },
              take: 1,
              select: { src: true, thumbnail: true, alt: true }
            }
          },
          orderBy:
            sortBy === 'name'
              ? [{ title: 'asc' }]
              : sortBy === 'date'
              ? [{ createdAt: 'desc' }]
              : [{ featured: 'desc' }, { createdAt: 'desc' }],
          skip,
          take: limit
        });
      }
    } catch (e) {
      console.warn('DB unavailable, skipping project search');
      projects = [];
      projectsTotal = 0;
    }

    const projectResults = projects.map((p) => ({
      id: String(p.id),
      type: 'project' as const,
      title: p.title,
      description: p.description,
      category: p.category,
      location: p.location,
      image: p.media_items?.[0]?.thumbnail || p.media_items?.[0]?.src || '/favicon.svg',
      slug: p.slug || String(p.id),
      url: `/portfolio/${p.slug || p.id}`,
      createdAt: p.createdAt ? new Date(p.createdAt).getTime() : 0,
      featured: Boolean(p.featured)
    }));

    const filteredArticles = (type === 'all' || type === 'articles')
      ? articlesIndex.filter((a) => {
          const haystack = [a.title, a.excerpt, a.category, a.keywords || '', ...(a.tags || [])]
            .join(' ')
            .toLowerCase();
          const matchesQ = q ? haystack.includes(q.toLowerCase()) : true;
          const matchesCategory = category ? a.category.toLowerCase().includes(category.toLowerCase()) : true;
          return matchesQ && matchesCategory;
        })
      : [];

    const scoredArticles = filteredArticles.map((a) => {
      const title = a.title.toLowerCase();
      const ql = q.toLowerCase();
      const score = q ? (title.startsWith(ql) ? 3 : title.includes(ql) ? 2 : 1) : 1;
      return { ...a, _score: score } as any;
    });

    const sortedArticles = scoredArticles.sort((a, b) => b._score - a._score);

    const start = skip;
    const end = skip + limit;
    const pagedArticles = sortedArticles.slice(start, end);
    const articlesTotal = sortedArticles.length;

    const articleResults = pagedArticles.map((a) => ({
      id: String(a.id),
      type: 'article' as const,
      title: a.title,
      description: a.excerpt,
      category: a.category,
      location: 'جدة',
      image: a.image,
      slug: a.slug,
      url: `/articles/${a.slug}`,
      createdAt: 0,
      featured: false
    }));

    // Merge and sort by relevance/date depending on sortBy
    let combined = [...projectResults, ...articleResults];
    if (sortBy === 'date') combined = combined.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    if (sortBy === 'name') combined = combined.sort((a, b) => a.title.localeCompare(b.title));

    const total = (type === 'projects' ? projectsTotal : type === 'articles' ? articlesTotal : projectsTotal + articlesTotal);
    const hasMore = page * limit < total;

    return NextResponse.json({ success: true, results: combined, total, query: q, page, limit, hasMore });
  } catch (error) {
    console.error('خطأ في البحث:', error);
    return NextResponse.json({ success: false, error: 'حدث خطأ في البحث', results: [], total: 0, page: 1, limit: 12, hasMore: false }, { status: 500 });
  }
}
