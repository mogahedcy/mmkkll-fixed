import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Home, Share2, ThumbsUp, ThumbsDown } from 'lucide-react';
import { generateCanonicalUrl } from '@/lib/seo-utils';

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getFAQ(slug: string) {
  try {
    const faq = await prisma.faqs.findFirst({
      where: { 
        slug,
        status: 'PUBLISHED'
      }
    });
    return faq;
  } catch (error) {
    console.error('Error fetching FAQ:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = await getFAQ(slug);

  if (!faq) {
    return {
      title: 'سؤال غير موجود | محترفين الديار العالمية',
      description: 'السؤال المطلوب غير موجود'
    };
  }

  const title = faq.metaTitle || `${faq.question} | الأسئلة الشائعة - محترفين الديار العالمية`;
  const description = faq.metaDescription || faq.answer.substring(0, 160);

  return {
    title,
    description,
    keywords: faq.keywords || `أسئلة شائعة، ${faq.category}، محترفين الديار العالمية`,
    authors: [{ name: 'محترفين الديار العالمية' }],
    openGraph: {
      title,
      description,
      url: generateCanonicalUrl(`/faq/${slug}`),
      siteName: 'محترفين الديار العالمية',
      locale: 'ar_SA',
      type: 'article',
      images: [
        {
          url: 'https://www.aldeyarksa.tech/favicon.svg',
          width: 1200,
          height: 630,
          alt: faq.question
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://www.aldeyarksa.tech/favicon.svg']
    },
    alternates: {
      canonical: `/faq/${slug}`
    }
  };
}

export default async function FAQDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const faq = await getFAQ(slug);

  if (!faq) {
    notFound();
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: faq.question,
      text: faq.question,
      answerCount: 1,
      dateCreated: faq.createdAt.toISOString(),
      dateModified: faq.updatedAt.toISOString(),
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
        dateCreated: faq.createdAt.toISOString(),
        author: {
          '@type': 'Organization',
          name: 'محترفين الديار العالمية',
          url: 'https://www.aldeyarksa.tech'
        }
      }
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'الرئيسية',
        item: 'https://www.aldeyarksa.tech'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'الأسئلة الشائعة',
        item: 'https://www.aldeyarksa.tech/faq'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: faq.question,
        item: `https://www.aldeyarksa.tech/faq/${slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-accent transition-colors flex items-center gap-1">
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </Link>
            <span>/</span>
            <Link href="/faq" className="hover:text-accent transition-colors">
              الأسئلة الشائعة
            </Link>
            <span>/</span>
            <span className="text-primary font-medium">{faq.category}</span>
          </nav>

          <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-8 border-b border-gray-200">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="inline-block bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold mb-3">
                    {faq.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-primary">
                    {faq.question}
                  </h1>
                </div>
              </div>
              
              {faq.views > 0 && (
                <p className="text-sm text-gray-600">
                  {faq.views} مشاهدة
                </p>
              )}
            </div>

            <div className="p-8">
              <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 mb-6">
                <h2 className="text-lg font-semibold text-primary mb-4">الإجابة:</h2>
                <p className="text-gray-700 leading-relaxed text-right whitespace-pre-line">
                  {faq.answer}
                </p>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-200">
                <Link
                  href="/faq"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors font-medium"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>العودة إلى جميع الأسئلة</span>
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">شارك:</span>
                  <button
                    onClick={async () => {
                      const url = window.location.href;
                      if (navigator.share) {
                        try {
                          await navigator.share({
                            title: faq.question,
                            text: faq.answer,
                            url
                          });
                        } catch (error) {
                          await navigator.clipboard.writeText(url);
                          alert('تم نسخ الرابط!');
                        }
                      } else {
                        await navigator.clipboard.writeText(url);
                        alert('تم نسخ الرابط!');
                      }
                    }}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </article>

          {faq.relatedQuestions && (
            <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-4">أسئلة ذات صلة</h3>
              <div className="space-y-2">
                {faq.relatedQuestions.split(',').map((q, i) => (
                  <Link
                    key={i}
                    href="/faq"
                    className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                  >
                    • {q.trim()}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
