# Overview

This Next.js web application serves "محترفين الديار العالمية" (Aldeyar Global Professionals), a Saudi Arabian construction company. It specializes in pergolas, car shades, awnings, and garden landscaping in Jeddah. The application functions as a comprehensive business website, offering portfolio management, project showcasing, and robust content management. Its primary goals are to enhance the company's online presence, streamline content updates, improve search engine visibility, and boost user engagement. The project aims to be a leading online platform in the Saudi Arabian construction sector, leveraging advanced AI for content and SEO.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend
- **Framework**: Next.js 15.5.0 with App Router and React 18.
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI.
- **Typography**: Noto Sans Arabic.
- **Animations**: Framer Motion.
- **Image Management**: Next.js Image optimization (WebP/AVIF).
- **UI/UX**: Responsive, mobile-first design with optimized typography, touch-friendly interfaces, and consistent branding.

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

## SEO & Performance
- **SEO**: Automated sitemap and robots.txt generation, structured data (e.g., Article, Service, LocalBusiness), canonical URLs, hreflang, Google Business Profile integration, and IndexNow API.
- **AI-Powered SEO Agent**: Utilizes Google Gemini 2.5 for content analysis, keyword intelligence, AI-powered article writing, project descriptions, meta tag generation, and competitor analysis, integrated into an admin dashboard.
- **SEO Diagnostics & Auto-Fix**: Automated detection and AI-powered fixing for common SEO issues like missing alt text, weak meta tags, and duplicate content. Includes a health monitor and batch auto-fix capabilities.
- **AI Article Agent**: Generates SEO-optimized articles with automated image selection (using Google Custom Search API with multi-tier licensing and Cloudinary upload) and AI-generated alt text. Supports bulk article generation.
- **Smart Content Generation System**: Infrastructure for web search-based competitor analysis (currently mock, ready for real search API integration) to generate intelligent, human-like content that fills identified gaps and optimizes for target keywords.
- **Automated Indexing System**: Centralized service for notifying search engines (IndexNow, Bing Webmaster API, Sitemap Ping) about content changes (create, update, delete) for published content, with a monitoring dashboard.
- **Performance**: Next.js Image optimization, optimized font loading (Noto Sans Arabic), code splitting, caching (React `cache()`, CDN), PWA capabilities (Service Worker, manifest), Web Vitals monitoring, and resource hints.

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
- **PostgreSQL**: Primary database.
- **Cloudinary**: Image and video management and CDN.

## Authentication & Security
- **bcryptjs**: Password hashing.
- **jsonwebtoken**: JWT token management.
- **DOMPurify**: HTML sanitization.
- **Zod**: Runtime type validation.

## Analytics & AI
- **Google Analytics 4**: Site analytics and Web Vitals tracking.
- **Google Gemini AI**: Gemini 2.5 Flash model for SEO analysis and content generation.
- **Google Custom Search API**: Image search for automated article image selection.