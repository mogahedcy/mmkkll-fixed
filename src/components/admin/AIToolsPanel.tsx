'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, Sparkles, FileText, Image as ImageIcon, Lightbulb } from 'lucide-react';

export function AIToolsPanel() {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'articles' | 'images'>('suggestions');
  const [isLoading, setIsLoading] = useState(false);

  // Project Suggestions
  const [projectForm, setProjectForm] = useState({
    projectType: 'مظلات',
    location: 'المرجان',
    budget: '5000',
    description: '',
  });
  const [projectSuggestions, setProjectSuggestions] = useState<any>(null);

  // Article Generator
  const [articleForm, setArticleForm] = useState({
    topic: '',
    keywords: '',
    competitors: '',
  });
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);

  // Image Selector
  const [imageForm, setImageForm] = useState({
    content: '',
    projectType: 'مظلات',
  });
  const [selectedImages, setSelectedImages] = useState<any>(null);

  // Functions
  const handleProjectSuggestions = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/project-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm),
      });
      const data = await res.json();
      setProjectSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateArticle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: articleForm.topic,
          keywords: articleForm.keywords.split(',').map((k) => k.trim()),
          competitors: articleForm.competitors.split(',').map((c) => c.trim()),
        }),
      });
      const data = await res.json();
      setGeneratedArticle(data.article);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectImages = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/select-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(imageForm),
      });
      const data = await res.json();
      setSelectedImages(data.images);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-to-r from-primary to-accent p-3 rounded-lg">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">أدوات AI الذكية</h2>
          <p className="text-gray-600 dark:text-gray-400">أتمتة تلقائية احترافية للمحتوى والمشاريع</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'suggestions', label: 'اقتراحات المشاريع', icon: Lightbulb },
          { id: 'articles', label: 'مولد المقالات', icon: FileText },
          { id: 'images', label: 'اختيار الصور', icon: ImageIcon },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <AnimatePresence mode="wait">
          {/* Tab 1: Project Suggestions */}
          {activeTab === 'suggestions' && (
            <motion.div
              key="suggestions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">💡 اقتراحات ذكية للمشاريع</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="نوع المشروع"
                  value={projectForm.projectType}
                  onChange={(e) => setProjectForm({ ...projectForm, projectType: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                />
                <input
                  type="text"
                  placeholder="الموقع"
                  value={projectForm.location}
                  onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                />
                <input
                  type="number"
                  placeholder="الميزانية"
                  value={projectForm.budget}
                  onChange={(e) => setProjectForm({ ...projectForm, budget: e.target.value })}
                  className="px-4 py-2 border rounded-lg dark:bg-gray-700"
                />
                <textarea
                  placeholder="وصف إضافي"
                  value={projectForm.description}
                  onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                  className="px-4 py-2 border rounded-lg md:col-span-2 dark:bg-gray-700"
                  rows={2}
                />
              </div>
              <motion.button
                onClick={handleProjectSuggestions}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader className="animate-spin" /> : <Sparkles />}
                {isLoading ? 'جاري التحليل...' : 'احصل على الاقتراحات'}
              </motion.button>

              {projectSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg space-y-3"
                >
                  <div>
                    <p className="font-bold text-sm text-gray-600 dark:text-gray-300">العنوان المقترح:</p>
                    <p className="text-lg font-bold">{projectSuggestions.title}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600 dark:text-gray-300">الوصف:</p>
                    <p>{projectSuggestions.description}</p>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-600 dark:text-gray-300">الكلمات المفتاحية:</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(projectSuggestions.keywords || []).map((kw: string) => (
                        <span key={kw} className="px-3 py-1 bg-primary text-white rounded-full text-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Tab 2: Article Generator */}
          {activeTab === 'articles' && (
            <motion.div
              key="articles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">📝 مولد المقالات الذكي</h3>
              <textarea
                placeholder="موضوع المقالة"
                value={articleForm.topic}
                onChange={(e) => setArticleForm({ ...articleForm, topic: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                rows={2}
              />
              <input
                type="text"
                placeholder="الكلمات المفتاحية (مفصولة بـ ,)"
                value={articleForm.keywords}
                onChange={(e) => setArticleForm({ ...articleForm, keywords: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
              <input
                type="text"
                placeholder="مواقع المنافسين (مفصولة بـ ,)"
                value={articleForm.competitors}
                onChange={(e) => setArticleForm({ ...articleForm, competitors: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              />
              <motion.button
                onClick={handleGenerateArticle}
                disabled={isLoading || !articleForm.topic}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader className="animate-spin" /> : <FileText />}
                {isLoading ? 'جاري الكتابة...' : 'توليد المقالة'}
              </motion.button>

              {generatedArticle && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 dark:bg-green-900 rounded-lg space-y-3"
                >
                  <div>
                    <p className="font-bold">العنوان:</p>
                    <p className="text-lg">{generatedArticle.title}</p>
                  </div>
                  <div>
                    <p className="font-bold">Meta Description:</p>
                    <p className="text-sm">{generatedArticle.metaDescription}</p>
                  </div>
                  <div>
                    <p className="font-bold">المحتوى (معاينة):</p>
                    <p className="text-sm line-clamp-3">{generatedArticle.content?.substring(0, 200)}...</p>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-lg">
                    نسخ المقالة كاملة
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Tab 3: Image Selector */}
          {activeTab === 'images' && (
            <motion.div
              key="images"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-bold mb-4">🖼️ اختيار الصور الذكي</h3>
              <textarea
                placeholder="محتوى المقالة أو وصف المشروع"
                value={imageForm.content}
                onChange={(e) => setImageForm({ ...imageForm, content: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
                rows={4}
              />
              <select
                value={imageForm.projectType}
                onChange={(e) => setImageForm({ ...imageForm, projectType: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700"
              >
                <option>مظلات</option>
                <option>برجولات</option>
                <option>سواتر</option>
              </select>
              <motion.button
                onClick={handleSelectImages}
                disabled={isLoading || !imageForm.content}
                whileHover={{ scale: 1.02 }}
                className="w-full bg-gradient-to-r from-primary to-accent text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? <Loader className="animate-spin" /> : <ImageIcon />}
                {isLoading ? 'جاري البحث...' : 'اختر الصور'}
              </motion.button>

              {selectedImages && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 grid gap-4"
                >
                  {selectedImages.map((img: any, idx: number) => (
                    <div key={idx} className="border rounded-lg overflow-hidden">
                      <img src={img.url} alt={img.altText} className="w-full h-48 object-cover" />
                      <div className="p-3 bg-gray-50 dark:bg-gray-700">
                        <p className="text-sm font-bold">{img.altText}</p>
                        <p className="text-xs text-gray-600">البحث: {img.searchTerm}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
