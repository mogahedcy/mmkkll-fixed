'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={cn(
          'bg-gray-200 flex items-center justify-center',
          className
        )}
        className="[CLASS]"
      >
        <span className="text-gray-500 text-sm">صورة غير متوفرة</span>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: cn('transition-opacity duration-300', className, {
      'opacity-0': isLoading,
      'opacity-100': !isLoading
    }),
    onLoadingComplete: () => setIsLoading(false),
    onError: () => setHasError(true),
    priority,
    quality: priority ? 100 : 75
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        sizes={sizes}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width || 400}
      height={height || 300}
    />
  );
}
