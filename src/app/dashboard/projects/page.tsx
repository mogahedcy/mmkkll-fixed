
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Grid3X3, 
  List, 
  Filter,
  Eye,
  Heart,
  MessageCircle,
  Share,
  MoreVertical,
  Trash2,
  Edit,
  Star,
  TrendingUp,
  Camera,
  Video,
  Play,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
  'الكل',
  'مظلات',
  'برجولات', 
  'سواتر',
  'ساندوتش بانل',
  'تنسيق حدائق',
  'خيام ملكية',
  'بيوت شعر',
  'ترميم'
];

export default function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('newest');

  // جلب المشاريع
  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, sortBy]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        ...(selectedCategory !== 'الكل' && { category: selectedCategory }),
        sort: sortBy,
        limit: '50'
      });

      const response = await fetch(`/api/projects?${params}`);
      const data = await response.json();
      
      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('خطأ في جلب المشاريع:', error);
    } finally {
      setLoading(false);
    }
  };

  // حذف مشروع
  const handleDelete = async (projectId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا المشروع؟')) return;

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setProjects(projects.filter(p => p.id !== projectId));
      }
    } catch (error) {
      console.error('خطأ في حذف المشروع:', error);
    }
  };

  // فلترة المشاريع
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  const getMainMedia = (project: Project) => {
    return project.mediaItems?.[0];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600">جاري تحميل المشاريع...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">معرض الأعمال</h1>
              <p className="text-gray-600 mt-1">إدارة وعرض مشاريع محترفين الديار العالمية</p>
            </div>
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Link href="/dashboard/projects/add" className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                إضافة مشروع جديد
              </Link>
            </Button>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{projects.length}</div>
                <div className="text-sm text-gray-600">إجمالي المشاريع</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {projects.filter(p => p.featured).length}
                </div>
                <div className="text-sm text-gray-600">مشاريع مميزة</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {projects.reduce((sum, p) => sum + p.views, 0)}
                </div>
                <div className="text-sm text-gray-600">إجمالي المشاهدات</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {projects.reduce((sum, p) => sum + p.likes, 0)}
                </div>
                <div className="text-sm text-gray-600">إجمالي الإعجابات</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="البحث في المشاريع..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort and View Options */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="newest">الأحدث</option>
                <option value="oldest">الأقدم</option>
                <option value="popular">الأكثر شعبية</option>
                <option value="featured">المميزة</option>
              </select>

              <div className="flex border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none border-l"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {filteredProjects.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredProjects.map((project) => {
              const mainMedia = getMainMedia(project);
              
              return (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-white">
                  {/* Project Media */}
                  <div className="relative aspect-square group">
                    {mainMedia ? (
                      <>
                        {mainMedia.type === 'IMAGE' ? (
                          <Image
                            src={mainMedia.src}
                            alt={project.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <Camera className="w-16 h-16 text-gray-400" />
                      </div>
                    )}

                    {/* Media Count Badge */}
                    {project.mediaItems?.length > 1 && (
                      <div className="absolute top-4 left-4 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Camera className="w-3 h-3" />
                        {project.mediaItems.length}
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute bottom-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        مميز
                      </div>
                    )}

                    {/* Actions Menu */}
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="bg-black/70 text-white hover:bg-black/80">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem asChild>
                            <Link href={`/portfolio/${project.id}`} className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              عرض
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/dashboard/projects/${project.id}/edit`} className="flex items-center gap-2">
                              <Edit className="w-4 h-4" />
                              تعديل
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDelete(project.id)}
                            className="text-red-600 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            حذف
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Project Content */}
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 line-clamp-1">{project.title}</h3>
                        <p className="text-sm text-gray-600">{project.location}</p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tags?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                          #{tag.name}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-4">
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
                      <span className="text-xs">
                        {new Date(project.completionDate).toLocaleDateString('ar-SA')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد مشاريع</h3>
            <p className="text-gray-600 mb-6">ابدأ بإضافة أول مشروع لك</p>
            <Button asChild>
              <Link href="/dashboard/projects/add">
                <Plus className="w-5 h-5 ml-2" />
                إضافة مشروع جديد
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
