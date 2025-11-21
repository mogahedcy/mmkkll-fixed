import { AIToolsPanel } from '@/components/admin/AIToolsPanel';

export const metadata = {
  title: 'أدوات AI | لوحة التحكم',
  robots: 'noindex, nofollow',
};

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        <AIToolsPanel />
      </div>
    </div>
  );
}
