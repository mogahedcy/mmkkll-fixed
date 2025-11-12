# Overview

This Next.js web application is for "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company specializing in pergolas, car shades, awnings, and garden landscaping in Jeddah. Its purpose is to serve as a comprehensive business website, featuring portfolio management, project showcasing, and robust content management capabilities. The project aims to enhance the company's online presence, streamline content updates, and improve search engine visibility and user engagement.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: Next.js 15.5.0 with App Router and React 18.
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI.
- **Typography**: Noto Sans Arabic.
- **Animations**: Framer Motion.
- **Image Management**: Next.js Image optimization (WebP/AVIF).
- **UI/UX**: Responsive design with mobile-first considerations, including optimized typography, touch-friendly interfaces, and mobile navigation components (bottom nav bar, floating call button). Consistent branding with theme-color meta tag.

## Backend
- **API Routes**: Next.js App Router API routes.
- **Authentication**: JWT-based admin authentication with bcrypt and secure sessions.
- **File Upload**: Multi-format file upload (images up to 100MB, videos up to 200MB via Cloudinary) with chunked uploads, extended timeouts, and intelligent fallback to local storage.
- **Content Management**: RESTful API for project and content CRUD operations.

## Database
- **ORM**: Prisma ORM.
- **Schema**: Models for Projects (media, tags, materials), Articles (media, tags, comments, likes, views), Admin Users, and analytics.

## Content Management System (CMS)
- **Features**: Advanced project showcase, blog/articles archive, dynamic sitemap generation, comprehensive media management, and a full-featured admin dashboard.

## SEO & Performance
- **SEO**: Automated sitemap generation, robots.txt, structured data (Article, Service, CreativeWork, Review, FAQ, LocalBusiness), canonical URLs, hreflang, Google Business Profile integration, IndexNow API.
- **AI-Powered SEO Agent**: Advanced SEO optimization system powered by Google Gemini 2.5 (Free):
    - **Content Analysis**: SEO scoring, readability analysis, keyword optimization assessment
    - **Keyword Intelligence**: Keyword clustering, search intent analysis, difficulty scoring
    - **Content Generation**: AI-powered article writing, project descriptions, meta tags generation
    - **Competitor Analysis**: Strategic insights extraction, content gap identification
    - **Internal Linking**: Smart link suggestions with relevance scoring
    - **Dashboard Integration**: Full-featured SEO management interface in admin panel
    - **Cost**: 100% free with Google AI API (60 requests/minute limit)
- **SEO Diagnostics & Auto-Fix**:
    - **Automated Issue Detection**: Broken links, missing alt text, meta tag issues, duplicate content
    - **SEO Health Monitor**: Comprehensive dashboard with real-time issue tracking and scoring (0-100)
    - **Auto-Fix System**: AI-powered automatic fixing for:
      * Missing alt text for images (generates SEO-optimized alt text)
      * Weak or missing meta tags (generates optimized titles and descriptions)
      * Duplicate content (creates unique content variations)
    - **Batch Auto-Fix**: Fix all issues with one click
    - **Smart Recommendations**: AI-powered suggestions for SEO improvements
    - **IndexNow Auto-Submission**: Automatic URL submission to search engines on content publish/update
    - **Batch Processing**: Parallel issue detection and fixing for better performance
- **AI Article Agent** (NEW):
    - **Automated Content Creation**: AI-powered article generation with SEO optimization
    - **Smart Image Selection**: Automatically selects and integrates relevant images from Unsplash
    - **Image Alt Text Generation**: AI-generated alt text for all images
    - **Bulk Article Generation**: Create multiple articles simultaneously (up to 10 at once)
    - **Content Analysis**: Automatic SEO scoring and optimization suggestions
    - **Draft/Publish Options**: Generate as draft or publish immediately
    - **API Endpoints**:
      * `/api/ai-agent/generate-article`: Generate single article
      * `/api/ai-agent/generate-multiple-articles`: Bulk article generation
      * `/api/ai-agent/suggest-images`: Get AI-suggested images for content
      * `/api/ai-agent/auto-fix`: Fix single SEO issue
      * `/api/ai-agent/auto-fix-all`: Fix all SEO issues automatically
      * `/api/ai-agent/seo-audit`: Run comprehensive SEO audit
- **Performance**:
    - **Image Optimization**: Next.js Image with AVIF/WebP, optimized device sizes (up to 1920px), 75% quality, extended cache TTL, priority loading for critical images.
    - **Font Loading**: Noto Sans Arabic (3 weights), `display: swap`, preloading.
    - **Code Splitting**: Lazy loading components, dynamic imports.
    - **Caching**: React `cache()`, CDN via Cloudinary.
    - **PWA**: Service Worker with versioned caching, offline support, PWA manifest, and "Add to Home Screen" capability.
    - **Web Vitals Monitoring**: Integrated component for real-time FCP, LCP, CLS, TTFB, INP tracking, with GA4 forwarding.
    - **Resource Hints**: DNS Prefetch, Preconnect, Prefetch for critical resources.

## Security
- **Authentication**: Secure admin login.
- **Input Validation**: Zod schemas for API requests.
- **Rate Limiting**: Express rate limiting.
- **Content Security**: DOMPurify for HTML rendering.
- **Configuration**: Secure environment variable management.

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

## Analytics & AI
- **Google Analytics 4**: For comprehensive site analytics and Web Vitals tracking.
- **Google Gemini AI**: Gemini 2.5 Flash model for advanced SEO analysis and content generation (free tier).

## Development & Deployment
- **Biome**: Code formatting and linting.
- **ESLint**: Code quality checks.
- **PostCSS**: CSS processing.
- **@next/bundle-analyzer**: For monitoring bundle size.
- **Vercel**: Deployment platform.