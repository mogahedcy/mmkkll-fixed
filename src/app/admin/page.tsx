'use client';

import { useState } from 'react';
import { BarChart3, Star, MessageSquare, Eye, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

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
          <div className="flex gap-4 mb-6 border-b border-gray-200 dark:border-gray-700">
            {['overview', 'projects', 'articles', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === tab
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab === 'overview' && 'نظرة عامة'}
                {tab === 'projects' && 'المشاريع'}
                {tab === 'articles' && 'المقالات'}
                {tab === 'reviews' && 'التقييمات'}
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
          </div>
        </div>
      </div>
    </div>
  );
}
