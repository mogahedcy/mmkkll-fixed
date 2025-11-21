'use client';

import { useState } from 'react';
import { Loader, Sparkles } from 'lucide-react';

export default function AIToolsPage() {
  const [tab, setTab] = useState('articles');
  const [isLoading, setIsLoading] = useState(false);
  
  const [articleForm, setArticleForm] = useState({
    topic: '',
    keywords: '',
  });
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);

  const handleGenerateArticle = async () => {
    if (!articleForm.topic) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: articleForm.topic,
          keywords: articleForm.keywords.split(',').map((k) => k.trim()),
        }),
      });
      const data = await res.json();
      setGeneratedArticle(data.article);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">✨ أدوات AI الذكية</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">أتمتة احترافية لمحتواك</p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          <button onClick={() => setTab('articles')} className={`px-4 py-2 font-bold border-b-2 ${tab === 'articles' ? 'border-primary text-primary' : 'border-transparent'}`}>
            📝 المقالات
          </button>
        </div>

        {tab === 'articles' && (
          <div className="space-y-4">
            <textarea
              placeholder="موضوع المقالة"
              value={articleForm.topic}
              onChange={(e) => setArticleForm({ ...articleForm, topic: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              rows={3}
            />
            <input
              type="text"
              placeholder="الكلمات المفتاحية (مفصولة بـ ,)"
              value={articleForm.keywords}
              onChange={(e) => setArticleForm({ ...articleForm, keywords: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
            />
            <button
              onClick={handleGenerateArticle}
              disabled={isLoading || !articleForm.topic}
              className="w-full bg-primary text-white py-2 rounded-lg font-bold flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
              {isLoading ? 'جاري الكتابة...' : 'اكتب المقالة'}
            </button>

            {generatedArticle && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg space-y-3">
                <p><strong>العنوان:</strong> {generatedArticle.title}</p>
                <p><strong>Meta Description:</strong> {generatedArticle.metaDescription}</p>
                <details className="cursor-pointer">
                  <summary className="font-bold">المحتوى</summary>
                  <p className="mt-2 text-sm">{generatedArticle.content?.substring(0, 500)}...</p>
                </details>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
