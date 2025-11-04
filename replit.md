# Overview

This is a Next.js-based web application for "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company specializing in pergolas, car shades, awnings, and garden landscaping services in Jeddah. The application serves as a comprehensive business website with portfolio management, project showcase, and content management capabilities.

# Recent Changes

## November 4, 2025 - Testimonials Section Enhancement
- ✅ **Homepage Testimonials Integration**: Added prominent testimonials section to homepage
  - Integrated TestimonialsSection component on homepage (Hero → Services → Portfolio → Testimonials → Footer)
  - Carousel display with 6 customer testimonials featuring auto-play functionality
  - Hover-to-pause interaction for better user experience
  - Comprehensive Review Schema (LocalBusiness) for SEO optimization
  - Aggregate rating: 4.9/5 stars from 6 verified customer reviews
  - Full structured data for each testimonial with author, rating, service, and review text

## November 4, 2025 - Missing Schema Implementation (Review & Article)
- ✅ **IndividualReviewSchema Component**: Created standalone review schema
  - Supports individual review structured data separate from aggregate ratings
  - Flexible itemReviewed property supporting Service, Product, LocalBusiness, Organization types
  - Full reviewer information with author details and publisher data
  - Compliant with Google's Review snippet requirements
  
- ✅ **ArticleSchema Component**: Complete article structured data implementation
  - Full Article schema with headline, description, author, and publisher
  - Automatic image array generation from article media items
  - Word count calculation for articleBody
  - Support for keywords, articleSection, and publication dates
  - Integrated in individual article pages (/articles/[id])
  
- ✅ **Enhanced ReviewSchema Component**: Improved existing review schema
  - Added itemType parameter for flexible Service/Product/LocalBusiness reviews
  - Provider information support for service-based reviews
  - Service URL integration for better linking
  - Backward compatible with existing implementations
  - Default provider set to 'محترفين الديار العالمية'

- ✅ **Article Pages Enhancement**: 
  - Integrated ArticleSchema in /articles/[id]/page.tsx
  - Automatic plain text extraction from HTML content
  - Word count calculation for SEO optimization
  - Multiple image support in structured data
  - Complete metadata alignment with schema markup

## November 4, 2025 - Advanced SEO Enhancement Package
- ✅ **Reusable Breadcrumb Component**: Created comprehensive breadcrumb navigation system
  - New Breadcrumb UI component with RTL support and accessibility features
  - BreadcrumbSchema component for automatic structured data generation
  - Applied to service pages (mazallat, pergolas) and portfolio pages
  
- ✅ **Enhanced SEO Utilities Library**: Comprehensive seo-utils.ts expansion
  - `generateServiceSchema()`: Automated service structured data with LocalBusiness integration
  - `generateCreativeWorkSchema()`: Advanced project/portfolio schema with media support
  - `generateFAQSchema()`: Structured FAQ data for rich snippets
  - `generateArticleSchema()`: Article markup with publisher information
  - `generateOpenGraphMetadata()`: Unified Open Graph tag generation
  - `generateTwitterMetadata()`: Twitter card metadata helper
  - `generateRobotsMetadata()`: Standardized robots directives
  - `generateAggregateRatingSchema()`: Rating/review structured data
  - `generateCanonicalUrl()`: Canonical URL standardization

- ✅ **Service Pages SEO Enhancement**: Applied to mazallat and pergolas as templates
  - Integrated Breadcrumb UI and Schema components
  - Improved Service Schema using utility functions
  - Added FAQ Schema for rich snippet eligibility
  - Consistent canonical URL implementation
  - Remaining service pages (sawater, landscaping, sandwich-panel, renovation, byoot-shaar, khayyam) can follow the same pattern

- ✅ **Portfolio/Project Pages Enhancement**:
  - Updated portfolio/[id]/page.tsx with improved CreativeWork Schema
  - Added Breadcrumb Schema to project detail pages
  - Integrated Breadcrumb UI in ProjectDetailsClient component
  - Automatic image and video structured data generation
  - Support for aggregate ratings on projects

- ✅ **Schema Markup Architecture**: Scalable approach to structured data
  - All schema generation centralized in reusable utility functions
  - Type-safe TypeScript interfaces for schema parameters
  - Consistent contact information and business details across all schemas
  - Support for conditional schema properties (ratings, dates, media)

## October 30, 2025 - Comprehensive SEO Critical Fixes (9 Major Issues)
- ✅ **Schema JSON-LD Line Breaks Fixed**: Removed formatting from JSON.stringify to eliminate line breaks
  - Updated CompanyJsonLd.tsx to use minified JSON output
  - Ensures proper parsing by search engines (Google, Bing, Yandex)
  
- ✅ **URL Standardization (www vs non-www)**: Unified all URLs across 24+ files
  - Standardized on https://www.aldeyarksa.tech across entire codebase
  - Updated sitemap files, API routes, service pages, and metadata
  - Prevents duplicate content issues and consolidates SEO authority
  
- ✅ **Hreflang Tags Enhancement**: Improved international SEO
  - Added x-default hreflang tag for language fallback
  - Implemented relative canonical URLs with metadataBase
  - Ensures proper language targeting for ar-SA market
  
- ✅ **Open Graph URLs Consistency**: Aligned all social media metadata
  - Unified OG URLs with www subdomain
  - Fixed Twitter card image URLs
  - Improves social sharing appearance and tracking
  
- ✅ **Viewport Accessibility Fix**: Enhanced mobile user experience
  - Removed userScalable: false restriction
  - Increased maximumScale from 1 to 5
  - Complies with WCAG accessibility guidelines
  
- ✅ **Meta Verification Tags Cleanup**: Removed fake verification tags
  - Deleted dummy verification metadata from page.tsx
  - Retained only genuine Google Search Console verification
  - Prevents search engine confusion and penalties
  
- ✅ **FAQPage Schema Implementation**: Added structured FAQ data
  - Created comprehensive FAQ schema with 5 common questions
  - Properly integrated in <head> via StructuredDataScript
  - Enables FAQ rich snippets in search results
  
- ✅ **Schema Deduplication**: Resolved LocalBusiness conflicts
  - Eliminated duplicate Organization/LocalBusiness schemas
  - Single source of truth via StructuredDataScript
  - Prevents schema validation errors and ranking issues

- ✅ **Google Business Profile Integration**: Linked Google Business Profile to website schema
  - Added Google Business link (https://share.google/GKcHjw3Gl5MX85WmQ) to Schema markup
  - Integrated `sameAs` property in Organization and LocalBusiness schemas
  - Added `hasMap` property for Google Maps integration

- ✅ **Sitemap XML Optimization**: Fixed critical line break issues in all sitemap files
  - Fixed line breaks in `<loc>`, `<image:loc>`, `<video:content_loc>`, and `<rs:ln>` tags
  - Updated all sitemap files: sitemap.xml, sitemap-projects.xml, sitemap-articles.xml, sitemap-images.xml
  - Ensured all URLs are rendered as single-line strings for proper search engine parsing

## October 29, 2025 - Articles Management System
- ✅ **API Routes**: Full CRUD operations for articles (`/api/articles`, `/api/articles/[id]`)
- ✅ **Dashboard Pages**: Complete admin interface for managing articles
  - Article listing page with filtering, search, and statistics (`/dashboard/articles`)
  - Add new article page with media upload and tags (`/dashboard/articles/add`)
  - Edit article page with data loading and updates (`/dashboard/articles/[id]/edit`)
- ✅ **Public Pages**: Dynamic article pages using API data
  - Articles archive page (`/articles`)
  - Individual article detail pages (`/articles/[id]`)
- ✅ **Sitemap**: Dynamic sitemap generation from database (`/sitemap-articles.xml`)
- ✅ **Dashboard Navigation**: Added articles management links to sidebar menu
  - "المقالات" (Articles) - Links to articles listing
  - "إضافة مقال" (Add Article) - Links to add new article form

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 15.5.0 with App Router and React 18
- **Styling**: Tailwind CSS with custom component library using Shadcn/UI
- **UI Components**: Radix UI primitives for accessibility and consistent behavior
- **Typography**: Noto Sans Arabic font optimized for Arabic content
- **Animations**: Framer Motion for smooth transitions and interactive elements
- **Image Management**: Next.js Image optimization with support for WebP/AVIF formats

## Backend Architecture
- **API Routes**: Next.js App Router API routes for server-side functionality
- **Authentication**: JWT-based admin authentication with bcrypt password hashing
- **Session Management**: Secure session handling for admin dashboard access
- **File Upload**: Multi-format file upload system supporting images and videos
- **Content Management**: RESTful API for project and content CRUD operations

## Database Design
- **ORM**: Prisma ORM for type-safe database operations
- **Schema**: Comprehensive database models including:
  - Projects with media items, tags, and materials
  - Articles with media items, tags, comments, likes, and views
  - Admin users with role-based access
  - Comments and reviews system
  - Project and article interactions and analytics
- **Migrations**: Database versioning through Prisma migrations

## Content Management
- **Portfolio System**: Advanced project showcase with filtering, search, and categorization
- **Articles System**: Complete blog/articles archive with dynamic sitemap and full CRUD operations
- **Media Management**: Support for multiple media types per project and article with ordering
- **SEO Optimization**: Automated sitemap generation, robots.txt, and structured data
- **Search Engine Indexing**: IndexNow API integration for requesting search engine crawling
- **Admin Dashboard**: Full-featured management interface for content administration

## Performance Optimizations
- **Image Optimization**: Cloudinary integration for image processing and CDN delivery
- **Lazy Loading**: Intersection Observer-based lazy loading for images and components
- **Code Splitting**: Dynamic imports for non-critical components
- **Caching**: Strategic caching for static assets and API responses
- **Bundle Optimization**: Turbopack for faster development builds

## Security Measures
- **Authentication**: Secure admin login with encrypted sessions
- **Input Validation**: Zod schemas for API request validation
- **Rate Limiting**: Express rate limiting for API endpoints
- **Content Security**: DOMPurify for safe HTML content rendering
- **Environment Variables**: Secure configuration management

# External Dependencies

## Core Technologies
- **Next.js**: Full-stack React framework
- **Prisma**: Database ORM and migration tool
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type safety and developer experience

## UI/UX Libraries
- **Radix UI**: Headless UI components for accessibility
- **Framer Motion**: Animation and gesture library
- **Lucide React**: Modern icon set
- **Swiper**: Touch-enabled carousel component

## Database & Storage
- **PostgreSQL**: Primary database (configured for Neon/Vercel)
- **Cloudinary**: Image and video management service
- **Local Storage**: Fallback for development environment

## Authentication & Security
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT token management
- **DOMPurify**: HTML sanitization
- **Zod**: Runtime type validation

## Development Tools
- **Biome**: Code formatting and linting
- **ESLint**: Additional code quality checks
- **PostCSS**: CSS processing and optimization

## Deployment Configuration
- **Vercel**: Primary deployment platform with optimized build settings
- **Environment Variables**: Production-ready configuration for database, authentication, and external services
- **Build Optimization**: Standalone output for efficient deployment