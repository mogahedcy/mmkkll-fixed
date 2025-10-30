import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArticleDetailsClient from './ArticleDetailsClient';

interface Props {
  params: Promise<{ id: string }>;
}

async function getArticle(id: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
      ? (process.env.NEXT_PUBLIC_BASE_URL.startsWith('http') 
          ? process.env.NEXT_PUBLIC_BASE_URL 
          : `https://${process.env.NEXT_PUBLIC_BASE_URL}`)
      : (process.env.VERCEL_URL 
          ? `https://${process.env.VERCEL_URL}` 
          : 'http://localhost:3000');
    const response = await fetch(`${baseUrl}/api/articles/${id}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return null;
    }

    const article = await response.json();
    return article;
  } catch (err) {
    const error = err as { message?: string; status?: number };
    console.error('خطأ في جلب المقالة:', error);

    if (error?.message?.includes('404') || error?.status === 404) {
      notFound();
    }

    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const article = await getArticle(id);

    if (!article) {
      return {
        title: 'المقالة غير موجودة | محترفين الديار العالمية',
        description: 'المقالة المطلوبة غير متوفرة'
      };
    }

    const mainImage = article.mediaItems?.find((item: any) => item.type === 'IMAGE');
    const seoTitle = `${article.title} | محترفين الديار العالمية`;
    const seoDescription = article.excerpt || article.content.substring(0, 160);

    return {
      title: seoTitle,
      description: seoDescription,
      keywords: [
        article.category,
        'محترفين الديار',
        'جدة',
        'السعودية',
        ...(article.tags || []).map((t: any) => t.name)
      ].join(', '),
      openGraph: {
        title: seoTitle,
        description: seoDescription,
        url: `https://www.aldeyarksa.tech/articles/${article.slug || article.id}`,
        siteName: 'محترفين الديار العالمية',
        images: mainImage ? [
          {
            url: mainImage.src,
            width: 1200,
            height: 630,
            alt: article.title
          }
        ] : [],
        locale: 'ar_SA',
        type: 'article',
        publishedTime: article.publishedAt,
        authors: [article.author]
      },
      twitter: {
        card: 'summary_large_image',
        title: seoTitle,
        description: seoDescription,
        images: mainImage ? [mainImage.src] : []
      }
    };
  } catch (error) {
    console.error('خطأ في generateMetadata:', error);
    return {
      title: 'محترفين الديار العالمية',
      description: 'مقالات متخصصة في المظلات والبرجولات'
    };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getArticle(id);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ArticleDetailsClient article={article} />
      <Footer />
    </>
  );
}
