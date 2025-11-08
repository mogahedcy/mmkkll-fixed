# Overview

This Next.js web application is for "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company specializing in pergolas, car shades, awnings, and garden landscaping in Jeddah. Its purpose is to serve as a comprehensive business website, featuring portfolio management, project showcasing, and robust content management capabilities. The project aims to enhance the company's online presence, streamline content updates, and improve search engine visibility and user engagement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15.5.0 with App Router and React 18
- **Styling**: Tailwind CSS with custom component library using Shadcn/UI and Radix UI primitives
- **Typography**: Noto Sans Arabic for Arabic content
- **Animations**: Framer Motion for smooth UI transitions
- **Image Management**: Next.js Image optimization with WebP/AVIF support.

## Backend Architecture
- **API Routes**: Next.js App Router API routes
- **Authentication**: JWT-based admin authentication with bcrypt hashing and secure session management.
- **File Upload**: Multi-format file upload system for images and videos.
- **Content Management**: RESTful API for project and content CRUD operations.

## Database Design
- **ORM**: Prisma ORM for type-safe operations.
- **Schema**: Models for Projects (with media, tags, materials), Articles (with media, tags, comments, likes, views), Admin Users, and interaction analytics.

## Content Management System (CMS)
- **Portfolio**: Advanced project showcase with filtering, search, and categorization.
- **Articles**: Complete blog/articles archive with dynamic sitemap generation and full CRUD.
- **Media Management**: Support for multiple media types per project/article with ordering.
- **Admin Dashboard**: Full-featured interface for content administration.

## SEO & Performance
- **SEO Optimization**: Automated sitemap generation, robots.txt, comprehensive structured data (Article, Service, CreativeWork, Review, FAQ, LocalBusiness), canonical URLs, hreflang tags, and Google Business Profile integration.
- **Search Engine Indexing**: IndexNow API integration.
- **Performance Optimizations**: 
  - **Image Optimization**: Next.js Image with AVIF/WebP formats, optimized device sizes (up to 1920px), quality set to 75%, extended cache TTL (30 days)
  - **Font Loading**: Noto Sans Arabic with 3 weights only (400, 500, 700), display: swap for faster rendering, preload enabled
  - **Code Splitting**: Lazy loading components, dynamic imports, Turbopack for faster builds
  - **Bundle Analysis**: @next/bundle-analyzer integrated (run `bun run analyze`)
  - **CSS Optimization**: Tailwind CSS with PurgeCSS, future flags enabled for better performance
  - **Database**: Query optimization with Prisma, React `cache()` for deduplication
  - **CDN**: Cloudinary for image/video delivery

## Security Measures
- **Authentication**: Secure admin login with encrypted sessions.
- **Input Validation**: Zod schemas for API request validation.
- **Rate Limiting**: Express rate limiting for API endpoints.
- **Content Security**: DOMPurify for safe HTML rendering.
- **Environment Variables**: Secure configuration management.

# External Dependencies

## Core Technologies
- **Next.js**: Full-stack React framework.
- **Prisma**: Database ORM.
- **Tailwind CSS**: Utility-first CSS framework.
- **TypeScript**: For type safety.

## UI/UX Libraries
- **Radix UI**: Headless UI components.
- **Framer Motion**: Animation library.
- **Lucide React**: Icon set.
- **Swiper**: Touch-enabled carousel.

## Database & Storage
- **PostgreSQL**: Primary database (Neon/Vercel compatible).
- **Cloudinary**: Image and video management and CDN.

## Authentication & Security
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: JWT token management.
- **DOMPurify**: HTML sanitization.
- **Zod**: Runtime type validation.

## Development & Deployment
- **Biome**: Code formatting and linting.
- **ESLint**: Code quality checks.
- **PostCSS**: CSS processing.
- **Bundle Analyzer**: @next/bundle-analyzer for monitoring bundle size.
- **Vercel**: Deployment platform.

# Recent Performance Improvements (November 2024)

## Image Optimization
- Reduced maximum device size from 3840px to 1920px for faster mobile loading
- Changed image quality from 85% to 75% across all components
- Prioritized AVIF format over WebP for better compression
- Extended image cache TTL from 7 days to 30 days
- Optimized responsive image sizes for different screen sizes

## Font Loading
- Reduced Noto Sans Arabic font weights from 5 to 3 (removed 300 and 600)
- Added `display: swap` to prevent FOIT (Flash of Invisible Text)
- Enabled font preloading for faster initial render

## Bundle Size
- Integrated @next/bundle-analyzer for monitoring
- Run `bun run analyze` to generate bundle size reports
- Enabled Tailwind CSS future flags for better tree-shaking

## Expected Performance Improvements
- **First Contentful Paint (FCP)**: Target < 1.8s
- **Largest Contentful Paint (LCP)**: Target < 2.5s  
- **Time to Interactive (TTI)**: Target < 3.8s
- **Image size reduction**: ~30-40% smaller files
- **Font loading time**: ~25% faster initial render

# Mobile Experience Enhancements (November 2024)

## Typography for Mobile
- Enforced 16px minimum font size across all mobile devices
- Increased line-height to 1.7-1.8 for better readability on small screens
- Optimized heading sizes with responsive scaling (text-3xl on mobile → text-8xl on desktop)
- Added letter-spacing for improved text clarity

## Touch-Friendly Interface
- **Button Sizes**: Minimum 44x44px tap targets on mobile (Apple guidelines)
- **Spacing**: 8px minimum between interactive elements
- **Active States**: Added active:scale-95 for visual feedback on touch
- **Full-width CTAs**: Primary buttons span full width on mobile for easier interaction

## Mobile Navigation Components
- **Bottom Navigation Bar**: Fixed bottom navigation with 5 key actions (Home, Services, WhatsApp, Search, Contact)
- **Floating Call Button**: Animated call button appears after 300px scroll, positioned to avoid bottom nav
- **Improved Mobile Menu**: Touch-optimized hamburger menu with larger touch targets and clear visual hierarchy

## Service Cards Optimization
- Reduced padding and margins on mobile (p-4 vs p-8 on desktop)
- Simplified content - showing only top 2 features on mobile
- Larger icons (w-16 h-16) and clearer CTAs
- Responsive border-radius (rounded-xl on mobile, rounded-2xl on desktop)

## Hero Section Mobile-First Design
- Responsive trust badges with flexible wrapping
- Multi-tier heading sizes (text-3xl → text-8xl across breakpoints)
- Full-width CTA buttons with prominent sizing
- Hidden secondary service links on smallest screens to reduce clutter

## Image Optimization for Mobile
- Added 400px device size for sub-640px devices
- Created ResponsiveImage component with lazy loading and loading states
- Maintained AVIF/WebP priority with 75% quality
- Optimized sizes attribute for mobile: `(max-width: 640px) 100vw`

## Mobile-Specific UX Patterns
- Touch target utility class (.touch-target) for consistent 44x44px sizing
- Pull-to-refresh consideration in scroll handlers
- Swipe-friendly carousel implementations
- Bottom sheet pattern for mobile actions
- Body padding (pb-16) to accommodate bottom navigation

## Expected Mobile UX Improvements
- **Bounce Rate**: Expected 15-20% reduction due to improved readability
- **Tap Success Rate**: Target >95% with 44x44px minimum touch targets
- **Mobile Conversion**: Expected 10-15% increase from clearer CTAs
- **Session Duration**: Target +25% from improved content accessibility