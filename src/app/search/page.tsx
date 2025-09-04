'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchResults from '@/components/SearchResults';
import AdvancedFilters from '@/components/AdvancedFilters';
import SavedSearches from '@/components/SavedSearches';

// نوع نتائج API
interface ApiResult {
  id: string;
  title: string;
  description: string;
  category?: string;
  location?: string;
  image: string;
  slug: string;
}

// نوع المقال المطلوب من SearchResults
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
}

// حالة الفلاتر المتوافقة مع AdvancedFilters
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
  const [results, setResults] = useState<ArticleShape[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FiltersState>({
    category: '',
    location: '',
    featured: null,
    minRating: 0,
    dateRange: '',
    hasVideo: null,
    priceRange: ''
  });

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      performSearch(query, filters);
    } else {
      setResults([]);
    }
  }, [query, filters]);

  const performSearch = async (searchQuery: string, currentFilters: FiltersState) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({ q: searchQuery });
      if (currentFilters.category) queryParams.set('category', currentFilters.category);
      if (currentFilters.location) queryParams.set('location', currentFilters.location);

      const response = await fetch(`/api/search?${queryParams.toString()}`, { cache: 'no-store' });
      const data = await response.json();

      const mapped: ArticleShape[] = (data.results as ApiResult[] | undefined)?.map((r, idx) => ({
        id: Number.parseInt(r.id) || idx + 1,
        slug: r.slug,
        title: r.title,
        excerpt: r.description,
        category: r.category || 'عام',
        author: 'محترفين الديار العالمية',
        authorAvatar: 'https://ui-avatars.com/api/?name=محترفين+الديار&background=0f172a&color=fff',
        date: new Date().toLocaleDateString('ar-SA'),
        readTime: '3 دقائق',
        image: r.image,
        tags: [],
        featured: false,
        views: 0,
        likes: 0,
        rating: 0,
        commentsCount: 0,
        keywords: []
      })) || [];

      setResults(mapped);
    } catch (error) {
      console.error('خطأ في البحث:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (partial: Partial<FiltersState>) => {
    setFilters(prev => ({ ...prev, ...partial }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            نتائج البحث{query && ` عن "${query}"`}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">تم العثور على {results.length} نتيجة</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AdvancedFilters filters={filters} onFiltersChange={handleFiltersChange} />
            <SavedSearches />
          </div>

          <div className="lg:col-span-3">
            <SearchResults articles={results} isLoading={loading} searchQuery={query} />
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
