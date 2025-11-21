/**
 * API endpoint for generating local SEO articles
 * Used for bulk article creation and local keyword targeting
 */

import { NextResponse } from 'next/server';
import { jeddahNeighborhoods, generateLocalSEOTitle, generateLocalSEOMetaDescription } from '@/lib/local-seo-strategy';

export async function GET(request: Request) {
  try {
    // Generate article metadata for all neighborhoods
    const articles = jeddahNeighborhoods.map(neighborhood => ({
      neighborhood: neighborhood.name,
      category: neighborhood.category,
      title: generateLocalSEOTitle(neighborhood.name, neighborhood.category, neighborhood.keywords[0]),
      metaDescription: generateLocalSEOMetaDescription(neighborhood.name, neighborhood.category),
      keywords: neighborhood.keywords,
      focusKeyword: neighborhood.keywords[0],
      slug: `${neighborhood.category.toLowerCase().replace(/\s+/g, '-')}-${neighborhood.name.toLowerCase().replace(/\s+/g, '-')}`,
      contentOutline: [
        `مقدمة عن ${neighborhood.category} في ${neighborhood.name}`,
        "الفوائد والميزات",
        "الأسعار والعروض الخاصة",
        "مشاريعنا المنجزة في المنطقة",
        "شهادات العملاء",
        "كيفية الطلب والتواصل"
      ],
      internalLinks: [
        `/services/mazallat`,
        `/services/sawater`,
        `/services/pergolas`,
        `/portfolio`,
        `https://www.aldeyarksa.tech`
      ],
      estimatedLength: "2500-3000 words",
      images: 5,
      priority: "HIGH" // All local articles are high priority
    }));

    return NextResponse.json({
      success: true,
      message: `Generated metadata for ${articles.length} local SEO articles`,
      articles,
      totalNeighborhoods: jeddahNeighborhoods.length,
      recommendations: {
        contentStrategy: "Focus on neighborhood-specific keywords and local intent",
        internalLinking: "Link neighborhood articles to main services",
        imageOptimization: "Use before/after project photos from each neighborhood",
        schema: "Add LocalBusiness schema with neighborhood service areas",
        updateFrequency: "weekly"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate article metadata' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { neighborhood, category } = await request.json();

    // Validate neighborhood
    const selectedNeighborhood = jeddahNeighborhoods.find(n => n.name === neighborhood);
    if (!selectedNeighborhood) {
      return NextResponse.json(
        { error: 'Invalid neighborhood' },
        { status: 400 }
      );
    }

    // Generate detailed article template
    const article = {
      title: generateLocalSEOTitle(neighborhood, category, selectedNeighborhood.keywords[0]),
      metaDescription: generateLocalSEOMetaDescription(neighborhood, category),
      keywords: selectedNeighborhood.keywords,
      content: {
        h1: `افضل ${category} في ${neighborhood} جدة - محترفين الديار العالمية`,
        sections: [
          {
            heading: `لماذا تختار ${category} في ${neighborhood}؟`,
            keywords: `${category} ${neighborhood}`
          },
          {
            heading: `أنواع ${category} المتوفرة`,
            keywords: `أنواع ${category}`
          },
          {
            heading: `أسعار ${category} في ${neighborhood}`,
            keywords: `سعر ${category} جدة`
          },
          {
            heading: `مشاريعنا المنجزة في ${neighborhood}`,
            keywords: `مشاريع ${category} محترفين الديار`
          },
          {
            heading: "تقييمات العملاء من المنطقة",
            keywords: "تقييمات آراء عملاء"
          },
          {
            heading: "اتصل بنا الآن",
            keywords: "تواصل اطلب عرض سعر"
          }
        ]
      },
      internalLinks: {
        services: ['/services/mazallat', '/services/sawater', '/services/pergolas'],
        portfolio: '/portfolio',
        homepage: '/'
      }
    };

    return NextResponse.json({
      success: true,
      article,
      seoScore: {
        titleOptimization: "✓ Optimized",
        keywordTargeting: "✓ Targeted",
        internalLinking: "✓ Configured",
        schema: "✓ Ready"
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate article' },
      { status: 500 }
    );
  }
}
