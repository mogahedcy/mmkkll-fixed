// قائمة موحدة لفئات المشاريع - 10 فئات رئيسية
export const PROJECT_CATEGORIES = [
  'مظلات سيارات',
  'سواتر',
  'خيم ملكية',
  'بيوت شعر ملكي',
  'برجولات',
  'تنسيق حدائق',
  'هناجر',
  'شبوك',
  'قراميد',
  'ساندوتش بانل'
] as const;

// للتوافق مع البيانات القديمة
export const LEGACY_CATEGORIES_MAP: Record<string, string> = {
  'مظلات': 'مظلات سيارات',
  'بيوت شعر': 'بيوت شعر ملكي',
  'ترميم': 'ساندوتش بانل'
};

// حالات المشاريع
export const PROJECT_STATUSES = [
  { value: 'PUBLISHED', label: 'منشور' },
  { value: 'DRAFT', label: 'مسودة' },
  { value: 'ARCHIVED', label: 'أرشيف' }
] as const;

// خيارات الترتيب
export const SORT_OPTIONS = [
  { value: 'newest', label: 'الأحدث' },
  { value: 'oldest', label: 'الأقدم' },
  { value: 'popular', label: 'الأكثر شعبية' },
  { value: 'most-liked', label: 'الأكثر إعجاباً' },
  { value: 'alphabetical', label: 'أبجدياً' }
] as const;

// العلامات المقترحة
export const SUGGESTED_TAGS = [
  'جدة', 'السعودية', 'تصميم حديث', 'جودة عالية', 'احترافي',
  'مقاوم للطقس', 'عزل حراري', 'صديق للبيئة', 'ضمان طويل',
  'تركيب سريع', 'صيانة سهلة', 'تصميم مخصص'
] as const;

export type ProjectCategory = typeof PROJECT_CATEGORIES[number];
export type ProjectStatus = typeof PROJECT_STATUSES[number]['value'];
export type SortOption = typeof SORT_OPTIONS[number]['value'];