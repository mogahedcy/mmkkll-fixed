# Overview

This Next.js web application is for "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company specializing in 10 main categories: car shades, fences, royal tents, traditional tents, pergolas, landscaping, hangars, fences, tiles, and sandwich panels. It functions as a comprehensive business website with advanced portfolio management, automatic watermarking, AI-powered competitor analysis, and robust content management. The primary goals are to enhance the company's online presence, streamline content updates, improve search engine visibility, and boost user engagement, aiming to be a leading online platform in the Saudi Arabian construction sector.

# User Preferences

Preferred communication style: Simple, everyday language.
Image storage: Cloudinary preferred over local storage for better performance, automatic optimization, and SEO benefits.

# System Architecture

## Frontend
- **Framework**: Next.js 15.5.0 (App Router, React 18).
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI.
- **Typography**: Noto Sans Arabic with fluid typography.
- **Animations**: Framer Motion.
- **Image Management**: Next.js Image optimization (WebP/AVIF).
- **UI/UX**: Responsive, mobile-first design, WCAG 2.1 AA accessibility compliant.

## Backend
- **API Routes**: Next.js App Router API routes.
- **Authentication**: JWT-based admin authentication.
- **File Upload**: Multi-format file upload with Cloudinary integration for images (up to 100MB) and videos (up to 200MB).
- **Content Management**: RESTful API for project and content CRUD operations.

## Database
- **ORM**: Prisma ORM.
- **Schema**: Models for Projects, Articles, Admin Users, and analytics.

## Content Management System (CMS)
- **Features**: Advanced project showcase, blog/articles, dynamic sitemap, media management, admin dashboard.
- **Advanced Portfolio Exhibition System**: Supports 10 unified categories with automatic watermarking (+966553719009) on all media via Cloudinary transformations, automatic media optimization (image compression to 1920px/85 quality, video to 1280px/2000k bitrate), and AI-powered competitor analysis at `/dashboard/projects/analyze` using Gemini 2.0 Flash. Tracks media processing metrics.
- **FAQ Management System**: Admin CRUD interface at `/dashboard/faqs` with enhanced SEO fields, AI-powered duplicate detection, analytics, dynamic sitemap (`/sitemap-faqs.xml`), rich FAQ schema, and categorization by service.
- **Category Unification System**: Standardized 10 main categories across all content types with automatic normalization of legacy category names via `src/lib/categoryNormalizer.ts` and a database migration script.

## SEO & Performance
- **SEO**: Automated sitemap/robots.txt, structured data, canonical URLs, hreflang, Google Business Profile integration, IndexNow API.
- **AI-Powered SEO Agent**: Google Gemini 2.5 for content analysis, keyword intelligence, article writing, project descriptions, meta tag generation, and competitor analysis within the admin dashboard. Includes SEO diagnostics and auto-fix capabilities.
- **AI Article Agent**: Generates SEO-optimized articles with automated image selection (Google Custom Search API) and AI-generated alt text.
- **Smart Content Generation System**: Infrastructure for web search-based competitor analysis to generate intelligent content.
- **Automated Indexing System**: Notifies search engines (IndexNow, Bing Webmaster API) about content changes.
- **Performance Optimizations**: CSS (cssnano, critical CSS inlining), JavaScript (modern-only browserslist, ES2022), build (SWC minification), image (responsive `sizes`, lazy loading, AVIF/WebP), Core Web Vitals (LCP, FID, CLS), mobile responsiveness fixes, PWA capabilities, and resource hints.
- **AI-Assisted Content Creation**: Real-time AI suggestions during project submission using Google Gemini 2.0 Flash for keywords, titles, descriptions, and meta tags.

## Security
- **Authentication**: Secure admin login.
- **Input Validation**: Zod schemas.
- **Rate Limiting**: Express rate limiting.
- **Content Security**: DOMPurify for HTML rendering.

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
- **PostgreSQL**: Primary database (Neon-backed, external production database) with new fields for AI analysis and media processing info.
- **Cloudinary**: Unified cloud storage for all images and videos, providing automatic optimization, CDN delivery, and automatic watermarking (integrated with +966553719009).

## Authentication & Security
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: JWT token management.
- **DOMPurify**: HTML sanitization.
- **Zod**: Runtime type validation.

## Analytics & AI
- **Google Analytics 4**: Site analytics and Web Vitals tracking.
- **Google Gemini AI**: Gemini 2.0 Flash Exp model for SEO analysis, content generation, AI competitor analysis, project descriptions, and meta tag generation.
- **Google Custom Search API**: Image search for automated article image selection.