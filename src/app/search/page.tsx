'use client';

import { Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchResults from '@/components/SearchResults';
import AdvancedFilters from '@/components/AdvancedFilters';
import SavedSearches from '@/components/SavedSearches';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, X, Filter, ChevronDown } from 'lucide-react';

interface ApiResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  image: string;
  slug: string;
  type: 'project' | 'article';
  url: string;
}

interface ArticleShape {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  commentsCount: number;
  keywords: string[];
  href?: string;
  source?: 'article' | 'project';
}

interface FiltersState {
  category: string;
  location: string;
  featured: boolean | null;
  minRating: number;
  dateRange: string;
  hasVideo: boolean | null;
  priceRange: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [results, setResults] = useState<ArticleShape[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'date' | 'name' | 'views' | 'rating'>('relevance');
  const [type, setType] = useState<'all' | 'projects' | 'articles' | 'faqs'>(
    (searchParams?.get('type') as any) || 'all'
  );
  const [searchText, setSearchText] = useState(searchParams?.get('q') || '');
  const [facets, setFacets] = useState({ types: { articles: 0, projects: 0, faqs: 0 } });
  const [filters, setFilters] = useState<FiltersState>({
    category: searchParams?.get('category') || '',
    location: searchParams?.get('location') || '',
    featured: null,
    minRating: 0,
    dateRange: '',
    hasVideo: null,
    priceRange: ''
  });

  const query = useMemo(() => searchParams?.get('q') || '', [searchParams]);
  const limit = 12;

  useEffect(() => {
    // مزامنة النوع مع URL
    setType(((searchParams?.get('type') as any) || 'all'));
  }, [searchParams]);

  useEffect(() => {
    if (query) {
      setPage(1);
      performSearch(query, filters, 1, true);
    } else {
      setResults([]);
      setHasMore(false);
    }
  }, [query, type, sortBy, filters.category, filters.location, filters.minRating, filters.featured, filters.dateRange, filters.hasVideo, filters.priceRange]);

  const updateUrl = (params: Record<string, string | undefined>) => {
    const sp = new URLSearchParams(searchParams?.toString() || '');
    Object.entries(params).forEach(([k, v]) => {
      if (!v) sp.delete(k);
      else sp.set(k, v);
    });
    router.replace(`${pathname}?${sp.toString()}`);
  };

  const performSearch = async (
    searchQuery: string,
    currentFilters: FiltersState,
    pageNum: number,
    replaceResults = false
  ) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ q: searchQuery, page: String(pageNum), limit: String(limit), sortBy, type });
      if (currentFilters.category) queryParams.set('category', currentFilters.category);
      if (currentFilters.location) queryParams.set('location', currentFilters.location);
      if (currentFilters.minRating > 0) queryParams.set('minRating', String(currentFilters.minRating));
      if (currentFilters.dateRange) {
        const now = new Date();
        let dateFrom = '';
        switch(currentFilters.dateRange) {
          case 'week':
            dateFrom = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
            break;
          case 'month':
            dateFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
            break;
          case 'year':
            dateFrom = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000).toISOString();
            break;
        }
        if (dateFrom) queryParams.set('dateFrom', dateFrom);
      }
      if (currentFilters.featured !== null) queryParams.set('featured', String(currentFilters.featured));

      const response = await fetch(`/api/search?${queryParams.toString()}`, { cache: 'no-store' });
      const data = await response.json();

      if (data.facets) {
        setFacets(data.facets);
      }

      const mapped: ArticleShape[] = (data.results as any[] | undefined)?.map((r, idx) => ({
        id: Number.parseInt(r.id) || idx + 1 + (pageNum - 1) * limit,
        slug: r.slug,
        title: r.title,
        excerpt: r.description,
        category: r.category || 'عام',
        author: r.type === 'project' ? 'مشروع من معرض الأعمال' : r.type === 'faq' ? 'سؤال شائع' : 'محترفين الديار العالمية',
        authorAvatar: 'https://ui-avatars.com/api/?name=محترفين+الديار&background=0f172a&color=fff',
        date: new Date().toLocaleDateString('ar-SA'),
        readTime: '3 دقائق',
        image: r.image,
        tags: [],
        featured: r.featured || false,
        views: r.views || 0,
        likes: 0,
        rating: r.rating || 0,
        commentsCount: 0,
        keywords: [],
        href: r.url,
        source: r.type === 'faq' ? 'article' : r.type
      })) || [];

      setResults(replaceResults ? mapped : [...results, ...mapped]);
      setHasMore(Boolean(data.hasMore));
    } catch (error) {
      console.error('خطأ في البحث:', error);
      if (replaceResults) setResults([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateUrl({ q: searchText || undefined, type });
  };

  const handleFiltersChange = (partial: Partial<FiltersState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    updateUrl({ category: next.category || undefined, location: next.location || undefined });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="flex-1 relative">
              <SearchIcon className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="ابحث عن مشروع أو مقال..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="pr-9"
              />
              {searchText && (
                <button type="button" onClick={() => { setSearchText(''); updateUrl({ q: undefined }); }} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button type="submit">بحث</Button>
              <div className="hidden md:flex items-center gap-2">
                <Button variant={type === 'all' ? 'default' : 'outline'} type="button" onClick={() => { setType('all'); updateUrl({ type: 'all' }); }}>
                  الكل
                  {facets.types.articles + facets.types.projects + facets.types.faqs > 0 && (
                    <Badge variant="secondary" className="mr-1 bg-white/20">{facets.types.articles + facets.types.projects + facets.types.faqs}</Badge>
                  )}
                </Button>
                <Button variant={type === 'projects' ? 'default' : 'outline'} type="button" onClick={() => { setType('projects'); updateUrl({ type: 'projects' }); }}>
                  معرض الأعمال
                  {facets.types.projects > 0 && <Badge variant="secondary" className="mr-1 bg-white/20">{facets.types.projects}</Badge>}
                </Button>
                <Button variant={type === 'articles' ? 'default' : 'outline'} type="button" onClick={() => { setType('articles'); updateUrl({ type: 'articles' }); }}>
                  المقالات
                  {facets.types.articles > 0 && <Badge variant="secondary" className="mr-1 bg-white/20">{facets.types.articles}</Badge>}
                </Button>
                <Button variant={type === 'faqs' ? 'default' : 'outline'} type="button" onClick={() => { setType('faqs'); updateUrl({ type: 'faqs' }); }}>
                  الأسئلة الشائعة
                  {facets.types.faqs > 0 && <Badge variant="secondary" className="mr-1 bg-white/20">{facets.types.faqs}</Badge>}
                </Button>
              </div>
              <div className="relative">
                <Button variant="outline" type="button" className="flex items-center gap-2"><Filter className="w-4 h-4" />فرز <ChevronDown className="w-4 h-4" /></Button>
                <div className="absolute mt-2 bg-white border rounded-lg shadow-lg hidden"></div>
              </div>
            </div>
          </form>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">نتائج البحث{query && ` عن "${query}"`}</h1>
          <p className="text-gray-600">{results.length} نتيجة</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AdvancedFilters 
              filters={filters} 
              onFiltersChange={handleFiltersChange}
              categories={[
                { id: 'مظلات سيارات', name: 'مظلات سيارات', icon: '🚗' },
                { id: 'سواتر', name: 'سواتر', icon: '🧱' },
                { id: 'خيم ملكية', name: 'خيم ملكية', icon: '🏕️' },
                { id: 'بيوت شعر ملكي', name: 'بيوت شعر ملكي', icon: '⛺' },
                { id: 'برجولات', name: 'برجولات', icon: '🏛️' },
                { id: 'تنسيق حدائق', name: 'تنسيق حدائق', icon: '🌿' },
                { id: 'هناجر', name: 'هناجر', icon: '🏢' },
                { id: 'شبوك', name: 'شبوك', icon: '🔲' },
                { id: 'قراميد', name: 'قراميد', icon: '🏛️' },
                { id: 'ساندوتش بانل', name: 'ساندوتش بانل', icon: '📦' }
              ]}
            />
            <SavedSearches />
          </div>

          <div className="lg:col-span-3">
            <SearchResults articles={results} isLoading={loading} searchQuery={query} />
            {hasMore && !loading && (
              <div className="text-center mt-8">
                <Button onClick={() => { const next = page + 1; setPage(next); performSearch(query, filters, next, false); }} variant="outline">تحميل المزيد</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل نتائج البحث...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
