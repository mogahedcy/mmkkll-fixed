
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, X, Calendar, MapPin, Tag, Star, Eye, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AdvancedFilters from '@/components/AdvancedFilters';
import SearchResults from '@/components/SearchResults';
import SavedSearches from '@/components/SavedSearches';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  client: string;
  featured: boolean;
  slug: string;
  views: number;
  likes: number;
  _count: {
    comments: number;
  };
  mediaItems: Array<{
    id: string;
    type: string;
    src: string;
    alt: string;
    title: string;
  }>;
}

interface SearchFilters {
  category: string;
  location: string;
  featured: boolean | null;
  dateFrom: string;
  dateTo: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

const categories = [
  { id: '', name: 'جميع الفئات' },
  { id: 'مظلات', name: 'المظلات' },
  { id: 'برجولات', name: 'البرجولات' },
  { id: 'سواتر', name: 'السواتر' },
  { id: 'تنسيق حدائق', name: 'تنسيق الحدائق' },
  { id: 'ترميم', name: 'الترميم' },
  { id: 'ساندوتش بانل', name: 'الساندوتش بانل' },
  { id: 'بيوت شعر', name: 'بيوت الشعر' },
  { id: 'خيام', name: 'الخيام' }
];

const locations = [
  { id: '', name: 'جميع المواقع' },
  { id: 'جدة', name: 'جدة' },
  { id: 'مكة', name: 'مكة المكرمة' },
  { id: 'الرياض', name: 'الرياض' },
  { id: 'الطائف', name: 'الطائف' },
  { id: 'المدينة', name: 'المدينة المنورة' }
];

const sortOptions = [
  { id: 'newest', name: 'الأحدث' },
  { id: 'oldest', name: 'الأقدم' },
  { id: 'popular', name: 'الأكثر شعبية' },
  { id: 'featured', name: 'المميزة' },
  { id: 'alphabetical', name: 'أبجدياً' }
];

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    location: '',
    featured: null,
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest',
    sortOrder: 'desc'
  });

  const itemsPerPage = 12;

  // Initialize from URL params
  useEffect(() => {
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    
    setSearchQuery(query);
    setFilters(prev => ({
      ...prev,
      category,
      location
    }));

    if (query || category || location) {
      setHasSearched(true);
    }

    // Load recent searches from localStorage
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, [searchParams]);

  // Load projects
  const loadProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.featured !== null) params.append('featured', filters.featured.toString());
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);
      params.append('sort', filters.sortBy);
      params.append('order', filters.sortOrder);
      params.append('limit', '100'); // Get more results for client-side pagination

      const response = await fetch(`/api/projects?${params.toString()}`);
      const data = await response.json();
      
      if (response.ok) {
        setProjects(data.projects || []);
        setTotalResults(data.projects?.length || 0);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters]);

  // Search effect
  useEffect(() => {
    if (hasSearched) {
      loadProjects();
    }
  }, [loadProjects, hasSearched]);

  // Paginated results
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return projects.slice(startIndex, endIndex);
  }, [projects, currentPage]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Search handler
  const handleSearch = (query?: string) => {
    const searchTerm = query !== undefined ? query : searchQuery;
    
    if (searchTerm.trim()) {
      // Save to recent searches
      const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
    }

    setHasSearched(true);
    setCurrentPage(1);

    // Update URL
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (filters.category) params.append('category', filters.category);
    if (filters.location) params.append('location', filters.location);
    
    router.push(`/search?${params.toString()}`);
  };

  // Filter handlers
  const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      featured: null,
      dateFrom: '',
      dateTo: '',
      sortBy: 'newest',
      sortOrder: 'desc'
    });
    setCurrentPage(1);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setHasSearched(false);
    setProjects([]);
    setCurrentPage(1);
    router.push('/search');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              البحث في مشاريعنا
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ابحث في مجموعة مشاريعنا المتنوعة واعثر على ما يناسب احتياجاتك
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن المشاريع، الخدمات، المواقع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="text-lg py-4 px-6 pl-12 pr-20"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-2">
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="px-2"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
                <Button onClick={() => handleSearch()} className="px-6">
                  بحث
                </Button>
              </div>
            </div>

            {/* Recent Searches */}
            {!hasSearched && recentSearches.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">عمليات البحث الأخيرة:</p>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Button
                      key={`recent-${index}`}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch(search);
                      }}
                      className="text-xs"
                    >
                      {search}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">تصفية النتائج</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4" />
                </Button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الفئة
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange({ category: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموقع
                  </label>
                  <select
                    value={filters.location}
                    onChange={(e) => handleFilterChange({ location: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Options */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ترتيب النتائج
                  </label>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured Filter */}
                <div>
                  <label className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="checkbox"
                      checked={filters.featured === true}
                      onChange={(e) => handleFilterChange({ featured: e.target.checked ? true : null })}
                      className="rounded border-gray-300 text-orange-600 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
                    />
                    <span className="text-sm font-medium text-gray-700">المشاريع المميزة فقط</span>
                  </label>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                  disabled={!Object.values(filters).some(v => v !== '' && v !== null && v !== 'newest' && v !== 'desc')}
                >
                  مسح الفلاتر
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            {hasSearched && (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    نتائج البحث
                    {searchQuery && (
                      <span className="text-orange-600"> عن "{searchQuery}"</span>
                    )}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {isLoading ? 'جاري البحث...' : `${totalResults} نتيجة`}
                  </p>
                </div>
              </div>
            )}

            {/* Active Filters */}
            {hasSearched && (filters.category || filters.location || filters.featured) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {filters.category && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {categories.find(c => c.id === filters.category)?.name}
                      <button
                        onClick={() => handleFilterChange({ category: '' })}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.location && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {locations.find(l => l.id === filters.location)?.name}
                      <button
                        onClick={() => handleFilterChange({ location: '' })}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.featured && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      مميز
                      <button
                        onClick={() => handleFilterChange({ featured: null })}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                  <Card key={`skeleton-${i}`} className="overflow-hidden">
                    <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                    <CardContent className="p-4">
                      <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
                      <div className="h-3 bg-gray-200 rounded animate-pulse mb-4" />
                      <div className="flex justify-between">
                        <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : hasSearched && totalResults === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    لم نجد أي نتائج
                  </h3>
                  <p className="text-gray-600 mb-6">
                    حاول استخدام كلمات مختلفة أو تعديل الفلاتر
                  </p>
                  <Button onClick={clearFilters}>
                    مسح جميع الفلاتر
                  </Button>
                </div>
              </div>
            ) : hasSearched ? (
              <>
                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/portfolio/${project.id}`}>
                        <div className="aspect-[4/3] relative">
                          {project.mediaItems?.[0] ? (
                            <Image
                              src={project.mediaItems[0].src}
                              alt={project.mediaItems[0].alt || project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                              <span className="text-gray-400">لا توجد صورة</span>
                            </div>
                          )}
                          {project.featured && (
                            <Badge className="absolute top-2 right-2 bg-orange-600">
                              <Star className="w-3 h-3 mr-1" />
                              مميز
                            </Badge>
                          )}
                        </div>
                      </Link>
                      
                      <CardContent className="p-4">
                        <Link href={`/portfolio/${project.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 hover:text-orange-600 transition-colors">
                            {project.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <div className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            <span>{project.category}</span>
                          </div>
                          {project.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{project.location}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{project.views || 0}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{project._count?.comments || 0}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>
                              {new Date(project.completionDate).toLocaleDateString('ar-SA')}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      >
                        السابق
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="w-10"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      
                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      >
                        التالي
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ابدأ بالبحث
                </h3>
                <p className="text-gray-600">
                  استخدم مربع البحث أعلاه للعثور على المشاريع التي تهمك
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
