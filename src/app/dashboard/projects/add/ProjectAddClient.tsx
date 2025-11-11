
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Save, 
  Upload, 
  Plus, 
  X, 
  Eye, 
  Calendar,
  MapPin,
  User,
  Clock,
  DollarSign,
  Tag,
  Package
} from 'lucide-react';

interface MediaItem {
  type: 'IMAGE' | 'VIDEO';
  src: string;
  title?: string;
  description?: string;
  alt?: string;
}

const categories = [
  'مظلات',
  'سواتر', 
  'برجولات',
  'تنسيق حدائق',
  'بيوت شعر',
  'خيام ملكية',
  'ترميم',
  'ساندوتش بانل'
];

export default function ProjectAddClient() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    completionDate: '',
    client: '',
    featured: false,
    projectDuration: '',
    projectCost: '',
    metaTitle: '',
    metaDescription: '',
    keywords: ''
  });

  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [materials, setMaterials] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [newMaterial, setNewMaterial] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // تحديث الـ meta data تلقائياً
    if (field === 'title' || field === 'location') {
      const newTitle = field === 'title' ? value : formData.title;
      const newLocation = field === 'location' ? value : formData.location;
      
      if (newTitle && newLocation) {
        setFormData(prev => ({
          ...prev,
          metaTitle: `${newTitle} في ${newLocation} | محترفين الديار العالمية`,
          keywords: `${formData.category}, ${newLocation}, جدة, محترفين الديار, ${newTitle}`
        }));
      }
    }

    if (field === 'description') {
      setFormData(prev => ({
        ...prev,
        metaDescription: value.substring(0, 150) + (value.length > 150 ? '...' : '')
      }));
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setLoading(true);
    setUploadProgress(0);

    const errors: string[] = [];
    const warnings: string[] = [];
    let successCount = 0;

    const uploadPromises = Array.from(files).map(async (file, index) => {
      // التحقق من نوع الملف أولاً
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        errors.push(`${file.name}: نوع الملف غير مدعوم. الصيغ المدعومة: الصور (JPG, PNG, WebP) والفيديو (MP4, MOV, WebM)`);
        return null;
      }

      // التحقق من حجم الملف مع حدود مختلفة للصور والفيديو
      const maxImageSize = 100 * 1024 * 1024; // 100MB للصور
      const maxVideoSize = 200 * 1024 * 1024; // 200MB للفيديو
      const maxSize = isVideo ? maxVideoSize : maxImageSize;
      
      if (file.size > maxSize) {
        const sizeMB = (file.size / 1024 / 1024).toFixed(1);
        const maxSizeMB = (maxSize / 1024 / 1024).toFixed(0);
        errors.push(`${file.name}: حجم الملف (${sizeMB}MB) يتجاوز الحد الأقصى (${maxSizeMB}MB للـ${isVideo ? 'فيديو' : 'صور'})`);
        return null;
      }

      // تحذير للملفات الكبيرة
      if (isVideo && file.size > 50 * 1024 * 1024) {
        warnings.push(`${file.name}: الملف كبير (${(file.size / 1024 / 1024).toFixed(1)}MB)، قد يستغرق الرفع عدة دقائق`);
      }

      const uploadFormData = new FormData();
      uploadFormData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData
        });

        const result = await response.json();

        if (!response.ok) {
          const errorMsg = result.error || result.details || 'فشل في رفع الملف';
          errors.push(`${file.name}: ${errorMsg}`);
          return null;
        }
        
        setUploadProgress((index + 1) / files.length * 100);
        successCount++;

        return {
          type: isVideo ? 'VIDEO' as const : 'IMAGE' as const,
          src: result.url || result.files?.[0]?.url || result.files?.[0]?.src,
          title: file.name.split('.')[0],
          alt: `${formData.title || 'مشروع'} - ملف ${index + 1}`
        };
      } catch (error) {
        console.error('خطأ في رفع الملف:', error);
        const errorMsg = error instanceof Error ? error.message : 'خطأ في الاتصال بالخادم';
        errors.push(`${file.name}: ${errorMsg}`);
        return null;
      }
    });

    const uploadedMedia = await Promise.all(uploadPromises);
    const validMedia = uploadedMedia.filter(Boolean) as MediaItem[];
    
    setMediaItems(prev => [...prev, ...validMedia]);
    setLoading(false);
    setUploadProgress(0);

    // عرض رسائل النتائج مع معلومات مفيدة
    let message = '';
    
    if (successCount > 0) {
      message += `✅ تم رفع ${successCount} من ${files.length} ملف بنجاح!\n\n`;
    }
    
    if (warnings.length > 0 && successCount > 0) {
      message += `💡 ملاحظات:\n${warnings.join('\n')}\n\n`;
    }
    
    if (errors.length > 0) {
      message += `⚠️ فشل رفع ${errors.length} ملف:\n${errors.join('\n')}\n\n`;
      message += `📌 نصائح:\n`;
      message += `• تأكد من نوع الملف (الصيغ المدعومة: JPG, PNG, WebP, MP4, MOV, WebM)\n`;
      message += `• تحقق من حجم الملف (حد أقصى: 100MB للصور، 200MB للفيديو)\n`;
      message += `• تأكد من اتصال الإنترنت لديك\n`;
      message += `• للفيديوهات الكبيرة: انتظر بضع دقائق إضافية`;
    }
    
    if (message) {
      alert(message);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  };

  const addMaterial = () => {
    if (newMaterial.trim() && !materials.includes(newMaterial.trim())) {
      setMaterials(prev => [...prev, newMaterial.trim()]);
      setNewMaterial('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(prev => prev.filter(t => t !== tag));
  };

  const removeMaterial = (material: string) => {
    setMaterials(prev => prev.filter(m => m !== material));
  };

  const removeMediaItem = (index: number) => {
    setMediaItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.location) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          mediaItems,
          tags,
          materials
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'فشل في إنشاء المشروع');
      }

      const result = await response.json();
      
      alert('تم إنشاء المشروع بنجاح! سيتم توجيهك لعرض المشروع.');
      router.push(`/portfolio/${result.project.slug}`);

    } catch (error) {
      console.error('خطأ في إنشاء المشروع:', error);
      alert('حدث خطأ في إنشاء المشروع');
    } finally {
      setLoading(false);
    }
  };

  const previewProject = () => {
    const preview = {
      ...formData,
      mediaItems: mediaItems.slice(0, 3),
      tags: tags.slice(0, 5),
      materials: materials.slice(0, 5)
    };
    
    console.log('معاينة المشروع:', preview);
    alert('تم عرض معاينة المشروع في console المتصفح');
  };

  return (
    <div className="container mx-auto px-4 py-8" dir="rtl">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إضافة مشروع جديد</h1>
          <div className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={previewProject}
              className="flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              معاينة
            </Button>
            <Button 
              type="button"
              variant="outline" 
              onClick={() => router.back()}
            >
              إلغاء
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* المعلومات الأساسية */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Package className="h-5 w-5" />
              المعلومات الأساسية
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  عنوان المشروع *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="مثال: مظلة سيارات فاخرة - فيلا الياسمين"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  التصنيف *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">اختر التصنيف</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  الموقع *
                </label>
                <Input
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="مثال: جدة - حي الروضة"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  تاريخ الإنجاز
                </label>
                <Input
                  type="date"
                  value={formData.completionDate}
                  onChange={(e) => handleInputChange('completionDate', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  العميل
                </label>
                <Input
                  value={formData.client}
                  onChange={(e) => handleInputChange('client', e.target.value)}
                  placeholder="مثال: عائلة الأحمد"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  مدة المشروع
                </label>
                <Input
                  value={formData.projectDuration}
                  onChange={(e) => handleInputChange('projectDuration', e.target.value)}
                  placeholder="مثال: 5 أيام"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  تكلفة المشروع
                </label>
                <Input
                  value={formData.projectCost}
                  onChange={(e) => handleInputChange('projectCost', e.target.value)}
                  placeholder="مثال: 25000 ريال"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => handleInputChange('featured', e.target.checked)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  مشروع مميز
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">
                وصف المشروع *
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="وصف تفصيلي للمشروع والخدمات المقدمة..."
                rows={5}
                required
              />
            </div>
          </Card>

          {/* الوسائط */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5" />
              الصور والفيديوهات
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  رفع الصور والفيديوهات
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,video/mp4,video/mov,video/avi,video/webm"
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <label 
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <span className="font-medium text-blue-600">انقر للرفع</span> أو اسحب الملفات هنا
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      الصور: JPG, PNG, WEBP, GIF (حتى 100MB)
                    </p>
                    <p className="text-xs text-gray-500">
                      الفيديوهات: MP4, MOV, AVI, WEBM (حتى 100MB)
                    </p>
                  </label>
                </div>
                {loading && (
                  <div className="mt-4">
                    <Progress value={uploadProgress} className="w-full" />
                    <p className="text-sm text-gray-600 mt-2 text-center">
                      جاري الرفع... {Math.round(uploadProgress)}%
                    </p>
                  </div>
                )}
              </div>

              {mediaItems.length > 0 && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    تم رفع {mediaItems.length} ملف ({mediaItems.filter(m => m.type === 'IMAGE').length} صورة، {mediaItems.filter(m => m.type === 'VIDEO').length} فيديو)
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mediaItems.map((item, index) => (
                      <div key={index} className="relative group">
                        {item.type === 'IMAGE' ? (
                          <img
                            src={item.src}
                            alt={item.alt}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="relative w-full h-24 bg-gray-900 rounded-lg overflow-hidden">
                            <video
                              src={item.src}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                              <div className="bg-white rounded-full p-2">
                                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeMediaItem(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* العلامات والمواد */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                العلامات
              </h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="إضافة علامة"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">المواد المستخدمة</h2>
              
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newMaterial}
                    onChange={(e) => setNewMaterial(e.target.value)}
                    placeholder="إضافة مادة"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" onClick={addMaterial} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {materials.map(material => (
                    <Badge key={material} variant="outline" className="flex items-center gap-1">
                      {material}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => removeMaterial(material)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* SEO */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">إعدادات SEO</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">عنوان SEO</label>
                <Input
                  value={formData.metaTitle}
                  onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                  placeholder="سيتم إنشاؤه تلقائياً"
                />
                <p className="text-xs text-gray-500 mt-1">
                  الطول الحالي: {formData.metaTitle.length}/60 حرف
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">وصف SEO</label>
                <Textarea
                  value={formData.metaDescription}
                  onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                  placeholder="سيتم إنشاؤه تلقائياً"
                  rows={3}
                />
                <p className="text-xs text-gray-500 mt-1">
                  الطول الحالي: {formData.metaDescription.length}/160 حرف
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">الكلمات المفتاحية</label>
                <Input
                  value={formData.keywords}
                  onChange={(e) => handleInputChange('keywords', e.target.value)}
                  placeholder="سيتم إنشاؤها تلقائياً"
                />
              </div>
            </div>
          </Card>

          {/* أزرار الحفظ */}
          <div className="flex justify-end gap-3 pt-6">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {loading ? 'جاري الحفظ...' : 'حفظ المشروع'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
