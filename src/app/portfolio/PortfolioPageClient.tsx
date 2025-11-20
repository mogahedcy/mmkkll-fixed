'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import WatermarkOverlay from '@/components/WatermarkOverlay';
import ProtectedMedia from '@/components/ProtectedMedia';
import { isCloudinaryUrl, extractPublicIdFromUrl } from '@/lib/cloudinary-helpers';
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
  Zap,
  X,
  ChevronDown,
  ArrowUpRight,
  Sparkles,
  Target,
  Users
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
  { value: 'all', label: 'جميع المشاريع', icon: '🏠' },
  { value: 'مظلات سيارات', label: 'مظلات سيارات', icon: '🚗' },
  { value: 'سواتر', label: 'سواتر', icon: '🛡️' },
  { value: 'خيم ملكية', label: 'خيم ملكية', icon: '⛺' },
  { value: 'بيوت شعر ملكي', label: 'بيوت شعر ملكي', icon: '🏕️' },
  { value: 'برجولات', label: 'برجولات', icon: '🌿' },
  { value: 'تنسيق حدائق', label: 'تنسيق حدائق', icon: '🌺' },
  { value: 'هناجر', label: 'هناجر', icon: '🏢' },
  { value: 'شبوك', label: 'شبوك', icon: '🔲' },
  { value: 'قراميد', label: 'قراميد', icon: '🏛️' },
  { value: 'ساندوتش بانل', label: 'ساندوتش بانل', icon: '📦' }
];

const sortOptions = [
  { value: 'newest', label: 'الأحدث أولاً' },
  { value: 'oldest', label: 'الأقدم أولاً' },
  { value: 'featured', label: 'المميزة أولاً' },
  { value: 'popular', label: 'الأكثر مشاهدة' },
  { value: 'rating', label: 'الأعلى تقييماً' },
  { value: 'alphabetical', label: 'أبجدياً' }
];

// تحسين دالة تنسيق الأرقام
const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}م`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}ك`;
  return num.toString();
};

// دالة محسنة لتأخير البحث
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export default function PortfolioPageClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, featured: 0, categories: [] });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all');
  const [sortBy, setSortBy] = useState(searchParams?.get('sort') || 'newest');
  const [showFilters, setShowFilters] = useState(false);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const loadingRef = useRef<HTMLDivElement>(null);

  // جلب المشاريع مع تحسينات الأداء
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        limit: '50',
        sort: sortBy,
        ...(selectedCategory !== 'all' && { category: selectedCategory }),
        ...(debouncedSearchTerm && { search: debouncedSearchTerm })
      });
      
      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects || []);
        setStats({
          total: data.stats?.total || data.projects?.length || 0,
          featured: data.stats?.featured || 0,
          categories: data.stats?.categories || []
        });
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [debouncedSearchTerm, selectedCategory, sortBy]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // تحديث URL عند تغيير الفلاتر
  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearchTerm) params.set('search', debouncedSearchTerm);
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (sortBy !== 'newest') params.set('sort', sortBy);
    
    const newUrl = params.toString() ? `?${params}` : '/portfolio';
    router.replace(newUrl, { scroll: false });
  }, [debouncedSearchTerm, selectedCategory, sortBy, router]);

  // معالجات الأحداث
  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  // مصفوفة البيانات المحسنة
  const filteredAndSortedProjects = useMemo(() => {
    return projects;
  }, [projects]);

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">جاري تحضير معرض أعمالنا المتميز</h2>
          <p className="text-gray-600">نقوم بتحميل أفضل مشاريعنا لعرضها عليك</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Premium Header Section */}
      <div className="relative bg-white/95 border-b border-gray-200/80 backdrop-blur-md shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="mb-8">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
              >
                <Sparkles className="w-5 h-5" />
                معرض أعمال محترفين الديار العالمية
                <Target className="w-5 h-5" />
              </motion.div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                معرض أعمال محترفين الديار العالمية
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-2">
                إبداع وجودة في كل مشروع
              </span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 mb-10 max-w-4xl mx-auto leading-relaxed px-4">
              استكشف أكثر من <span className="font-black text-blue-600">{formatNumber(stats.total)}</span> مشروع متميز
              ينتشر في جدة والمناطق المحيطة، كل مشروع يحكي قصة نجاح
            </p>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mb-12 px-4">
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl font-black">{formatNumber(stats.total)}+</div>
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-blue-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-blue-100 font-bold text-base sm:text-lg">مشروع ناجح</div>
                  <div className="text-blue-200 text-xs sm:text-sm mt-1 sm:mt-2">في جميع أنحاء المملكة</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-green-500 to-green-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl font-black">{stats.categories.length}</div>
                    <Target className="w-8 h-8 sm:w-10 sm:h-10 text-green-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-green-100 font-bold text-base sm:text-lg">خدمة متخصصة</div>
                  <div className="text-green-200 text-xs sm:text-sm mt-1 sm:mt-2">لكافة احتياجاتكم</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl font-black">15+</div>
                    <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-purple-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-purple-100 font-bold text-base sm:text-lg">عام خبرة</div>
                  <div className="text-purple-200 text-xs sm:text-sm mt-1 sm:mt-2">في السوق السعودي</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="text-3xl sm:text-4xl font-black">{formatNumber(stats.featured)}</div>
                    <Star className="w-8 h-8 sm:w-10 sm:h-10 text-orange-200 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-orange-100 font-bold text-base sm:text-lg">مشروع مميز</div>
                  <div className="text-orange-200 text-xs sm:text-sm mt-1 sm:mt-2">حاز على جوائز</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Advanced Search and Filters */}
          <div className="space-y-8">
            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative max-w-4xl mx-auto"
            >
              <div className="relative group">
                <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 w-7 h-7 transition-all duration-300" />
                <Input
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="ابحث في معرض أعمالنا المتميز... (اكتب اسم المشروع، النوع، أو المكان)"
                  className="pr-20 pl-8 py-5 text-xl rounded-3xl border-3 border-gray-200 bg-white/90 backdrop-blur-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-xl focus:shadow-2xl placeholder:text-gray-400"
                />
                {searchTerm && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => handleSearchChange('')}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Premium Categories */}
            <div className="text-center px-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-3">
                <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
                اختر تخصصك المفضل
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
              </h3>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center max-w-6xl mx-auto">
                {categories.map((category) => (
                  <motion.div key={category.value} whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant={selectedCategory === category.value ? 'default' : 'outline'}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`rounded-xl sm:rounded-2xl transition-all duration-300 px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 font-bold shadow-lg hover:shadow-2xl text-sm md:text-base
                        ${selectedCategory === category.value 
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-2xl transform scale-105' 
                          : 'bg-white/90 backdrop-blur-sm border-2 sm:border-3 border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800 hover:shadow-xl'
                        }`}
                    >
                      <span className="text-xl md:text-2xl ml-2 md:ml-3">{category.icon}</span>
                      <span className="hidden sm:inline">{category.label}</span>
                      <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                      {selectedCategory === category.value && (
                        <CheckCircle className="mr-2 md:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Advanced Controls */}
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 items-stretch lg:items-center justify-between bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-gray-200 shadow-xl">
              <div className="flex items-center gap-3 sm:gap-6 w-full lg:w-auto">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 lg:flex-initial">
                  <label className="text-sm sm:text-base md:text-lg font-bold text-gray-800 flex items-center gap-1 sm:gap-2 whitespace-nowrap">
                    <SortAsc className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="hidden sm:inline">ترتيب النتائج:</span>
                    <span className="sm:hidden">ترتيب:</span>
                  </label>
                  <div className="relative flex-1 lg:flex-initial">
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-white border-2 border-gray-200 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 appearance-none pr-8 sm:pr-10 md:pr-12 cursor-pointer transition-all duration-300 font-medium"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 w-full lg:w-auto justify-between lg:justify-end">
                <span className="text-sm sm:text-base md:text-lg font-bold text-gray-700 whitespace-nowrap hidden sm:inline">طريقة العرض:</span>
                <div className="flex bg-gray-100 rounded-xl sm:rounded-2xl p-1 border border-gray-200">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('grid')}
                    className={`rounded-lg sm:rounded-xl transition-all duration-300 px-4 sm:px-4 md:px-6 py-2.5 sm:py-2.5 md:py-3 font-medium text-sm
                      ${viewMode === 'grid' 
                        ? 'bg-white shadow-lg text-blue-600 border-2 border-blue-200' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }`}
                  >
                    <Grid3X3 className="w-5 h-5 ml-2" />
                    <span className="hidden sm:inline">شبكة</span>
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    onClick={() => setViewMode('list')}
                    className={`rounded-lg sm:rounded-xl transition-all duration-300 px-4 sm:px-4 md:px-6 py-2.5 sm:py-2.5 md:py-3 font-medium text-sm
                      ${viewMode === 'list' 
                        ? 'bg-white shadow-lg text-blue-600 border-2 border-blue-200' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                      }`}
                  >
                    <List className="w-5 h-5 ml-2" />
                    <span className="hidden sm:inline">قائمة</span>
                  </Button>
                </div>
                
                <div className="text-sm sm:text-base md:text-lg font-bold text-gray-600 bg-gray-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl whitespace-nowrap">
                  {filteredAndSortedProjects.length} نتيجة
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              >
                <Loader2 className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">جاري تحميل المشاريع المميزة</h3>
              <p className="text-gray-600">يرجى الانتظار قليلاً...</p>
            </motion.div>
          ) : filteredAndSortedProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4">لا توجد مشاريع مطابقة</h3>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8">جرب تغيير معايير البحث أو الفلاتر المختارة</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('newest');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold"
              >
                إعادة تعيين البحث
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="projects"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8' 
                : 'space-y-6'
              }
            >
              {filteredAndSortedProjects.map((project, index) => {
                const mainMedia = project.mediaItems?.[0];
                
                // إنشاء thumbnail للفيديو من Cloudinary تلقائياً
                const getVideoThumbnail = (videoSrc: string): string => {
                  if (!videoSrc) return '';
                  
                  if (isCloudinaryUrl(videoSrc)) {
                    const publicId = extractPublicIdFromUrl(videoSrc);
                    if (publicId) {
                      return videoSrc.replace('/video/upload/', '/video/upload/w_600,h_400,c_fill,f_jpg,q_auto/');
                    }
                  }
                  
                  return videoSrc;
                };
                
                const mediaSrc = mainMedia?.type === 'VIDEO' 
                  ? (mainMedia.thumbnail || getVideoThumbnail(mainMedia.src))
                  : mainMedia?.src;
                
                return viewMode === 'grid' ? (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/portfolio/${project.slug || project.id}`}>
                      <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 hover:scale-105">
                        {/* Enhanced Image Container */}
                        <ProtectedMedia className="relative aspect-[4/3] overflow-hidden">
                          {mainMedia ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={mediaSrc || '/images/placeholder.jpg'}
                                alt={mainMedia.alt || project.title}
                                fill
                                className="object-cover transition-all duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                priority={index < 8}
                                loading={index < 8 ? 'eager' : 'lazy'}
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                              />
                              
                              {/* Watermark Overlay */}
                              <WatermarkOverlay position="bottom-right" opacity={0.4} size="small" />
                              
                              {/* Video Play Icon Overlay */}
                              {mainMedia.type === 'VIDEO' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                  <div className="bg-white/90 rounded-full p-4 shadow-2xl backdrop-blur-sm">
                                    <Play className="w-8 h-8 text-blue-600 fill-blue-600" />
                                  </div>
                                </div>
                              )}
                              
                              {/* Enhanced Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                              
                              {/* Premium Badges */}
                              <div className="absolute top-4 right-4 flex gap-2">
                                {project.featured && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                                  >
                                    <Star className="w-3 h-3" />
                                    مميز
                                  </motion.div>
                                )}
                                {mainMedia.type === 'VIDEO' && (
                                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                                    <Video className="w-3 h-3" />
                                    فيديو
                                  </div>
                                )}
                                {project.mediaItems?.length > 1 && (
                                  <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                                    <Camera className="w-3 h-3" />
                                    {project.mediaItems.length}
                                  </div>
                                )}
                              </div>

                              {/* Premium Hover Actions */}
                              <div className="absolute bottom-4 right-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                                <div className="flex items-center justify-between text-white">
                                  <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1">
                                      <Eye className="w-4 h-4" />
                                      {formatNumber(project.views || 0)}
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Heart className="w-4 h-4" />
                                      {formatNumber(project.likes || 0)}
                                    </div>
                                  </div>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 bg-white/20 rounded-full backdrop-blur-sm"
                                  >
                                    <ArrowUpRight className="w-5 h-5" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <Camera className="w-12 h-12 text-gray-400" />
                            </div>
                          )}
                        </ProtectedMedia>

                        {/* Enhanced Content */}
                        <div className="p-6">
                          <div className="mb-3">
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 mb-2">
                              {project.category}
                            </Badge>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                            {project.title}
                          </h3>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                            {project.description}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {project.location}
                            </div>
                            {project.rating > 0 && (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="font-medium">{project.rating}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {project.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-4">
                              {project.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          {/* Stats */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {formatNumber(project.views || 0)}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" />
                                {formatNumber(project._count?.comments || 0)}
                              </span>
                            </div>
                            <div className="text-blue-600 font-medium text-sm group-hover:underline">
                              مشاهدة التفاصيل ←
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ) : (
                  // List View - Enhanced
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <Link href={`/portfolio/${project.slug || project.id}`}>
                      <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center transform hover:-translate-y-1">
                        {/* Image */}
                        {mainMedia && (
                          <ProtectedMedia className="relative w-full sm:w-32 h-48 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                            <Image
                              src={mainMedia.type === 'VIDEO' ? (mainMedia.thumbnail || mainMedia.src) : mainMedia.src}
                              alt={mainMedia.alt || project.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-110"
                              sizes="128px"
                            />
                            {/* Watermark Overlay */}
                            <WatermarkOverlay position="bottom-right" opacity={0.4} size="small" />
                            {/* Video Play Icon Overlay */}
                            {mainMedia.type === 'VIDEO' && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="bg-white/90 rounded-full p-2 shadow-lg">
                                  <Play className="w-5 h-5 text-blue-600 fill-blue-600" />
                                </div>
                              </div>
                            )}
                          </ProtectedMedia>
                        )}
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className="bg-blue-100 text-blue-800">
                                  {project.category}
                                </Badge>
                                {project.featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800">
                                    <Star className="w-3 h-3 mr-1" />
                                    مميز
                                  </Badge>
                                )}
                              </div>
                              
                              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {project.title}
                              </h3>
                              
                              <p className="text-sm sm:text-base text-gray-600 mb-3 line-clamp-2">
                                {project.description}
                              </p>
                              
                              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                                  <span className="truncate">{project.location}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {formatNumber(project.views || 0)}
                                </span>
                                <span className="flex items-center gap-1 hidden sm:flex">
                                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                                  {formatNumber(project._count?.comments || 0)}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:underline text-sm sm:text-base">
                              <span className="hidden sm:inline">مشاهدة</span>
                              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Loading Trigger for Infinite Scroll */}
      <div ref={loadingRef} className="h-20" />
    </div>
  );
}