'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchResults from '@/components/SearchResults';
import AdvancedFilters from '@/components/AdvancedFilters';
import SavedSearches from '@/components/SavedSearches';

function SearchContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    sortBy: 'relevance'
  });

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      performSearch(query, filters);
    }
  }, [query, filters]);

  const performSearch = async (searchQuery: string, currentFilters: any) => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams({
        q: searchQuery,
        ...currentFilters
      });

      const response = await fetch(`/api/search?${queryParams}`);
      const data = await response.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('خطأ في البحث:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            نتائج البحث{query && ` عن "${query}"`}
          </h1>

          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              تم العثور على {results.length} نتيجة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AdvancedFilters 
              filters={filters}
              onFiltersChange={setFilters}
            />
            <SavedSearches />
          </div>

          <div className="lg:col-span-3">
            <SearchResults 
              results={results}
              loading={loading}
              query={query}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري تحميل نتائج البحث...</p>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}