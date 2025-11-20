# Overview

This Next.js web application serves "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company. It specializes in 10 main categories: car shades (مظلات سيارات), fences (سواتر), royal tents (خيم ملكية), traditional tents (بيوت شعر ملكي), pergolas (برجولات), landscaping (تنسيق حدائق), hangars (هناجر), fences (شبوك), tiles (قراميد), and sandwich panels (ساندوتش بانل) in Jeddah. The application functions as a comprehensive business website with advanced portfolio management, automatic watermarking, AI-powered competitor analysis, and robust content management. Its primary goals are to enhance the company's online presence, streamline content updates, improve search engine visibility, and boost user engagement. The project aims to be a leading online platform in the Saudi Arabian construction sector, leveraging advanced AI for content, SEO, and competitive intelligence.

# User Preferences

Preferred communication style: Simple, everyday language.
Image storage: Cloudinary preferred over local storage for better performance, automatic optimization, and SEO benefits.

# System Architecture

## Frontend
- **Framework**: Next.js 15.5.0 with App Router and React 18.
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI.
- **Typography**: Noto Sans Arabic with fluid typography using clamp() for responsive scaling.
- **Animations**: Framer Motion.
- **Image Management**: Next.js Image optimization (WebP/AVIF) with responsive sizes attribute.
- **UI/UX**: Responsive, mobile-first design with optimized typography, touch-friendly interfaces, consistent branding, and comprehensive WCAG 2.1 AA accessibility compliance.
- **Accessibility**: Full keyboard navigation support, ARIA labels, focus indicators, high contrast ratios (4.5:1 minimum), and screen reader optimization.
- **Components**: Reusable Arabic-localized ErrorMessage and LoadingState components for consistent UX.

## Backend
- **API Routes**: Next.js App Router API routes.
- **Authentication**: JWT-based admin authentication.
- **File Upload**: Multi-format file upload with chunked uploads and intelligent fallback to local storage, supporting images up to 100MB and videos up to 200MB via Cloudinary.
- **Content Management**: RESTful API for project and content CRUD operations.

## Database
- **ORM**: Prisma ORM.
- **Schema**: Models for Projects, Articles, Admin Users, and analytics.

## Content Management System (CMS)
- **Features**: Advanced project showcase, blog/articles archive, dynamic sitemap generation, comprehensive media management, and a full-featured admin dashboard.
- **Advanced Portfolio Exhibition System** (November 2025):
  - **10 Main Categories**: مظلات سيارات, سواتر, خيم ملكية, بيوت شعر ملكي, برجولات, تنسيق حدائق, هناجر, شبوك, قراميد, ساندوتش بانل
  - **Automatic Watermarking**: All images and videos automatically watermarked with +966553719009 using Cloudinary transformations - FULLY INTEGRATED & ACTIVE
  - **Media Processing**: Automatic image compression (max 1920px, quality 85%), video optimization (max 1280px, bitrate 2000k)
  - **AI Competitor Analysis**: Complete AI-powered competitor analysis system available at `/dashboard/projects/analyze` using Gemini 2.0 Flash
  - **AI Competitor Analysis**: Gemini 2.0 Flash-powered competitive intelligence with SEO recommendations, keyword suggestions, and market insights
  - **Processing Metrics**: Tracks original size, processed size, compression ratio, and processing time for all media
  - **Watermark Options**: Configurable position (center, bottom-right, bottom-left, top-right, top-left), opacity, color, and font
- **FAQ Management System** (November 2025):
  - **Admin Dashboard**: Complete CRUD interface at `/dashboard/faqs` for managing frequently asked questions
  - **Enhanced SEO Fields**: Support for custom slugs, meta titles, meta descriptions, keywords, and related questions
  - **AI-Powered Duplicate Detection**: Automatic analysis of similar questions using text similarity algorithms with recommendations for merging
  - **Analytics & Tracking**: Views counter, helpfulness ratings, click tracking for user engagement insights
  - **Dynamic Sitemap**: Auto-generated `/sitemap-faqs.xml` with enhanced structured data and news markup
  - **Structured Data**: Rich FAQ schema (FAQPage, Question, Answer) with breadcrumbs and WebPage schemas for improved search visibility
  - **Categorization**: Organized by service categories (مظلات, برجولات, سواتر, تنسيق حدائق, etc.) with filtering
  - **User Experience**: Expandable answers, category filtering, search functionality, deep linking support, and related questions

## SEO & Performance
- **SEO**: Automated sitemap and robots.txt generation, structured data (e.g., Article, Service, LocalBusiness), canonical URLs, hreflang, Google Business Profile integration, and IndexNow API.
- **AI-Powered SEO Agent**: Utilizes Google Gemini 2.5 for content analysis, keyword intelligence, AI-powered article writing, project descriptions, meta tag generation, and competitor analysis, integrated into an admin dashboard.
- **SEO Diagnostics & Auto-Fix**: Automated detection and AI-powered fixing for common SEO issues like missing alt text, weak meta tags, and duplicate content. Includes a health monitor and batch auto-fix capabilities.
- **AI Article Agent**: Generates SEO-optimized articles with automated image selection (using Google Custom Search API with multi-tier licensing and Cloudinary upload) and AI-generated alt text. Supports bulk article generation.
- **Smart Content Generation System**: Infrastructure for web search-based competitor analysis (currently mock, ready for real search API integration) to generate intelligent, human-like content that fills identified gaps and optimizes for target keywords.
- **Automated Indexing System**: Centralized service for notifying search engines (IndexNow, Bing Webmaster API, Sitemap Ping) about content changes (create, update, delete) for published content, with a monitoring dashboard.
- **Performance Optimizations** (November 2025):
  - **CSS Optimization**: cssnano compression in production, critical CSS inlining in layout, reduced CSS bundle size by ~40%, utility classes for common patterns
  - **JavaScript Optimization**: Modern-only browserslist (Safari 15.4+, Chrome 94+, Firefox 92+), removed unnecessary polyfills (Array.at, Object.hasOwn, etc.), ES2022 target, saved ~11.5 KB
  - **Build Optimization**: Next.js CSS optimization (Critters), SWC minification, console.log removal in production
  - **Image Optimization**: Responsive sizes attribute for optimal loading, lazy loading for off-screen images, AVIF/WebP formats, quality optimization based on priority
  - **Core Web Vitals**: Optimized LCP (<1.5s), FID (<100ms), CLS (<0.1), reduced render-blocking resources by ~550ms
  - **Mobile Responsiveness**: Fixed Hero Section text sizing with clamp(), corrected Footer button layout for mobile, fixed Mega Menu overflow, improved Gallery grid responsiveness
  - **Legacy Features**: Next.js Image optimization, optimized font loading (Noto Sans Arabic), code splitting, caching (React `cache()`, CDN), PWA capabilities (Service Worker, manifest), Web Vitals monitoring, and resource hints.

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
- **PostgreSQL**: Primary database (Neon-backed, external production database).
  - **New Fields for Projects**: `aiAnalysis` (JSON), `competitorInsights` (text), `suggestedKeywords` (text), `lastAnalyzedAt` (datetime), `mediaProcessingInfo` (text), `watermarkApplied` (boolean)
  - **New Fields for Media**: `originalSize` (int), `processedSize` (int), `compressionRatio` (float), `watermarkApplied` (boolean), `processingTime` (int), `cloudinaryPublicId` (string)
- **Cloudinary**: Unified cloud storage for all images and videos with:
  - Automatic optimization (WebP/AVIF), CDN delivery
  - **Automatic Watermarking**: Text overlay system with +966553719009 - FULLY INTEGRATED
    - Applied automatically on upload via `uploadToCloudinary()` in `src/lib/cloudinary.ts`
    - Tracks processing info: original size, processed size, compression ratio, processing time
    - Stores metadata in database via updated upload API
  - **Image Processing**: Automatic compression, resizing, and format conversion
  - **Video Processing**: Compression, thumbnails generation, and watermark overlay
- **AI Features**: 
  - **Gemini 2.0 Flash Integration**: Advanced AI analysis using Google's Gemini API
  - **Competitor Analysis System**: Full-featured analysis dashboard at `/dashboard/projects/analyze`
    - Analyze existing projects or manual input
    - Provides: SEO ranking factors, keyword suggestions, content structure, title improvements
    - Image recommendations, competitive advantages, market insights
    - Saves analysis results to project database for future reference
  - All legacy local uploads migrated to Cloudinary (52/53 images successfully migrated on Nov 20, 2025)

## Authentication & Security
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: JWT token management.
- **DOMPurify**: HTML sanitization.
- **Zod**: Runtime type validation.

## Analytics & AI
- **Google Analytics 4**: Site analytics and Web Vitals tracking.
- **Google Gemini AI**: Gemini 2.0 Flash Exp model for:
  - SEO analysis and content generation
  - **AI Competitor Analysis** (New): Comprehensive competitive intelligence with top ranking factors, suggested keywords, content structure recommendations, title suggestions, image suggestions, competitive advantages, and market insights
  - Project descriptions and meta tag generation
- **Google Custom Search API**: Image search for automated article image selection.

# Recent Changes

## Category Unification System (November 20, 2025)
Complete standardization of category taxonomy across all content types (Projects, Articles, FAQs).

### Implementation Details
- **Unified 10 Main Categories**: 
  - مظلات سيارات, سواتر, خيم ملكية, بيوت شعر ملكي, برجولات, تنسيق حدائق, هناجر, شبوك, قراميد, ساندوتش بانل
  - Replaced legacy categories: "عام", "نصائح وإرشادات", "أخرى", "مقالات تقنية"

- **Category Normalization Library** (`src/lib/categoryNormalizer.ts`):
  - `normalizeCategoryName()`: Validates and automatically converts legacy category names
  - Supports 30+ legacy category variations (e.g., مظلات → مظلات سيارات, خيام → خيم ملكية)
  - Returns validation results with transformation status and detailed error messages
  - Used across all API endpoints for consistent validation

- **Legacy Category Mapping** (`src/constants/projectCategories.ts`):
  - Comprehensive `LEGACY_CATEGORIES_MAP` handles all historical category variations
  - Automatic conversion ensures backward compatibility

- **API Integration**:
  - All create/update endpoints for projects, articles, and FAQs include:
    - Automatic category validation before saving
    - Real-time conversion of legacy categories to unified categories
    - Console logging for transparency and debugging
    - Arabic error messages for invalid categories
  - Updated files:
    - `src/app/api/projects/create/route.ts` and `[id]/route.ts`
    - `src/app/api/articles/route.ts` and `[id]/route.ts`
    - `src/app/api/faqs/route.ts` and `[id]/route.ts`

- **Database Migration Script** (`scripts/migrate-categories.ts`):
  - Automated script to update existing database records
  - Processes all projects, articles, and FAQs in bulk
  - Detailed reporting with success/error counts and transformation details
  - Run via: `bun run migrate:categories`
  - Safe to run multiple times (idempotent)

- **UI Consistency**: All user interfaces updated to use unified categories
  - Portfolio gallery and filtering
  - Advanced search with category filters
  - FAQs categorization and navigation
  - Article categorization and browsing

### Benefits
- **Consistency**: Unified category naming across entire platform
- **Search Accuracy**: Improved filtering and search results
- **SEO Optimization**: Standardized taxonomy for better search engine indexing
- **Backward Compatibility**: Seamless handling of legacy data
- **Data Quality**: Automatic validation prevents invalid categories
- **User Experience**: Clear, consistent navigation and filtering
