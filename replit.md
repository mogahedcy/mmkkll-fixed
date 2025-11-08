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