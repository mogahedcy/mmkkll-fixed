'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    projectType: 'مظلات',
    location: 'المرجان',
    budget: '',
    description: '',
  });
  const [suggestions, setSuggestions] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSuggestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/project-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setSuggestions(data.suggestions);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">إضافة مشروع جديد</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">نوع المشروع</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              >
                <option>مظلات</option>
                <option>برجولات</option>
                <option>سواتر</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">الموقع</label>
              <input
                type="text"
                placeholder="اختر موقع المشروع"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">الميزانية</label>
              <input
                type="number"
                placeholder="الميزانية بالريال"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">وصف المشروع</label>
              <textarea
                placeholder="صف المشروع..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
            </div>
            <button
              onClick={handleGetSuggestions}
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader className="animate-spin" /> : '✨'}
              احصل على اقتراحات ذكية
            </button>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-lg shadow-lg">
          {suggestions ? (
            <div className="space-y-4">
              <h3 className="text-lg font-bold">💡 الاقتراحات الذكية</h3>
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">العنوان المقترح:</p>
                <p className="text-xl font-bold mt-2">{suggestions.title}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">الوصف:</p>
                <p className="mt-2">{suggestions.description}</p>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-600 dark:text-gray-300">الكلمات المفتاحية:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(suggestions.keywords || []).map((kw: string) => (
                    <span key={kw} className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>املأ البيانات وانقر على "احصل على اقتراحات" لرؤية الاقتراحات الذكية 🚀</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
