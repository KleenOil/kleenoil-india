# Security Architecture

This document records security decisions implemented in the platform.  
For the full threat model, see [`ARCHITECTURE.md`](ARCHITECTURE.md) Section 16.

---

## Environment variables

| Decision                                          | Rationale                                                       |
| ------------------------------------------------- | --------------------------------------------------------------- |
| Zod validation in `src/lib/env.ts`                | Fail fast on misconfiguration; no unsafe defaults in production |
| Validated at startup via `src/instrumentation.ts` | Catches missing secrets before serving traffic                  |
| Stricter rules in `NODE_ENV=production`           | HTTPS site URL, revalidation secret, email/storage credentials  |

---

## HTTP security headers

Applied on every response via `src/middleware.ts`:

| Header                         | Value                                             |
| ------------------------------ | ------------------------------------------------- |
| `Content-Security-Policy`      | Strict; relaxed `unsafe-eval` in development only |
| `Strict-Transport-Security`    | Production only — 2-year max-age with preload     |
| `X-Frame-Options`              | `DENY`                                            |
| `X-Content-Type-Options`       | `nosniff`                                         |
| `Referrer-Policy`              | `strict-origin-when-cross-origin`                 |
| `Permissions-Policy`           | Disables camera, microphone, geolocation, payment |
| `Cross-Origin-Opener-Policy`   | `same-origin`                                     |
| `Cross-Origin-Resource-Policy` | `same-site`                                       |

CSP adapts dynamically for Cloudinary/S3, Turnstile, and GA4 when those features are enabled.

---

## Rate limiting

| Decision                                                     | Rationale                                             |
| ------------------------------------------------------------ | ----------------------------------------------------- |
| In-memory limiter in `src/lib/security/rate-limit.ts`        | Simple and effective on single-instance VPS           |
| Applied to `/api/forms/*`, `/api/search`, `/api/revalidate`  | Protects public endpoints; Payload admin API excluded |
| Configurable via `RATE_LIMIT_MAX` and `RATE_LIMIT_WINDOW_MS` | Tunable per environment                               |

**Future:** Redis / Upstash for multi-instance and Vercel serverless deployments.

---

## Input validation & spam protection

| Layer                     | Implementation                                          |
| ------------------------- | ------------------------------------------------------- |
| Runtime schema validation | Zod (API routes — Phase 1E forms)                       |
| HTML stripping            | `sanitizeText()` in `src/lib/security/sanitize.ts`      |
| Honeypot                  | `isHoneypotTriggered()` — hidden field check            |
| CAPTCHA                   | Cloudflare Turnstile via `verifyTurnstileToken()`       |
| SQL injection             | Payload ORM only; parameterized queries in search layer |

Turnstile is **bypassed in development** when keys are not set. **Required in production** for form endpoints.

---

## Authentication

| Area            | Approach                                                              |
| --------------- | --------------------------------------------------------------------- |
| Payload admin   | Email + password (bcrypt via Payload); role-based access              |
| Public site     | No authentication in V1                                               |
| Session cookies | `httpOnly`, `secure` in production, `sameSite: lax` (Payload default) |

---

## Error handling

| File                               | Purpose                                                       |
| ---------------------------------- | ------------------------------------------------------------- |
| `src/app/(frontend)/error.tsx`     | Recoverable segment errors — no stack traces in production UI |
| `src/app/global-error.tsx`         | Root-level fallback with minimal inline styles                |
| `src/app/(frontend)/not-found.tsx` | Custom 404 page                                               |

---

## Secrets management

- `.env` is gitignored; `.env.example` documents all variables without real values
- `PAYLOAD_SECRET` minimum 32 characters enforced at validation
- No secrets logged to stdout/stderr in production code paths

---

## What you need to provide (and when)

| Item                          | When needed               | Phase                                 |
| ----------------------------- | ------------------------- | ------------------------------------- |
| PostgreSQL connection         | Local dev with CMS        | **1D** (Docker — auto-configured)     |
| `PAYLOAD_SECRET`              | First run                 | **1D** (we generate for local `.env`) |
| Cloudflare Turnstile keys     | Form testing / production | **1E** (forms)                        |
| Email provider credentials    | Form notifications        | **1E** (forms)                        |
| Cloudinary / S3 keys          | Cloud deployment only     | **Deployment**                        |
| Production domain + HTTPS URL | Go-live                   | **Deployment**                        |
| GA4 measurement ID            | Analytics launch          | **Phase 2**                           |

**For Phase 1C:** Nothing additional is required from you. Local `.env` defaults are sufficient.
