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
- **Performance Optimizations**: Cloudinary for image/video CDN, lazy loading, code splitting, caching, database query optimization (Prisma), React `cache()` for deduplication, and bundle optimization with Turbopack.

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
- **Vercel**: Deployment platform.