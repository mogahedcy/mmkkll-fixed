'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // تجنب مشاكل hydration
  const [isMounted, setIsMounted] = useState(false);
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
    if (!mounted) return;
  }, [mounted, pathname]);

  const PerformanceOptimizer = dynamic(() => import('@/components/PerformanceOptimizer'), {
    ssr: false
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div suppressHydrationWarning>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
      {mounted && <PerformanceOptimizer />}
    </div>
  );
}