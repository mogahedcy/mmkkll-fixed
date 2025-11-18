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
    const author = (searchParams.get('author') || '').trim();
    const dateFrom = (searchParams.get('dateFrom') || '').trim();
    const dateTo = (searchParams.get('dateTo') || '').trim();
    const minRating = searchParams.get('minRating') ? Number.parseFloat(searchParams.get('minRating')!) : 0;
    const featured = searchParams.get('featured') === 'true';

    let projects: any[] = [];
    let projectsTotal = 0;
    let faqs: any[] = [];
    let faqsTotal = 0;

    // Search FAQs
    if (type === 'all' || type === 'faqs') {
      try {
        const faqWhereClause: any = { status: 'PUBLISHED' };
        
        if (q || category) {
          faqWhereClause.AND = [];
          
          if (q) {
            faqWhereClause.AND.push({
              OR: [
                { question: { contains: q, mode: 'insensitive' } },
                { answer: { contains: q, mode: 'insensitive' } },
                { category: { contains: q, mode: 'insensitive' } }
              ]
            });
          }
          
          if (category) {
            faqWhereClause.AND.push({ category: { contains: category, mode: 'insensitive' } });
          }
        }

        faqsTotal = await prisma.faqs.count({ where: faqWhereClause });

        const fetchLimit = type === 'all' ? (skip + limit + 100) : limit;
        const fetchSkip = type === 'all' ? 0 : skip;

        faqs = await prisma.faqs.findMany({
          where: faqWhereClause,
          select: {
            id: true,
            question: true,
            answer: true,
            category: true,
            views: true,
            order: true,
            createdAt: true
          },
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
          skip: fetchSkip,
          take: fetchLimit
        });
      } catch (e) {
        console.warn('FAQ search failed:', e);
        faqs = [];
        faqsTotal = 0;
      }
    }

    // Search projects only if needed
    if (type === 'all' || type === 'projects') {
      try {
        // Build simpler where clause
        const whereClause: any = { status: 'PUBLISHED' };
        
        // Add search conditions
        if (q || category || location || minRating > 0 || dateFrom || dateTo || featured) {
          whereClause.AND = [];
          
          if (q) {
            whereClause.AND.push({
              OR: [
                { title: { contains: q, mode: 'insensitive' } },
                { description: { contains: q, mode: 'insensitive' } },
                { category: { contains: q, mode: 'insensitive' } },
                { location: { contains: q, mode: 'insensitive' } }
              ]
            });
          }
          
          if (category) {
            whereClause.AND.push({ category: { contains: category, mode: 'insensitive' } });
          }
          
          if (location) {
            whereClause.AND.push({ location: { contains: location, mode: 'insensitive' } });
          }

          if (minRating > 0) {
            whereClause.AND.push({ rating: { gte: minRating } });
          }

          if (dateFrom) {
            whereClause.AND.push({ createdAt: { gte: new Date(dateFrom) } });
          }

          if (dateTo) {
            whereClause.AND.push({ createdAt: { lte: new Date(dateTo) } });
          }

          if (featured) {
            whereClause.AND.push({ featured: true });
          }
        }

        // Get total count for pagination
        projectsTotal = await prisma.projects.count({ where: whereClause });

        // Fetch projects - when type='all', get enough results for current page and beyond
        // We fetch from start to ensure proper sorting/mixing with articles
        const fetchLimit = type === 'all' ? (skip + limit + 100) : limit;
        const fetchSkip = type === 'all' ? 0 : skip;
        
        projects = await prisma.projects.findMany({
          where: whereClause,
          select: {
            id: true,
            slug: true,
            title: true,
            description: true,
            category: true,
            location: true,
            createdAt: true,
            featured: true,
            rating: true,
            views: true,
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
              : sortBy === 'views'
              ? [{ views: 'desc' }]
              : sortBy === 'rating'
              ? [{ rating: 'desc' }]
              : [{ featured: 'desc' }, { createdAt: 'desc' }],
          skip: fetchSkip,
          take: fetchLimit
        });
      } catch (e) {
        console.warn('DB search failed:', e);
        projects = [];
        projectsTotal = 0;
      }
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
      featured: Boolean(p.featured),
      rating: p.rating || 0,
      views: p.views || 0
    }));

    const faqResults = faqs.map((f) => ({
      id: String(f.id),
      type: 'faq' as const,
      title: f.question,
      description: f.answer.substring(0, 200) + (f.answer.length > 200 ? '...' : ''),
      category: f.category || 'عام',
      location: '',
      image: '/favicon.svg',
      slug: String(f.id),
      url: `/faq?id=${f.id}#question-${f.id}`,
      createdAt: f.createdAt ? new Date(f.createdAt).getTime() : 0,
      featured: false,
      views: f.views || 0,
      rating: 0,
      question: f.question,
      answer: f.answer
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
    const articlesTotal = sortedArticles.length;

    // For type='articles', apply pagination here; for type='all', get all for later combined pagination
    const articleSliceStart = type === 'articles' ? skip : 0;
    const articleSliceEnd = type === 'articles' ? skip + limit : sortedArticles.length;
    const pagedArticles = sortedArticles.slice(articleSliceStart, articleSliceEnd);

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
      featured: false,
      rating: a.rating || 0,
      views: a.views || 0
    }));

    // Merge results
    let combined = [...projectResults, ...articleResults, ...faqResults];
    
    // Sort combined results
    switch(sortBy) {
      case 'date':
        combined = combined.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        break;
      case 'name':
        combined = combined.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'views':
        combined = combined.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      case 'rating':
        combined = combined.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'relevance':
      default:
        combined = combined.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.createdAt || 0) - (a.createdAt || 0);
        });
    }
    
    // For type='all', apply pagination on the combined sorted results
    if (type === 'all') {
      combined = combined.slice(skip, skip + limit);
    }

    const total = type === 'projects' ? projectsTotal : 
                  type === 'articles' ? articlesTotal : 
                  type === 'faqs' ? faqsTotal :
                  projectsTotal + articlesTotal + faqsTotal;
    const hasMore = page * limit < total;

    // Calculate facets for filtering
    const facets = {
      types: {
        articles: articlesTotal,
        projects: projectsTotal,
        faqs: faqsTotal
      }
    };

    return NextResponse.json({ 
      success: true, 
      results: combined, 
      total, 
      query: q, 
      page, 
      limit, 
      hasMore,
      facets 
    });
  } catch (error) {
    console.error('خطأ في البحث:', error);
    return NextResponse.json({ success: false, error: 'حدث خطأ في البحث', results: [], total: 0, page: 1, limit: 12, hasMore: false }, { status: 500 });
  }
}
