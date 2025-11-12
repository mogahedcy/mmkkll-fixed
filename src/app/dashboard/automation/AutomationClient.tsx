'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Sparkles,
  Wrench,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  FileText,
  Calendar,
  Zap,
  Settings,
  Play,
  Info
} from 'lucide-react';

interface TopicInput {
  id: string;
  topic: string;
  keywords: string;
  category: string;
}

interface GenerationResult {
  topic: string;
  status: 'success' | 'failed';
  articleId?: string;
  error?: string;
}

interface FixResult {
  type: string;
  status: 'success' | 'failed';
  itemId: string;
  itemTitle: string;
  changes?: string[];
  error?: string;
}

export default function AutomationClient() {
  const [activeTab, setActiveTab] = useState<'generate' | 'fix' | 'schedule'>('generate');
  
  const [topics, setTopics] = useState<TopicInput[]>([
    { id: '1', topic: '', keywords: '', category: 'برجولات' }
  ]);
  const [shouldPublish, setShouldPublish] = useState(false);
  const [generationLoading, setGenerationLoading] = useState(false);
  const [generationResults, setGenerationResults] = useState<GenerationResult[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);

  const [fixLoading, setFixLoading] = useState(false);
  const [fixResults, setFixResults] = useState<FixResult[]>([]);
  const [fixProgress, setFixProgress] = useState(0);

  const [scheduleSettings, setScheduleSettings] = useState({
    generateEnabled: false,
    generateFrequency: 'daily',
    generateCount: 3,
    fixEnabled: false,
    fixFrequency: 'weekly',
  });

  const addTopic = () => {
    setTopics([
      ...topics,
      { id: Date.now().toString(), topic: '', keywords: '', category: 'برجولات' }
    ]);
  };

  const removeTopic = (id: string) => {
    setTopics(topics.filter(t => t.id !== id));
  };

  const updateTopic = (id: string, field: keyof TopicInput, value: string) => {
    setTopics(topics.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleGenerate = async () => {
    const validTopics = topics.filter(t => t.topic && t.keywords && t.category);
    
    if (validTopics.length === 0) {
      alert('يرجى إضافة موضوع واحد على الأقل مع جميع الحقول');
      return;
    }

    if (validTopics.length > 10) {
      alert('الحد الأقصى 10 مقالات في المرة الواحدة');
      return;
    }

    setGenerationLoading(true);
    setGenerationResults([]);
    setGenerationProgress(0);

    try {
      const response = await fetch('/api/ai-agent/generate-multiple-articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topics: validTopics,
          shouldPublish
        })
      });

      const data = await response.json();

      if (data.success) {
        setGenerationResults(data.results || []);
        setGenerationProgress(100);
      } else {
        alert(data.error || 'حدث خطأ أثناء التوليد');
      }
    } catch (error: any) {
      alert('حدث خطأ في الاتصال');
      console.error(error);
    } finally {
      setGenerationLoading(false);
    }
  };

  const handleAutoFix = async () => {
    setFixLoading(true);
    setFixResults([]);
    setFixProgress(0);

    try {
      const response = await fetch('/api/ai-agent/auto-fix-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await response.json();

      if (data.success) {
        setFixResults(data.results || []);
        setFixProgress(100);
      } else {
        alert(data.error || 'حدث خطأ أثناء الإصلاح');
      }
    } catch (error: any) {
      alert('حدث خطأ في الاتصال');
      console.error(error);
    } finally {
      setFixLoading(false);
    }
  };

  const tabs = [
    { id: 'generate', label: 'توليد المقالات', icon: Sparkles },
    { id: 'fix', label: 'إصلاح SEO', icon: Wrench },
    { id: 'schedule', label: 'الجدولة', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">
                الأتمتة الذكية
              </h1>
              <p className="text-xl text-gray-600">
                وفّر وقتك مع التوليد والإصلاح التلقائي المدعوم بالذكاء الاصطناعي
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={`flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                    : ''
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </Button>
            );
          })}
        </div>

        {activeTab === 'generate' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  توليد مقالات متعددة
                </h2>
                <Badge variant="outline" className="text-sm">
                  {topics.length}/10 مقالات
                </Badge>
              </div>

              <div className="space-y-4 mb-4">
                {topics.map((topic, index) => (
                  <div key={topic.id} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-700">مقال #{index + 1}</span>
                      {topics.length > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeTopic(topic.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">موضوع المقال</label>
                        <input
                          type="text"
                          value={topic.topic}
                          onChange={(e) => updateTopic(topic.id, 'topic', e.target.value)}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="مثال: أفضل أنواع البرجولات الخشبية في جدة"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">الكلمات المفتاحية (مفصولة بفواصل)</label>
                        <input
                          type="text"
                          value={topic.keywords}
                          onChange={(e) => updateTopic(topic.id, 'keywords', e.target.value)}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="برجولات خشبية، برجولات جدة، تركيب برجولات"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">التصنيف</label>
                        <select
                          value={topic.category}
                          onChange={(e) => updateTopic(topic.id, 'category', e.target.value)}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="برجولات">برجولات</option>
                          <option value="مظلات">مظلات</option>
                          <option value="حدائق">حدائق</option>
                          <option value="ديكورات">ديكورات</option>
                          <option value="عام">عام</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={addTopic}
                variant="outline"
                className="w-full mb-4"
                disabled={topics.length >= 10}
              >
                <Plus className="w-4 h-4 ml-2" />
                إضافة مقال آخر
              </Button>

              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="shouldPublish"
                  checked={shouldPublish}
                  onChange={(e) => setShouldPublish(e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="shouldPublish" className="text-sm font-medium text-blue-900">
                  نشر المقالات تلقائياً بعد التوليد
                </label>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={generationLoading || topics.every(t => !t.topic || !t.keywords)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                {generationLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري التوليد... ({Math.round(generationProgress)}%)
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 ml-2" />
                    بدء التوليد التلقائي
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                النتائج
              </h2>

              {!generationResults.length && !generationLoading && (
                <div className="text-center py-12 text-gray-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>النتائج ستظهر هنا بعد بدء التوليد</p>
                </div>
              )}

              {generationLoading && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-purple-600 animate-spin" />
                  <p className="text-gray-600 mb-4">جاري توليد المقالات...</p>
                  <Progress value={generationProgress} className="w-full" />
                </div>
              )}

              {generationResults.length > 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 mb-1">نجح</div>
                      <div className="text-3xl font-bold text-green-900">
                        {generationResults.filter(r => r.status === 'success').length}
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-red-600 mb-1">فشل</div>
                      <div className="text-3xl font-bold text-red-900">
                        {generationResults.filter(r => r.status === 'failed').length}
                      </div>
                    </div>
                  </div>

                  {generationResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${
                        result.status === 'success'
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {result.status === 'success' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                        )}
                        <div className="flex-1">
                          <div className="font-medium">{result.topic}</div>
                          {result.status === 'success' && result.articleId && (
                            <div className="text-sm text-gray-600 mt-1">
                              تم إنشاء المقال بنجاح! رقم المقال: {result.articleId}
                            </div>
                          )}
                          {result.status === 'failed' && result.error && (
                            <div className="text-sm text-red-600 mt-1">{result.error}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'fix' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Wrench className="w-6 h-6 text-blue-600" />
                إصلاح SEO التلقائي
              </h2>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">ماذا يفعل الإصلاح التلقائي؟</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>إصلاح النصوص البديلة المفقودة للصور</li>
                      <li>تحسين العناوين والأوصاف</li>
                      <li>إصلاح المحتوى المكرر</li>
                      <li>تحسين الكلمات المفتاحية</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAutoFix}
                disabled={fixLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
              >
                {fixLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                    جاري الإصلاح... ({Math.round(fixProgress)}%)
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 ml-2" />
                    بدء الإصلاح التلقائي
                  </>
                )}
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-600" />
                نتائج الإصلاح
              </h2>

              {!fixResults.length && !fixLoading && (
                <div className="text-center py-12 text-gray-500">
                  <Wrench className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>النتائج ستظهر هنا بعد بدء الإصلاح</p>
                </div>
              )}

              {fixLoading && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-600 animate-spin" />
                  <p className="text-gray-600 mb-4">جاري فحص وإصلاح المشاكل...</p>
                  <Progress value={fixProgress} className="w-full" />
                </div>
              )}

              {fixResults.length > 0 && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-sm text-green-600 mb-1">تم الإصلاح</div>
                      <div className="text-3xl font-bold text-green-900">
                        {fixResults.filter(r => r.status === 'success').length}
                      </div>
                    </div>
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-sm text-red-600 mb-1">فشل</div>
                      <div className="text-3xl font-bold text-red-900">
                        {fixResults.filter(r => r.status === 'failed').length}
                      </div>
                    </div>
                  </div>

                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {fixResults.map((result, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border ${
                          result.status === 'success'
                            ? 'bg-green-50 border-green-200'
                            : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {result.status === 'success' ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <div className="font-medium">{result.itemTitle}</div>
                            <div className="text-sm text-gray-600 mt-1">النوع: {result.type}</div>
                            {result.status === 'success' && result.changes && (
                              <div className="text-sm text-gray-600 mt-2">
                                <div className="font-medium">التغييرات:</div>
                                <ul className="list-disc list-inside mt-1">
                                  {result.changes.map((change, i) => (
                                    <li key={i}>{change}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {result.status === 'failed' && result.error && (
                              <div className="text-sm text-red-600 mt-1">{result.error}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}

        {activeTab === 'schedule' && (
          <Card className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings className="w-6 h-6 text-purple-600" />
              إعدادات الجدولة
            </h2>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">ملاحظة مهمة</p>
                  <p>
                    الجدولة التلقائية تتطلب إعداد Cron job منفصل. الإعدادات هنا هي للمرجع فقط.
                    يمكنك حفظ تفضيلاتك، ولكن ستحتاج إلى تكوين نظام الجدولة بشكل منفصل لتفعيلها.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    توليد المقالات التلقائي
                  </h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={scheduleSettings.generateEnabled}
                      onChange={(e) => setScheduleSettings({
                        ...scheduleSettings,
                        generateEnabled: e.target.checked
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">مفعّل</span>
                  </label>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">التكرار</label>
                    <select
                      value={scheduleSettings.generateFrequency}
                      onChange={(e) => setScheduleSettings({
                        ...scheduleSettings,
                        generateFrequency: e.target.value
                      })}
                      className="w-full p-2 border rounded-lg"
                      disabled={!scheduleSettings.generateEnabled}
                    >
                      <option value="daily">يومياً</option>
                      <option value="weekly">أسبوعياً</option>
                      <option value="monthly">شهرياً</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      عدد المقالات لكل دفعة: {scheduleSettings.generateCount}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scheduleSettings.generateCount}
                      onChange={(e) => setScheduleSettings({
                        ...scheduleSettings,
                        generateCount: parseInt(e.target.value)
                      })}
                      className="w-full"
                      disabled={!scheduleSettings.generateEnabled}
                    />
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    إصلاح SEO التلقائي
                  </h3>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={scheduleSettings.fixEnabled}
                      onChange={(e) => setScheduleSettings({
                        ...scheduleSettings,
                        fixEnabled: e.target.checked
                      })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">مفعّل</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">التكرار</label>
                  <select
                    value={scheduleSettings.fixFrequency}
                    onChange={(e) => setScheduleSettings({
                      ...scheduleSettings,
                      fixFrequency: e.target.value
                    })}
                    className="w-full p-2 border rounded-lg"
                    disabled={!scheduleSettings.fixEnabled}
                  >
                    <option value="daily">يومياً</option>
                    <option value="weekly">أسبوعياً</option>
                    <option value="monthly">شهرياً</option>
                  </select>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700">
                <CheckCircle2 className="w-4 h-4 ml-2" />
                حفظ الإعدادات
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
