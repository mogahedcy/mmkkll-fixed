
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface IndexingResult {
  url: string;
  google_indexed: boolean | string;
  bing_indexed: boolean | string;
  status: string;
  recommendation: string;
  last_checked: string;
}

interface IndexingSummary {
  total_urls: number;
  google_indexed: number;
  bing_indexed: number;
  fully_indexed: number;
  needs_attention: number;
  indexing_rate: number;
  last_update: string;
}

export default function SEOMonitorPage() {
  const [indexingData, setIndexingData] = useState<{
    summary: IndexingSummary | null;
    results: IndexingResult[];
  }>({
    summary: null,
    results: []
  });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const checkIndexingStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/indexing-status');
      const data = await response.json();
      setIndexingData({
        summary: data.summary,
        results: data.results
      });
    } catch (error) {
      console.error('خطأ في فحص حالة الأرشفة:', error);
    }
    setLoading(false);
  };

  const refreshSitemap = async () => {
    setRefreshing(true);
    try {
      const response = await fetch('/api/sitemap/refresh', { method: 'POST' });
      const data = await response.json();
      alert(data.message || 'تم إشعار محركات البحث بنجاح');
    } catch (error) {
      alert('خطأ في إشعار محركات البحث');
    }
    setRefreshing(false);
  };

  useEffect(() => {
    checkIndexingStatus();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-blue-500';
      case 'needs_attention':
        return 'bg-yellow-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'ممتاز';
      case 'good':
        return 'جيد';
      case 'needs_attention':
        return 'يحتاج انتباه';
      case 'error':
        return 'خطأ';
      default:
        return 'غير معروف';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* العنوان الرئيسي */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            مراقب SEO لموقع محترفين الديار العالمية
          </h1>
          <p className="text-gray-600 text-lg">
            متابعة شاملة لحالة الأرشفة وأداء محركات البحث
          </p>
        </div>

        {/* أزرار التحكم */}
        <div className="flex gap-4 justify-center mb-8">
          <Button 
            onClick={checkIndexingStatus} 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'جاري الفحص...' : 'فحص حالة الأرشفة'}
          </Button>
          <Button 
            onClick={refreshSitemap} 
            disabled={refreshing}
            className="bg-green-600 hover:bg-green-700"
          >
            {refreshing ? 'جاري الإشعار...' : 'إشعار محركات البحث'}
          </Button>
        </div>

        {/* ملخص الحالة */}
        {indexingData.summary && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">ملخص حالة الأرشفة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {indexingData.summary.total_urls}
                </div>
                <div className="text-gray-600">إجمالي الصفحات</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {indexingData.summary.google_indexed}
                </div>
                <div className="text-gray-600">مفهرسة في Google</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">
                  {indexingData.summary.bing_indexed}
                </div>
                <div className="text-gray-600">مفهرسة في Bing</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {indexingData.summary.indexing_rate}%
                </div>
                <div className="text-gray-600">معدل الأرشفة</div>
              </div>
            </div>
          </Card>
        )}

        {/* تفاصيل الصفحات */}
        {indexingData.results.length > 0 && (
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">تفاصيل حالة كل صفحة</h2>
            <div className="space-y-4">
              {indexingData.results.map((result, index) => (
                <div 
                  key={index} 
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {result.url}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {result.recommendation}
                      </p>
                    </div>
                    <Badge className={`${getStatusColor(result.status)} text-white`}>
                      {getStatusText(result.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Google:</span>
                      <Badge 
                        variant={result.google_indexed === true ? 'default' : 'destructive'}
                        className={result.google_indexed === true ? 'bg-green-500' : 'bg-red-500'}
                      >
                        {result.google_indexed === true ? 'مفهرس' : 
                         result.google_indexed === false ? 'غير مفهرس' : 'غير معروف'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Bing:</span>
                      <Badge 
                        variant={result.bing_indexed === true ? 'default' : 'destructive'}
                        className={result.bing_indexed === true ? 'bg-green-500' : 'bg-red-500'}
                      >
                        {result.bing_indexed === true ? 'مفهرس' : 
                         result.bing_indexed === false ? 'غير مفهرس' : 'غير معروف'}
                      </Badge>
                    </div>
                    
                    <div className="text-gray-500">
                      آخر فحص: {new Date(result.last_checked).toLocaleString('ar-SA')}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* نصائح وتوجيهات */}
        <Card className="p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">نصائح لتحسين الأرشفة</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">🚀 نصائح سريعة</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• تحديث المحتوى بانتظام</li>
                <li>• إضافة روابط داخلية بين الصفحات</li>
                <li>• تحسين سرعة تحميل الموقع</li>
                <li>• استخدام كلمات مفتاحية مناسبة</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">📊 أدوات المتابعة</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Google Search Console</li>
                <li>• Bing Webmaster Tools</li>
                <li>• مراقبة الكلمات المفتاحية</li>
                <li>• تحليل المنافسين</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
