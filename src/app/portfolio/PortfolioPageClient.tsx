'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter,
  Grid3X3,
  List,
  SortAsc,
  Heart,
  Eye,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Play,
  Camera,
  Video,
  Loader2,
  ArrowLeft
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  completionDate: string;
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  mediaItems: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO';
    src: string;
    thumbnail?: string;
    title?: string;
  }>;
  tags: Array<{ name: string }>;
  _count: { comments: number };
}

const categories = [
  { value: 'all', label: 'الكل' },
  { value: 'مظلات', label: 'مظلات' },
  { value: 'برجولات', label: 'برجولات' },
  { value: 'سواتر', label: 'سواتر' },
  { value: 'ساندوتش بانل', label: 'ساندوتش بانل' },
  { value: 'تنسيق حدائق', label: 'تنسيق حدائق' },
  { value: 'خيام ملكية', label: 'خيام ملكية' },
  { value: 'بيوت شعر', label: 'بيوت شعر' },
  { value: 'ترميم', label: 'ترميم' }
];

const sortOptions = [
  { value: 'newest', label: 'الأحدث', icon: Calendar },
  { value: 'popular', label: 'الأكثر شعبية', icon: TrendingUp },
  { value: 'most-liked', label: 'الأكثر إعجاباً', icon: Heart },
  { value: 'highest-rated', label: 'الأعلى تقييماً', icon: Star },
  { value: 'featured', label: 'المميزة', icon: Award },
  { value: 'alphabetical', label: 'أبجدياً', icon: SortAsc }
];

const viewModes = [
  { value: 'grid', label: 'شبكة', icon: Grid3X3 },
  { value: 'list', label: 'قائمة', icon: List }
];

export default function PortfolioPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // الحالات الأساسية
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalCount, setTotalCount] = useState(0);

  // حالات الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  // التصفح والتحميل
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const ITEMS_PER_PAGE = 12;

  // جلب المشاريع
  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, sortBy, currentPage]);

  // البحث
  useEffect(() => {
    filterProjects();
  }, [projects, searchTerm]);

  const fetchProjects = async () => {
    try {
      setLoading(currentPage === 1);
      setLoadingMore(currentPage > 1);

      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        sort: sortBy,
        ...(selectedCategory !== 'all' && { category: selectedCategory })
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (data.success) {
        if (currentPage === 1) {
          setProjects(data.projects);
        } else {
          setProjects(prev => [...prev, ...data.projects]);
        }

        setTotalCount(data.total);
        setHasMore(data.projects.length === ITEMS_PER_PAGE);
      } else {
        setError('فشل في جلب المشاريع');
      }
    } catch (error) {
      console.error('خطأ في جلب المشاريع:', error);
      setError('حدث خطأ في جلب المشاريع');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const filterProjects = () => {
    if (!searchTerm) {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter(project => {
      const searchLower = searchTerm.toLowerCase();
      return (
        project.title.toLowerCase().includes(searchLower) ||
        project.description.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.category.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.name.toLowerCase().includes(searchLower))
      );
    });

    setFilteredProjects(filtered);
  };

  // التعامل مع تغيير المرشحات
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    updateURL({ category, page: '1' });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
    setCurrentPage(1);
    updateURL({ sort, page: '1' });
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
    updateURL({ search });
  };

  const updateURL = (params: Record<string, string>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newSearchParams.set(key, value);
      } else {
        newSearchParams.delete(key);
      }
    });

    router.push(`/portfolio?${newSearchParams.toString()}`);
  };

  // تحميل المزيد
  const loadMore = () => {
    if (hasMore && !loadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const getMainMedia = (project: Project) => {
    return project.mediaItems?.[0];
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">جاري تحميل معرض الأعمال...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            إعادة المحاولة
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title and Stats */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              معرض أعمال محترفين الديار العالمية
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              اكتشف أكثر من {totalCount} مشروع متميز في جدة والمناطق المحيطة
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{totalCount}+</div>
                <div className="text-sm text-blue-800">مشروع ناجح</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">8</div>
                <div className="text-sm text-green-800">خدمات متخصصة</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-purple-800">عام خبرة</div>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-orange-600">جدة</div>
                <div className="text-sm text-orange-800">والمناطق المحيطة</div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="ابحث في المشاريع... (العنوان، الوصف، الموقع، الكلمات المفتاحية)"
                className="pr-12 text-lg py-3 rounded-full border-2 border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={selectedCategory === category.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleCategoryChange(category.value)}
                    className="rounded-full"
                  >
                    {category.label}
                  </Button>
                ))}
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg">
                  {viewModes.map((mode) => (
                    <Button
                      key={mode.value}
                      variant={viewMode === mode.value ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode(mode.value as 'grid' | 'list')}
                      className="rounded-none first:rounded-l-lg last:rounded-r-lg"
                    >
                      <mode.icon className="w-4 h-4" />
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProjects.length > 0 ? (
          <>
            <div className={`mb-8 ${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'space-y-6'
            }`}>
              {filteredProjects.map((project) => {
                const mainMedia = getMainMedia(project);

                return viewMode === 'grid' ? (
                  // Grid View
                  <div key={project.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    {/* Project Image/Video */}
                    <div className="relative aspect-square group">
                      {mainMedia ? (
                        <>
                          {mainMedia.type === 'IMAGE' ? (
                            <Image
                              src={mainMedia.src}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <video
                                className="w-full h-full object-cover"
                                poster={mainMedia.thumbnail}
                                muted
                                loop
                                playsInline
                              >
                                <source src={mainMedia.src} type="video/mp4" />
                              </video>
                              <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded-full">
                                <Video className="w-4 h-4" />
                              </div>
                              <div className="absolute inset-0 flex items-center justify-center opacity-80">
                                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                                  <Play className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <Camera className="w-16 h-16 text-gray-400" />
                        </div>
                      )}

                      {/* Media Count */}
                      {project.mediaItems?.length > 1 && (
                        <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {project.mediaItems.length}
                        </div>
                      )}

                      {/* Featured Badge */}
                      {project.featured && (
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          مميز
                        </div>
                      )}

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Project Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {project.category}
                        </Badge>
                      </div>

                      <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 text-lg">
                        {project.title}
                      </h3>

                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 ml-1" />
                        {project.location}
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.tags.slice(0, 2).map((tag, index) => (
                            <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                              #{tag.name}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {project.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            {project.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {project._count?.comments || 0}
                          </span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button asChild className="w-full">
                        <Link href={`/portfolio/${project.id}`}>
                          عرض التفاصيل
                          <ArrowLeft className="w-4 h-4 mr-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div key={project.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                    <div className="flex gap-6">
                      {/* Thumbnail */}
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        {mainMedia ? (
                          mainMedia.type === 'IMAGE' ? (
                            <Image
                              src={mainMedia.src}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="relative w-full h-full">
                              <video
                                className="w-full h-full object-cover"
                                poster={mainMedia.thumbnail}
                                muted
                              >
                                <source src={mainMedia.src} type="video/mp4" />
                              </video>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Play className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          )
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{project.category}</Badge>
                            {project.featured && (
                              <Badge variant="default" className="bg-yellow-500">
                                <Star className="w-3 h-3 ml-1" />
                                مميز
                              </Badge>
                            )}
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 ml-1" />
                          {project.location}
                        </div>

                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {project.description}
                        </p>

                        {/* Stats and CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {project.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {project.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              {project._count?.comments || 0}
                            </span>
                          </div>

                          <Button asChild>
                            <Link href={`/portfolio/${project.id}`}>
                              عرض التفاصيل
                              <ArrowLeft className="w-4 h-4 mr-2" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center">
                <Button
                  onClick={loadMore}
                  disabled={loadingMore}
                  size="lg"
                  className="px-8"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin ml-2" />
                      جاري التحميل...
                    </>
                  ) : (
                    'تحميل المزيد'
                  )}
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {searchTerm ? 'لم يتم العثور على نتائج' : 'لا توجد مشاريع'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm 
                ? `لم يتم العثور على مشاريع تحتوي على "${searchTerm}"`
                : 'ستظهر المشاريع هنا عند إضافتها'
              }
            </p>
            {searchTerm && (
              <Button onClick={() => handleSearchChange('')}>
                إزالة البحث
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}