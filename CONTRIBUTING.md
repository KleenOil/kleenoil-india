# Contributing Guide

Thank you for contributing to the Industrial Corporate Portfolio Platform. This document defines the standards and workflows for all contributors.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Branch Strategy](#branch-strategy)
4. [Commit Messages](#commit-messages)
5. [Pull Request Workflow](#pull-request-workflow)
6. [Coding Standards](#coding-standards)
7. [Naming Conventions](#naming-conventions)
8. [Testing Requirements](#testing-requirements)
9. [CMS Content Guidelines](#cms-content-guidelines)
10. [Security Guidelines](#security-guidelines)

---

## Code of Conduct

- Be respectful and constructive in all interactions.
- Prioritize maintainability, security, and performance over shortcuts.
- Ask questions when requirements are unclear — do not assume.

---

## Getting Started

1. Clone the repository.
2. Copy `.env.example` to `.env` and fill in required values.
3. Install dependencies: `npm ci`
4. Start local services: `docker compose -f docker/docker-compose.yml up -d`
5. Run the dev server: `npm run dev`
6. Read [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) before making structural changes.

---

## Branch Strategy

We use a **Git Flow–lite** model:

| Branch      | Purpose                 | Merges into                        |
| ----------- | ----------------------- | ---------------------------------- |
| `main`      | Production-ready code   | —                                  |
| `develop`   | Integration / staging   | `main` (via release PR)            |
| `feature/*` | New features            | `develop`                          |
| `fix/*`     | Bug fixes               | `develop` (or `main` for hotfixes) |
| `chore/*`   | Tooling, deps, docs     | `develop`                          |
| `hotfix/*`  | Urgent production fixes | `main` and `develop`               |

### Rules

- Never commit directly to `main`.
- Keep branches short-lived (ideally < 1 week).
- Rebase or merge `develop` into your branch before opening a PR.
- Delete branches after merge.

### Branch naming examples

```
feature/product-filters
fix/contact-form-validation
chore/upgrade-payload
hotfix/csp-header-regression
```

---

## Commit Messages

We enforce **[Conventional Commits](https://www.conventionalcommits.org/)** via Commitlint + Husky.

### Format

```
<type>(<optional scope>): <short description>

[optional body]

[optional footer(s)]
```

### Types

| Type       | When to use                 |
| ---------- | --------------------------- |
| `feat`     | New feature                 |
| `fix`      | Bug fix                     |
| `docs`     | Documentation only          |
| `style`    | Formatting, no logic change |
| `refactor` | Code change, no feature/fix |
| `perf`     | Performance improvement     |
| `test`     | Adding or updating tests    |
| `build`    | Build system, dependencies  |
| `ci`       | CI/CD configuration         |
| `chore`    | Maintenance, tooling        |
| `revert`   | Revert a previous commit    |

### Examples

```
feat(products): add category filter to listing page

fix(forms): validate phone number format for en-IN locale

docs(readme): add Docker troubleshooting section

chore(deps): bump payload to 3.85.2
```

### Rules

- Use imperative mood: "add" not "added".
- Keep the subject line under 72 characters.
- Reference issues in the footer: `Closes #123`.
- Breaking changes: `feat!: remove legacy API route` or `BREAKING CHANGE:` in footer.

---

## Pull Request Workflow

### Before opening a PR

- [ ] Branch is up to date with `develop`
- [ ] `npm run lint` passes
- [ ] `npm run type-check` passes
- [ ] `npm run test` passes (unit tests)
- [ ] `npm run build` succeeds
- [ ] New features have tests where practical
- [ ] No secrets or `.env` files committed

### PR title

Use the same Conventional Commits format as commit messages.

### PR description template

```markdown
## Summary

Brief description of what changed and why.

## Type of change

- [ ] Feature
- [ ] Bug fix
- [ ] Refactor
- [ ] Documentation
- [ ] Chore

## Test plan

- [ ] Steps to verify the change locally
- [ ] Screenshots (for UI changes)

## Checklist

- [ ] Self-reviewed code
- [ ] No unnecessary dependencies added
- [ ] Architecture doc updated (if structural change)
```

### Review process

1. Open PR against `develop` (or `main` for hotfixes).
2. At least one approval required before merge.
3. CI must pass (lint, type-check, build, tests).
4. Squash merge preferred for feature branches.

---

## Coding Standards

### TypeScript

- **Strict mode** enabled — no `any` without justification comment.
- Prefer `interface` for object shapes; `type` for unions/intersections.
- Use Payload-generated types from `src/types/payload-types.ts`.
- Server Components by default; `'use client'` only when necessary.

### React / Next.js

- Fetch data in Server Components via Payload Local API.
- Colocate component-specific types with the component.
- Use `next/image` for all content images.
- Use `next/font` for fonts — never load from external CDNs in production.

### Payload CMS

- Collection configs in `src/collections/`.
- Reusable field groups in `src/fields/`.
- Block configs in `src/blocks/` (or colocated with block components).
- Always define `access` control on collections — default deny for sensitive data.

### Styling

- Tailwind CSS utility classes as primary styling method.
- Design tokens via CSS custom properties in `src/styles/globals.css`.
- shadcn/ui primitives in `src/components/ui/` — customize only when necessary.

### Principles

| Principle | Application                                                                       |
| --------- | --------------------------------------------------------------------------------- |
| **SOLID** | Single responsibility per module; depend on abstractions (storage, search, email) |
| **DRY**   | Shared fields, components, and utilities — no copy-paste                          |
| **KISS**  | Simplest solution that meets requirements                                         |
| **YAGNI** | Do not build features not in the current phase                                    |

### ESLint & Prettier

- ESLint config: `eslint.config.mjs`
- Prettier config: `prettier.config.mjs`
- Auto-fixed on commit via lint-staged.

---

## Naming Conventions

| Context               | Convention                | Example                   |
| --------------------- | ------------------------- | ------------------------- |
| React components      | PascalCase                | `ProductCard.tsx`         |
| Utilities / lib       | kebab-case                | `rate-limit.ts`           |
| Hooks                 | camelCase, `use` prefix   | `useSearch.ts`            |
| Payload collections   | PascalCase plural         | `Products`, `CaseStudies` |
| Block slugs           | kebab-case                | `featured-products`       |
| Routes                | kebab-case                | `/case-studies/[slug]`    |
| Environment variables | SCREAMING_SNAKE           | `DATABASE_URL`            |
| CSS variables         | kebab-case                | `--color-brand-primary`   |
| Test files            | `*.test.ts` / `*.spec.ts` | `env.test.ts`             |
| E2E tests             | `*.e2e.ts`                | `homepage.e2e.ts`         |

---

## Testing Requirements

### Test pyramid

| Layer     | Tool                           | Location                 |
| --------- | ------------------------------ | ------------------------ |
| Unit      | Vitest                         | `tests/unit/`            |
| Component | Vitest + React Testing Library | `tests/unit/components/` |
| E2E       | Playwright                     | `tests/e2e/`             |

### When to write tests

- **Required:** Utility functions, validation schemas, security helpers, API route handlers.
- **Recommended:** Interactive components (forms, search modal).
- **E2E:** Critical user flows (homepage load, contact form, product listing).

### Commands

```bash
npm run test          # Run unit tests (Vitest)
npm run test:watch    # Watch mode
npm run test:e2e      # Run Playwright E2E tests
npm run test:e2e:ui   # Playwright UI mode (debugging)
```

### Guidelines

- Tests must be deterministic — no flaky timeouts.
- Mock external services (Turnstile, email) in unit tests.
- E2E tests use `PLAYWRIGHT_BASE_URL` from env.

---

## CMS Content Guidelines

- All client-specific branding lives in CMS globals — never hardcode company names in components.
- Use placeholder content during development; real content is added via Payload admin.
- Upload images with descriptive `alt` text (required for WCAG AA).
- Use drafts for work-in-progress content; publish only when reviewed.

---

## Security Guidelines

- Never commit secrets, API keys, or `.env` files.
- Validate all user input with Zod on the server.
- Use parameterized queries only — no string-concatenated SQL.
- Report security vulnerabilities privately to the project maintainer — do not open public issues.

---

## Questions?

Refer to [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) or open a discussion issue.
