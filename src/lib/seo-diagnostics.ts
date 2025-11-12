/**
 * نظام تشخيص SEO المتقدم
 * يكتشف ويحلل المشاكل الشائعة في SEO ويقدم حلولاً تلقائية
 */

import { prisma } from './prisma';

export interface SEOIssue {
  id: string;
  type: 'broken_link' | 'missing_alt' | 'schema_error' | 'meta_issue' | 'performance' | 'duplicate_content';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affectedUrl: string;
  suggestion: string;
  autoFixable: boolean;
  detectedAt: Date;
  targetId?: string;
  targetType?: 'project' | 'article';
}

export interface SEOAuditResult {
  score: number;
  totalIssues: number;
  criticalIssues: number;
  issues: SEOIssue[];
  strengths: string[];
  recommendations: string[];
  lastAudit: Date;
}

export class SEODiagnostics {
  
  /**
   * فحص الروابط المكسورة في المشاريع والمقالات
   */
  async checkBrokenLinks(): Promise<SEOIssue[]> {
    const issues: SEOIssue[] = [];
    
    try {
      // فحص المشاريع
      const projects = await prisma.projects.findMany({
        where: { status: 'PUBLISHED' },
        select: { id: true, slug: true, description: true }
      });

      for (const project of projects) {
        const content = project.description || '';
        const links = this.extractLinks(content);
        
        for (const link of links) {
          if (this.isInternalLink(link)) {
            const exists = await this.checkInternalLinkExists(link);
            if (!exists) {
              issues.push({
                id: `broken-link-${project.id}-${Date.now()}`,
                type: 'broken_link',
                severity: 'high',
                title: 'رابط داخلي مكسور',
                description: `الرابط "${link}" غير موجود`,
                affectedUrl: `/portfolio/${project.slug}`,
                suggestion: 'تحديث أو حذف الرابط المكسور',
                autoFixable: false,
                detectedAt: new Date()
              });
            }
          }
        }
      }

      // فحص المقالات
      const articles = await prisma.articles.findMany({
        where: { status: 'PUBLISHED' },
        select: { id: true, slug: true, content: true }
      });

      for (const article of articles) {
        const content = article.content || '';
        const links = this.extractLinks(content);
        
        for (const link of links) {
          if (this.isInternalLink(link)) {
            const exists = await this.checkInternalLinkExists(link);
            if (!exists) {
              issues.push({
                id: `broken-link-article-${article.id}-${Date.now()}`,
                type: 'broken_link',
                severity: 'high',
                title: 'رابط داخلي مكسور في المقال',
                description: `الرابط "${link}" غير موجود`,
                affectedUrl: `/articles/${article.slug}`,
                suggestion: 'تحديث أو حذف الرابط المكسور',
                autoFixable: false,
                detectedAt: new Date()
              });
            }
          }
        }
      }

    } catch (error) {
      console.error('خطأ في فحص الروابط المكسورة:', error);
    }

    return issues;
  }

  /**
   * فحص Alt Text المفقود في الصور
   */
  async checkMissingAltText(): Promise<SEOIssue[]> {
    const issues: SEOIssue[] = [];

    try {
      // فحص صور المشاريع
      const projectMedia = await prisma.media_items.findMany({
        where: {
          type: 'IMAGE',
          OR: [
            { alt: null },
            { alt: '' }
          ]
        },
        include: {
          projects: {
            select: { id: true, slug: true, title: true }
          }
        }
      });

      for (const media of projectMedia) {
        if (media.projects) {
          issues.push({
            id: `missing-alt-project-${media.id}`,
            type: 'missing_alt',
            severity: 'medium',
            title: 'صورة بدون نص بديل (Alt Text)',
            description: `الصورة في المشروع "${media.projects.title}" لا تحتوي على نص بديل`,
            affectedUrl: `/portfolio/${media.projects.slug}`,
            suggestion: `إضافة نص بديل مناسب يصف الصورة ويحتوي على كلمات مفتاحية`,
            autoFixable: true,
            detectedAt: new Date(),
            targetId: media.id,
            targetType: 'project'
          });
        }
      }

      // فحص صور المقالات
      const articleMedia = await prisma.article_media_items.findMany({
        where: {
          type: 'IMAGE',
          OR: [
            { alt: null },
            { alt: '' }
          ]
        },
        include: {
          articles: {
            select: { id: true, slug: true, title: true }
          }
        }
      });

      for (const media of articleMedia) {
        if (media.articles) {
          issues.push({
            id: `missing-alt-article-${media.id}`,
            type: 'missing_alt',
            severity: 'medium',
            title: 'صورة بدون نص بديل في المقال',
            description: `الصورة في المقال "${media.articles.title}" لا تحتوي على نص بديل`,
            affectedUrl: `/articles/${media.articles.slug}`,
            suggestion: `إضافة نص بديل مناسب يصف الصورة ويحتوي على كلمات مفتاحية`,
            autoFixable: true,
            detectedAt: new Date(),
            targetId: media.id,
            targetType: 'article'
          });
        }
      }

    } catch (error) {
      console.error('خطأ في فحص Alt Text:', error);
    }

    return issues;
  }

  /**
   * فحص Meta Tags المفقودة أو الضعيفة
   */
  async checkMetaTags(): Promise<SEOIssue[]> {
    const issues: SEOIssue[] = [];

    try {
      // فحص المشاريع
      const projects = await prisma.projects.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true,
          slug: true,
          title: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true
        }
      });

      for (const project of projects) {
        // فحص Meta Title
        if (!project.metaTitle || project.metaTitle.length < 30) {
          issues.push({
            id: `meta-title-${project.id}`,
            type: 'meta_issue',
            severity: 'high',
            title: 'Meta Title ضعيف أو مفقود',
            description: `المشروع "${project.title}" يحتاج إلى Meta Title محسّن`,
            affectedUrl: `/portfolio/${project.slug}`,
            suggestion: 'إضافة Meta Title بطول 50-60 حرف يحتوي على كلمات مفتاحية',
            autoFixable: true,
            detectedAt: new Date(),
            targetId: project.id,
            targetType: 'project'
          });
        }

        // فحص Meta Description
        if (!project.metaDescription || project.metaDescription.length < 120) {
          issues.push({
            id: `meta-desc-${project.id}`,
            type: 'meta_issue',
            severity: 'high',
            title: 'Meta Description ضعيف أو مفقود',
            description: `المشروع "${project.title}" يحتاج إلى Meta Description محسّن`,
            affectedUrl: `/portfolio/${project.slug}`,
            suggestion: 'إضافة Meta Description بطول 150-160 حرف جذاب ومحسّن',
            autoFixable: true,
            detectedAt: new Date(),
            targetId: project.id,
            targetType: 'project'
          });
        }

        // فحص Keywords
        if (!project.keywords || project.keywords.length === 0) {
          issues.push({
            id: `keywords-${project.id}`,
            type: 'meta_issue',
            severity: 'medium',
            title: 'كلمات مفتاحية مفقودة',
            description: `المشروع "${project.title}" لا يحتوي على كلمات مفتاحية`,
            affectedUrl: `/portfolio/${project.slug}`,
            suggestion: 'إضافة 5-8 كلمات مفتاحية ذات صلة',
            autoFixable: true,
            detectedAt: new Date(),
            targetId: project.id,
            targetType: 'project'
          });
        }
      }

      // فحص المقالات
      const articles = await prisma.articles.findMany({
        where: { status: 'PUBLISHED' },
        select: {
          id: true,
          slug: true,
          title: true,
          metaTitle: true,
          metaDescription: true,
          keywords: true
        }
      });

      for (const article of articles) {
        if (!article.metaTitle || article.metaTitle.length < 30) {
          issues.push({
            id: `meta-title-article-${article.id}`,
            type: 'meta_issue',
            severity: 'high',
            title: 'Meta Title ضعيف في المقال',
            description: `المقال "${article.title}" يحتاج إلى Meta Title محسّن`,
            affectedUrl: `/articles/${article.slug}`,
            suggestion: 'إضافة Meta Title بطول 50-60 حرف يحتوي على كلمات مفتاحية',
            autoFixable: true,
            detectedAt: new Date(),
            targetId: article.id,
            targetType: 'article'
          });
        }

        if (!article.metaDescription || article.metaDescription.length < 120) {
          issues.push({
            id: `meta-desc-article-${article.id}`,
            type: 'meta_issue',
            severity: 'high',
            title: 'Meta Description ضعيف في المقال',
            description: `المقال "${article.title}" يحتاج إلى Meta Description محسّن`,
            affectedUrl: `/articles/${article.slug}`,
            suggestion: 'إضافة Meta Description بطول 150-160 حرف جذاب ومحسّن',
            autoFixable: true,
            detectedAt: new Date(),
            targetId: article.id,
            targetType: 'article'
          });
        }
      }

    } catch (error) {
      console.error('خطأ في فحص Meta Tags:', error);
    }

    return issues;
  }

  /**
   * فحص المحتوى المكرر
   */
  async checkDuplicateContent(): Promise<SEOIssue[]> {
    const issues: SEOIssue[] = [];

    try {
      const projects = await prisma.projects.findMany({
        where: { status: 'PUBLISHED' },
        select: { id: true, slug: true, title: true, metaTitle: true, metaDescription: true }
      });

      // فحص العناوين المكررة
      const titleMap = new Map<string, typeof projects>();
      for (const project of projects) {
        const title = project.metaTitle || project.title;
        if (!titleMap.has(title)) {
          titleMap.set(title, []);
        }
        titleMap.get(title)!.push(project);
      }

      for (const [title, duplicates] of titleMap.entries()) {
        if (duplicates.length > 1) {
          for (const project of duplicates) {
            issues.push({
              id: `duplicate-title-${project.id}`,
              type: 'duplicate_content',
              severity: 'high',
              title: 'عنوان مكرر',
              description: `المشروع "${project.title}" يشارك نفس العنوان مع ${duplicates.length - 1} مشاريع أخرى`,
              affectedUrl: `/portfolio/${project.slug}`,
              suggestion: 'تعديل العنوان ليكون فريداً ومميزاً',
              autoFixable: false,
              detectedAt: new Date()
            });
          }
        }
      }

      // فحص Meta Description المكررة
      const descMap = new Map<string, typeof projects>();
      for (const project of projects) {
        if (project.metaDescription) {
          if (!descMap.has(project.metaDescription)) {
            descMap.set(project.metaDescription, []);
          }
          descMap.get(project.metaDescription)!.push(project);
        }
      }

      for (const [desc, duplicates] of descMap.entries()) {
        if (duplicates.length > 1) {
          for (const project of duplicates) {
            issues.push({
              id: `duplicate-desc-${project.id}`,
              type: 'duplicate_content',
              severity: 'medium',
              title: 'وصف مكرر',
              description: `المشروع "${project.title}" يشارك نفس الوصف مع ${duplicates.length - 1} مشاريع أخرى`,
              affectedUrl: `/portfolio/${project.slug}`,
              suggestion: 'كتابة وصف فريد لكل مشروع',
              autoFixable: true,
              detectedAt: new Date(),
              targetId: project.id,
              targetType: 'project'
            });
          }
        }
      }

    } catch (error) {
      console.error('خطأ في فحص المحتوى المكرر:', error);
    }

    return issues;
  }

  /**
   * تشغيل فحص SEO شامل
   */
  async runFullAudit(): Promise<SEOAuditResult> {
    console.log('🔍 بدء فحص SEO الشامل...');
    
    const allIssues: SEOIssue[] = [];

    // تشغيل جميع الفحوصات بالتوازي
    const [brokenLinks, missingAlt, metaIssues, duplicateContent] = await Promise.all([
      this.checkBrokenLinks(),
      this.checkMissingAltText(),
      this.checkMetaTags(),
      this.checkDuplicateContent()
    ]);

    allIssues.push(...brokenLinks, ...missingAlt, ...metaIssues, ...duplicateContent);

    // حساب الدرجة
    const criticalCount = allIssues.filter(i => i.severity === 'critical').length;
    const highCount = allIssues.filter(i => i.severity === 'high').length;
    const mediumCount = allIssues.filter(i => i.severity === 'medium').length;
    const lowCount = allIssues.filter(i => i.severity === 'low').length;

    // حساب النتيجة من 100
    let score = 100;
    score -= criticalCount * 15;  // كل مشكلة حرجة تخصم 15 نقطة
    score -= highCount * 8;       // كل مشكلة عالية تخصم 8 نقاط
    score -= mediumCount * 4;     // كل مشكلة متوسطة تخصم 4 نقاط
    score -= lowCount * 1;        // كل مشكلة منخفضة تخصم 1 نقطة
    score = Math.max(0, Math.min(100, score));

    // تحديد نقاط القوة
    const strengths: string[] = [];
    if (brokenLinks.length === 0) strengths.push('لا توجد روابط مكسورة');
    if (missingAlt.length < 5) strengths.push('معظم الصور تحتوي على نص بديل');
    if (duplicateContent.length === 0) strengths.push('المحتوى فريد بدون تكرار');

    // التوصيات
    const recommendations: string[] = [];
    if (criticalCount > 0) recommendations.push('إصلاح المشاكل الحرجة فوراً');
    if (highCount > 5) recommendations.push('التركيز على حل المشاكل ذات الأولوية العالية');
    if (missingAlt.length > 0) recommendations.push('إضافة نصوص بديلة للصور المفقودة');
    if (metaIssues.length > 0) recommendations.push('تحسين Meta Tags للصفحات');

    console.log(`✅ اكتمل الفحص: ${allIssues.length} مشكلة تم اكتشافها`);
    console.log(`📊 النتيجة: ${score}/100`);

    return {
      score,
      totalIssues: allIssues.length,
      criticalIssues: criticalCount,
      issues: allIssues,
      strengths,
      recommendations,
      lastAudit: new Date()
    };
  }

  /**
   * إصلاح تلقائي للمشاكل القابلة للإصلاح
   */
  async autoFix(issueId: string): Promise<{ success: boolean; message: string }> {
    try {
      const issue = await this.findIssue(issueId);
      if (!issue) {
        return { success: false, message: 'المشكلة غير موجودة' };
      }

      if (!issue.autoFixable) {
        return { success: false, message: 'هذه المشكلة لا يمكن إصلاحها تلقائياً' };
      }

      switch (issue.type) {
        case 'missing_alt':
          return await this.fixMissingAltText(issue);
        case 'meta_issue':
          return await this.fixMetaIssue(issue);
        case 'duplicate_content':
          return await this.fixDuplicateContent(issue);
        default:
          return { success: false, message: 'نوع المشكلة غير مدعوم للإصلاح التلقائي' };
      }
    } catch (error) {
      console.error('خطأ في الإصلاح التلقائي:', error);
      return { success: false, message: 'فشل الإصلاح التلقائي' };
    }
  }

  /**
   * البحث عن مشكلة معينة
   */
  private async findIssue(issueId: string): Promise<SEOIssue | null> {
    const audit = await this.runFullAudit();
    return audit.issues.find(i => i.id === issueId) || null;
  }

  /**
   * إصلاح Alt Text المفقود
   */
  private async fixMissingAltText(issue: SEOIssue): Promise<{ success: boolean; message: string }> {
    try {
      if (!issue.targetId) {
        return { success: false, message: 'معرف العنصر مفقود' };
      }

      const { seoAgent } = await import('./seo-agent');
      
      if (issue.targetType === 'project') {
        const media = await prisma.media_items.findUnique({
          where: { id: issue.targetId },
          include: { projects: true }
        });

        if (!media || !media.projects) {
          return { success: false, message: 'الصورة غير موجودة' };
        }

        const altText = await seoAgent.generateImageAltText(
          media.projects.title,
          media.projects.description || '',
          media.src
        );

        await prisma.media_items.update({
          where: { id: issue.targetId },
          data: { alt: altText }
        });

        return { success: true, message: `تم إضافة النص البديل: "${altText}"` };
      } else if (issue.targetType === 'article') {
        const media = await prisma.article_media_items.findUnique({
          where: { id: issue.targetId },
          include: { articles: true }
        });

        if (!media || !media.articles) {
          return { success: false, message: 'الصورة غير موجودة' };
        }

        const altText = await seoAgent.generateImageAltText(
          media.articles.title,
          media.articles.excerpt || '',
          media.src
        );

        await prisma.article_media_items.update({
          where: { id: issue.targetId },
          data: { alt: altText }
        });

        return { success: true, message: `تم إضافة النص البديل: "${altText}"` };
      }

      return { success: false, message: 'نوع العنصر غير مدعوم' };
    } catch (error) {
      console.error('خطأ في إصلاح Alt Text:', error);
      return { success: false, message: 'فشل إصلاح Alt Text' };
    }
  }

  /**
   * إصلاح مشاكل Meta Tags
   */
  private async fixMetaIssue(issue: SEOIssue): Promise<{ success: boolean; message: string }> {
    try {
      if (!issue.targetId || !issue.targetType) {
        return { success: false, message: 'معلومات العنصر مفقودة' };
      }

      const { seoAgent } = await import('./seo-agent');

      if (issue.targetType === 'project') {
        const project = await prisma.projects.findUnique({
          where: { id: issue.targetId },
          select: { title: true, description: true, keywords: true }
        });

        if (!project) {
          return { success: false, message: 'المشروع غير موجود' };
        }

        const defaultKeywords = ['مظلات', 'سواتر', 'برجولات', 'جدة'];
        const keywordsArray = project.keywords 
          ? (typeof project.keywords === 'string' ? project.keywords.split(',').map(k => k.trim()) : project.keywords)
          : defaultKeywords;
        const metaTags = await seoAgent.generateMetaTags(
          project.description || project.title,
          keywordsArray,
          'project'
        );

        await prisma.projects.update({
          where: { id: issue.targetId },
          data: {
            metaTitle: metaTags.title,
            metaDescription: metaTags.description,
            keywords: keywordsArray.join(', ')
          }
        });

        return { success: true, message: 'تم تحديث Meta Tags بنجاح' };
      } else if (issue.targetType === 'article') {
        const article = await prisma.articles.findUnique({
          where: { id: issue.targetId },
          select: { title: true, content: true, excerpt: true }
        });

        if (!article) {
          return { success: false, message: 'المقال غير موجود' };
        }

        const content = article.excerpt || article.content.substring(0, 500);
        const analysis = await seoAgent.analyzeContent(content, [article.title]);
        
        await prisma.articles.update({
          where: { id: issue.targetId },
          data: {
            metaTitle: analysis.meta_title_suggestion,
            metaDescription: analysis.meta_description_suggestion
          }
        });

        return { success: true, message: 'تم تحديث Meta Tags بنجاح' };
      }

      return { success: false, message: 'نوع العنصر غير مدعوم' };
    } catch (error) {
      console.error('خطأ في إصلاح Meta Tags:', error);
      return { success: false, message: 'فشل إصلاح Meta Tags' };
    }
  }

  /**
   * إصلاح المحتوى المكرر
   */
  private async fixDuplicateContent(issue: SEOIssue): Promise<{ success: boolean; message: string }> {
    try {
      if (!issue.targetId || !issue.targetType) {
        return { success: false, message: 'معلومات العنصر مفقودة' };
      }

      const { seoAgent } = await import('./seo-agent');

      if (issue.targetType === 'project') {
        const project = await prisma.projects.findUnique({
          where: { id: issue.targetId },
          select: { title: true, description: true }
        });

        if (!project) {
          return { success: false, message: 'المشروع غير موجود' };
        }

        const uniqueDescription = await seoAgent.generateOptimizedContent(
          project.title,
          ['مظلات', 'سواتر', 'برجولات'],
          'project_description',
          150
        );

        await prisma.projects.update({
          where: { id: issue.targetId },
          data: {
            metaDescription: uniqueDescription.content.substring(0, 160)
          }
        });

        return { success: true, message: 'تم إنشاء محتوى فريد جديد' };
      }

      return { success: false, message: 'نوع العنصر غير مدعوم' };
    } catch (error) {
      console.error('خطأ في إصلاح المحتوى المكرر:', error);
      return { success: false, message: 'فشل إصلاح المحتوى المكرر' };
    }
  }

  /**
   * إصلاح جميع المشاكل القابلة للإصلاح تلقائياً
   */
  async autoFixAll(): Promise<{ fixed: number; failed: number; results: Array<{ issueId: string; success: boolean; message: string }> }> {
    const audit = await this.runFullAudit();
    const fixableIssues = audit.issues.filter(i => i.autoFixable);

    const results = [];
    let fixed = 0;
    let failed = 0;

    for (const issue of fixableIssues) {
      const result = await this.autoFix(issue.id);
      results.push({
        issueId: issue.id,
        success: result.success,
        message: result.message
      });

      if (result.success) {
        fixed++;
      } else {
        failed++;
      }
    }

    return { fixed, failed, results };
  }

  // وظائف مساعدة
  private extractLinks(content: string): string[] {
    const linkRegex = /href=["']([^"']+)["']/g;
    const links: string[] = [];
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      links.push(match[1]);
    }
    return links;
  }

  private isInternalLink(url: string): boolean {
    return url.startsWith('/') || url.includes('aldeyarksa.tech');
  }

  private async checkInternalLinkExists(url: string): Promise<boolean> {
    // تبسيط الفحص - يمكن تحسينه لاحقاً
    if (url.startsWith('/portfolio/')) {
      const slug = url.replace('/portfolio/', '');
      const project = await prisma.projects.findFirst({ where: { slug } });
      return !!project;
    }
    if (url.startsWith('/articles/')) {
      const slug = url.replace('/articles/', '');
      const article = await prisma.articles.findFirst({ where: { slug } });
      return !!article;
    }
    return true; // افترض أن الروابط الأخرى صحيحة
  }
}

export const seoDiagnostics = new SEODiagnostics();
