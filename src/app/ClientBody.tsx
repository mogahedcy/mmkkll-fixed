'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // تحميل محسن الأداء بشكل ديناميكي
  const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'), {
    ssr: false,
    loading: () => null
  });

  if (!isMounted) {
    // عرض المحتوى أثناء hydration مع إخفاء مؤقت لتجنب hydration mismatch
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <div suppressHydrationWarning>
      {children}
      <PerformanceOptimizer />
    </div>
  );
}
