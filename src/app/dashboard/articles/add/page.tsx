'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  Calendar,
  Star,
  Tag,
  Save,
  Eye,
  Loader2,
  Plus,
  Play,
  FileText,
  User,
  BookOpen
} from 'lucide-react';

interface MediaFile {
  id: string;
  file: File;
  type: 'image' | 'video';
  preview: string;
  title: string;
  description: string;
  uploading?: boolean;
  uploaded?: boolean;
  uploadedUrl?: string;
}

const categories = [
  'مظلات سيارات',
  'برجولات',
  'سواتر',
  'ساندوتش بانل',
  'تنسيق حدائق',
  'هناجر',
  'كرانيش',
  'بيوت شعر',
  'خيام ملكية',
  'ترميم',
  'نصائح وإرشادات',
  'أخرى'
];

const SUGGESTED_TAGS = [
  'مظلات',
  'برجولات',
  'سواتر',
  'تنسيق حدائق',
  'جدة',
  'السعودية',
  'نصائح',
  'إرشادات',
  'تصميم',
  'جودة'
];

export default function AddArticlePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [author, setAuthor] = useState('محترفين الديار العالمية');
  const [category, setCategory] = useState('');
  const [featured, setFeatured] = useState(false);

  // Media and tags
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((files: FileList) => {
    const newFiles: MediaFile[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        const preview = URL.createObjectURL(file);

        newFiles.push({
          id,
          file,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          preview,
          title: file.name.split('.')[0],
          description: ''
        });
      }
    });

    setMediaFiles(prev => [...prev, ...newFiles]);
  }, []);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files?.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  // Remove media file
  const removeMediaFile = (id: string) => {
    setMediaFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  // Update media file info
  const updateMediaFile = (id: string, field: 'title' | 'description', value: string) => {
    setMediaFiles(prev => prev.map(file => 
      file.id === id ? { ...file, [field]: value } : file
    ));
  };

  // Handle tag input
  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addSuggestedTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  // Auto-generate excerpt from content
  const handleContentChange = (value: string) => {
    setContent(value);
    if (!excerpt && value.length > 150) {
      setExcerpt(value.substring(0, 150) + '...');
    }
  };

  // Upload media files
  const uploadMediaFiles = async (): Promise<Array<{ type: string; src: string; thumbnail?: string; title: string; description: string }>> => {
    const uploadedMedia = [];

    for (const mediaFile of mediaFiles) {
      const formData = new FormData();
      formData.append('file', mediaFile.file);
      formData.append('folder', 'articles');

      try {
        console.log('🔄 رفع ملف:', mediaFile.file.name);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ تم رفع الملف:', result);

          const fileUrl = result.files?.[0]?.src || result.files?.[0]?.url || result.secure_url || result.url;

          if (!fileUrl) {
            throw new Error('لم يتم الحصول على رابط الملف');
          }

          uploadedMedia.push({
            type: mediaFile.type.toUpperCase(),
            src: fileUrl,
            thumbnail: fileUrl,
            title: mediaFile.title,
            description: mediaFile.description
          });
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'فشل في رفع الملف');
        }
      } catch (error: any) {
        console.error('خطأ في رفع الملف:', error);
        throw new Error(`فشل في رفع الملف: ${mediaFile.file.name} - ${error.message}`);
      }
    }

    return uploadedMedia;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !category) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 بدء إضافة المقال...');

      // Upload media files first if any
      let uploadedMedia = [];
      if (mediaFiles.length > 0) {
        uploadedMedia = await uploadMediaFiles();
        console.log('📁 الملفات المرفوعة:', uploadedMedia);
      }

      // Create article
      const articleData = {
        title,
        content,
        excerpt: excerpt || content.substring(0, 200),
        author,
        category,
        featured,
        mediaItems: uploadedMedia,
        tags
      };

      console.log('📊 بيانات المقال:', articleData);

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        console.log('✅ تم إضافة المقال بنجاح');
        alert('تم إضافة المقال بنجاح!');
        router.push('/dashboard/articles');
      } else {
        console.error('❌ خطأ في إضافة المقال:', result);
        const message = (result && (result.error || result.message)) || 'فشل في إضافة المقال';
        alert(`خطأ: ${message}`);
      }
    } catch (error: any) {
      console.error('❌ خطأ في إضافة المقال:', error);
      alert(`خطأ في إضافة المقال: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إضافة مقال جديد</h1>
          <p className="text-gray-600">أضف مقال جديد إلى أرشيف المقالات</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">عنوان المقال *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="عنوان جذاب ومفيد..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">التصنيف *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر التصنيف</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    الكاتب
                  </label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="اسم الكاتب"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">محتوى المقال *</label>
                <Textarea
                  value={content}
                  onChange={(e) => handleContentChange(e.target.value)}
                  placeholder="اكتب محتوى المقال هنا..."
                  rows={12}
                  required
                  className="font-normal"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {content.length} حرف - وقت القراءة المتوقع: {Math.ceil(content.length / 1000)} دقائق
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">المقتطف (Excerpt)</label>
                <Textarea
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="ملخص قصير عن المقال..."
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {excerpt ? excerpt.length : 0} / 200 حرف
                </p>
              </div>

              <div className="flex items-center">
                <label className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    مقال مميز
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5" />
                الصور والفيديوهات
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => e.target.files && handleFileSelect(e.target.files)}
                  className="hidden"
                />

                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  اسحب الملفات هنا أو اختر ملفات
                </h3>
                <p className="text-gray-600 mb-4">
                  يدعم الصور والفيديوهات (JPG, PNG, MP4, MOV)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="w-4 h-4 ml-2" />
                  اختر ملفات
                </Button>
              </div>

              {/* Media Files */}
              {mediaFiles.length > 0 && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mediaFiles.map((mediaFile) => (
                    <div key={mediaFile.id} className="bg-white border rounded-lg p-4">
                      <div className="relative aspect-video mb-4 bg-gray-100 rounded-lg overflow-hidden">
                        {mediaFile.type === 'image' ? (
                          <Image
                            src={mediaFile.preview}
                            alt={mediaFile.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="relative w-full h-full">
                            <video
                              src={mediaFile.preview}
                              className="w-full h-full object-cover"
                              controls={false}
                            />
                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                              <Play className="w-12 h-12 text-white" />
                            </div>
                          </div>
                        )}

                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() => removeMediaFile(mediaFile.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="space-y-3">
                        <Input
                          value={mediaFile.title}
                          onChange={(e) => updateMediaFile(mediaFile.id, 'title', e.target.value)}
                          placeholder="عنوان الملف"
                        />
                        <Textarea
                          value={mediaFile.description}
                          onChange={(e) => updateMediaFile(mediaFile.id, 'description', e.target.value)}
                          placeholder="وصف الملف"
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="w-5 h-5" />
                الكلمات المفتاحية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="أضف كلمة مفتاحية..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag}>
                    إضافة
                  </Button>
                </div>

                {/* Current tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Suggested tags */}
                <div>
                  <p className="text-sm font-medium mb-2">اقتراحات:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_TAGS.filter(tag => !tags.includes(tag)).map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSuggestedTag(tag)}
                      >
                        #{tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المقال
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
