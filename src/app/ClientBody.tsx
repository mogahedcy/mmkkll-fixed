'use client';

import { useEffect, useState } from 'react';

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div suppressHydrationWarning>
      {isLoaded ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </div>
  );
}