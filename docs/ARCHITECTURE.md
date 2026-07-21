# Architecture Decision Record (ADR)

**Project:** Industrial Corporate Portfolio Platform (Kleenoil India — first deployment)  
**Version:** 1.1  
**Status:** Approved — pre-initialization refinements complete  
**Last updated:** 2026-07-05

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Goals & Non-Goals](#2-goals--non-goals)
3. [Phased Delivery Plan](#3-phased-delivery-plan)
4. [Tech Stack](#4-tech-stack)
5. [High-Level Architecture](#5-high-level-architecture)
   - [5.1 Architecture Diagrams](#51-architecture-diagrams)
6. [Folder Structure](#6-folder-structure)
7. [Payload CMS — Collections & Schema](#7-payload-cms--collections--schema)
8. [Block System](#8-block-system)
9. [Relationships Diagram](#9-relationships-diagram)
10. [Routing & URL Strategy](#10-routing--url-strategy)
11. [API Architecture](#11-api-architecture)
12. [Search Architecture](#12-search-architecture)
13. [Forms & Lead Management](#13-forms--lead-management)
14. [Media & Storage Abstraction](#14-media--storage-abstraction)
15. [Authentication & Authorization](#15-authentication--authorization)
16. [Security Architecture](#16-security-architecture)
17. [Performance Strategy](#17-performance-strategy)
18. [SEO & Analytics](#18-seo--analytics)
19. [Frontend Architecture](#19-frontend-architecture)
20. [Deployment Architecture](#20-deployment-architecture)
21. [Environment Variables](#21-environment-variables)
22. [CI/CD Pipeline](#22-cicd-pipeline)
23. [Backup & Disaster Recovery](#23-backup--disaster-recovery)
24. [Logging & Monitoring](#24-logging--monitoring)
25. [Future Scalability Roadmap](#25-future-scalability-roadmap)
26. [Open Decisions](#26-open-decisions)
27. [Approval Checklist](#27-approval-checklist)

---

## 1. Executive Summary

This document defines the architecture for an **enterprise-grade, reusable industrial corporate portfolio platform**. The first client deployment is **Kleenoil India**, but all code, collection names, and configuration are **client-neutral**. Branding, copy, and business-specific data live exclusively in **Payload CMS** and environment configuration.

The platform is built as a **single Next.js 16 application** with **Payload CMS 3.x** embedded via the App Router. **PostgreSQL** is the sole database. **Prisma is intentionally excluded** — Payload's native Postgres adapter handles all persistence, including form submissions.

The architecture prioritizes:

- **Server Components by default** for performance
- **Block-based CMS pages** for maximum editorial flexibility
- **Storage and search abstractions** for deployment portability
- **Security-first defaults** suitable for production from day one
- **Extension points** for 3D (React Three Fiber), i18n, e-commerce, and AI search without rewrites

---

## 2. Goals & Non-Goals

### Goals (V1 foundation)

| Goal                         | Approach                                                      |
| ---------------------------- | ------------------------------------------------------------- |
| Showcase products & services | Collections + listing/detail pages + homepage blocks          |
| Lead generation              | Contact + Quote forms stored in Payload, email notifications  |
| Strong SEO                   | Per-document SEO fields, structured data, sitemap, robots.txt |
| CMS-driven everything        | Navigation, footer, pages, globals — all editable in Payload  |
| Lighthouse 95+               | RSC, image optimization, minimal client JS, caching           |
| Reusable across clients      | Neutral code; `SiteSettings` global for company identity      |
| Hostinger + Vercel portable  | Docker for VPS; serverless-compatible patterns for Vercel     |

### Non-Goals (V1)

| Non-Goal                      | Future phase                           |
| ----------------------------- | -------------------------------------- |
| E-commerce / payments         | Phase 5+                               |
| Public user authentication    | Phase 4                                |
| Multi-language content        | Phase 3 (architecture ready in V1)     |
| Newsletter functionality      | Phase 2 (UI placeholder in V1)         |
| Heavy GSAP / 3D configurators | Phase 3–4                              |
| AI search / recommendations   | Phase 5+                               |
| Prisma ORM                    | Not planned unless a clear gap emerges |

---

## 3. Phased Delivery Plan

Since launch is phased, development follows incremental milestones. Each phase is deployable.

### Phase 1 — Foundation & Core Pages (MVP)

**Goal:** Live site with brand presence, product discovery, and lead capture.

| Deliverable      | Details                                                             |
| ---------------- | ------------------------------------------------------------------- |
| Project scaffold | Next.js 15, Payload, Tailwind, shadcn/ui, security baseline         |
| Globals          | Site Settings, SEO Defaults, Contact Info, Navigation, Footer       |
| Collections      | Pages, Products, Categories, Industries, Services, Media, Users     |
| Pages            | Home (block builder), About, Contact, Privacy, Terms, Cookie Policy |
| Product pages    | Listing (grid + filters), Detail                                    |
| Forms            | Contact + Quote with Turnstile, honeypot, rate limiting             |
| SEO              | Metadata, sitemap, robots.txt, Organization schema                  |
| Deployment       | Staging + production on chosen Hostinger plan                       |

### Phase 2 — Content & Discovery

| Deliverable           | Details                                                           |
| --------------------- | ----------------------------------------------------------------- |
| Blog                  | Posts, categories, tags, authors (linked to Team), Article schema |
| FAQs                  | Collection + FAQ schema + Resources section                       |
| Downloads & Brochures | File collections under Resources                                  |
| Global search         | PostgreSQL full-text across products, services, blog, FAQs        |
| Testimonials          | Collection + homepage block + listing page                        |
| Gallery               | Image/video collection + listing page                             |
| Analytics             | GA4 integration                                                   |
| Cookie consent banner | GDPR-ready, configurable from CMS                                 |

### Phase 3 — Rich Content & Case Studies

| Deliverable               | Details                                        |
| ------------------------- | ---------------------------------------------- |
| Case Studies              | Collection + listing + detail + homepage block |
| Process Story             | Homepage block + standalone page               |
| Team                      | Leadership collection + homepage block         |
| Services page             | Full listing + detail                          |
| Industries page           | Full listing + detail                          |
| Remaining homepage blocks | Trust, Statistics, all block types             |
| Newsletter                | Backend integration when provider chosen       |

### Phase 4 — Enhancement & Internationalization

| Deliverable            | Details                                                 |
| ---------------------- | ------------------------------------------------------- |
| i18n                   | Payload localization plugin, `hreflang`, locale routing |
| Enhanced animations    | GSAP scroll animations, page transitions                |
| 3D product viewer      | React Three Fiber integration, `.glb` on products       |
| Customer accounts      | Auth layer, dashboard architecture                      |
| Meilisearch (optional) | Swap search provider via abstraction                    |

### Phase 5 — Commerce & Advanced

| Deliverable          | Details                                     |
| -------------------- | ------------------------------------------- |
| E-commerce           | Cart, checkout, payment gateway abstraction |
| Product configurator | 3D + variant selection                      |
| AI search            | Vector search, recommendations              |
| AR/VR                | WebXR integration points                    |

---

## 4. Tech Stack

| Layer               | Technology                                           | Rationale                                                                    |
| ------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------- |
| Framework           | **Next.js 16** (App Router)                          | RSC, streaming, built-in image/font optimization; Payload peer-supported     |
| Language            | **TypeScript** (strict)                              | Type safety across CMS and frontend; Payload generates types                 |
| Styling             | **Tailwind CSS 4**                                   | Utility-first, design-token friendly, small bundle                           |
| UI Components       | **shadcn/ui**                                        | Accessible primitives (Radix), customizable, no runtime dependency lock-in   |
| CMS                 | **Payload CMS 3.x** (latest stable)                  | TypeScript-native, embedded in Next.js, blocks, drafts, versions, scheduling |
| Database            | **PostgreSQL 16+**                                   | Relational integrity, full-text search, JSON support, proven at scale        |
| ORM                 | **None (Payload adapter)**                           | Avoids dual schema management; Payload handles migrations                    |
| Validation          | **Zod**                                              | Runtime validation for API routes, forms, env vars                           |
| Forms (client)      | **React Hook Form** + Zod                            | Performant, accessible, integrates with shadcn Form                          |
| Spam protection     | **Cloudflare Turnstile**                             | Privacy-friendly CAPTCHA alternative                                         |
| Rate limiting       | **@upstash/ratelimit** or in-memory (VPS)            | Configurable per environment                                                 |
| Email               | **Abstracted provider** (Resend / Nodemailer)        | Swappable; provider decided later                                            |
| Animation           | **CSS transitions** (V1), **GSAP** (minimal V1)      | Progressive enhancement                                                      |
| Icons               | **Lucide React**                                     | Matches design system                                                        |
| Fonts               | **next/font** (Poppins + Arimo)                      | Self-hosted, zero layout shift; configurable via CSS variables               |
| Linting             | ESLint + Prettier + Husky + lint-staged + Commitlint | Enforced code quality; Conventional Commits                                  |
| Testing             | Vitest + React Testing Library + Playwright          | Unit, component, and E2E test infrastructure                                 |
| Dependency security | Dependabot (weekly)                                  | Automated npm, Actions, and Docker image updates                             |
| Containerization    | **Docker + Docker Compose**                          | VPS deployment, reproducible environments                                    |
| CI/CD               | **GitHub Actions**                                   | Lint, type-check, test, build, deploy                                        |

### Decisions NOT taken

| Alternative                       | Why rejected for V1                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------------------ |
| **Prisma**                        | Payload owns the schema; adding Prisma creates dual migration paths and type drift         |
| **Separate CMS + frontend repos** | Unnecessary complexity for this scale; Payload 3.x is designed for co-location             |
| **Headless WordPress / Strapi**   | Payload offers better TypeScript DX, blocks, and Next.js integration                       |
| **MongoDB**                       | Relational data (products ↔ categories ↔ industries) benefits from Postgres FK constraints |

---

## 5. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Browser                           │
└──────────────────────────┬──────────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────────────┐
│                   Next.js 15 Application                        │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐  │
│  │ App Router   │  │ API Routes   │  │ Payload Admin Panel   │  │
│  │ (RSC pages)  │  │ (forms,      │  │ (/admin)              │  │
│  │              │  │  search)     │  │                       │  │
│  └──────┬───────┘  └──────┬───────┘  └──────────┬────────────┘  │
│         │                 │                      │              │
│  ┌──────▼─────────────────▼──────────────────────▼──────────┐  │
│  │              Payload CMS Core (Local API)                 │  │
│  │   Collections · Globals · Blocks · Hooks · Access Control  │  │
│  └──────────────────────────┬─────────────────────────────────┘  │
│                             │                                    │
│  ┌──────────────────────────▼─────────────────────────────────┐  │
│  │              Abstraction Layers                             │  │
│  │  ┌─────────────┐ ┌──────────────┐ ┌─────────────────────┐  │  │
│  │  │ Storage     │ │ Search       │ │ Email               │  │  │
│  │  │ Adapter     │ │ Provider     │ │ Provider            │  │  │
│  │  └─────────────┘ └──────────────┘ └─────────────────────┘  │  │
│  └──────────────────────────┬─────────────────────────────────┘  │
└─────────────────────────────┼────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼─────┐      ┌──────▼──────┐     ┌──────▼──────┐
    │PostgreSQL│      │ File Storage │     │ Cloudflare  │
    │          │      │ Local/S3/    │     │ Turnstile   │
    │          │      │ Cloudinary   │     │             │
    └──────────┘      └─────────────┘     └─────────────┘
```

### Request flow (public page)

1. Browser requests `/products/[slug]`
2. Next.js middleware applies security headers, rate limits (API only)
3. Server Component calls Payload Local API (no HTTP round-trip)
4. Data fetched with depth control; images resolved via storage adapter
5. Structured data + metadata generated server-side
6. HTML streamed to client with minimal hydration footprint

### Request flow (form submission)

1. Client submits form with Turnstile token
2. `POST /api/forms/contact` (or `/quote`)
3. Middleware: rate limit → Zod validate → honeypot check → Turnstile verify
4. Payload creates `FormSubmission` document
5. Email notification sent via abstracted provider
6. JSON response to client (no sensitive data leaked)

---

### 5.1 Architecture Diagrams

#### Component Architecture

How the frontend layers relate — Server Components by default, client islands only where needed.

```mermaid
graph TB
    subgraph Browser
        ClientIslands["Client Components<br/>(forms, search modal, cookie banner)"]
    end

    subgraph NextJS["Next.js App Router"]
        Layout["Root Layout<br/>(fonts, metadata, providers)"]
        Pages["Route Pages<br/>(Server Components)"]
        API["API Route Handlers<br/>(forms, search, revalidate)"]
        Middleware["Middleware<br/>(security headers, rate limits)"]
    end

    subgraph Rendering
        Blocks["Block Renderer<br/>(RenderBlocks.tsx)"]
        Components["Shared Components<br/>(layout, products, seo)"]
        UI["shadcn/ui Primitives"]
    end

    subgraph CMS["Payload CMS"]
        LocalAPI["Local API"]
        Admin["Admin Panel (/admin)"]
        Collections["Collections & Globals"]
    end

    subgraph Abstractions
        Storage["Storage Adapter"]
        Search["Search Provider"]
        Email["Email Provider"]
    end

    Browser --> Middleware
    Middleware --> Layout
    Layout --> Pages
    Pages --> Blocks
    Blocks --> Components
    Components --> UI
    Pages --> ClientIslands
    Pages --> LocalAPI
    API --> LocalAPI
    LocalAPI --> Collections
    LocalAPI --> Storage
    API --> Search
    API --> Email
    Admin --> Collections
```

#### CMS Relationships

Entity relationships between Payload collections and globals.

```mermaid
erDiagram
    SiteSettings ||--o{ Pages : configures
    Navigation ||--o{ Pages : links_to
    Footer ||--o{ Pages : links_to

    Products }o--o{ ProductCategories : "belongs to"
    ProductCategories ||--o| ProductCategories : "parent (nested)"
    Products }o--o{ Industries : "serves"
    Products ||--o{ Products : "related (manual)"
    Services }o--o{ Products : "related"
    CaseStudies }o--|| Industries : "industry"
    Posts }o--|| TeamMembers : "author"
    Posts }o--o{ PostCategories : "categorized"
    Posts }o--o{ PostTags : "tagged"
    Brochures }o--o| Products : "optional link"

    Pages ||--|{ Blocks : "contains"
    Blocks }o--o{ Products : "featured"
    Blocks }o--o{ Industries : "featured"
    Blocks }o--o{ Services : "featured"
    Blocks }o--o{ CaseStudies : "featured"
    Blocks }o--o{ Testimonials : "featured"
    Blocks }o--o{ TeamMembers : "featured"

    FormSubmissions }o--|| Users : "viewed by (admin)"
    Media ||--o{ Products : "images"
    Media ||--o{ GalleryItems : "media"
```

#### Deployment Architecture

Two supported deployment targets with identical application code.

```mermaid
graph TB
    subgraph OptionA["Option A: Hostinger VPS"]
        direction TB
        DNS_A["Domain DNS"] --> Nginx["Nginx<br/>(SSL + reverse proxy)"]
        Nginx --> DockerA["Docker Compose"]
        DockerA --> AppA["Next.js + Payload<br/>(port 3000)"]
        DockerA --> PgA["PostgreSQL"]
        DockerA --> VolA["Media Volume<br/>(local storage)"]
    end

    subgraph OptionB["Option B: Vercel"]
        direction TB
        DNS_B["Domain DNS"] --> Vercel["Vercel Edge Network"]
        Vercel --> AppB["Next.js Serverless Functions"]
        AppB --> Neon["Managed PostgreSQL<br/>(Neon / Supabase)"]
        AppB --> Cloud["Cloudinary / S3<br/>(media storage)"]
    end

    subgraph Shared["Shared (both options)"]
        GHA["GitHub Actions CI/CD"]
        Turnstile["Cloudflare Turnstile"]
        GA4["Google Analytics 4"]
    end

    GHA --> OptionA
    GHA --> OptionB
```

#### Request Flow

End-to-end flow for a public page request and a form submission.

```mermaid
sequenceDiagram
    participant B as Browser
    participant M as Middleware
    participant RSC as Server Component
    participant P as Payload Local API
    participant DB as PostgreSQL
    participant API as API Route Handler
    participant T as Turnstile
    participant E as Email Provider

    Note over B,E: Public Page Request
    B->>M: GET /products/slug
    M->>M: Apply security headers
    M->>RSC: Forward request
    RSC->>P: find({ collection: products, slug })
    P->>DB: Parameterized query
    DB-->>P: Product data
    P-->>RSC: Typed result
    RSC->>RSC: Generate metadata + JSON-LD
    RSC-->>B: Stream HTML (minimal JS)

    Note over B,E: Form Submission
    B->>API: POST /api/forms/contact
    API->>API: Rate limit check
    API->>API: Honeypot check
    API->>T: Verify Turnstile token
    T-->>API: Valid
    API->>API: Zod validate + sanitize
    API->>P: create({ collection: form-submissions })
    P->>DB: Insert submission
    API->>E: Send notification email
    API-->>B: 201 { success: true }
```

#### Authentication Flow

V1 authentication is limited to Payload admin users. Public auth is architected for Phase 4.

```mermaid
sequenceDiagram
    participant A as Admin User
    participant B as Browser
    participant Admin as Payload Admin (/admin)
    participant P as Payload Auth
    participant DB as PostgreSQL

    Note over A,DB: Admin Login (V1)
    A->>B: Navigate to /admin
    B->>Admin: GET /admin/login
    Admin-->>B: Login form
    A->>B: Enter email + password
    B->>P: POST credentials
    P->>DB: Verify user + bcrypt hash
    DB-->>P: User record (role: super-admin | editor)
    P->>P: Check role permissions
    P-->>B: Set httpOnly session cookie
    B->>Admin: Access admin panel

    Note over A,DB: Role-Based Access
    Admin->>P: Request collection action
    P->>P: Evaluate access control
    alt Super Admin
        P-->>Admin: Full access
    else Editor
        P-->>Admin: Content + forms (no user/globals delete)
    end

    Note over A,DB: Future Public Auth (Phase 4)
    participant M as Middleware
    participant Auth as Auth Provider
    Note right of Auth: NextAuth / Payload extension<br/>Customer accounts + dashboard
```

#### Media Upload Flow

How files move from admin upload to public delivery across storage providers.

```mermaid
sequenceDiagram
    participant Admin as Payload Admin
    participant P as Payload CMS
    participant V as Validator
    participant S as Storage Adapter
    participant Store as Storage Backend
    participant N as next/image
    participant B as Browser

    Admin->>P: Upload file (image/PDF/video)
    P->>V: Validate MIME type
    P->>V: Check file size limit
    P->>V: Sanitize SVG (if applicable)
    V-->>P: Valid

    alt STORAGE_PROVIDER=local
        P->>S: local adapter
        S->>Store: Write to MEDIA_ROOT
    else STORAGE_PROVIDER=cloudinary
        P->>S: cloudinary adapter
        S->>Store: Upload to Cloudinary CDN
    else STORAGE_PROVIDER=s3
        P->>S: s3 adapter
        S->>Store: PutObject to S3 bucket
    end

    Store-->>S: Stored file URL/key
    S-->>P: Media document created
    P-->>Admin: Upload success

  Note over Admin,B: Public Delivery
    B->>N: Request page with image
    N->>Store: Optimized fetch (resize, WebP)
    Store-->>N: Image bytes
    N-->>B: Responsive img with srcset
```

---

## 6. Folder Structure

```
/
├── .github/
│   ├── dependabot.yml                # Automated dependency updates
│   └── workflows/
│       ├── ci.yml                    # Lint, type-check, test, build
│       └── deploy.yml                # Deploy to staging/production
├── .husky/
│   ├── pre-commit                    # lint-staged
│   └── commit-msg                    # commitlint (Conventional Commits)
├── tests/
│   ├── unit/                         # Vitest unit + component tests
│   ├── e2e/                          # Playwright E2E tests
│   └── setup.ts                      # Test setup
├── vitest.config.ts
├── playwright.config.ts
├── commitlint.config.mjs
├── docker/
│   ├── Dockerfile                    # Multi-stage production build
│   ├── Dockerfile.dev                # Development with hot reload
│   └── docker-compose.yml            # App + Postgres (+ optional Redis)
├── docs/
│   ├── ARCHITECTURE.md               # This document
│   ├── DEPLOYMENT.md                 # Hostinger VPS + Vercel guides
│   ├── BACKUP.md                     # Backup procedures
│   └── SECURITY.md                   # Security decisions log
├── public/
│   ├── fonts/                        # Fallback font files (if needed)
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── (frontend)/               # Public-facing routes
│   │   │   ├── layout.tsx            # Root layout (fonts, metadata, providers)
│   │   │   ├── page.tsx              # Homepage (resolves CMS slug "home")
│   │   │   ├── [slug]/               # Dynamic CMS pages
│   │   │   │   └── page.tsx
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # Product listing + filters
│   │   │   │   └── [slug]/page.tsx   # Product detail
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── industries/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── case-studies/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx
│   │   │   ├── resources/
│   │   │   │   ├── page.tsx          # Resources hub
│   │   │   │   ├── faqs/page.tsx
│   │   │   │   ├── downloads/page.tsx
│   │   │   │   └── brochures/page.tsx
│   │   │   ├── process/
│   │   │   │   └── page.tsx          # Process Story standalone
│   │   │   ├── contact/
│   │   │   │   └── page.tsx
│   │   │   ├── search/
│   │   │   │   └── page.tsx
│   │   │   └── not-found.tsx
│   │   ├── (payload)/                # Payload admin routes
│   │   │   └── admin/
│   │   │       └── [[...segments]]/
│   │   │           └── page.tsx
│   │   ├── api/
│   │   │   ├── forms/
│   │   │   │   ├── contact/route.ts
│   │   │   │   └── quote/route.ts
│   │   │   ├── search/route.ts
│   │   │   └── [...slug]/route.ts    # Payload REST API (if enabled)
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── manifest.ts
│   ├── blocks/                       # CMS block renderers
│   │   ├── registry.ts               # Block slug → component map
│   │   ├── RenderBlocks.tsx          # Server component block renderer
│   │   ├── Hero/
│   │   ├── TrustIndicators/
│   │   ├── Statistics/
│   │   ├── FeaturedProducts/
│   │   ├── FeaturedIndustries/
│   │   ├── FeaturedServices/
│   │   ├── ProcessStory/
│   │   ├── FeaturedCaseStudies/
│   │   ├── Testimonials/
│   │   ├── Team/
│   │   ├── CTA/
│   │   ├── ContactPreview/
│   │   └── RichContent/              # Generic rich text block
│   ├── collections/                  # Payload collection configs
│   │   ├── Pages.ts
│   │   ├── Products.ts
│   │   ├── ProductCategories.ts
│   │   ├── Industries.ts
│   │   ├── Services.ts
│   │   ├── CaseStudies.ts
│   │   ├── TeamMembers.ts
│   │   ├── Testimonials.ts
│   │   ├── Posts.ts
│   │   ├── PostCategories.ts
│   │   ├── PostTags.ts
│   │   ├── FAQs.ts
│   │   ├── GalleryItems.ts
│   │   ├── Downloads.ts
│   │   ├── Brochures.ts
│   │   ├── FormSubmissions.ts
│   │   ├── ProcessSteps.ts
│   │   ├── Users.ts
│   │   └── Media.ts
│   ├── globals/                      # Payload global configs
│   │   ├── SiteSettings.ts
│   │   ├── Navigation.ts
│   │   ├── Footer.ts
│   │   ├── ContactInfo.ts
│   │   └── SeoDefaults.ts
│   ├── components/                   # Shared UI components
│   │   ├── ui/                       # shadcn/ui primitives
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   └── QuoteForm.tsx
│   │   ├── search/
│   │   │   ├── SearchModal.tsx
│   │   │   └── SearchResults.tsx
│   │   ├── products/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductFilters.tsx
│   │   │   └── SpecTable.tsx
│   │   ├── seo/
│   │   │   ├── JsonLd.tsx
│   │   │   └── MetadataBuilder.ts
│   │   ├── media/
│   │   │   ├── OptimizedImage.tsx
│   │   │   └── VideoPlayer.tsx
│   │   ├── branding/
│   │   │   └── Logo.tsx              # Placeholder until assets provided
│   │   └── cookie-consent/
│   │       └── CookieBanner.tsx
│   ├── fields/                       # Reusable Payload field configs
│   │   ├── seo.ts                    # SEO field group
│   │   ├── slug.ts                   # Auto-generated slug field
│   │   └── link.ts                   # CMS link field (internal/external)
│   ├── hooks/                        # Payload hooks
│   │   ├── revalidate.ts             # Next.js on-demand revalidation
│   │   ├── readingTime.ts            # Auto-calculate blog reading time
│   │   └── relatedContent.ts         # Auto-suggest related products/posts
│   ├── lib/
│   │   ├── payload.ts                # getPayload() singleton
│   │   ├── env.ts                    # Zod-validated environment variables
│   │   ├── storage/
│   │   │   ├── index.ts              # Storage adapter factory
│   │   │   ├── local.ts
│   │   │   ├── cloudinary.ts
│   │   │   └── s3.ts
│   │   ├── search/
│   │   │   ├── index.ts              # Search provider factory
│   │   │   ├── postgres.ts
│   │   │   └── types.ts              # Interface for Meilisearch/Algolia later
│   │   ├── email/
│   │   │   ├── index.ts
│   │   │   └── templates/
│   │   ├── security/
│   │   │   ├── rate-limit.ts
│   │   │   ├── turnstile.ts
│   │   │   ├── sanitize.ts
│   │   │   └── headers.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   └── format.ts
│   │   └── constants.ts
│   ├── providers/                    # React context providers (client only)
│   │   └── ThemeProvider.tsx         # Future dark mode (stub in V1)
│   ├── styles/
│   │   └── globals.css               # Tailwind + CSS custom properties (design tokens)
│   ├── types/
│   │   └── index.ts                  # Re-exported Payload generated types
│   ├── middleware.ts                 # Security headers, rate limiting
│   └── payload.config.ts             # Payload main config
├── .env.example
├── .gitignore
├── components.json                   # shadcn/ui config
├── eslint.config.mjs
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── prettier.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

### Naming conventions

| Context            | Convention              | Example                   |
| ------------------ | ----------------------- | ------------------------- |
| Files (components) | PascalCase              | `ProductCard.tsx`         |
| Files (utilities)  | kebab-case or camelCase | `rate-limit.ts`           |
| Collections        | PascalCase plural       | `Products`, `CaseStudies` |
| Block slugs        | kebab-case              | `featured-products`       |
| Routes             | kebab-case              | `/case-studies/[slug]`    |
| Env vars           | SCREAMING_SNAKE         | `DATABASE_URL`            |
| CSS variables      | kebab-case              | `--color-brand-primary`   |

---

## 7. Payload CMS — Collections & Schema

### 7.1 Globals

#### `SiteSettings`

| Field            | Type           | Purpose                                             |
| ---------------- | -------------- | --------------------------------------------------- |
| `companyName`    | text           | Display name (e.g. "Kleenoil India")                |
| `companyTagline` | text           | Subtitle (e.g. "Est. 1988")                         |
| `logo`           | upload → Media | Primary logo (placeholder until provided)           |
| `logoMark`       | upload → Media | Icon/mark variant                                   |
| `favicon`        | upload → Media | Favicon                                             |
| `fonts`          | group          | `headingFont`, `bodyFont` (default: Poppins, Arimo) |
| `theme`          | group          | Brand colors as overrides of CSS variables          |
| `socialLinks`    | array          | Platform + URL                                      |
| `defaultCta`     | link field     | Fallback CTA                                        |
| `features`       | group          | Feature flags (`enableSearch`, `enableBlog`, etc.)  |

#### `Navigation`

| Field         | Type               | Purpose                                                            |
| ------------- | ------------------ | ------------------------------------------------------------------ |
| `mainMenu`    | array of nav items | Label, link (page/ref/external), children (dropdown), openInNewTab |
| `utilityMenu` | array              | Search toggle, Contact CTA, etc.                                   |
| `mobileMenu`  | array              | Optional override for mobile                                       |

Each nav item supports **nested children** (dropdowns) up to 2 levels deep.

#### `Footer`

| Field            | Type  | Purpose                                                |
| ---------------- | ----- | ------------------------------------------------------ |
| `columns`        | array | Title + links array                                    |
| `newsletter`     | group | Heading, description, placeholder text (UI only in V1) |
| `bottomBar`      | group | Copyright text, legal links                            |
| `certifications` | array | ISO badges, trust marks                                |

#### `ContactInfo`

| Field           | Type      | Purpose                                            |
| --------------- | --------- | -------------------------------------------------- |
| `addresses`     | array     | Label, street, city, state, country, pin, map link |
| `phones`        | array     | Label, number                                      |
| `emails`        | array     | Label, email (sales, support, etc.)                |
| `businessHours` | rich text | Operating hours                                    |
| `mapEmbed`      | textarea  | Google Maps embed URL                              |

#### `SeoDefaults`

| Field                    | Type     | Purpose                                            |
| ------------------------ | -------- | -------------------------------------------------- |
| `siteTitle`              | text     | Title suffix pattern                               |
| `siteDescription`        | textarea | Default meta description                           |
| `ogImage`                | upload   | Default Open Graph image                           |
| `twitterHandle`          | text     | @handle                                            |
| `googleSiteVerification` | text     | Verification meta tag                              |
| `structuredData`         | group    | Organization name, legal name, founding date, etc. |

### 7.2 Collections

#### `Pages`

| Field         | Type            | Notes                                       |
| ------------- | --------------- | ------------------------------------------- |
| `title`       | text            | Required                                    |
| `slug`        | text            | Unique, auto-generated; `home` for homepage |
| `layout`      | blocks          | Reorderable block array (see Section 8)     |
| `seo`         | SEO field group | Title, description, OG image, noindex       |
| `_status`     | draft/published | Drafts + scheduling via Payload versions    |
| `publishedAt` | date            | Scheduled publishing                        |

#### `Products`

| Field              | Type                             | Notes                                       |
| ------------------ | -------------------------------- | ------------------------------------------- |
| `name`             | text                             | Required                                    |
| `slug`             | text                             | Unique                                      |
| `shortDescription` | textarea                         | Card/listing preview                        |
| `description`      | richText                         | Full product description                    |
| `categories`       | relationship → ProductCategories | Many-to-many                                |
| `industries`       | relationship → Industries        | Many-to-many                                |
| `featuredImage`    | upload → Media                   | Primary image                               |
| `gallery`          | array of uploads                 | Image gallery                               |
| `brochure`         | upload → Media                   | Optional PDF                                |
| `specifications`   | array                            | `{ key: text, value: text }` flexible pairs |
| `features`         | richText                         | Feature list with formatting                |
| `relatedProducts`  | relationship → Products          | Manual selection                            |
| `videos`           | array                            | `{ title, url or upload }` — future-ready   |
| `model3d`          | upload → Media                   | `.glb` — field present, UI in Phase 4       |
| `variants`         | array                            | Stub field for future configurator          |
| `seo`              | SEO field group                  |                                             |
| `featured`         | checkbox                         | Show in homepage/listing highlights         |
| `sortOrder`        | number                           | Manual ordering                             |

**Indexes:** `slug` (unique), `categories`, `industries`, `featured`, full-text on `name` + `shortDescription`

#### `ProductCategories`

| Field         | Type                             | Notes                        |
| ------------- | -------------------------------- | ---------------------------- |
| `name`        | text                             |                              |
| `slug`        | text                             | Unique                       |
| `description` | textarea                         |                              |
| `parent`      | relationship → ProductCategories | Self-referential for nesting |
| `image`       | upload                           | Category thumbnail           |
| `seo`         | SEO field group                  |                              |

#### `Industries`

| Field              | Type            | Notes        |
| ------------------ | --------------- | ------------ |
| `name`             | text            |              |
| `slug`             | text            |              |
| `description`      | richText        |              |
| `shortDescription` | textarea        | Card preview |
| `featuredImage`    | upload          |              |
| `seo`              | SEO field group |              |
| `sortOrder`        | number          |              |

#### `Services`

| Field              | Type                    | Notes            |
| ------------------ | ----------------------- | ---------------- |
| `title`            | text                    |                  |
| `slug`             | text                    |                  |
| `image`            | upload                  |                  |
| `shortDescription` | textarea                |                  |
| `longDescription`  | richText                |                  |
| `relatedProducts`  | relationship → Products |                  |
| `cta`              | link field              | Configurable CTA |
| `seo`              | SEO field group         |                  |
| `featured`         | checkbox                |                  |

#### `CaseStudies`

| Field           | Type                      | Notes                             |
| --------------- | ------------------------- | --------------------------------- |
| `title`         | text                      |                                   |
| `slug`          | text                      |                                   |
| `client`        | text                      |                                   |
| `industry`      | relationship → Industries |                                   |
| `summary`       | textarea                  |                                   |
| `content`       | richText                  | Full case study body              |
| `featuredImage` | upload                    |                                   |
| `metrics`       | array                     | `{ label, value }` result metrics |
| `seo`           | SEO field group           |                                   |
| `featured`      | checkbox                  | Homepage preview                  |

#### `TeamMembers`

| Field       | Type     | Notes                   |
| ----------- | -------- | ----------------------- |
| `name`      | text     |                         |
| `role`      | text     |                         |
| `bio`       | richText |                         |
| `photo`     | upload   |                         |
| `linkedin`  | text     | URL                     |
| `isAuthor`  | checkbox | Enables blog authorship |
| `sortOrder` | number   |                         |

#### `Testimonials`

| Field        | Type     | Notes    |
| ------------ | -------- | -------- |
| `quote`      | textarea |          |
| `clientName` | text     |          |
| `company`    | text     |          |
| `position`   | text     |          |
| `photo`      | upload   | Optional |
| `featured`   | checkbox |          |

#### `Posts` (Blog)

| Field           | Type                          | Notes                    |
| --------------- | ----------------------------- | ------------------------ |
| `title`         | text                          |                          |
| `slug`          | text                          |                          |
| `author`        | relationship → TeamMembers    |                          |
| `categories`    | relationship → PostCategories |                          |
| `tags`          | relationship → PostTags       |                          |
| `featuredImage` | upload                        |                          |
| `excerpt`       | textarea                      |                          |
| `content`       | richText                      |                          |
| `readingTime`   | number                        | Auto-calculated via hook |
| `relatedPosts`  | relationship → Posts          | Auto-populated via hook  |
| `seo`           | SEO field group               |                          |
| `publishedAt`   | date                          |                          |
| `_status`       | draft/published               |                          |

#### `PostCategories` / `PostTags`

Standard taxonomy collections with `name`, `slug`, `description`.

#### `FAQs`

| Field       | Type                 | Notes    |
| ----------- | -------------------- | -------- |
| `question`  | text                 |          |
| `answer`    | richText             |          |
| `category`  | text or relationship | Grouping |
| `sortOrder` | number               |          |

#### `GalleryItems`

| Field       | Type           | Notes             |
| ----------- | -------------- | ----------------- |
| `title`     | text           |                   |
| `media`     | upload → Media | Image or video    |
| `mediaType` | select         | `image` / `video` |
| `caption`   | text           |                   |
| `category`  | text           | Optional grouping |
| `sortOrder` | number         |                   |

#### `Downloads`

| Field         | Type           | Notes         |
| ------------- | -------------- | ------------- |
| `title`       | text           |               |
| `description` | textarea       |               |
| `file`        | upload → Media | PDF, document |
| `category`    | text           |               |
| `sortOrder`   | number         |               |

#### `Brochures`

| Field            | Type                    | Notes         |
| ---------------- | ----------------------- | ------------- |
| `title`          | text                    |               |
| `description`    | textarea                |               |
| `file`           | upload → Media          | PDF           |
| `thumbnail`      | upload                  | Cover image   |
| `relatedProduct` | relationship → Products | Optional link |

#### `ProcessSteps`

| Field         | Type     | Notes          |
| ------------- | -------- | -------------- |
| `title`       | text     |                |
| `description` | richText |                |
| `year`        | text     | Timeline label |
| `icon`        | upload   | Optional       |
| `sortOrder`   | number   |                |

Used by Process Story block and `/process` standalone page.

#### `FormSubmissions`

| Field         | Type   | Notes                                     |
| ------------- | ------ | ----------------------------------------- |
| `type`        | select | `contact` / `quote`                       |
| `status`      | select | `unread` / `read` / `archived`            |
| `data`        | json   | Submitted field values                    |
| `submittedAt` | date   | Auto                                      |
| `ipHash`      | text   | Hashed IP for abuse tracking (not raw IP) |
| `userAgent`   | text   |                                           |

**Access:** Super Admin + Editor can view. No public read access. Export via Payload admin CSV.

#### `Media` (Payload built-in, extended)

| Field     | Type | Notes                                  |
| --------- | ---- | -------------------------------------- |
| `alt`     | text | Required for accessibility             |
| `caption` | text |                                        |
| Built-in  | —    | MIME validation, size limits in config |

**Upload constraints:**

| Type      | Max size | Allowed MIME                                                           |
| --------- | -------- | ---------------------------------------------------------------------- |
| Images    | 10 MB    | `image/jpeg`, `image/png`, `image/webp`, `image/avif`, `image/svg+xml` |
| Videos    | 100 MB   | `video/mp4`, `video/webm`                                              |
| Documents | 25 MB    | `application/pdf`                                                      |
| 3D Models | 50 MB    | `model/gltf-binary` (`.glb`) — future                                  |

#### `Users` (Payload built-in, extended)

| Field    | Type   | Notes                                      |
| -------- | ------ | ------------------------------------------ |
| `role`   | select | `super-admin` / `editor`                   |
| Built-in | —      | Email, password (bcrypt hashed by Payload) |

**Role permissions:**

| Permission              | Super Admin | Editor |
| ----------------------- | :---------: | :----: |
| Manage users            |     ✅      |   ❌   |
| Edit all content        |     ✅      |   ✅   |
| Publish content         |     ✅      |   ✅   |
| View form submissions   |     ✅      |   ✅   |
| Export form submissions |     ✅      |   ✅   |
| Delete form submissions |     ✅      |   ❌   |
| Site settings / globals |     ✅      |   ❌   |
| Navigation / footer     |     ✅      |   ✅   |

---

## 8. Block System

Homepage and CMS pages use a **reorderable block builder**. Each block is a Payload block config with a corresponding React Server Component renderer.

### V1 Block Registry

| Block Slug              | CMS Fields (summary)                                                               | Frontend Component         |
| ----------------------- | ---------------------------------------------------------------------------------- | -------------------------- |
| `hero`                  | Eyebrow, headline, subheadline, image, CTAs (link field array), meta stats         | `HeroBlock`                |
| `trust-indicators`      | Heading, client logos (upload array), optional description                         | `TrustIndicatorsBlock`     |
| `statistics`            | Stats array: `{ value, label, icon }`                                              | `StatisticsBlock`          |
| `featured-products`     | Heading, description, products (manual or auto: latest/featured), CTA, count limit | `FeaturedProductsBlock`    |
| `featured-industries`   | Heading, industries (manual or auto), layout variant                               | `FeaturedIndustriesBlock`  |
| `featured-services`     | Heading, services (manual or auto), CTA                                            | `FeaturedServicesBlock`    |
| `process-story`         | Heading, description, steps (manual or pull from ProcessSteps), CTA                | `ProcessStoryBlock`        |
| `featured-case-studies` | Heading, case studies (manual or featured), CTA                                    | `FeaturedCaseStudiesBlock` |
| `testimonials`          | Heading, testimonials (manual or featured)                                         | `TestimonialsBlock`        |
| `team`                  | Heading, team members (manual or all)                                              | `TeamBlock`                |
| `cta`                   | Eyebrow, headline, subtext, primary CTA, secondary CTA, trust badges               | `CTABlock`                 |
| `contact-preview`       | Heading, show contact info from global, embedded form toggle                       | `ContactPreviewBlock`      |
| `rich-content`          | Rich text body                                                                     | `RichContentBlock`         |

### Block design principles

1. **Every CTA uses the shared `link` field** — internal page, collection reference, or external URL
2. **Source modes** — blocks support `manual` (pick items) or `auto` (query by rules) selection
3. **Extensible** — new blocks added by creating a Payload block config + renderer component + registry entry
4. **Server-rendered** — block renderers are Server Components; client components only inside blocks that need interactivity (e.g. carousels)

### Block rendering flow

```
Page document → layout[] → RenderBlocks → for each block:
  → lookup registry[blockType]
  → pass block.data as props
  → render Server Component
```

---

## 9. Relationships Diagram

```
                    ┌──────────────┐
                    │ SiteSettings │
                    │ Navigation   │
                    │ Footer       │
                    │ ContactInfo  │
                    │ SeoDefaults  │
                    └──────────────┘

┌─────────┐     M:N      ┌───────────────────┐
│Products │◄────────────►│ProductCategories  │
└────┬────┘              │  (self-nested)    │
     │ M:N               └───────────────────┘
     ▼
┌───────────┐
│Industries │
└───────────┘

┌──────────┐  M:N  ┌──────────┐
│Services  │──────►│Products  │
└──────────┘       └──────────┘

┌────────────┐         ┌───────────┐
│CaseStudies │────────►│Industries │
└────────────┘         └───────────┘

┌───────┐  author  ┌─────────────┐
│Posts  │─────────►│TeamMembers  │
└───┬───┘          └─────────────┘
    │ M:N
    ├──► PostCategories
    └──► PostTags

┌───────────┐  optional  ┌──────────┐
│Brochures  │───────────►│Products  │
└───────────┘            └──────────┘

┌───────┐
│Pages  │──► blocks[] ──► references any collection via block config
└───────┘
```

---

## 10. Routing & URL Strategy

| Route                  | Source                      | Notes                                  |
| ---------------------- | --------------------------- | -------------------------------------- |
| `/`                    | Page slug `home`            | Block builder                          |
| `/[slug]`              | Pages collection            | Dynamic CMS pages (About, legal pages) |
| `/products`            | Static route + CMS metadata | Grid + filters                         |
| `/products/[slug]`     | Products collection         | Detail page                            |
| `/services`            | Static route                | Listing                                |
| `/services/[slug]`     | Services collection         | Detail                                 |
| `/industries`          | Static route                | Listing                                |
| `/industries/[slug]`   | Industries collection       | Detail                                 |
| `/case-studies`        | Static route                | Listing                                |
| `/case-studies/[slug]` | CaseStudies collection      | Detail                                 |
| `/blog`                | Static route                | Listing with pagination                |
| `/blog/[slug]`         | Posts collection            | Article detail                         |
| `/gallery`             | Static route                | Gallery grid                           |
| `/testimonials`        | Static route                | Testimonials listing                   |
| `/process`             | Static route + ProcessSteps | Standalone process page                |
| `/resources`           | Static route                | Resources hub                          |
| `/resources/faqs`      | FAQs collection             |                                        |
| `/resources/downloads` | Downloads collection        |                                        |
| `/resources/brochures` | Brochures collection        |                                        |
| `/contact`             | Page or static route        | Contact forms                          |
| `/search`              | Search API + page           | `?q=term&type=all`                     |
| `/sitemap.xml`         | Generated                   | Excludes drafts, noindex pages         |
| `/robots.txt`          | Generated                   | Configurable via env                   |
| `/admin`               | Payload admin               | Protected                              |

### Reserved slugs

CMS pages cannot use slugs that conflict with static routes (`products`, `blog`, `admin`, `api`, etc.). Validated via Payload `beforeValidate` hook.

### Trailing slashes

**No trailing slashes** (Next.js default). Canonical URLs enforced in metadata.

---

## 11. API Architecture

### Public API routes (Next.js Route Handlers)

| Endpoint             | Method | Purpose                                        |
| -------------------- | ------ | ---------------------------------------------- |
| `/api/forms/contact` | POST   | Contact form submission                        |
| `/api/forms/quote`   | POST   | Quote request submission                       |
| `/api/search`        | GET    | Global search (`?q=&type=&page=`)              |
| `/api/revalidate`    | POST   | On-demand ISR revalidation (secured by secret) |

### Payload REST/GraphQL

- **REST API:** Enabled but restricted to authenticated admin requests only
- **GraphQL:** Disabled in V1 (enable later if needed)
- **Local API:** Primary data access method in Server Components (no HTTP overhead)

### Data access pattern

```typescript
// Server Component — preferred pattern
const payload = await getPayload({ config });
const product = await payload.find({
  collection: 'products',
  where: { slug: { equals: params.slug } },
  depth: 2,
});
```

**No raw SQL in application code** except within the search abstraction layer (parameterized queries only).

---

## 12. Search Architecture

### V1: PostgreSQL Full-Text Search

```
┌──────────────┐     ┌─────────────────────┐     ┌──────────────┐
│ Search Page  │────►│ Search Provider API │────►│  PostgreSQL  │
│ / Search     │     │ (abstraction layer) │     │  tsvector /  │
│   Modal      │     └─────────────────────┘     │  tsquery     │
└──────────────┘                                 └──────────────┘
```

**Searchable collections (V1):** Products, Services, Posts, FAQs

**Implementation:**

- Payload `afterChange` hooks maintain a `search_index` table or use Postgres generated `tsvector` columns
- Queries parameterized via Payload's `payload.db.drizzle` or raw SQL with bound parameters
- Results ranked by relevance + collection type weighting

### Search Provider Interface

```typescript
interface SearchProvider {
  search(query: string, options: SearchOptions): Promise<SearchResults>;
  indexDocument(doc: IndexableDocument): Promise<void>;
  removeDocument(id: string, collection: string): Promise<void>;
}
```

### Future: Meilisearch / Algolia

- Swap provider via `SEARCH_PROVIDER` env var
- Index sync via Payload hooks (already in place)
- No frontend changes required

### Product Filters (separate from global search)

- Server-side filtering on `/products` via URL search params: `?category=slug&industry=slug`
- Filters rendered server-side; no client-side data fetching for initial render
- Category tree navigation via nested `ProductCategories`

---

## 13. Forms & Lead Management

### Contact Form Fields

`name`, `company`, `email`, `phone`, `message`

### Quote Request Fields

`name`, `company`, `email`, `phone`, `product` (text or product relationship), `quantity`, `message`

### Submission Pipeline

```
Client form
  → Client-side Zod validation
  → POST /api/forms/{type}
  → Rate limit check (IP-based)
  → Honeypot field check (reject if filled)
  → Turnstile token verification
  → Server-side Zod validation
  → Input sanitization (strip HTML from text fields)
  → Payload: create FormSubmission (status: unread)
  → Email notification to configured recipients
  → Return 201 { success: true }
```

### Email notifications

- Abstracted via `EmailProvider` interface
- Template-based (contact vs quote)
- Recipients configured in `SiteSettings` or env var
- Provider: TBD (Resend recommended for DX; Nodemailer for VPS SMTP)

### Admin workflow

- Submissions visible in Payload admin under `Form Submissions`
- Filter by type, status
- Mark as read/archived
- CSV export via Payload admin
- No PII in application logs

---

## 14. Media & Storage Abstraction

### Storage Adapter Pattern

```typescript
interface StorageAdapter {
  upload(file: Buffer, options: UploadOptions): Promise<StoredFile>;
  delete(key: string): Promise<void>;
  getUrl(key: string): string;
}
```

### Provider selection via `STORAGE_PROVIDER` env var

| Provider              | Env Value    | Best for                                 |
| --------------------- | ------------ | ---------------------------------------- |
| Local filesystem      | `local`      | VPS development, small deployments       |
| Cloudinary            | `cloudinary` | Image optimization, transformations, CDN |
| AWS S3 (+ CloudFront) | `s3`         | Scalable, Vercel deployments             |

### Image optimization strategy

| Layer      | Approach                                                                                 |
| ---------- | ---------------------------------------------------------------------------------------- |
| Upload     | MIME validation, size limits, reject executables                                         |
| Storage    | Original preserved; transformations per provider                                         |
| Delivery   | `next/image` with configured remote patterns                                             |
| SVG        | Sanitized on upload; served with `Content-Disposition: attachment` if containing scripts |
| Responsive | Auto-generated `srcset` via Next.js Image or Cloudinary transforms                       |

### Video handling

- Uploaded via Payload Media collection
- Served via `<video>` with poster image
- No client-side video processing in V1
- Future: Cloudinary video transformations

### 3D model handling (future-ready)

- `.glb` files stored in Media collection
- `model3d` field on Products
- Viewer component deferred to Phase 4
- Files served with correct `model/gltf-binary` MIME type

---

## 15. Authentication & Authorization

### Public site

No authentication in V1. All content is public (except drafts).

### Payload Admin

- Email + password authentication (Payload built-in)
- Passwords bcrypt-hashed
- Session cookies: `httpOnly`, `secure` (production), `sameSite: lax`
- MFA: Enable if supported by installed Payload version
- Admin URL: `/admin` (configurable via `PAYLOAD_ADMIN_ROUTE`)
- Brute-force protection: rate limiting on login endpoint

### Future public auth (Phase 4)

Architecture accommodates:

- Auth provider abstraction (NextAuth.js / Payload auth extension)
- `Customers` collection
- Protected routes via middleware
- JWT or session-based — decision deferred

---

## 16. Security Architecture

### HTTP Security Headers (via `middleware.ts` + `next.config.ts`)

| Header                      | Value                                          | Purpose                   |
| --------------------------- | ---------------------------------------------- | ------------------------- |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Force HTTPS               |
| `X-Frame-Options`           | `DENY`                                         | Clickjacking prevention   |
| `X-Content-Type-Options`    | `nosniff`                                      | MIME sniffing prevention  |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              | Control referrer leakage  |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     | Restrict browser features |
| `X-DNS-Prefetch-Control`    | `on`                                           | Performance               |
| `Content-Security-Policy`   | See below                                      | XSS prevention            |

### Content Security Policy (strict, tuned per environment)

```
default-src 'self';
script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline';
img-src 'self' data: blob: https://res.cloudinary.com https://*.amazonaws.com;
font-src 'self';
connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com;
frame-src https://challenges.cloudflare.com;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'none';
upgrade-insecure-requests;
```

CSP adjusted per storage provider and analytics configuration.

### Application security

| Threat                     | Mitigation                                                                                  |
| -------------------------- | ------------------------------------------------------------------------------------------- |
| SQL Injection              | Payload ORM (parameterized); search layer uses bound parameters only                        |
| XSS                        | React auto-escaping; sanitize rich text output; CSP                                         |
| CSRF                       | SameSite cookies; API routes use token validation (Turnstile); no cookie-auth on public API |
| File upload attacks        | MIME whitelist, size limits, extension validation, SVG sanitization                         |
| Brute force                | Rate limiting on forms + admin login                                                        |
| Secret exposure            | Zod-validated env; `.env` in `.gitignore`; `.env.example` with placeholders                 |
| Information leakage        | Custom error boundaries; no stack traces in production                                      |
| Dependency vulnerabilities | `npm audit` in CI; Dependabot recommended                                                   |

### Environment validation

All env vars validated at startup via Zod schema in `src/lib/env.ts`. Application refuses to start with missing/invalid config in production.

---

## 17. Performance Strategy

### Rendering strategy

| Pattern           | Usage                                                                   |
| ----------------- | ----------------------------------------------------------------------- |
| Server Components | Default for all pages, blocks, layouts                                  |
| Client Components | Forms, search modal, cookie banner, mobile nav toggle, Turnstile widget |
| Dynamic imports   | Search modal, cookie banner, video player, future 3D viewer             |
| Streaming         | Suspense boundaries around slow data fetches                            |
| ISR               | CMS pages revalidated on publish via `revalidatePath`/`revalidateTag`   |

### Caching

| Layer         | Strategy                                                                 |
| ------------- | ------------------------------------------------------------------------ |
| Next.js       | `revalidateTag` per collection; on-demand revalidation via Payload hooks |
| Static assets | Long cache headers via CDN / reverse proxy                               |
| API routes    | `Cache-Control: no-store` for forms and search                           |
| Database      | Connection pooling via Payload adapter                                   |

### Image & font optimization

- `next/image` for all content images with explicit `width`/`height` or `fill`
- `next/font` for Poppins + Arimo (self-hosted, `display: swap`)
- Blur placeholders for hero images (generated at build or via Cloudinary)

### Bundle optimization

- Tree-shake Lucide icons (import individual icons)
- No heavy animation libraries in main bundle
- Analyze bundle with `@next/bundle-analyzer` in CI (optional)

### Core Web Vitals targets

| Metric     | Target             |
| ---------- | ------------------ |
| LCP        | < 2.5s             |
| INP        | < 200ms            |
| CLS        | < 0.1              |
| Lighthouse | 95+ all categories |

---

## 18. SEO & Analytics

### Per-page SEO (via shared `seo` field group)

- `metaTitle` (auto-append site name if not provided)
- `metaDescription`
- `ogImage` (fallback to SeoDefaults)
- `noindex` / `nofollow` toggles
- `canonicalUrl` (optional override)

### Structured data (JSON-LD via `JsonLd` component)

| Schema                 | Page                                       |
| ---------------------- | ------------------------------------------ |
| Organization           | All pages (from SeoDefaults + ContactInfo) |
| WebSite + SearchAction | Homepage                                   |
| Product                | Product detail                             |
| BreadcrumbList         | All pages with breadcrumbs                 |
| FAQPage                | FAQ page                                   |
| Article                | Blog posts                                 |

### Sitemap & robots

- `app/sitemap.ts` — dynamic, queries published content from Payload
- `app/robots.ts` — configurable disallow rules
- Excludes: drafts, admin, API routes, noindex pages

### Analytics

- GA4 via `next/script` with `afterInteractive` strategy
- Loaded only after cookie consent accepted
- No PII sent in custom events

### Locale

- `lang="en-IN"` on `<html>`
- `hreflang` tags stubbed for future i18n
- Date/number formatting via `Intl` API with `en-IN` locale

---

## 19. Frontend Architecture

### Design tokens (CSS custom properties)

Mapped from the design system (`Kleen oil initial.pen`):

```css
:root {
  --color-brand-primary: #006633;
  --color-brand-deep: #004422;
  --color-brand-bright: #008844;
  --color-brand-soft: #cae5d9;
  --color-background: #ebf2ee;
  --color-surface: #dce8e1;
  --color-surface-elevated: #e5ede8;
  --color-text-primary: #003319;
  --color-text-secondary: #4a6f60;
  --color-text-tertiary: #7a9e8e;
  --color-border-subtle: #acccbb;
  --color-border-strong: #80b690;
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Arimo', sans-serif;
}
```

Overridable via `SiteSettings.theme` → injected as inline style or CSS variables at runtime.

### Component strategy

| Layer            | Source                                                          |
| ---------------- | --------------------------------------------------------------- |
| Primitives       | shadcn/ui (Button, Input, Dialog, Sheet, etc.)                  |
| Brand components | Custom components matching design (cards, eyebrow, stat blocks) |
| Layout           | Custom Header, Footer driven by CMS globals                     |

### Responsive approach

- Desktop-first CSS (matches provided design at 1440px)
- Breakpoints: `sm: 640`, `md: 768`, `lg: 1024`, `xl: 1280`, `2xl: 1440`
- Mobile nav: Sheet/drawer (shadcn)
- Grid collapses: 4-col → 2-col → 1-col

### Animation (V1 — minimal)

- CSS transitions on hover/focus states
- Optional light GSAP: hero text fade-in, scroll-triggered section reveals
- `prefers-reduced-motion` respected everywhere
- Heavy animation deferred to Phase 3+

### 3D architecture (future-ready)

```
src/
├── components/
│   └── three/
│       ├── Canvas.tsx          # R3F canvas wrapper (dynamic import)
│       ├── ProductViewer.tsx   # GLB viewer (Phase 4)
│       └── Configurator.tsx    # Product configurator (Phase 5)
├── lib/
│   └── three/
│       ├── loaders.ts
│       └── materials.ts
```

- Three.js/R3F loaded via `next/dynamic` with `ssr: false`
- `.glb` URLs from storage adapter
- No Three.js in main bundle until Phase 4

---

## 20. Deployment Architecture

### Option A: Hostinger VPS (Docker)

**Recommended when:** Full control needed, predictable costs, local file storage acceptable.

```
┌─────────────────────────────────────────┐
│           Hostinger VPS                 │
│  ┌─────────────────────────────────┐    │
│  │  Nginx (reverse proxy + SSL)    │    │
│  │  ├─ / → Next.js (port 3000)     │    │
│  │  └─ /admin → Next.js            │    │
│  └──────────────┬──────────────────┘    │
│                 │                        │
│  ┌──────────────▼──────────────────┐    │
│  │  Docker Compose                  │    │
│  │  ├─ app (Next.js + Payload)     │    │
│  │  ├─ postgres                    │    │
│  │  └─ (optional) redis            │    │
│  └─────────────────────────────────┘    │
│                                          │
│  Volumes:                                │
│  ├─ postgres_data                       │
│  └─ media_uploads (if local storage)    │
└─────────────────────────────────────────┘
```

| Pros                                       | Cons                               |
| ------------------------------------------ | ---------------------------------- |
| Full control, local storage works natively | Manual SSL, updates, scaling       |
| No serverless timeout limits               | Requires DevOps knowledge          |
| Predictable monthly cost                   | No automatic CDN/edge              |
| Docker ensures reproducibility             | Single point of failure without HA |

**Requirements:** Minimum 2 GB RAM VPS (4 GB recommended), Ubuntu 22.04+, Docker + Docker Compose.

### Option B: Vercel + Managed Services

**Recommended when:** Fastest deployment, automatic scaling, edge CDN.

```
┌──────────────┐     ┌────────────────┐     ┌──────────────┐
│   Vercel     │────►│ Neon / Supabase│     │ Cloudinary / │
│  (Next.js)   │     │  (PostgreSQL)  │     │ S3 (media)   │
└──────────────┘     └────────────────┘     └──────────────┘
```

| Pros                            | Cons                                |
| ------------------------------- | ----------------------------------- |
| Zero-config deploys, global CDN | Local storage not viable            |
| Automatic SSL, preview deploys  | Serverless function timeout (60s)   |
| Git push to deploy              | Database + storage = separate costs |
| Excellent Next.js integration   | Cold starts on infrequent traffic   |

**Requirements:** Vercel Pro recommended (for longer function timeout), external Postgres, cloud storage required.

### Recommendation

| Environment                | Recommended stack                      |
| -------------------------- | -------------------------------------- |
| **Local dev**              | Docker Compose (app + Postgres)        |
| **Staging**                | Match production target                |
| **Production (Hostinger)** | Docker Compose + Nginx + Let's Encrypt |
| **Production (Vercel)**    | Vercel + Neon Postgres + Cloudinary    |

**The application code is identical** — only env vars and storage provider change.

### Reverse proxy (VPS)

Nginx handles:

- SSL termination (Let's Encrypt via Certbot)
- Gzip/Brotli compression
- Static file caching
- Rate limiting (supplement to app-level)
- Proxy to Next.js on port 3000

---

## 21. Environment Variables

```bash
# ─── App ───────────────────────────────────────
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://example.com
PORT=3000

# ─── Database ──────────────────────────────────
DATABASE_URL=postgresql://user:pass@host:5432/dbname

# ─── Payload ───────────────────────────────────
PAYLOAD_SECRET=<random-64-char-string>
PAYLOAD_ADMIN_ROUTE=/admin

# ─── Storage ───────────────────────────────────
STORAGE_PROVIDER=local          # local | cloudinary | s3
# Local
MEDIA_ROOT=./media
# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
# S3
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_ENDPOINT=                    # Optional, for R2/MinIO

# ─── Email ─────────────────────────────────────
EMAIL_PROVIDER=resend             # resend | smtp
EMAIL_FROM=noreply@example.com
EMAIL_TO_SALES=sales@example.com
RESEND_API_KEY=
# SMTP (alternative)
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

# ─── Security ──────────────────────────────────
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
REVALIDATE_SECRET=<random-string>
RATE_LIMIT_MAX=10               # Requests per window
RATE_LIMIT_WINDOW_MS=60000      # 1 minute

# ─── Search ────────────────────────────────────
SEARCH_PROVIDER=postgres          # postgres | meilisearch | algolia
MEILISEARCH_HOST=               # Future
MEILISEARCH_API_KEY=            # Future

# ─── Analytics ───────────────────────────────
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX

# ─── Feature Flags ────────────────────────────
ENABLE_GRAPHQL=false
```

All variables validated in `src/lib/env.ts`. `.env.example` committed; `.env` gitignored.

---

## 22. CI/CD Pipeline

### GitHub Actions — `ci.yml` (on every PR + push to `main` / `develop`)

```yaml
jobs:
  quality:
    - Checkout
    - Setup Node 22
    - npm ci
    - npm run format:check
    - npm run lint
    - npm run type-check
    - npm run test # Vitest unit tests
    - npm run build
  audit: # continue-on-error (informational)
    - npm audit --audit-level=high
```

`deploy.yml` is a **manual stub** (`workflow_dispatch`) until Hostinger VPS or Vercel credentials are configured.

### Commit message linting

- **Commitlint** with `@commitlint/config-conventional` enforces Conventional Commits.
- **Husky** `commit-msg` hook runs Commitlint on every commit.
- See [`CONTRIBUTING.md`](../CONTRIBUTING.md) for format and examples.

### Dependabot

- Weekly automated PRs for npm, GitHub Actions, and Docker dependencies.
- Configured in [`.github/dependabot.yml`](../.github/dependabot.yml).
- Groups minor/patch updates for dev tooling and Payload packages to reduce noise.

### GitHub Actions — `deploy.yml` (on push to main)

| Target     | Trigger                          | Action                        |
| ---------- | -------------------------------- | ----------------------------- |
| Staging    | Push to `develop`                | Deploy to staging environment |
| Production | Push to `main` (manual approval) | Deploy to production          |

Deployment method depends on hosting choice (SSH + Docker Compose for VPS; Vercel CLI/Git integration for Vercel).

### Branch strategy

| Branch      | Purpose                            |
| ----------- | ---------------------------------- |
| `main`      | Production-ready                   |
| `develop`   | Staging / integration              |
| `feature/*` | Feature branches → PR to `develop` |

---

## 23. Backup & Disaster Recovery

Documented in `docs/BACKUP.md`. Summary:

### Database backups

| Environment   | Method                                  | Frequency  | Retention |
| ------------- | --------------------------------------- | ---------- | --------- |
| VPS           | `pg_dump` via cron → encrypted storage  | Daily      | 30 days   |
| Vercel + Neon | Neon built-in PITR (if on paid plan)    | Continuous | Per plan  |
| Manual        | Admin can trigger via documented script | On demand  | —         |

### Media backups

| Storage    | Method                                      |
| ---------- | ------------------------------------------- |
| Local      | Volume snapshot or rsync to remote          |
| Cloudinary | Built-in versioning + backup                |
| S3         | Cross-region replication (configure in AWS) |

### Recovery targets

| Metric                         | Target   |
| ------------------------------ | -------- |
| RPO (Recovery Point Objective) | 24 hours |
| RTO (Recovery Time Objective)  | 4 hours  |

### Backup verification

- Monthly restore test to staging documented in `BACKUP.md`
- Form submission data included in DB backups

---

## 24. Logging & Monitoring

### Application logging

| Level   | Production                      | Development |
| ------- | ------------------------------- | ----------- |
| `error` | ✅ (to stderr / log aggregator) | ✅          |
| `warn`  | ✅                              | ✅          |
| `info`  | ✅ (limited)                    | ✅          |
| `debug` | ❌                              | ✅          |

- Structured JSON logs in production
- No PII, passwords, or tokens in logs
- Request IDs for tracing

### Monitoring (recommended, not V1 blocker)

| Tool              | Purpose                                |
| ----------------- | -------------------------------------- |
| Uptime monitoring | UptimeRobot / Better Stack (free tier) |
| Error tracking    | Sentry (optional, Phase 2)             |
| Performance       | Vercel Analytics or self-hosted        |

---

## 25. Future Scalability Roadmap

| Feature              | Architecture hook                                                                                                  | Phase |
| -------------------- | ------------------------------------------------------------------------------------------------------------------ | ----- |
| Multi-language       | Payload localization plugin; `locale` field on collections; `hreflang` in metadata; `middleware.ts` locale routing | 3     |
| Customer accounts    | `Customers` collection; auth provider abstraction; protected route group                                           | 4     |
| E-commerce           | `Orders`, `Cart` collections; payment gateway abstraction; inventory fields on Products                            | 5     |
| 3D viewer            | `model3d` field exists; `components/three/` directory; dynamic import pattern                                      | 4     |
| Product configurator | `variants` array on Products; R3F + state machine                                                                  | 5     |
| AI search            | Vector column in Postgres or external vector DB; embedding hooks on content change                                 | 5     |
| GSAP animations      | `lib/animations/` directory; scroll trigger utilities                                                              | 3     |
| Newsletter           | `NewsletterSubscribers` collection; provider integration                                                           | 2     |
| Dark mode            | CSS variables already support theming; `ThemeProvider` stub exists                                                 | 3     |
| AR/VR                | WebXR via Three.js; extends 3D viewer                                                                              | 5+    |
| ERP integration      | Webhook/API route abstraction; product sync jobs                                                                   | 5+    |

### Scaling path

| Traffic level      | Action                                                          |
| ------------------ | --------------------------------------------------------------- |
| < 10K visits/month | Single VPS or Vercel hobby                                      |
| 10K–100K           | CDN (Cloudflare), connection pooling, ISR                       |
| 100K+              | Meilisearch, read replicas, S3 + CloudFront, horizontal scaling |
| 1M+                | Microservices extraction (search, media, 3D) if needed          |

---

## 26. Open Decisions

These items remain TBD and do not block architecture approval or Phase 1 start:

| #   | Decision                   | Impact                 | Recommendation                            |
| --- | -------------------------- | ---------------------- | ----------------------------------------- |
| 1   | Repository name            | Git remote only        | `industrial-platform` (neutral)           |
| 2   | Hostinger plan details     | Deployment config      | Start with Docker on VPS; 4 GB RAM        |
| 3   | Email provider             | Form notifications     | Resend (simple) or Hostinger SMTP         |
| 4   | Production domain          | `NEXT_PUBLIC_SITE_URL` | Decide before production deploy           |
| 5   | MFA availability           | Admin security         | Enable if Payload version supports it     |
| 6   | Quote form "product" field | UX                     | Dropdown of products + free text fallback |
| 7   | Compliance page            | Legal content          | Create as CMS page; content from client   |
| 8   | Import tooling             | Content migration      | Design CSV import scripts in Phase 2      |

---

## 27. Approval Checklist

- [x] **Architecture approach** — Single Next.js + Payload app, no Prisma
- [x] **Phased delivery plan** — Phase 1 MVP scope acceptable
- [x] **Collection schema** — All collections and fields meet requirements
- [x] **Block system** — 12 homepage blocks + rich content block
- [x] **Routing strategy** — URL structure and reserved slugs
- [x] **Search approach** — PostgreSQL V1 with abstraction for future providers
- [x] **Storage abstraction** — Local / Cloudinary / S3 via env config
- [x] **Security model** — Headers, CSP, Turnstile, rate limiting, Zod validation
- [x] **Deployment options** — Docker for VPS, Vercel-compatible patterns
- [x] **Folder structure** — Scalable, neutral naming
- [x] **Documentation** — README, CONTRIBUTING, .env.example, architecture diagrams
- [x] **Tooling** — Dependabot, Commitlint, Vitest, Playwright scaffolding
- [x] **Dependency versions** — Verified stable releases ([`VERSIONS.md`](VERSIONS.md))

---

**Next step:** Phase 1 project initialization (Next.js 16, Payload 3.85.2, tooling, security baseline, Docker setup) — incrementally, with explanation at each milestone.
