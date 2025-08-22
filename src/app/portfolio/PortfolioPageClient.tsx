'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
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
  ArrowLeft,
  Share2,
  Bookmark,
  Clock,
  User,
  CheckCircle,
  Flame,
  Zap
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  location: string;
  completionDate: string;
  featured: boolean;
  views: number;
  likes: number;
  rating: number;
  commentsCount: number;
  mediaCount: number;
  readTime: number;
  slug: string;
  client?: string;
  mediaItems: Array<{
    id: string;
    type: 'IMAGE' | 'VIDEO';
    src: string;
    thumbnail?: string;
    title?: string;
    alt?: string;
  }>;
  tags: Array<{ name: string }>;
  _count: { comments: number };
}

interface Stats {
  total: number;
  featured: number;
  categories: Array<{ category: string; _count: { category: number } }>;
}

const categories = [
  { value: 'all', label: 'الكل', icon: '🏠' },
  { value: 'مظلات', label: 'مظلات', icon: '☂️' },
  { value: 'برجولات', label: 'برجولات', icon: '🏗️' },
  { value: 'سواتر', label: 'سواتر', icon: '🛡️' },
  { value: 'ساندوتش بانل', label: 'ساندوتش بانل', icon: '🏢' },
  { value: 'تنسيق حدائق', label: 'تنسيق حدائق', icon: '🌿' },
  { value: 'خيام ملكية', label: 'خيام ملكية', icon: '⛺' },
  { value: 'بيوت شعر', label: 'بيوت شعر', icon: '🏕️' },
  { value: 'ترميم', label: 'ترميم', icon: '🔧' }
];

const sortOptions = [
  { value: 'newest', label: 'الأحدث', icon: Calendar },
  { value: 'popular', label: 'الأكثر شعبية', icon: TrendingUp },
  { value: 'most-liked', label: 'الأكثر إعجاباً', icon: Heart },
  { value: 'highest-rated', label: 'الأعلى تقييماً', icon: Star },
  { value: 'featured', label: 'المميزة', icon: Award },
  { value: 'alphabetical', label: 'أبجدياً', icon: SortAsc }
];

export default function PortfolioPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // الحالات الأساسية
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState<Stats>({ total: 0, featured: 0, categories: [] });

  // حالات الفلترة والبحث
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');

  // التصفح والتحميل
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // حالات التفاعل
  const [likedProjects, setLikedProjects] = useState<Set<string>>(new Set());
  const [projectInteractions, setProjectInteractions] = useState<Map<string, any>>(new Map());

  const ITEMS_PER_PAGE = 12;

  // جلب المشاريع
  const fetchProjects = useCallback(async (reset = false) => {
    try {
      if (reset) {
        setLoading(true);
        setCurrentPage(1);
      } else {
        setLoadingMore(true);
      }

      const page = reset ? 1 : currentPage;
      const params = new URLSearchParams({
        page: page.toString(),
        limit: ITEMS_PER_PAGE.toString(),
        sort: sortBy,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();

      if (data.success) {
        if (reset || page === 1) {
          setProjects(data.projects);
        } else {
          setProjects(prev => [...prev, ...data.projects]);
        }

        setStats(data.stats);
        setHasMore(data.pagination.hasMore);

        // جلب حالات التفاعل للمشاريع
        await fetchInteractions(data.projects);
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
  }, [selectedCategory, sortBy, searchTerm, currentPage]);

  // جلب حالات التفاعل
  const fetchInteractions = async (projectList: Project[]) => {
    const interactions = new Map();
    const liked = new Set<string>();

    for (const project of projectList) {
      try {
        const response = await fetch(`/api/projects/${project.id}/interactions`);
        if (response.ok) {
          const data = await response.json();
          interactions.set(project.id, data.interactions);
          if (data.interactions.isLiked) {
            liked.add(project.id);
          }
        }
      } catch (error) {
        console.warn('فشل في جلب تفاعلات المشروع:', project.id);
      }
    }

    setProjectInteractions(interactions);
    setLikedProjects(liked);
  };

  // تسجيل مشاهدة
  const registerView = async (projectId: string) => {
    try {
      await fetch(`/api/projects/${projectId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'view' })
      });
    } catch (error) {
      console.warn('فشل في تسجيل المشاهدة:', error);
    }
  };

  // إدارة الإعجاب
  const handleLike = async (projectId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await fetch(`/api/projects/${projectId}/interactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'like', action: 'toggle' })
      });

      if (response.ok) {
        const data = await response.json();

        // تحديث الحالة المحلية
        setLikedProjects(prev => {
          const newSet = new Set(prev);
          if (data.isLiked) {
            newSet.add(projectId);
          } else {
            newSet.delete(projectId);
          }
          return newSet;
        });

        // تحديث العداد
        setProjects(prev => prev.map(p => 
          p.id === projectId ? { ...p, likes: data.newCount } : p
        ));

        // تحديث التفاعلات
        setProjectInteractions(prev => {
          const newMap = new Map(prev);
          const current = newMap.get(projectId) || {};
          newMap.set(projectId, { ...current, likes: data.newCount, isLiked: data.isLiked });
          return newMap;
        });
      }
    } catch (error) {
      console.error('خطأ في الإعجاب:', error);
    }
  };

  // مشاركة المشروع
  const handleShare = async (project: Project, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const url = `${window.location.origin}/portfolio/${project.id}`;
    const text = `شاهد هذا المشروع الرائع: ${project.title}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: project.title, text, url });
      } catch (error) {
        console.log('تم إلغاء المشاركة');
      }
    } else {
      // نسخ الرابط
      await navigator.clipboard.writeText(url);
      // يمكن إضافة إشعار هنا
    }
  };

  // Effects
  useEffect(() => {
    fetchProjects(true);
  }, [selectedCategory, sortBy, searchTerm]);

  useEffect(() => {
    if (searchTerm) {
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
    } else {
      setFilteredProjects(projects);
    }
  }, [projects, searchTerm]);

  // التعامل مع تغيير المرشحات
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    updateURL({ category, page: '1' });
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
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
      setTimeout(() => fetchProjects(false), 100);
    }
  };

  const getMainMedia = (project: Project) => {
    return project.mediaItems?.[0];
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'م';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'ك';
    return num.toString();
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600">جاري تحميل معرض الأعمال...</p>
        </motion.div>
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
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Title and Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              معرض أعمال محترفين الديار العالمية
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              اكتشف أكثر من {formatNumber(stats.total)} مشروع متميز في جدة والمناطق المحيطة
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-blue-50 rounded-lg p-3 cursor-pointer"
              >
                <div className="text-2xl font-bold text-blue-600">{formatNumber(stats.total)}+</div>
                <div className="text-sm text-blue-800">مشروع ناجح</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-green-50 rounded-lg p-3 cursor-pointer"
              >
                <div className="text-2xl font-bold text-green-600">{stats.categories.length}</div>
                <div className="text-sm text-green-800">خدمات متخصصة</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-purple-50 rounded-lg p-3 cursor-pointer"
              >
                <div className="text-2xl font-bold text-purple-600">15</div>
                <div className="text-sm text-purple-800">عام خبرة</div>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-orange-50 rounded-lg p-3 cursor-pointer"
              >
                <div className="text-2xl font-bold text-orange-600">{formatNumber(stats.featured)}</div>
                <div className="text-sm text-orange-800">مشروع مميز</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <div className="space-y-4">
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-2xl mx-auto"
            >
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="ابحث في المشاريع... (العنوان، الوصف، الموقع، الكلمات المفتاحية)"
                className="pr-12 text-lg py-3 rounded-full border-2 border-gray-300 focus:border-blue-500 transition-all duration-200"
              />
            </motion.div>

            {/* Filters Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.div key={category.value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleCategoryChange(category.value)}
                      className="rounded-full transition-all duration-200"
                    >
                      <span className="mr-2">{category.icon}</span>
                      {category.label}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Sort and View Options */}
              <div className="flex items-center gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className={`mb-8 ${viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
                : 'space-y-6'
              }`}>
                {filteredProjects.map((project, index) => {
                  const mainMedia = getMainMedia(project);
                  const interactions = projectInteractions.get(project.id) || {};
                  const isLiked = likedProjects.has(project.id);

                  return viewMode === 'grid' ? (
                    // Grid View
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                    >
                      {/* Project Image/Video */}
                      <div className="relative aspect-square group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                        <Link 
                          href={`/portfolio/${project.id}`}
                          onClick={() => registerView(project.id)}
                        >
                          {mainMedia ? (
                            <>
                              {mainMedia.type === 'IMAGE' ? (
                                <Image
                                  src={mainMedia.src}
                                  alt={mainMedia.alt || project.title}
                                  fill
                                  className="object-cover"
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
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div 
                                      whileHover={{ scale: 1.1 }}
                                      className="bg-black/50 backdrop-blur-sm rounded-full p-3"
                                    >
                                      <Play className="w-8 h-8 text-white" />
                                    </motion.div>
                                  </div>
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                              <Camera className="w-16 h-16 text-gray-400" />
                            </div>
                          )}
                        </Link>

                        {/* Media Count */}
                        {project.mediaCount > 1 && (
                          <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            {project.mediaCount}
                          </div>
                        )}

                        {/* Featured Badge */}
                        {project.featured && (
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                          >
                            <Star className="w-3 h-3" />
                            مميز
                          </motion.div>
                        )}

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleLike(project.id, e)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                              isLiked 
                                ? 'bg-red-500 text-white' 
                                : 'bg-white/80 text-gray-700 hover:bg-red-50 hover:text-red-500'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => handleShare(project, e)}
                            className="p-2 rounded-full bg-white/80 text-gray-700 hover:bg-blue-50 hover:text-blue-500 backdrop-blur-sm transition-colors"
                          >
                            <Share2 className="w-4 h-4" />
                          </motion.button>
                        </div>

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Project Info */}
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            {project.category}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-500 gap-2">
                            <Clock className="w-3 h-3" />
                            {project.readTime} دقائق
                          </div>
                        </div>

                        <Link 
                          href={`/portfolio/${project.id}`}
                          onClick={() => registerView(project.id)}
                        >
                          <h3 className="font-bold text-gray-900 line-clamp-2 mb-2 text-lg hover:text-blue-600 transition-colors">
                            {project.title}
                          </h3>
                        </Link>

                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MapPin className="w-4 h-4 ml-1" />
                          {project.location}
                        </div>

                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {project.excerpt}
                        </p>

                        {/* Tags */}
                        {project.tags?.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                                #{tag.name}
                              </span>
                            ))}
                            {project.tags.length > 2 && (
                              <span className="text-gray-400 text-xs">+{project.tags.length - 2}</span>
                            )}
                          </div>
                        )}

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-3">
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <Eye className="w-4 h-4" />
                              {formatNumber(interactions.views || project.views)}
                            </motion.span>
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500' : ''}`} />
                              {formatNumber(interactions.likes || project.likes)}
                            </motion.span>
                            <motion.span 
                              whileHover={{ scale: 1.05 }}
                              className="flex items-center gap-1 cursor-pointer"
                            >
                              <MessageCircle className="w-4 h-4" />
                              {formatNumber(interactions.comments || project.commentsCount)}
                            </motion.span>
                          </div>

                          {project.rating > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span>{project.rating.toFixed(1)}</span>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <Button asChild className="w-full group">
                          <Link 
                            href={`/portfolio/${project.id}`}
                            onClick={() => registerView(project.id)}
                          >
                            عرض التفاصيل
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    // List View
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex gap-6">
                        {/* Thumbnail */}
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <Link 
                            href={`/portfolio/${project.id}`}
                            onClick={() => registerView(project.id)}
                          >
                            {mainMedia ? (
                              mainMedia.type === 'IMAGE' ? (
                                <Image
                                  src={mainMedia.src}
                                  alt={mainMedia.alt || project.title}
                                  fill
                                  className="object-cover hover:scale-110 transition-transform duration-300"
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
                          </Link>
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

                            <div className="flex items-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleLike(project.id, e)}
                                className={`p-2 rounded-full transition-colors ${
                                  isLiked 
                                    ? 'bg-red-50 text-red-500' 
                                    : 'bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={(e) => handleShare(project, e)}
                                className="p-2 rounded-full bg-gray-50 text-gray-500 hover:bg-blue-50 hover:text-blue-500 transition-colors"
                              >
                                <Share2 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>

                          <Link 
                            href={`/portfolio/${project.id}`}
                            onClick={() => registerView(project.id)}
                          >
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                              {project.title}
                            </h3>
                          </Link>

                          <div className="flex items-center text-sm text-gray-600 mb-3">
                            <MapPin className="w-4 h-4 ml-1" />
                            {project.location}
                            <span className="mx-2">•</span>
                            <Clock className="w-4 h-4 ml-1" />
                            {project.readTime} دقائق قراءة
                          </div>

                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {project.excerpt}
                          </p>

                          {/* Stats and CTA */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {formatNumber(interactions.views || project.views)}
                              </span>
                              <span className="flex items-center gap-1">
                                <Heart className={`w-4 h-4 ${isLiked ? 'text-red-500' : ''}`} />
                                {formatNumber(interactions.likes || project.likes)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4" />
                                {formatNumber(interactions.comments || project.commentsCount)}
                              </span>
                            </div>

                            <Button asChild>
                              <Link 
                                href={`/portfolio/${project.id}`}
                                onClick={() => registerView(project.id)}
                              >
                                عرض التفاصيل
                                <ArrowLeft className="w-4 h-4 mr-2" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Load More */}
              {hasMore && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
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
                      <>
                        <Zap className="w-5 h-5 ml-2" />
                        تحميل المزيد
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}