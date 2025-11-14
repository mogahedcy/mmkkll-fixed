'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const version = '2024-11-14-v2';
      
      navigator.serviceWorker
        .register(`/sw.js?v=${version}`)
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration);
          
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'activated' && navigator.serviceWorker.controller) {
                  console.log('🔄 New version available - reloading...');
                  window.location.reload();
                }
              });
            }
          });
          
          registration.update();
        })
        .catch((error) => {
          console.log('❌ Service Worker registration failed:', error);
        });
    }
  }, []);

  return null;
}
