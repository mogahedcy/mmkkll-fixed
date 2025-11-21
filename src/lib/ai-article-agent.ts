import { seoAgent } from './seo-agent';
import { imageSelector } from './image-selector';
import { prisma } from './prisma';
import { randomUUID } from 'crypto';

export interface ArticleGenerationOptions {
  topic: string;
  keywords: string[];
  category: string;
  wordCount?: number;
  includeImages?: boolean;
  imageCount?: number;
  author?: string;
  featured?: boolean;
}

export interface GeneratedArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  author: string;
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED';
  mediaItems: Array<{
    type: 'IMAGE' | 'VIDEO';
    src: string;
    alt: string;
    description: string;
  }>;
  tags: string[];
}

export class AIArticleAgent {
  async generateArticle(options: ArticleGenerationOptions): Promise<GeneratedArticle> {
    const {
      topic,
      keywords,
      category,
      wordCount = 1000,
      includeImages = true,
      imageCount = 3,
      author = 'محترفين الديار العالمية',
      featured = false
    } = options;

    console.log('🤖 بدء توليد المقال بواسطة الذكاء الاصطناعي...');

    const generatedContent = await seoAgent.generateOptimizedContent(
      topic,
      keywords,
      'article',
      wordCount
    );

    console.log('✅ تم توليد المحتوى');

    const contentAnalysis = await seoAgent.analyzeContent(
      generatedContent.content,
      keywords
    );

    console.log('✅ تم تحليل المحتوى');

    let mediaItems: Array<{ type: 'IMAGE' | 'VIDEO'; src: string; alt: string; description: string }> = [];
    
    if (includeImages) {
      console.log('🖼️ جاري اختيار الصور المناسبة...');
      mediaItems = await imageSelector.selectImagesForArticle(
        generatedContent.title,
        generatedContent.content,
        keywords,
        imageCount
      );
      console.log(`✅ تم اختيار ${mediaItems.length} صور`);
    }

    const articleId = randomUUID();

    return {
      id: articleId,
      title: generatedContent.title,
      content: generatedContent.content,
      excerpt: generatedContent.meta_description,
      metaTitle: contentAnalysis.meta_title_suggestion,
      metaDescription: contentAnalysis.meta_description_suggestion,
      keywords: keywords,
      category: category,
      author: author,
      featured: featured,
      status: 'DRAFT',
      mediaItems: mediaItems,
      tags: generatedContent.tags
    };
  }

  async publishArticle(article: GeneratedArticle): Promise<string> {
    console.log('📝 جاري نشر المقال...');

    const slug = this.generateSlug(article.title);

    const createdArticle = await prisma.articles.create({
      data: {
        id: article.id,
        title: article.title,
        slug: slug,
        content: article.content,
        excerpt: article.excerpt,
        metaTitle: article.metaTitle,
        metaDescription: article.metaDescription,
        author: article.author,
        category: article.category,
        featured: article.featured,
        status: article.status,
        publishedAt: article.status === 'PUBLISHED' ? new Date() : null,
        createdAt: new Date(),
        updatedAt: new Date(),
        article_media_items: {
          create: article.mediaItems.map((item, index) => ({
            id: randomUUID(),
            type: item.type,
            src: item.src,
            alt: item.alt,
            description: item.description,
            order: index
          }))
        },
        article_tags: {
          create: article.tags.map(tag => ({
            name: tag
          }))
        }
      }
    });

    console.log('✅ تم نشر المقال بنجاح');
    return createdArticle.id;
  }

  async generateAndPublishArticle(
    options: ArticleGenerationOptions,
    shouldPublish = false
  ): Promise<{ articleId: string; article: GeneratedArticle }> {
    const article = await this.generateArticle(options);
    
    if (shouldPublish) {
      article.status = 'PUBLISHED';
    }

    const articleId = await this.publishArticle(article);

    return {
      articleId,
      article
    };
  }

  async generateMultipleArticles(
    topics: Array<{ topic: string; keywords: string[]; category: string }>,
    shouldPublish = false
  ): Promise<Array<{ articleId: string; title: string; status: string }>> {
    console.log(`🚀 بدء توليد ${topics.length} مقالات...`);
    
    const results = [];

    for (const topicData of topics) {
      try {
        const result = await this.generateAndPublishArticle(
          {
            topic: topicData.topic,
            keywords: topicData.keywords,
            category: topicData.category,
            wordCount: 1000,
            includeImages: true,
            imageCount: 3
          },
          shouldPublish
        );

        results.push({
          articleId: result.articleId,
          title: result.article.title,
          status: 'success'
        });

        console.log(`✅ تم توليد: ${result.article.title}`);
      } catch (error) {
        console.error(`❌ فشل توليد مقال عن: ${topicData.topic}`, error);
        results.push({
          articleId: '',
          title: topicData.topic,
          status: 'failed'
        });
      }
    }

    console.log(`✅ اكتملت العملية: ${results.filter(r => r.status === 'success').length}/${topics.length}`);
    
    return results;
  }

  private generateSlug(title: string): string {
    const slug = title
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[،؛؟!@#$%^&*()+=\[\]{};:"\\|<>\/]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, '');

    return slug || `article-${Date.now()}`;
  }
}

export const aiArticleAgent = new AIArticleAgent();
