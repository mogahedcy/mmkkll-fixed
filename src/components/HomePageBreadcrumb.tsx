import BreadcrumbSchema from './BreadcrumbSchema';

export default function HomePageBreadcrumb() {
  return (
    <>
      <nav aria-label="مسار التنقل" className="bg-gray-50 py-3 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <ol className="flex items-center space-x-2 space-x-reverse text-sm sm:text-base">
            <li className="flex items-center">
              <a href="/" className="text-primary hover:text-accent transition-colors font-medium">
                الرئيسية
              </a>
            </li>
          </ol>
        </div>
      </nav>
      <BreadcrumbSchema 
        items={[]}
        baseUrl="https://www.aldeyarksa.tech"
      />
    </>
  );
}
