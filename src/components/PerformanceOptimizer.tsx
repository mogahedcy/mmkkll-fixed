'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { type Metric, onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
}

// Image cache management
class ImageCache {
  private cache = new Map<string, HTMLImageElement>();
  private loadingSet = new Set<string>();

  async preloadImage(src: string): Promise<HTMLImageElement> {
    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    if (this.loadingSet.has(src)) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src)!);
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
      });
    }

    this.loadingSet.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingSet.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loadingSet.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    return Promise.all(urls.map(url => this.preloadImage(url)));
  }

  clearCache(): void {
    this.cache.clear();
    this.loadingSet.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

// Global image cache instance
export const imageCache = new ImageCache();

// Performance monitoring
class PerformanceMonitor {
  private metrics = {
    navigationStart: 0,
    loadComplete: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0
  };

  constructor() {
    this.initializeMetrics();
  }

  private initializeMetrics() {
    // Navigation timing
    if (typeof window !== 'undefined') {
      this.metrics.navigationStart = performance.timeOrigin;

      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
          }
        }
      }).observe({ entryTypes: ['paint'] });

      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.largestContentfulPaint = lastEntry.startTime;
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Cumulative Layout Shift
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            this.metrics.cumulativeLayoutShift += (entry as any).value;
          }
        }
      }).observe({ entryTypes: ['layout-shift'] });

      // Interaction to Next Paint (replaces First Input Delay)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.firstInputDelay = (entry as any).processingStart - entry.startTime;
        }
      }).observe({ entryTypes: ['first-input'] });

      // Load complete
      window.addEventListener('load', () => {
        this.metrics.loadComplete = performance.now();
      });
    }
  }

  getMetrics() {
    return { ...this.metrics };
  }

  logMetrics() {
    if (process.env.NODE_ENV === 'development') {
      console.group('🚀 Performance Metrics');
      console.log('First Contentful Paint:', this.metrics.firstContentfulPaint.toFixed(2), 'ms');
      console.log('Largest Contentful Paint:', this.metrics.largestContentfulPaint.toFixed(2), 'ms');
      console.log('Cumulative Layout Shift:', this.metrics.cumulativeLayoutShift.toFixed(4));
      console.log('First Input Delay:', this.metrics.firstInputDelay.toFixed(2), 'ms');
      console.log('Load Complete:', this.metrics.loadComplete.toFixed(2), 'ms');
      console.log('Image Cache Size:', imageCache.getCacheSize());
      console.groupEnd();
    }
  }
}

// Memory management
class MemoryManager {
  private cleanup: (() => void)[] = [];

  addCleanup(fn: () => void) {
    this.cleanup.push(fn);
  }

  performCleanup() {
    this.cleanup.forEach(fn => fn());
    this.cleanup = [];
  }

  monitorMemory() {
    if (typeof window !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      const used = memory.usedJSHeapSize / 1048576; // MB
      const total = memory.totalJSHeapSize / 1048576; // MB
      const limit = memory.jsHeapSizeLimit / 1048576; // MB

      if (process.env.NODE_ENV === 'development') {
        console.log(`Memory: ${used.toFixed(2)}MB / ${total.toFixed(2)}MB (Limit: ${limit.toFixed(2)}MB)`);
      }

      // Auto cleanup if memory usage is high
      if (used / limit > 0.8) {
        this.performCleanup();
        imageCache.clearCache();
      }
    }
  }
}

// Global instances
export const performanceMonitor = new PerformanceMonitor();
export const memoryManager = new MemoryManager();

// Resource preloader
export const preloadCriticalResources = (resources: string[]) => {
  if (typeof window === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';

    if (resource.match(/\.(jpg|jpeg|png|webp|gif)$/i)) {
      link.as = 'image';
      imageCache.preloadImage(resource);
    } else if (resource.match(/\.(woff|woff2|ttf|otf)$/i)) {
      link.as = 'font';
      link.crossOrigin = 'anonymous';
    } else if (resource.match(/\.css$/i)) {
      link.as = 'style';
    } else if (resource.match(/\.js$/i)) {
      link.as = 'script';
    }

    link.href = resource;
    document.head.appendChild(link);
  });
};

// Virtualization helper for large lists
export const useVirtualization = (items: any[], containerHeight: number, itemHeight: number) => {
  const [scrollTop, setScrollTop] = useState(0);
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);

  const visibleCount = Math.ceil(containerHeight / itemHeight);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  const visibleItems = items.slice(startIndex, endIndex);

  const totalHeight = items.length * itemHeight;
  const offsetY = startIndex * itemHeight;

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return {
    visibleItems,
    totalHeight,
    offsetY,
    handleScroll,
    setContainerRef
  };
};

interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  cls: number;
  inp: number; // INP instead of FID
  ttfb: number;
  loadComplete: number;
}

export default function PerformanceOptimizer({ children }: PerformanceOptimizerProps) {
  const router = useRouter();
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: 0,
    lcp: 0,
    cls: 0,
    inp: 0,
    ttfb: 0,
    loadComplete: 0
  });
  const [isClient, setIsClient] = useState(false);
  const loadStartTimeRef = useRef(0);

  useEffect(() => {
    setIsClient(true);
    loadStartTimeRef.current = performance.now();
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleMetric = (metric: Metric) => {
      const metricName = metric.name.toLowerCase();
      // Map FID to INP for backward compatibility
      const mappedName = metricName === 'fid' ? 'inp' : metricName;
      setMetrics(prev => ({
        ...prev,
        [mappedName]: metric.value
      }));
    };

    // Collect Web Vitals metrics
    try {
      onCLS(handleMetric);
      onFCP(handleMetric);
      onINP(handleMetric); // INP replaced FID in newer versions
      onLCP(handleMetric);
      onTTFB(handleMetric);
    } catch (error) {
      console.warn('Web Vitals library not available:', error);
    }

    const handleLoad = () => {
      const loadTime = performance.now() - loadStartTimeRef.current;
      setMetrics(prev => ({ ...prev, loadComplete: loadTime }));
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, [isClient]);

  useEffect(() => {
    if (!isClient) return;

    const logPerformance = () => {
      console.group('🚀 Performance Metrics');
      console.log('First Contentful Paint:', metrics.fcp.toFixed(2), 'ms');
      console.log('Largest Contentful Paint:', metrics.lcp.toFixed(2), 'ms');
      console.log('Cumulative Layout Shift:', metrics.cls.toFixed(4));
      console.log('Interaction to Next Paint:', metrics.inp.toFixed(2), 'ms');
      console.log('Load Complete:', metrics.loadComplete.toFixed(2), 'ms');
      console.log('Image Cache Size:', imageCache.getCacheSize());
      console.groupEnd();
    };

    if (metrics.loadComplete > 0) {
      logPerformance();
    }
  }, [metrics, isClient]);

  useEffect(() => {
    if (!isClient) return;

    // Monitor memory usage
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const used = (memory.usedJSHeapSize / 1024 / 1024).toFixed(2);
        const total = (memory.totalJSHeapSize / 1024 / 1024).toFixed(2);
        const limit = (memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2);
        console.log(`Memory: ${used}MB / ${total}MB (Limit: ${limit}MB)`);

        // Auto cleanup if memory usage is high
        if (parseFloat(used) / parseFloat(limit) > 0.8) {
          memoryManager.performCleanup();
          imageCache.clearCache();
        }
      }
    };

    const memoryInterval = setInterval(monitorMemory, 30000);

    return () => clearInterval(memoryInterval);
  }, [isClient]);

  // Route change optimization
  useEffect(() => {
    const handleRouteChange = () => {
      // Clear old image cache on route change to prevent memory leaks
      // Also clear any pending cleanup tasks
      memoryManager.performCleanup();
      imageCache.clearCache();
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      // Ensure cleanup is performed on component unmount as well
      memoryManager.performCleanup();
      imageCache.clearCache();
    };
  }, [router]);

  // Initialize performance monitoring on client-side
  useEffect(() => {
    if (!isClient) return;

    // Preload critical resources
    const criticalImages = [
      '/favicon.svg',
      '/favicon-16x16.png',
      '/favicon-32x32.png'
    ];
    preloadCriticalResources(criticalImages);

    // Log performance metrics after page load
    const timeout = setTimeout(() => {
      performanceMonitor.logMetrics();
    }, 3000);

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        // Additional scroll logic if needed
      });
    }, { passive: true });

    return () => {
      clearTimeout(timeout);
      // Cleanup on unmount
      memoryManager.performCleanup();
    };
  }, [isClient]);


  return <>{children}</>;
}