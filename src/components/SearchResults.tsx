'use client';

import Link from 'next/link';
import { Calendar, User, ArrowLeft, Eye, Heart, Clock, Tag, Star, Grid, List, Loader2, Layers, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Article {
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
  searchScore?: number;
  href?: string;
  source?: 'article' | 'project';
}

interface SearchResultsProps {
  articles: Article[];
  isLoading: boolean;
  searchQuery: string;
  viewType?: 'grid' | 'list';
}

function highlight(text: string, query: string) {
  if (!query) return text;
  try {
    const parts = text.split(new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-200 px-0.5 rounded">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  } catch {
    return text;
  }
}

export default function SearchResults({ articles, isLoading, searchQuery, viewType = 'grid' }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-accent animate-spin mx-auto mb-4" />
          <p className="text-gray-600">جاري البحث...</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Grid className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">لا توجد نتائج</h3>
        <p className="text-gray-600">لم نجد أي مقالات تطابق معايير البحث الخاصة بك.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">
          نتائج البحث ({articles.length} عنصر)
        </h2>
      </div>

      {/* Articles Grid/List */}
      <div className={`grid ${viewType === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-8`}>
        {articles.map((article) => (
          <Link
            key={`search-result-${article.id}`}
            href={article.href || `/articles/${article.slug}`}
            className="group"
          >
            <article className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              {/* Article/Project Image or FAQ Badge */}
              {article.author === 'سؤال شائع' ? (
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500 rounded-xl">
                      <HelpCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge className="bg-green-500 text-white mb-1">سؤال شائع</Badge>
                      <p className="text-xs text-gray-600">{article.category}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-primary text-white">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4 flex gap-2">
                    {article.source && (
                      <Badge className="bg-black/70 text-white flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {article.source === 'project' ? 'مشروع' : 'مقال'}
                      </Badge>
                    )}
                    {article.featured && (
                      <Badge className="bg-accent text-white">مميز</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {highlight(article.title, searchQuery)}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                  {highlight(article.excerpt, searchQuery)}
                </p>

                {/* Author & Date */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-6 h-6 rounded-full ml-2"
                    />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 ml-1" />
                    {article.readTime}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
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

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={`${article.id}-tag-${index}`}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Read More Button */}
                <Button variant="outline" className="w-full text-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  اقرأ المزيد
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
