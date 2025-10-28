'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Star,
  User,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreVertical,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number;
  likes: number;
  dislikes: number;
  createdAt: string;
  avatar?: string;
  userLiked?: boolean;
  userDisliked?: boolean;
}

interface ProjectCommentsSectionProps {
  projectId: string;
  projectTitle: string;
  initialComments?: Comment[];
}

export default function ProjectCommentsSection({ 
  projectId, 
  projectTitle,
  initialComments = []
}: ProjectCommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating' | 'popular'>('newest');
  const [filterByRating, setFilterByRating] = useState<number | null>(null);

  // جلب التعليقات عند تحميل المكون
  useEffect(() => {
    fetchComments();
  }, [projectId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/projects/${projectId}/comments`);
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
      }
    } catch (error) {
      console.error('خطأ في جلب التعليقات:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.name.trim() || !newComment.message.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/projects/${projectId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newComment.name,
          email: newComment.email,
          message: newComment.message,
          rating: newComment.rating
        }),
      });

      if (response.ok) {
        const data = await response.json();

        // إضافة التعليق الجديد للقائمة
        const commentWithAvatar = {
          ...data.comment,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(newComment.name)}&background=059669&color=fff`,
          likes: 0,
          dislikes: 0
        };

        setComments(prev => [commentWithAvatar, ...prev]);

        // إعادة تعيين النموذج
        setNewComment({
          name: '',
          email: '',
          message: '',
          rating: 5
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'حدث خطأ أثناء إضافة التعليق');
      }
    } catch (error) {
      console.error('خطأ في إرسال التعليق:', error);
      setError('حدث خطأ في الاتصال. يرجى المحاولة لاحقاً');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingChange = (rating: number) => {
    setNewComment(prev => ({ ...prev, rating }));
  };

  const calculateAverageRating = () => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rating, 0);
    return (sum / comments.length).toFixed(1);
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    comments.forEach(comment => {
      distribution[comment.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const handleLikeComment = async (commentId: string, type: 'like' | 'dislike') => {
    try {
      const response = await fetch(`/api/projects/${projectId}/comments/${commentId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });

      if (response.ok) {
        const data = await response.json();
        setComments(prev => 
          prev.map(comment => 
            comment.id === commentId 
              ? { 
                  ...comment, 
                  likes: data.likes, 
                  dislikes: data.dislikes,
                  userLiked: type === 'like' && data.userAction !== 'removed',
                  userDisliked: type === 'dislike' && data.userAction !== 'removed'
                } 
              : comment
          )
        );
      }
    } catch (error) {
      console.error('خطأ في الإعجاب بالتعليق:', error);
    }
  };

  const handleSortComments = (sortBy: 'newest' | 'oldest' | 'rating' | 'popular') => {
    const sortedComments = [...comments].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return (b.likes - b.dislikes) - (a.likes - a.dislikes);
        default:
          return 0;
      }
    });
    setComments(sortedComments);
  };

  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && handleRatingChange(star)}
            className={`${size} ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-all duration-200`}
          >
            <Star
              className={`w-full h-full ${
                star <= rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  const distribution = getRatingDistribution();
  const averageRating = calculateAverageRating();

  return (
    <section className="mt-12 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 rounded-3xl shadow-2xl border border-blue-100/50 p-8">
      {/* عنوان القسم المطور */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center">
          <div className="relative">
            <motion.div
              animate={{ rotate: [0, 5, 0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-30"
            />
            <MessageCircle className="w-10 h-10 text-blue-600 ml-4 relative z-10" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 flex items-center gap-2">
              التقييمات والتعليقات
              <Sparkles className="w-6 h-6 text-purple-500" />
            </h2>
            <p className="text-gray-600 text-base mt-2 font-medium">
              شاركنا رأيك وساعد الآخرين على اتخاذ قرارهم
            </p>
          </div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg"
        >
          <div className="text-2xl">{comments.length}</div>
          <div className="text-xs">تقييم</div>
        </motion.div>
      </div>

      {/* إحصائيات التقييم المطورة */}
      {comments.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 rounded-3xl p-8 mb-10 border-2 border-amber-200/50 shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-yellow-200/30 to-amber-200/30 rounded-full blur-3xl" />
          
          <div className="grid md:grid-cols-2 gap-8 relative z-10">
            {/* التقييم العام */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-3xl blur-xl opacity-50" />
                  <div className="relative bg-white rounded-3xl p-6 shadow-xl">
                    <Award className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600 mb-3">
                      {averageRating}
                    </div>
                    <div className="flex justify-center mb-3">
                      {renderStars(Math.round(Number.parseFloat(averageRating.toString())), false, 'w-6 h-6')}
                    </div>
                    <p className="text-gray-700 font-bold text-lg">
                      من أصل {comments.length} تقييم
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* توزيع التقييمات */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                توزيع التقييمات
              </h3>
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = distribution[rating as keyof typeof distribution];
                const percentage = comments.length > 0 ? (count / comments.length) * 100 : 0;
                return (
                  <motion.div 
                    key={rating} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: rating * 0.1 }}
                  >
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-bold w-3">{rating}</span>
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-white rounded-full h-3 shadow-inner relative overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: rating * 0.1 }}
                        className="bg-gradient-to-r from-amber-400 to-orange-400 h-3 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </motion.div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-700 w-8 text-center">{count}</span>
                      <span className="text-xs text-gray-500 w-12 text-center">({percentage.toFixed(0)}%)</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* رسائل النجاح والخطأ */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-6 p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl flex items-center shadow-lg"
          >
            <CheckCircle className="w-6 h-6 text-green-600 ml-4 flex-shrink-0" />
            <div>
              <h4 className="font-bold text-green-800 mb-1">تم بنجاح!</h4>
              <span className="text-green-700">تم إضافة تعليقك وسيظهر بعد المراجعة</span>
            </div>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-6 p-5 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl flex items-center shadow-lg"
          >
            <AlertCircle className="w-6 h-6 text-red-600 ml-4 flex-shrink-0" />
            <span className="text-red-800 font-medium">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* نموذج إضافة تعليق */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-2xl p-8 mb-10 border-2 border-gray-200/50 shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          أضف تقييمك وتعليقك
        </h3>

        <form onSubmit={handleSubmitComment} className="space-y-6">
          {/* التقييم */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              تقييمك للمشروع *
            </label>
            <div className="flex items-center gap-4 bg-white rounded-xl p-4 border-2 border-gray-200">
              {renderStars(newComment.rating, true, 'w-10 h-10')}
              <span className="text-xl font-bold text-gray-700 bg-blue-100 px-4 py-2 rounded-lg">
                ({newComment.rating} من 5)
              </span>
            </div>
          </div>

          {/* معلومات المستخدم */}
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                الاسم الكريم *
              </label>
              <Input
                type="text"
                required
                value={newComment.name}
                onChange={(e) => setNewComment(prev => ({ ...prev, name: e.target.value }))}
                placeholder="اكتب اسمك"
                className="transition-all duration-300 focus:ring-4 focus:ring-blue-200 border-2 h-12 text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                البريد الإلكتروني (اختياري)
              </label>
              <Input
                type="email"
                value={newComment.email}
                onChange={(e) => setNewComment(prev => ({ ...prev, email: e.target.value }))}
                placeholder="your@email.com"
                className="transition-all duration-300 focus:ring-4 focus:ring-blue-200 border-2 h-12 text-base"
              />
            </div>
          </div>

          {/* التعليق */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              تعليقك *
            </label>
            <Textarea
              rows={5}
              required
              value={newComment.message}
              onChange={(e) => setNewComment(prev => ({ ...prev, message: e.target.value }))}
              placeholder="شاركنا رأيك في هذا المشروع..."
              className="transition-all duration-300 focus:ring-4 focus:ring-blue-200 border-2 text-base"
            />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="flex items-center gap-3 px-8 py-4 h-auto text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإرسال...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    إرسال التعليق
                  </>
                )}
              </Button>
            </motion.div>

            <div className="flex items-center text-sm text-gray-600 bg-blue-50 px-4 py-2 rounded-lg">
              <AlertCircle className="w-4 h-4 ml-2" />
              سيتم مراجعة التعليق قبل النشر
            </div>
          </div>
        </form>
      </motion.div>

      {/* قائمة التعليقات */}
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-blue-600" />
            التعليقات ({comments.length})
          </h3>

          {/* أدوات التصفية والترتيب */}
          {comments.length > 0 && (
            <div className="flex items-center gap-4 flex-wrap">
              {/* ترتيب التعليقات */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700">ترتيب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    const newSortBy = e.target.value as 'newest' | 'oldest' | 'rating' | 'popular';
                    setSortBy(newSortBy);
                    handleSortComments(newSortBy);
                  }}
                  className="text-sm font-medium border-2 border-gray-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="newest">الأحدث</option>
                  <option value="oldest">الأقدم</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="popular">الأكثر شعبية</option>
                </select>
              </div>

              {/* تصفية حسب التقييم */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-gray-700">تصفية:</span>
                <select
                  value={filterByRating || ''}
                  onChange={(e) => setFilterByRating(e.target.value ? Number.parseInt(e.target.value) : null)}
                  className="text-sm font-medium border-2 border-gray-300 rounded-xl px-4 py-2 focus:ring-4 focus:ring-blue-200 focus:border-blue-500"
                >
                  <option value="">جميع التقييمات</option>
                  <option value="5">⭐ 5 نجوم</option>
                  <option value="4">⭐ 4 نجوم</option>
                  <option value="3">⭐ 3 نجوم</option>
                  <option value="2">⭐ 2 نجمة</option>
                  <option value="1">⭐ نجمة واحدة</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">جاري تحميل التعليقات...</p>
          </div>
        ) : comments.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border-2 border-dashed border-gray-300"
          >
            <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h4 className="text-xl font-bold text-gray-600 mb-2">
              لا توجد تعليقات بعد
            </h4>
            <p className="text-gray-500 text-lg">
              كن أول من يقيم هذا المشروع ويترك تعليقاً
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {comments
              .filter(comment => filterByRating ? comment.rating === filterByRating : true)
              .map((comment, index) => {
                const netScore = comment.likes - comment.dislikes;
                return (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* رأس التعليق */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="w-14 h-14 rounded-full overflow-hidden ml-4 ring-4 ring-blue-100">
                            <img
                              src={comment.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.name)}&background=059669&color=fff`}
                              alt={comment.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          {netScore > 5 && (
                            <div className="absolute -top-1 -left-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full p-1">
                              <Award className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {comment.name}
                          </h4>
                          <div className="flex items-center gap-4 mt-2">
                            {renderStars(comment.rating, false, 'w-5 h-5')}
                            <span className="text-sm text-gray-500 flex items-center bg-gray-100 px-3 py-1 rounded-lg">
                              <Calendar className="w-4 h-4 ml-1" />
                              {new Date(comment.createdAt).toLocaleDateString('ar-SA', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* محتوى التعليق */}
                    <p className="text-gray-700 leading-relaxed text-base mb-5 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      {comment.message}
                    </p>

                    {/* أزرار التفاعل */}
                    <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLikeComment(comment.id, 'like')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                          comment.userLiked 
                            ? 'bg-blue-100 text-blue-600 border-2 border-blue-300' 
                            : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-blue-50 hover:border-blue-200'
                        }`}
                      >
                        <ThumbsUp className={`w-5 h-5 ${comment.userLiked ? 'fill-current' : ''}`} />
                        <span className="font-bold">{comment.likes}</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleLikeComment(comment.id, 'dislike')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                          comment.userDisliked 
                            ? 'bg-red-100 text-red-600 border-2 border-red-300' 
                            : 'bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-red-50 hover:border-red-200'
                        }`}
                      >
                        <ThumbsDown className={`w-5 h-5 ${comment.userDisliked ? 'fill-current' : ''}`} />
                        <span className="font-bold">{comment.dislikes}</span>
                      </motion.button>

                      {netScore > 0 && (
                        <div className="mr-auto flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl border border-green-200">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-bold text-green-700">
                            تقييم مفيد (+{netScore})
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
          </div>
        )}
      </div>
    </section>
  );
}
