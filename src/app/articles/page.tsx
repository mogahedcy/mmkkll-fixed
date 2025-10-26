'use client';

import { useState, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen, TrendingUp, Eye, Heart, Clock, Tag, Star, Brain, Zap, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge'; // Assuming Badge component is available
import { allArticles as newArticles } from '@/data/all-articles';

// بيانات المقالات الموسعة والشاملة
const legacyArticles = [
  {
    id: 1,
    slug: 'best-car-shades-jeddah-2024',
    title: 'أفضل أنواع مظلات السيارات في جدة 2024',
    excerpt: 'دليل شامل لاختيار أفضل مظلة لسيارتك في مناخ جدة الساحلي. تعرف على المواد والتصاميم المختلفة ونصائح الاختيار.',
    category: 'مظلات سيارات',
    author: 'فريق محترفين الديار العالمية',
    authorAvatar: 'https://ui-avatars.com/api/?name=فريق+محترفين+الديار+العالمية&background=0f172a&color=fff',
    date: '15 نوفمبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/mazallat-1.webp',
    tags: ['مظلات', 'سيارات', 'جدة', 'دليل'],
    featured: true,
    views: 1250,
    likes: 89,
    rating: 4.8,
    commentsCount: 12,
    keywords: ['مظلات سيارات', 'حماية السيارات', 'المناخ الساحلي', 'جودة المواد']
  },
  {
    id: 2,
    slug: 'wooden-pergola-maintenance-coastal-climate',
    title: 'كيفية صيانة البرجولة الخشبية في المناخ الساحلي',
    excerpt: 'نصائح مهمة للحفاظ على برجولتك الخشبية من آثار الرطوبة والملوحة في جدة. جدول صيانة شهري وسنوي.',
    category: 'برجولات',
    author: 'المهندس أحمد الديار',
    authorAvatar: 'https://ui-avatars.com/api/?name=أحمد+الديار&background=059669&color=fff',
    date: '10 نوفمبر 2024',
    readTime: '4 دقائق',
    image: '/uploads/pergola-1.jpg',
    tags: ['برجولات', 'صيانة', 'خشب', 'نصائح'],
    featured: false,
    views: 890,
    likes: 67,
    rating: 4.6,
    commentsCount: 8,
    keywords: ['برجولات خشبية', 'صيانة الحدائق', 'المناخ الرطب', 'العناية بالخشب']
  },
  {
    id: 3,
    slug: 'sandwich-panel-thermal-insulation-saudi',
    title: 'ساندوتش بانل: الحل الأمثل للعزل الحراري في السعودية',
    excerpt: 'لماذا يعتبر الساندوتش بانل الخيار الأول للمباني التجارية والصناعية؟ فوائد العزل الحراري وتوفير الطاقة.',
    category: 'ساندوتش بانل',
    author: 'المهندس سعد التقني',
    authorAvatar: 'https://ui-avatars.com/api/?name=سعد+التقني&background=dc2626&color=fff',
    date: '5 نوفمبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/sandwich-panel-1.jpg',
    tags: ['ساندوتش بانل', 'عزل حراري', 'توفير طاقة'],
    featured: true,
    views: 2100,
    likes: 145,
    rating: 4.9,
    commentsCount: 18,
    keywords: ['عزل حراري', 'مباني تجارية', 'توفير الطاقة', 'ساندوتش بانل']
  },
  {
    id: 4,
    slug: 'smart-fences-privacy-elegance',
    title: 'السواتر الذكية: خصوصية وأناقة في آن واحد',
    excerpt: 'تعرف على أحدث أنواع السواتر التي تجمع بين الجمال والوظيفة. سواتر متحركة وأتوماتيكية وصديقة للبيئة.',
    category: 'سواتر',
    author: 'مصمم السواتر عمر',
    authorAvatar: 'https://ui-avatars.com/api/?name=عمر&background=ea580c&color=fff',
    date: '25 أكتوبر 2024',
    readTime: '3 دقائق',
    image: '/uploads/sawater-1.webp',
    tags: ['سواتر', 'خصوصية', 'تقنية ذكية'],
    featured: true,
    views: 1890,
    likes: 127,
    rating: 4.8,
    commentsCount: 22,
    keywords: ['سواتر ذكية', 'خصوصية المنزل', 'التحكم الآلي', 'تقنيات حديثة']
  },
  {
    id: 5,
    slug: 'royal-tents-luxury-occasions-guide',
    title: 'خيام ملكية فاخرة: دليل التصميم للمناسبات الخاصة',
    excerpt: 'كيف تختار الخيمة الملكية المثالية لمناسباتك؟ أنواع الأقمشة والتصاميم والإكسسوارات لكل مناسبة.',
    category: 'خيام ملكية',
    author: 'خبير الضيافة محمد',
    authorAvatar: 'https://ui-avatars.com/api/?name=محمد&background=7c3aed&color=fff',
    date: '20 أكتوبر 2024',
    readTime: '6 دقائق',
    image: '/uploads/khayyam-1.webp',
    tags: ['خيام ملكية', 'مناسبات', 'فخامة'],
    featured: false,
    views: 980,
    likes: 73,
    rating: 4.7,
    commentsCount: 15,
    keywords: ['خيام فاخرة', 'مناسبات اجتماعية', 'التراث السعودي', 'ضيافة']
  },
  {
    id: 6,
    slug: 'traditional-hair-houses-heritage-modern',
    title: 'بيوت الشعر التراثية: جمع الأصالة والحداثة',
    excerpt: 'كيف تحافظ على الطابع التراثي لبيت الشعر مع إضافة لمسات عصرية؟ مواد تقليدية بتقنيات حديثة.',
    category: 'بيوت شعر',
    author: 'أستاذ التراث عبدالله',
    authorAvatar: 'https://ui-avatars.com/api/?name=عبدالله&background=16a34a&color=fff',
    date: '18 أكتوبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/byoot-shaar-1.webp',
    tags: ['بيوت شعر', 'تراث', 'أصالة'],
    featured: false,
    views: 1340,
    likes: 91,
    rating: 4.5,
    commentsCount: 19,
    keywords: ['التراث السعودي', 'بيوت شعر', 'ثقافة بدوية', 'تصميم تراثي']
  },
  {
    id: 7,
    slug: 'garden-design-trends-saudi-2024',
    title: 'اتجاهات تصميم الحدائق في المملكة 2024',
    excerpt: 'أحدث صيحات تنسيق الحدائق المناسبة للمناخ السعودي. نباتات محلية وأنظمة ري ذكية وتصاميم مستدامة.',
    category: 'تنسيق حدائق',
    author: 'أخصائي التنسيق فيصل',
    authorAvatar: 'https://ui-avatars.com/api/?name=فيصل&background=16a34a&color=fff',
    date: '1 نوفمبر 2024',
    readTime: '5 دقائق',
    image: '/uploads/landscaping-1.webp',
    tags: ['تنسيق حدائق', 'نباتات محلية', 'تصميم'],
    featured: false,
    views: 1560,
    likes: 98,
    rating: 4.7,
    commentsCount: 15,
    keywords: ['تنسيق حدائق', 'نباتات صحراوية', 'ري ذكي', 'استدامة']
  },
  {
    id: 8,
    slug: 'renovation-secrets-modern-techniques',
    title: 'أسرار ترميم الملحقات بأحدث التقنيات',
    excerpt: 'كيف تعيد الحياة لملحقاتك القديمة؟ تقنيات حديثة في الترميم والعزل وإضافة اللمسات العصرية.',
    category: 'ترميم',
    author: 'مقاول الترميم خالد',
    authorAvatar: 'https://ui-avatars.com/api/?name=خالد&background=7c3aed&color=fff',
    date: '28 أكتوبر 2024',
    readTime: '4 دقائق',
    image: '/uploads/renovation-1.jpg',
    tags: ['ترميم', 'ملحقات', 'تجديد'],
    featured: false,
    views: 750,
    likes: 52,
    rating: 4.5,
    commentsCount: 6,
    keywords: ['ترميم منازل', 'تطوير ملحقات', 'تقنيات حديثة', 'عزل متطور']
  },
  {
    id: 9,
    slug: 'common-shade-installation-mistakes',
    title: 'أخطاء شائعة في تركيب المظلات وكيفية تجنبها',
    excerpt: 'أهم الأخطاء التي يقع فيها المقاولون عند تركيب المظلات وتأثيرها على المتانة والسلامة. نصائح من الخبراء.',
    category: 'مظلات سيارات',
    author: 'مدير التركيبات طارق',
    authorAvatar: 'https://ui-avatars.com/api/?name=طارق&background=dc2626&color=fff',
    date: '15 أكتوبر 2024',
    readTime: '8 دقائق',
    image: '/uploads/mazallat-2.webp',
    tags: ['تركيب', 'أخطاء', 'سلامة'],
    featured: false,
    views: 1120,
    likes: 84,
    rating: 4.8,
    commentsCount: 10,
    keywords: ['أخطاء تركيب المظلات', 'تركيب مظلات آمن', 'سلامة المظلات', 'تركيب احترافي جدة']
  }
];

// دمج المقالات القديمة والجديدة
const articles = [...legacyArticles, ...newArticles.map((article: any) => ({
  ...article,
  date: article.publishedDate || new Date().toISOString(),
  image: article.image || '/uploads/mazallat-1.webp',
  authorAvatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author)}&background=0f172a&color=fff`,
  commentsCount: 0
}))];

const categories = [
  'الكل',
  'مظلات سيارات',
  'برجولات',
  'ساندوتش بانل',
  'تنسيق حدائق',
  'ترميم',
  'سواتر',
  'خيام ملكية',
  'بيوت شعر'
];

export default function ArticlesPage() {
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);

    if (!query.trim()) {
      if (selectedCategory === 'الكل') {
        setFilteredArticles(articles);
      } else {
        setFilteredArticles(articles.filter(article => article.category === selectedCategory));
      }
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const results = articles.filter(article => {
      const searchableText = `${article.title} ${article.excerpt} ${article.category} ${article.author} ${article.tags.join(' ')} ${article.keywords.join(' ')}`.toLowerCase();
      return searchTerms.some(term => searchableText.includes(term));
    });

    if (selectedCategory !== 'الكل') {
      setFilteredArticles(results.filter(article => article.category === selectedCategory));
    } else {
      setFilteredArticles(results);
    }
  }, [selectedCategory]);

  const handleCategoryFilter = useCallback((category: string) => {
    setSelectedCategory(category);

    let baseArticles = articles;
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().split(' ');
      baseArticles = articles.filter(article => {
        const searchableText = `${article.title} ${article.excerpt} ${article.category} ${article.author} ${article.tags.join(' ')} ${article.keywords.join(' ')}`.toLowerCase();
        return searchTerms.some(term => searchableText.includes(term));
      });
    }

    if (category === 'الكل') {
      setFilteredArticles(baseArticles);
    } else {
      setFilteredArticles(baseArticles.filter(article => article.category === category));
    }
  }, [searchQuery]);

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Enhanced Header Section */}
        <section className="py-20 bg-gradient-to-r from-primary via-accent to-primary text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              مدونة محترفين الديار العالمية
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90 mb-8">
              اكتشف أحدث المقالات والنصائح المتخصصة في مجال المظلات والبرجولات والساندوتش بانل من خبراء محترفين الديار العالمية
            </p>

            {/* AI Search Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
              <Brain className="w-4 h-4 ml-2" />
              مدعوم بالذكاء الاصطناعي
              <Zap className="w-4 h-4 mr-2 text-yellow-300" />
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Search and Filter Section */}
          <div className="mb-12">
            {/* Search Input */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-6 py-4 pr-12 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <Brain className="w-6 h-6 text-accent" />
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-accent/10 hover:text-accent border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          {featuredArticles.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-primary flex items-center">
                  <TrendingUp className="w-8 h-8 text-accent ml-3" />
                  المقالات المميزة
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                      {/* Article Image */}
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-accent to-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                          مميز
                        </div>
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full text-sm font-medium text-primary shadow-lg">
                          {article.category}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                          {article.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center">
                            <img
                              src={article.authorAvatar}
                              alt={article.author}
                              className="w-8 h-8 rounded-full ml-2"
                            />
                            <span>{article.author}</span>
                          </div>
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 ml-1" />
                              {article.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 ml-1" />
                              {article.readTime}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-5">
                          <div className="flex items-center space-x-4 space-x-reverse">
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 ml-1" />
                              {article.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-4 h-4 ml-1" />
                              {article.likes}
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(article.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                            <span className="mr-1">({article.rating})</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {article.tags.slice(0, 3).map((tag: string, index: number) => (
                            <Badge key={`article-tag-${article.id}-${tag}-${index}`} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Read More Button */}
                        <Button className="w-full group-hover:bg-accent group-hover:text-white transition-all duration-300 font-medium">
                          <span>اقرأ المقال كاملاً</span>
                          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* All Articles Grid */}
          {regularArticles.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-primary mb-8 flex items-center">
                <BookOpen className="w-8 h-8 text-accent ml-3" />
                جميع المقالات
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <Link 
                    key={article.id} 
                    href={`/articles/${article.slug}`}
                    className="group"
                  >
                    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          <div className="flex items-center">
                            <User className="w-3 h-3 ml-1" />
                            {article.author}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 ml-1" />
                            {article.readTime}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="flex items-center">
                              <Eye className="w-3 h-3 ml-1" />
                              {article.views}
                            </div>
                            <div className="flex items-center">
                              <Heart className="w-3 h-3 ml-1" />
                              {article.likes}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current ml-1" />
                            {article.rating}
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredArticles.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">لا توجد مقالات</h3>
              <p className="text-gray-600 mb-8">لم نجد أي مقالات تطابق معايير البحث الخاصة بك.</p>
              <Button onClick={() => {
                setSearchQuery('');
                setSelectedCategory('الكل');
                setFilteredArticles(articles);
              }}>
                عرض جميع المقالات
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}