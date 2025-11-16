'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, ThumbsUp, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateCategoryBasedAlt, generateImageObjectSchema } from '@/lib/image-seo-utils';
import WatermarkOverlay from '@/components/WatermarkOverlay';

interface Project {
  id: string | number;
  title: string;
  description: string | null;
  slug: string | null;
  featured: boolean;
  category?: string;
  location?: string;
  media_items: Array<{
    src: string;
    alt: string | null;
  }>;
  _count: {
    project_views: number;
    project_likes: number;
  };
}

interface ProjectsGalleryProps {
  projects: Project[];
  categoryName: string;
}

export default function ProjectsGallery({ projects, categoryName }: ProjectsGalleryProps) {
  if (projects.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
              <Sparkles className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">
              لا توجد مشاريع حالياً
            </h3>
            <p className="text-gray-500">
              سنقوم بإضافة مشاريع {categoryName} قريباً
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">مربوط ديناميكياً</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            معرض أعمالنا في {categoryName}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            اطلع على مشاريعنا المنجزة في مجال {categoryName} بمختلف أنواعها
          </p>
          <div className="inline-flex items-center gap-2 mt-4 text-sm text-accent">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium">{projects.length} مشروع متاح من قاعدة البيانات</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => {
            // توليد alt text محسّن تلقائياً
            const optimizedAlt = project.media_items?.[0]?.alt || 
              generateCategoryBasedAlt(
                project.category || categoryName,
                project.title,
                project.location,
                0
              );

            // إنشاء structured data للصورة
            const imageSchema = project.media_items?.[0] ? generateImageObjectSchema(
              project.media_items[0].src,
              {
                alt: optimizedAlt,
                title: project.title,
                description: project.description || project.title,
                keywords: [project.category || categoryName, project.location || 'جدة', 'محترفين الديار'],
                context: 'project'
              },
              `/portfolio/${project.slug || project.id}`
            ) : null;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Link 
                  href={`/portfolio/${project.slug || project.id}`}
                  className="group block"
                >
                  <div className="bg-white rounded-2xl border-2 border-gray-100 overflow-hidden hover:border-accent hover:shadow-2xl transition-all duration-500">
                    {project.media_items && project.media_items[0] && (
                      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        <Image
                          src={project.media_items[0].src}
                          alt={optimizedAlt}
                          title={project.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        
                        {/* علامة مائية */}
                        <WatermarkOverlay 
                          position="bottom-right"
                          size="small"
                          opacity={0.25}
                        />

                        {project.featured && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="absolute top-4 right-4 bg-gradient-to-r from-accent to-amber-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                          >
                            <Sparkles className="w-4 h-4" />
                            مميز
                          </motion.div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Structured Data للصورة */}
                        {imageSchema && (
                          <script
                            type="application/ld+json"
                            dangerouslySetInnerHTML={{
                              __html: JSON.stringify(imageSchema)
                            }}
                          />
                        )}
                      </div>
                    )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <Eye className="w-4 h-4" />
                          {project._count?.project_views || 0}
                        </motion.span>
                        <motion.span 
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          {project._count?.project_likes || 0}
                        </motion.span>
                      </div>
                      <span className="text-accent font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                        عرض
                        <ExternalLink className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href={`/portfolio?search=${categoryName}`}>
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              عرض جميع مشاريع {categoryName}
              <ExternalLink className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
