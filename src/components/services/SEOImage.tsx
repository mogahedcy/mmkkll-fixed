'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { generateOptimizedAltText, type ImageMetadata } from '@/lib/image-seo-utils';
import WatermarkOverlay from '@/components/WatermarkOverlay';

interface SEOImageProps {
  src: string;
  alt?: string | null;
  title?: string;
  projectTitle?: string;
  projectCategory?: string;
  projectLocation?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  showWatermark?: boolean;
  watermarkPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  index?: number;
}

/**
 * مكون صورة محسّن لمحركات البحث
 * يقوم تلقائياً بتوليد alt text، title، وmetadata للصور
 */
export default function SEOImage({
  src,
  alt,
  title,
  projectTitle,
  projectCategory,
  projectLocation,
  width,
  height,
  fill = false,
  priority = false,
  className = '',
  sizes,
  quality = 85,
  showWatermark = true,
  watermarkPosition = 'bottom-right',
  index = 0
}: SEOImageProps) {
  const [metadata, setMetadata] = useState<ImageMetadata | null>(null);

  useEffect(() => {
    // توليد metadata محسّن
    if (!alt || alt.trim().length < 10) {
      const generatedMetadata = generateOptimizedAltText(src, {
        projectTitle,
        projectCategory,
        projectLocation
      });
      setMetadata(generatedMetadata);
    } else {
      // استخدام alt الموجود
      setMetadata({
        alt,
        title: title || alt,
        description: alt,
        keywords: [projectCategory || '', projectLocation || 'جدة', 'محترفين الديار'].filter(Boolean),
        context: 'project'
      });
    }
  }, [src, alt, title, projectTitle, projectCategory, projectLocation]);

  if (!metadata) {
    return null;
  }

  const imageProps = {
    src,
    alt: metadata.alt,
    title: metadata.title,
    quality,
    priority,
    className,
    sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    ...(fill ? { fill: true } : { width: width || 800, height: height || 600 })
  };

  return (
    <div className="relative">
      <Image {...imageProps} />
      
      {showWatermark && (
        <WatermarkOverlay 
          position={watermarkPosition}
          size="medium"
          opacity={0.3}
        />
      )}

      {/* Structured Data للصورة */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageObject",
            "contentUrl": src,
            "name": metadata.title,
            "description": metadata.description,
            "caption": metadata.alt,
            "keywords": metadata.keywords.join(', '),
            "author": {
              "@type": "Organization",
              "name": "محترفين الديار العالمية"
            },
            "copyrightHolder": {
              "@type": "Organization",
              "name": "محترفين الديار العالمية"
            }
          })
        }}
      />
    </div>
  );
}
