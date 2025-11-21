'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CategorySelect } from '@/components/ui/project-filters';
import { SUGGESTED_TAGS } from '@/constants/projectCategories';
import { 
  Upload, 
  X, 
  Image as ImageIcon, 
  Video, 
  MapPin, 
  Calendar,
  Star,
  Tag,
  Save,
  Eye,
  Loader2,
  Plus,
  Trash2,
  Play
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



export default function AddProjectPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [client, setClient] = useState('');
  const [featured, setFeatured] = useState(false);
  const [projectDuration, setProjectDuration] = useState('');
  const [projectCost, setProjectCost] = useState('');

  // Media and tags
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [materials, setMaterials] = useState<string[]>([]);
  const [materialInput, setMaterialInput] = useState('');

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

  // Handle materials
  const addMaterial = () => {
    const trimmedMaterial = materialInput.trim();
    if (trimmedMaterial && !materials.includes(trimmedMaterial)) {
      setMaterials([...materials, trimmedMaterial]);
      setMaterialInput('');
    }
  };

  const removeMaterial = (materialToRemove: string) => {
    setMaterials(materials.filter(material => material !== materialToRemove));
  };

  // Upload media files
  const uploadMediaFiles = async (): Promise<Array<{ type: string; src: string; thumbnail?: string; title: string; description: string }>> => {
    const uploadedMedia = [];

    for (const mediaFile of mediaFiles) {
      const formData = new FormData();
      formData.append('file', mediaFile.file);
      formData.append('folder', 'portfolio');

      try {
        console.log('🔄 رفع ملف:', mediaFile.file.name);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const result = await response.json();
          console.log('✅ تم رفع الملف:', result);

          // التأكد من الحصول على الرابط الصحيح
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
      } catch (error) {
        console.error('خطأ في رفع الملف:', error);
        const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
        throw new Error(`فشل في رفع الملف: ${mediaFile.file.name} - ${errorMessage}`);
      }
    }

    return uploadedMedia;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !category || !location) {
      alert('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    if (mediaFiles.length === 0) {
      alert('يرجى إضافة صورة واحدة على الأقل للمشروع');
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('🚀 بدء إضافة المشروع...');

      // Upload media files first
      const uploadedMedia = await uploadMediaFiles();

      console.log('📁 الملفات المرفوعة:', uploadedMedia);

      if (uploadedMedia.length === 0) {
        throw new Error('لم يتم رفع أي ملفات');
      }

      // Create project
      const projectData = {
        title,
        description,
        category,
        location,
        completionDate: completionDate || new Date().toISOString(),
        client,
        featured,
        projectDuration,
        projectCost,
        mediaItems: uploadedMedia,
        tags: tags.map(tag => ({ name: tag })),
        materials: materials.map(material => ({ name: material }))
      };

      console.log('📊 بيانات المشروع:', projectData);

      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok) {
        console.log('✅ تم إضافة المشروع بنجاح');
        alert('تم إضافة المشروع بنجاح!');
        router.push('/dashboard/projects');
      } else {
        console.error('❌ خطأ في إضافة المشروع:', result);
        const message = (result && (result.error || result.message)) || 'فشل في إضافة المشروع';
        alert(`خطأ: ${message}`);
      }
    } catch (error) {
      console.error('❌ خطأ في إضافة المشروع:', error);
      const errorMessage = error instanceof Error ? error.message : 'خطأ غير معروف';
      alert(`خطأ في إضافة المشروع: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">إضافة مشروع جديد</h1>
          <p className="text-sm sm:text-base text-gray-600">أضف مشروع جديد إلى معرض الأعمال</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Basic Info */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">عنوان المشروع *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="مظلات فيلا فاخرة في جدة..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">الفئة *</label>
                  <CategorySelect
                    value={category}
                    onChange={setCategory}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">وصف المشروع *</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="وصف تفصيلي عن المشروع وما تم إنجازه..."
                  rows={4}
                  className="text-sm sm:text-base"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">الموقع *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="جدة، السعودية"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">تاريخ الإنجاز</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="date"
                      value={completionDate}
                      onChange={(e) => setCompletionDate(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex items-center sm:justify-center">
                  <label className="flex items-center space-x-2 space-x-reverse cursor-pointer">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded w-4 h-4"
                    />
                    <span className="text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      مشروع مميز
                    </span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">العميل</label>
                  <Input
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="اسم العميل (اختياري)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">مدة التنفيذ</label>
                  <Input
                    value={projectDuration}
                    onChange={(e) => setProjectDuration(e.target.value)}
                    placeholder="15 يوم"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">تكلفة المشروع</label>
                  <Input
                    value={projectCost}
                    onChange={(e) => setProjectCost(e.target.value)}
                    placeholder="25000 ريال"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Upload */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                الصور والفيديوهات
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-colors ${
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

                <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                  اسحب الملفات هنا أو اختر ملفات
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4">
                  يدعم الصور والفيديوهات (JPG, PNG, MP4, MOV)
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  اختر ملفات
                </Button>
              </div>

              {/* Media Files */}
              {mediaFiles.length > 0 && (
                <div className="mt-4 sm:mt-6 grid grid-cols-1 gap-4 sm:gap-6">
                  {mediaFiles.map((mediaFile, index) => (
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
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Tag className="w-4 h-4 sm:w-5 sm:h-5" />
                الكلمات المفتاحية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
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
                  <p className="text-xs sm:text-sm font-medium mb-2">اقتراحات:</p>
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

          {/* Materials */}
          <Card>
            <CardHeader className="pb-3 sm:pb-6">
              <CardTitle className="text-lg sm:text-xl">المواد المستخدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={materialInput}
                    onChange={(e) => setMaterialInput(e.target.value)}
                    placeholder="أضف مادة مستخدمة..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addMaterial())}
                  />
                  <Button type="button" onClick={addMaterial}>
                    إضافة
                  </Button>
                </div>

                {materials.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                      <Badge key={material} variant="outline" className="flex items-center gap-1">
                        {material}
                        <button
                          type="button"
                          onClick={() => removeMaterial(material)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 sticky bottom-0 sm:static bg-white sm:bg-transparent p-4 sm:p-0 -mx-3 sm:mx-0 border-t sm:border-0 shadow-lg sm:shadow-none">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto text-sm sm:text-base py-3 sm:py-2"
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto sm:min-w-[120px] text-sm sm:text-base py-3 sm:py-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري الحفظ...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 ml-2" />
                  حفظ المشروع
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
