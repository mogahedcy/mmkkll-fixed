'use client';

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // التحقق من حالة تسجيل الدخول
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      const data = await response.json();
      setIsAuthenticated(data.authenticated);
    } catch (error) {
      console.error('خطأ في التحقق من المصادقة:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // هذا الشرط لم يكن له أي تأثير فعلي وتمت إزالته
    // if (!isMounted) return;
  }, [isMounted, pathname]); // تم تحديث الاعتماديات لتشمل isMounted

  const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'), {
    ssr: false
  });

  if (!isMounted) {
    // أثناء الـ hydration، نعرض نفس المحتوى
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <div suppressHydrationWarning>
      {children}
      {isMounted && <PerformanceOptimizer />}
    </div>
  );
}
