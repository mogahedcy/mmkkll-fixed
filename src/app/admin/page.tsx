'use client';

import { useState } from 'react';
import { BarChart3, Star, MessageSquare, Eye, TrendingUp, Users, Loader, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  const [projectInput, setProjectInput] = useState('');

  const stats = [
    { label: 'إجمالي المشاهدات', value: '15.2K', icon: Eye, color: 'bg-blue-500' },
    { label: 'التقييمات', value: '4.8★', icon: Star, color: 'bg-amber-500' },
    { label: 'الرسائل', value: '342', icon: MessageSquare, color: 'bg-green-500' },
    { label: 'الزوار الجدد', value: '+2,543', icon: Users, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            لوحة التحكم الإدارية
          </h1>
          <p className="text-gray-600 dark:text-gray-400">مرحباً بك! إليك ملخص الموقع</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </h3>
                <div className={`${stat.color} p-3 rounded-lg text-white`}>
                  <stat.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            {['overview', 'projects', 'articles', 'reviews', 'ai', 'google'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'projects' && 'المشاريع'}
                {tab === 'articles' && 'المقالات'}
                {tab === 'reviews' && 'التقييمات'}
                {tab === 'ai' && '✨ أدوات AI'}
                {tab === 'google' && '🔍 Google API'}
              </button>
            ))}
          </div>

          {/* Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">إحصائيات الأداء</h3>
                <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-lg">
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    أداء الموقع ممتازة جداً! متوسط وقت التحميل 1.2 ثانية والترتيب في Google يتحسن أسبوعياً.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Core Web Vitals</span>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SEO Score</span>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full w-11/12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">إدارة المشاريع</h3>
                  <Link
                    href="/admin/projects"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    إضافة مشروع
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-400">لديك 45 مشروع منجز</p>
              </div>
            )}

            {activeTab === 'articles' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">إدارة المقالات</h3>
                  <Link
                    href="/admin/articles"
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition"
                  >
                    كتابة مقالة
                  </Link>
                </div>
                <p className="text-gray-600 dark:text-gray-400">لديك 28 مقالة منشورة</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold">التقييمات الأخيرة</h3>
                <p className="text-gray-600 dark:text-gray-400">متوسط التقييم: 4.8/5 ⭐ من 150+ تقييم</p>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">أدوات AI الذكية</h3>
                </div>

                {/* AI Project Suggestions */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <h4 className="font-bold mb-3">💡 اقتراحات ذكية للمشاريع</h4>
                  <div className="space-y-3">
                    <textarea
                      placeholder="وصف المشروع (نوع، موقع، ميزانية...)"
                      value={projectInput}
                      onChange={(e) => setProjectInput(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg dark:bg-gray-700 dark:border-blue-700"
                      rows={3}
                    />
                    <button
                      onClick={async () => {
                        if (!projectInput) return;
                        setIsLoadingAI(true);
                        try {
                          const res = await fetch('/api/ai/project-suggestions', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              projectType: 'مظلات',
                              location: 'جدة',
                              budget: '5000',
                              description: projectInput,
                            }),
                          });
                          const data = await res.json();
                          setAiSuggestions(data.suggestions);
                        } finally {
                          setIsLoadingAI(false);
                        }
                      }}
                      disabled={isLoadingAI || !projectInput}
                      className="w-full bg-primary text-white py-2 rounded-lg font-bold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoadingAI ? <Loader className="animate-spin w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      احصل على الاقتراحات
                    </button>
                  </div>

                  {aiSuggestions && (
                    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg space-y-2">
                      <p><strong>العنوان:</strong> {aiSuggestions.title}</p>
                      <p><strong>الوصف:</strong> {aiSuggestions.description}</p>
                      <div>
                        <strong>الكلمات المفتاحية:</strong>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(aiSuggestions.keywords || []).map((kw: string) => (
                            <span key={kw} className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* AI Features Info */}
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg border-l-4 border-green-500">
                    <p className="font-bold">📝 مولد المقالات</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">اذهب لـ /admin/ai-tools لكتابة مقالات بناء على المنافسين</p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg border-l-4 border-purple-500">
                    <p className="font-bold">🖼️ اختيار الصور</p>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">اختر صور مناسبة تلقائياً للمحتوى</p>
                  </div>
                </div>

                <Link href="/admin/ai-tools" className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90">
                  🚀 لوحة أدوات AI المتقدمة
                </Link>
              </div>
            )}

            {activeTab === 'google' && (
              <div className="space-y-6">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-bold">🔍 Google API Tools</h3>
                </div>

                {/* Google API Status */}
                <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg border-2 border-blue-200 dark:border-blue-800">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold">Google API Key</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${process.env.GOOGLE_API_KEY ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {process.env.GOOGLE_API_KEY ? '✅ متصل' : '❌ غير متصل'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      تُستخدم لـ: بحث الصور، Gemini AI، معالجة الصور الذكية
                    </p>
                  </div>
                </div>

                {/* Google Services Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500">
                    <p className="font-bold text-lg">📸 بحث الصور</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      ابحث عن صور عالية الجودة باستخدام Google Custom Search
                    </p>
                    <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-blue-600">
                      بحث الصور
                    </button>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border-l-4 border-purple-500">
                    <p className="font-bold text-lg">🤖 Gemini AI</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                      استخدم Gemini للمحادثات الذكية وتحليل المحتوى
                    </p>
                    <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-lg text-sm font-bold hover:bg-purple-600">
                      Gemini Chat
                    </button>
                  </div>
                </div>

                {/* Setup Instructions */}
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border-l-4 border-amber-500">
                  <p className="font-bold text-amber-900 dark:text-amber-200 mb-2">⚙️ إعداد Google API</p>
                  <ol className="text-sm space-y-1 text-amber-800 dark:text-amber-300 list-decimal list-inside">
                    <li>اذهب إلى: <a href="https://console.cloud.google.com" target="_blank" className="underline">Google Cloud Console</a></li>
                    <li>أنشئ مشروع جديد</li>
                    <li>فعّل Gemini API و Custom Search API</li>
                    <li>أنسخ المفاتيح إلى Secrets</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
