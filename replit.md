# Overview

This Next.js web application is for "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company specializing in pergolas, car shades, awnings, and garden landscaping in Jeddah. Its purpose is to serve as a comprehensive business website, featuring portfolio management, project showcasing, and robust content management capabilities. The project aims to enhance the company's online presence, streamline content updates, and improve search engine visibility and user engagement.

## Recent Additions

### Advanced Search System (2024-11-18)
A comprehensive, professional search system covering all website content types:
- **Unified Search API**: Single endpoint (`/api/search`) supporting Articles, Projects, and FAQs
- **Advanced Filtering**: Category, location, rating (1-5 stars), date range, featured status, and author filters
- **Professional Search Page**: Modern design with content type tabs, facets showing result counts, and responsive layout
- **Deep-Link Navigation**: Seamless navigation from search results to FAQ page with automatic scroll and expansion
- **Smart Result Display**: Content-type specific cards with appropriate icons, badges, and metadata
- **One-Shot Deep-Link Handler**: Reliable FAQ deep-linking using useRef flags to prevent duplicate scrolls
- **Result Sorting**: Support for relevance, date, rating, and views sorting options
- **Arabic-First UI**: Fully RTL-compatible interface with Arabic labels and descriptions

### Image SEO Optimization System (2024-11-16)
A comprehensive, **fully automatic** system for optimizing all website images for search engines:
- **Auto-generated Alt Text**: Context-aware alt text generation based on project title, category, and location
- **Structured Data**: Server-side JSON-LD schema for all images in project galleries
- **Enhanced Image Sitemap**: Dynamic sitemap with complete metadata (caption, title, description, geo_location, license)
- **Smart Upload Flow**: Automatic metadata generation during project upload in admin dashboard
- **SEOImage Component**: Reusable component with optional watermarks and lazy loading
- **Documentation**: Complete technical docs and user guide in Arabic

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
- **AI Article Agent**:
    - **Automated Content Creation**: AI-powered article generation with SEO optimization
    - **Smart Image Selection**: Multi-tier image search system using Google Custom Search API
      * **3-Tier Licensing Strategy**: Progressively searches CC licenses (broad → limited) then unrestricted images
      * **Intelligent Retry Logic**: Attempts 3 images per query with automatic fallback
      * **Image Upload**: Downloads and uploads images to Cloudinary for reliable hosting
      * **Fallback System**: Uses default placeholder images if all searches fail
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
- **Smart Content Generation System** (LATEST):
    - **Competitor Analysis Foundation**: Infrastructure for web search-based competitor analysis
      * **Current Status**: Uses mock data for demonstration and testing
      * **Production Ready**: Framework is in place to integrate real search APIs
      * **Supported APIs**: Google Custom Search API, Bing Search API, SerpAPI
      * **Environment Gate**: Set `ENABLE_REAL_WEB_SEARCH=true` to enable real search (requires API integration)
      * **Mock Mode Features**:
        - AI-powered competitor analysis based on search query patterns
        - Keyword extraction and content strategy analysis
        - Content gap identification
        - Target audience and writing style analysis
      * **Real Search Mode** (when integrated):
        - Searches actual competitor articles and content
        - Extracts keywords, writing style, content strategy from real sources
        - Tracks competitor URLs and analysis sources
        - Provides truthful `webSearchUsed` flag in API responses
    - **Intelligent Article Generation**: Creates human-like content based on competitor insights
      * Uses competitor analysis to match successful writing styles
      * Generates unique content that fills identified gaps
      * Optimizes for target keywords and audience
      * Creates SEO-friendly meta tags based on competitor best practices
    - **Automated Content Pipeline**:
      * Phase 1: Competitor analysis (currently mock, ready for real search integration)
      * Phase 2: Smart article idea generation (fills content gaps)
      * Phase 3: Human-like content writing with SEO optimization
      * Phase 4: Automatic image selection and alt text generation
      * Phase 5: Database storage with draft/publish options
    - **API Endpoint**: `/api/ai-agent/smart-auto-generate`
      * Input: niche, article count (1-10), auto-publish flag
      * Output: Generated articles with SEO scores, competitor insights, analysis data
      * Tracks `webSearchUsed` status (currently false in mock mode)
    - **Documentation**: See `docs/SMART-GENERATION-GUIDE.md` for detailed usage guide and testing instructions
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

## Environment Variables
- **GOOGLE_AI_API_KEY**: Google Gemini AI API key for SEO analysis and content generation.
- **GOOGLE_API_KEY**: Google Custom Search API key for image search (100 searches/day free tier).
- **GOOGLE_SEARCH_ENGINE_ID**: Google Custom Search Engine ID for image search configuration.
- **CLOUDINARY_CLOUD_NAME**, **CLOUDINARY_API_KEY**, **CLOUDINARY_API_SECRET**: Cloudinary credentials for media management.
- **DATABASE_URL**: PostgreSQL database connection string (Neon).

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
- **Google Custom Search API**: Image search for automated article image selection (100 searches/day free tier).

## Development & Deployment
- **Biome**: Code formatting and linting.
- **ESLint**: Code quality checks.
- **PostCSS**: CSS processing.
- **@next/bundle-analyzer**: For monitoring bundle size.
- **Vercel**: Deployment platform.