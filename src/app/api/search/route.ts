
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const location = searchParams.get('location') || '';
    const sortBy = searchParams.get('sortBy') || 'relevance';

    // محاكاة نتائج البحث (يمكن ربطها بقاعدة البيانات لاحقاً)
    const mockResults = [
      {
        id: '1',
        title: 'مظلات وسواتر جدة',
        description: 'تركيب مظلات وسواتر عالية الجودة في جدة',
        category: 'مظلات',
        location: 'جدة',
        image: '/images/portfolio/mazallat-1.jpg',
        slug: 'mazallat-jeddah-project-1'
      },
      {
        id: '2',
        title: 'تنسيق حدائق',
        description: 'تصميم وتنسيق الحدائق بأحدث الطرق',
        category: 'تنسيق حدائق',
        location: 'الرياض',
        image: '/images/portfolio/landscaping-1.webp',
        slug: 'landscaping-riyadh-project-1'
      }
    ];

    // تطبيق فلاتر البحث
    let filteredResults = mockResults;

    if (query) {
      filteredResults = filteredResults.filter(result =>
        result.title.includes(query) || 
        result.description.includes(query)
      );
    }

    if (category) {
      filteredResults = filteredResults.filter(result =>
        result.category === category
      );
    }

    if (location) {
      filteredResults = filteredResults.filter(result =>
        result.location === location
      );
    }

    // ترتيب النتائج
    if (sortBy === 'date') {
      // ترتيب حسب التاريخ
    } else if (sortBy === 'name') {
      filteredResults.sort((a, b) => a.title.localeCompare(b.title));
    }

    return NextResponse.json({
      success: true,
      results: filteredResults,
      total: filteredResults.length,
      query: query
    });

  } catch (error) {
    console.error('خطأ في البحث:', error);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ في البحث',
      results: [],
      total: 0
    }, { status: 500 });
  }
}
