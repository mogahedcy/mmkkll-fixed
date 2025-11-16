'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Filter,
  Loader2,
  RefreshCw,
  HelpCircle,
  Check,
  X,
  Star,
  ArrowUpDown
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  status: string;
  featured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export default function FAQsPage() {
  const router = useRouter();
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState('order');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    category: 'مظلات',
    order: 0,
    featured: false,
    status: 'PUBLISHED'
  });

  const categories = [
    'مظلات',
    'سواتر',
    'برجولات',
    'تنسيق حدائق',
    'ساندوتش بانل',
    'ترميم',
    'بيوت شعر',
    'خيام ملكية',
    'عام'
  ];

  useEffect(() => {
    fetchFAQs();
  }, [selectedCategory, selectedStatus]);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedStatus !== 'all') params.append('status', selectedStatus);
      
      const response = await fetch(`/api/faqs?${params.toString()}`);
      const data = await response.json();
      
      if (data.success) {
        setFaqs(data.faqs || []);
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingFaq ? `/api/faqs/${editingFaq.id}` : '/api/faqs';
      const method = editingFaq ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (data.success) {
        setShowAddModal(false);
        setEditingFaq(null);
        setFormData({
          question: '',
          answer: '',
          category: 'مظلات',
          order: 0,
          featured: false,
          status: 'PUBLISHED'
        });
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا السؤال؟')) return;
    
    try {
      const response = await fetch(`/api/faqs/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchFAQs();
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      order: faq.order,
      featured: faq.featured,
      status: faq.status
    });
    setShowAddModal(true);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'order') return a.order - b.order;
    if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === 'views') return b.views - a.views;
    return 0;
  });

  const stats = {
    total: faqs.length,
    published: faqs.filter(f => f.status === 'PUBLISHED').length,
    featured: faqs.filter(f => f.featured).length,
    totalViews: faqs.reduce((sum, f) => sum + f.views, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100" dir="rtl">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                إدارة الأسئلة الشائعة
              </h1>
              <p className="text-gray-600">
                إدارة الأسئلة والأجوبة الشائعة لجميع الخدمات
              </p>
            </div>
            <Button 
              onClick={() => {
                setEditingFaq(null);
                setFormData({
                  question: '',
                  answer: '',
                  category: 'مظلات',
                  order: 0,
                  featured: false,
                  status: 'PUBLISHED'
                });
                setShowAddModal(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
            >
              <Plus className="w-4 h-4 ml-2" />
              إضافة سؤال جديد
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">إجمالي الأسئلة</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
                </div>
                <HelpCircle className="w-8 h-8 text-blue-600 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">منشورة</p>
                  <p className="text-2xl font-bold text-green-900">{stats.published}</p>
                </div>
                <Check className="w-8 h-8 text-green-600 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">مميزة</p>
                  <p className="text-2xl font-bold text-purple-900">{stats.featured}</p>
                </div>
                <Star className="w-8 h-8 text-purple-600 opacity-50" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">المشاهدات</p>
                  <p className="text-2xl font-bold text-orange-900">{stats.totalViews}</p>
                </div>
                <Eye className="w-8 h-8 text-orange-600 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="بحث في الأسئلة والأجوبة..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
              </div>
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الفئات</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">جميع الحالات</option>
              <option value="PUBLISHED">منشور</option>
              <option value="DRAFT">مسودة</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="order">الترتيب</option>
              <option value="newest">الأحدث</option>
              <option value="views">الأكثر مشاهدة</option>
            </select>

            <Button
              onClick={fetchFAQs}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              تحديث
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : filteredFaqs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <HelpCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 text-lg">لا توجد أسئلة شائعة</p>
            <Button onClick={() => setShowAddModal(true)} className="mt-4">
              <Plus className="w-4 h-4 ml-2" />
              إضافة أول سؤال
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {filteredFaqs.map((faq) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                        <Badge 
                          variant={faq.status === 'PUBLISHED' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {faq.status === 'PUBLISHED' ? 'منشور' : 'مسودة'}
                        </Badge>
                        {faq.featured && (
                          <Badge variant="default" className="text-xs bg-purple-600">
                            <Star className="w-3 h-3 ml-1" />
                            مميز
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500">
                          الترتيب: {faq.order}
                        </span>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {faq.answer}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {faq.views} مشاهدة
                        </span>
                        <span>
                          {new Date(faq.createdAt).toLocaleDateString('ar-SA')}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(faq)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(faq.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingFaq ? 'تعديل السؤال' : 'إضافة سؤال جديد'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  السؤال *
                </label>
                <Input
                  type="text"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="أدخل السؤال"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الإجابة *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  placeholder="أدخل الإجابة"
                  required
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الفئة *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الترتيب
                  </label>
                  <Input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الحالة
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="PUBLISHED">منشور</option>
                    <option value="DRAFT">مسودة</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-8">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 text-blue-600"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    سؤال مميز
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingFaq ? 'حفظ التعديلات' : 'إضافة السؤال'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingFaq(null);
                  }}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
