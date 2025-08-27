'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
  }, [mounted, pathname]);

  return (
    <div suppressHydrationWarning>
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </div>
  );
}