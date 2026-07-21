# Industrial Corporate Portfolio Platform

An enterprise-grade, reusable B2B corporate portfolio platform built with **Next.js**, **Payload CMS**, and **PostgreSQL**. Designed for industrial and manufacturing companies to showcase products, services, and expertise while generating leads through contact forms.

**First deployment:** Kleenoil India (branding and content via CMS — codebase is client-neutral).

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [CMS Usage](#cms-usage)
- [Deployment](#deployment)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)
- [Contributing](#contributing)
- [Future Roadmap](#future-roadmap)

---

## Features

- **CMS-driven content** — Pages, products, services, blog, navigation, and footer fully editable in Payload
- **Block-based pages** — Reorderable homepage sections (Hero, Products, Testimonials, CTA, etc.)
- **Lead generation** — Contact and quote request forms with spam protection
- **SEO-first** — Metadata, structured data, sitemap, robots.txt on every page
- **Performance** — Server Components, image optimization, ISR caching (Lighthouse 95+ target)
- **Security** — CSP, HSTS, rate limiting, Turnstile, Zod validation from day one
- **Portable deployment** — Docker on Hostinger VPS or serverless on Vercel
- **Future-ready** — Architecture supports 3D viewers, i18n, e-commerce, and AI search

---

## Tech Stack

| Layer            | Technology                                       |
| ---------------- | ------------------------------------------------ |
| Framework        | Next.js 16 (App Router)                          |
| Language         | TypeScript (strict)                              |
| CMS              | Payload CMS 3.x                                  |
| Database         | PostgreSQL 16+                                   |
| Styling          | Tailwind CSS 4                                   |
| UI               | shadcn/ui (Radix primitives)                     |
| Validation       | Zod                                              |
| Testing          | Vitest, React Testing Library, Playwright        |
| Tooling          | ESLint, Prettier, Husky, lint-staged, Commitlint |
| Containerization | Docker + Docker Compose                          |

See [`docs/VERSIONS.md`](docs/VERSIONS.md) for verified package versions.

---

## Prerequisites

| Tool    | Version                    |
| ------- | -------------------------- |
| Node.js | 20 LTS or 22 LTS           |
| npm     | 10+                        |
| Docker  | 24+ (for local PostgreSQL) |
| Git     | 2.40+                      |

---

## Local Development Setup

### 1. Clone and install

```bash
git clone <repository-url>
cd industrial-platform
npm ci
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your local values. Minimum required for development:

- `DATABASE_URL`
- `PAYLOAD_SECRET` (any 32+ char string for local dev)

### 3. Start PostgreSQL and migrate

```bash
npm run setup:local
```

This starts PostgreSQL in Docker (waits until healthy) and runs Payload database migrations.

Or step by step:

```bash
npm run db:up
npm run db:migrate
```

### 4. Run the development server

```bash
npm run dev
```

| URL                         | Description       |
| --------------------------- | ----------------- |
| http://localhost:3000       | Public website    |
| http://localhost:3000/admin | Payload CMS admin |

### 5. Create your first admin user

On first visit to `/admin`, Payload prompts you to create a Super Admin account.

---

## Environment Variables

All environment variables are documented in [`.env.example`](.env.example) with inline comments.

Variables are validated at startup via Zod (`src/lib/env.ts`). The application will refuse to start in production if required variables are missing or invalid.

**Categories:**

| Category  | Key variables                                           |
| --------- | ------------------------------------------------------- |
| App       | `NODE_ENV`, `NEXT_PUBLIC_SITE_URL`, `PORT`              |
| Database  | `DATABASE_URL`                                          |
| Payload   | `PAYLOAD_SECRET`, `PAYLOAD_ADMIN_ROUTE`                 |
| Storage   | `STORAGE_PROVIDER`, `MEDIA_ROOT` / Cloudinary / S3 keys |
| Email     | `EMAIL_PROVIDER`, `EMAIL_FROM`, `EMAIL_TO_SALES`        |
| Security  | `TURNSTILE_*`, `REVALIDATE_SECRET`, `RATE_LIMIT_*`      |
| Search    | `SEARCH_PROVIDER`                                       |
| Analytics | `NEXT_PUBLIC_GA_MEASUREMENT_ID`                         |

Never commit `.env` to version control.

---

## Available Scripts

| Script                 | Description                                        |
| ---------------------- | -------------------------------------------------- |
| `npm run setup:local`  | Start Postgres + run migrations (first-time setup) |
| `npm run db:up`        | Start PostgreSQL container (waits until healthy)   |
| `npm run db:down`      | Stop PostgreSQL container                          |
| `npm run db:migrate`   | Run Payload database migrations                    |
| `npm run db:reset`     | Stop Postgres and delete all data                  |
| `npm run db:logs`      | Tail PostgreSQL logs                               |
| `npm run dev`          | Start development server                           |
| `npm run build`        | Production build                                   |
| `npm run start`        | Start production server                            |
| `npm run lint`         | Run ESLint                                         |
| `npm run lint:fix`     | Fix ESLint issues                                  |
| `npm run format`       | Format with Prettier                               |
| `npm run format:check` | Check formatting                                   |
| `npm run type-check`   | TypeScript type checking                           |
| `npm run test`         | Run Vitest unit tests                              |
| `npm run test:watch`   | Vitest watch mode                                  |
| `npm run test:e2e`     | Run Playwright E2E tests                           |
| `npm run test:e2e:ui`  | Playwright UI mode                                 |
| `npm run payload`      | Payload CLI (migrations, types)                    |

---

## Folder Structure

```
/
├── .github/
│   ├── dependabot.yml          # Automated dependency updates
│   └── workflows/              # CI/CD pipelines
├── .husky/                     # Git hooks (pre-commit, commit-msg)
├── docker/                     # Dockerfile + Docker Compose
├── docs/
│   ├── ARCHITECTURE.md         # Full architecture decision record
│   ├── VERSIONS.md             # Verified dependency versions
│   ├── DEPLOYMENT.md           # Deployment guides
│   ├── BACKUP.md               # Backup procedures
│   └── SECURITY.md             # Security decisions log
├── public/                     # Static assets
├── src/
│   ├── app/                    # Next.js App Router (frontend + API + admin)
│   ├── blocks/                 # CMS block renderers
│   ├── collections/            # Payload collection configs
│   ├── components/             # Shared UI components
│   ├── fields/                 # Reusable Payload field groups
│   ├── globals/                # Payload global configs
│   ├── hooks/                  # Payload hooks (revalidation, etc.)
│   ├── lib/                    # Utilities, abstractions, security
│   ├── styles/                 # Global CSS + design tokens
│   └── types/                  # TypeScript type definitions
├── tests/
│   ├── unit/                   # Vitest unit + component tests
│   ├── e2e/                    # Playwright end-to-end tests
│   └── setup.ts                # Test setup (RTL, jest-dom)
├── .env.example                # Environment variable template
├── commitlint.config.mjs       # Conventional Commits config
├── CONTRIBUTING.md             # Contribution guidelines
└── README.md                   # This file
```

---

## CMS Usage

### Admin panel

Access the CMS at `/admin`. Log in with your Super Admin or Editor account.

### Key concepts

| Concept         | Description                                                                  |
| --------------- | ---------------------------------------------------------------------------- |
| **Globals**     | Site-wide settings: branding, navigation, footer, contact info, SEO defaults |
| **Collections** | Content types: products, services, blog posts, testimonials, etc.            |
| **Pages**       | CMS pages with reorderable blocks (homepage, about, legal pages)             |
| **Blocks**      | Modular page sections: Hero, Featured Products, CTA, etc.                    |
| **Media**       | Central media library for images, videos, and PDFs                           |

### Content workflow

1. Create content as a **draft**.
2. Preview and review.
3. **Publish** immediately or **schedule** for later.
4. Published content triggers on-demand page revalidation.

### Roles

| Role        | Permissions                                             |
| ----------- | ------------------------------------------------------- |
| Super Admin | Full access including users, globals, and form deletion |
| Editor      | Content creation, publishing, form viewing              |

### Adding a new block type

1. Define the block config in Payload (fields).
2. Create a renderer component in `src/blocks/`.
3. Register it in `src/blocks/registry.ts`.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) Section 8 for the full block registry.

---

## Deployment

The application supports two deployment targets with **identical code** — only environment variables differ.

### Option A: Hostinger VPS (Docker)

```bash
# On the VPS
git clone <repository-url>
cd industrial-platform
cp .env.example .env   # Configure production values
docker compose -f docker/docker-compose.yml up -d --build
```

- Nginx reverse proxy with Let's Encrypt SSL (see `docs/DEPLOYMENT.md`)
- Local file storage (`STORAGE_PROVIDER=local`)
- PostgreSQL in Docker Compose

### Option B: Vercel

```bash
# Connect repo to Vercel, set environment variables in dashboard
# Required: external Postgres (Neon/Supabase) + cloud storage (Cloudinary/S3)
```

- Set `STORAGE_PROVIDER=cloudinary` or `s3`
- Set `DATABASE_URL` to managed Postgres connection string

### Environments

| Environment | Branch    | Purpose                |
| ----------- | --------- | ---------------------- |
| Local       | —         | Development            |
| Staging     | `develop` | Pre-production testing |
| Production  | `main`    | Live site              |

Detailed guides: [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md).

---

## Testing

```bash
# Unit tests (Vitest)
npm run test

# E2E tests (Playwright) — requires dev server running
npm run test:e2e
```

| Layer     | Tool         | Location                 |
| --------- | ------------ | ------------------------ |
| Unit      | Vitest       | `tests/unit/`            |
| Component | Vitest + RTL | `tests/unit/components/` |
| E2E       | Playwright   | `tests/e2e/`             |

Test structure is scaffolded from day one. Tests are added incrementally per feature. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for testing guidelines.

---

## CI / Continuous Integration

GitHub Actions runs on every push and pull request to `main` / `develop`.

| Workflow   | File                                                           | What it does                                                 |
| ---------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| **CI**     | [`.github/workflows/ci.yml`](.github/workflows/ci.yml)         | Format check, lint, type-check, unit tests, production build |
| **Audit**  | same workflow (parallel job)                                   | `npm audit --audit-level=high` (non-blocking)                |
| **Deploy** | [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) | Manual stub until Hostinger / Vercel is configured           |

Local equivalent of CI:

```bash
npm run format:check
npm run lint
npm run type-check
npm run test
npm run build
```

Dependabot opens weekly PRs for npm, GitHub Actions, and Docker base images (`.github/dependabot.yml`).

---

## Troubleshooting

### Database connection refused

```bash
# Ensure PostgreSQL container is running and healthy
npm run db:up
docker compose -f docker/docker-compose.yml ps
```

Verify `DATABASE_URL` in `.env` matches Docker Compose credentials:

```
postgresql://postgres:postgres@localhost:5432/industrial_platform
```

If port 5432 is in use, set `POSTGRES_PORT=5433` in `docker/.env` and update `DATABASE_URL` accordingly.

### Payload admin — database does not exist / relation errors

Run migrations after starting Postgres:

```bash
npm run db:migrate
```

### Payload admin shows blank page

- Clear `.next` cache: `rm -rf .next && npm run dev`
- Verify `PAYLOAD_SECRET` is set in `.env`
- Check browser console for CSP errors

### Build fails with type errors

```bash
npm run payload generate:types
npm run type-check
```

### Port 3000 already in use

```bash
# Windows
netstat -ano | findstr :3000

# Change port in .env
PORT=3001
```

### Media uploads fail

- Check `STORAGE_PROVIDER` matches your environment.
- Local: ensure `MEDIA_ROOT` directory is writable.
- Cloudinary/S3: verify API keys in `.env`.

### Turnstile errors in development

Leave `NEXT_PUBLIC_TURNSTILE_SITE_KEY` empty in local `.env` to bypass Turnstile in development (handled in code). Set keys for staging/production.

### Husky hooks not running

```bash
npm run prepare   # Re-installs Husky hooks
```

---

## Architecture

Full architecture documentation: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)

Includes:

- Component architecture diagrams
- CMS relationship diagrams
- Deployment architecture
- Request, authentication, and media upload flows
- Security model
- Database schema
- Performance strategy

---

## Contributing

Read [`CONTRIBUTING.md`](CONTRIBUTING.md) for:

- Branch strategy (`main` / `develop` / `feature/*`)
- Conventional Commits format
- Pull request workflow
- Coding standards and naming conventions

---

## Future Roadmap

| Phase                | Features                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| **1 — MVP**          | Scaffold, products, services, forms, legal pages, SEO baseline           |
| **2 — Content**      | Blog, FAQs, downloads, search, testimonials, gallery, GA4, cookie banner |
| **3 — Rich content** | Case studies, process story, team, all homepage blocks, newsletter       |
| **4 — Enhancement**  | i18n, 3D product viewer (R3F), GSAP animations, customer accounts        |
| **5 — Commerce**     | E-commerce, payment gateways, product configurator, AI search            |

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) Section 3 for the full phased delivery plan.

---

## License

Proprietary — All rights reserved.
