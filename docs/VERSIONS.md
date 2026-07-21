# Verified Dependency Versions

**Verified:** 2026-07-05  
**Purpose:** Pin Phase 1 initialization to latest **stable** releases. Re-verify before major upgrades.

## Version policy

- Use **latest stable** releases only — no alpha, beta, or rc unless explicitly approved.
- Payload and `@payloadcms/*` packages **must share the same version**.
- Next.js version must satisfy `@payloadcms/next` peer dependency range.

## Core runtime (Phase 1)

| Package                        | Verified version | Notes                                           |
| ------------------------------ | ---------------- | ----------------------------------------------- |
| `next`                         | **16.2.10**      | Latest stable; Payload peer: `>=16.2.6 <17.0.0` |
| `react`                        | **19.2.7**       | Required by Next.js 16                          |
| `react-dom`                    | **19.2.7**       | Match React                                     |
| `typescript`                   | **6.0.3**        | Latest stable                                   |
| `payload`                      | **3.85.2**       | Latest stable Payload 3.x                       |
| `@payloadcms/next`             | **3.85.2**       | Must match `payload`                            |
| `@payloadcms/db-postgres`      | **3.85.2**       | Must match `payload`                            |
| `@payloadcms/richtext-lexical` | **3.85.2**       | Must match `payload`                            |
| `tailwindcss`                  | **4.1.9**        | Latest stable Tailwind 4                        |
| `zod`                          | **4.4.3**        | Env + API validation                            |

## UI & styling

| Package                    | Verified version |
| -------------------------- | ---------------- |
| `lucide-react`             | Latest stable    |
| `class-variance-authority` | Latest stable    |
| `clsx`                     | Latest stable    |
| `tailwind-merge`           | Latest stable    |

## Code quality

| Package                           | Verified version |
| --------------------------------- | ---------------- |
| `eslint`                          | **9.x**          |
| `prettier`                        | **3.9.4**        |
| `husky`                           | **9.1.7**        |
| `lint-staged`                     | **17.0.8**       |
| `@commitlint/cli`                 | **21.2.0**       |
| `@commitlint/config-conventional` | **21.2.0**       |

## Testing

| Package                     | Verified version |
| --------------------------- | ---------------- |
| `vitest`                    | **4.1.9**        |
| `@vitejs/plugin-react`      | Latest stable    |
| `@testing-library/react`    | **16.3.2**       |
| `@testing-library/jest-dom` | Latest stable    |
| `@playwright/test`          | **1.61.1**       |
| `jsdom`                     | Latest stable    |

## Next.js 15 → 16 note

The approved architecture referenced Next.js 15. Payload 3.85.2 officially supports **Next.js 16.2.6+**. We use **16.2.10** (latest stable) for security patches and long-term support. App Router patterns are unchanged.

## Re-verification command

```bash
npm view next version
npm view payload version
npm view @payloadcms/next peerDependencies
```

Update this document when bumping major versions.
