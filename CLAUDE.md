# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Start dev server (Next.js + Payload CMS) |
| `pnpm devsafe` | Clean `.next` cache then start dev server |
| `pnpm build` | Production build (8000 MB heap) |
| `pnpm start` | Start production server |
| `pnpm lint` | ESLint check |
| `pnpm test:int` | Integration tests (Vitest, `tests/int/*.int.spec.ts`) |
| `pnpm test:e2e` | E2E tests (Playwright, `tests/e2e/*.e2e.spec.ts`) |
| `pnpm test` | Integration then E2E tests |
| `pnpm generate:types` | Regenerate `src/payload-types.ts` from Payload config |
| `pnpm generate:importmap` | Regenerate Payload import map |
| `pnpm payload` | Run Payload CLI commands |

## Architecture

### Stack

- **Next.js 16** (App Router) with **React 19**
- **Payload CMS 3** embedded (headless CMS — admin at `/admin`, REST at `/api`, GraphQL at `/api/graphql`)
- **MongoDB** database via mongoose adapter
- **Tailwind CSS v4** with PostCSS (`@tailwindcss/postcss`)
- **Vercel Blob Storage** for media uploads
- **TypeScript 5.7**, strict mode, path alias `@/*` → `./src/*`

### Route Groups

Two route groups in `src/app/`:

- `(frontend)/` — public pages: `/`, `/about`, `/contact`, `/projects`, `/projects/[slug]`
- `(payload)/` — Payload admin panel and API routes (auto-generated)

### Data Flow: Server Components → Payload

Every page is an **async Server Component** that:

1. `const payloadConfig = await config` (import `@/payload.config`)
2. `const payload = await getPayload({ config: payloadConfig })`
3. Fetch data via `payload.findGlobal()` (globals) or `payload.find()` (collections) with `depth: 1` or `2`
4. Pass data down to client or server components

Example pattern (from home page):
```ts
const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })
const home = await payload.findGlobal({ slug: 'home', depth: 2 })
if (!home) return notFound()
```

### CMS Model

**Collections** (multiple entries): `Users` (auth), `Media` (uploads → Vercel Blob, WebP auto-conversion), `Projects` (title, slug, rich text, media gallery, stacks)

**Globals** (singletons): `Home`, `Header`, `Footer`, `About`, `Contact`, `ProjectsPage` — these hold ALL content for the site (hero text, about copy, nav links, social links, contact info, etc.)

**Blocks** (reusable field groups used in globals): `IntroDescription`, `Skills`, `Experiences`, `Stack`, `ContactInfo`, `Button`

All CMS content is managed through Payload admin at `/admin`. There are NO local data files — everything comes from MongoDB via Payload.

### Design System

- **Neo-brutalism** with 4 themes: `light-mint` (default), `pastel-dream`, `bold-contrast`, `sunset-vibes`
- Themes defined as CSS custom properties in `src/assets/themes.css`
- Tailwind v4 `@theme` tokens in `src/assets/styles.css` map CSS vars to Tailwind utilities
- Theme switching via React Context (`src/contexts/ThemeContext.tsx`) with `data-theme` attribute on `<html>`
- Component library in `src/components/base/` — polymorphic primitives (`Box`, `Container`, `Grid`, `Card`, `Heading`, `Text`, `Button`, `ButtonLink`, `Tag`, `SectionHeader`)

### Component Organization

```
src/components/
  base/          — Design system primitives (Button, Card, Heading, Text, etc.)
  header/        — Header, Navigation, MobileNavigation, Logo
  footer/        — Footer, SocialLinks, Copyright, Sitename
  home/          — Home page sections (Hero, AvatarHero, WhatIDo, ServiceCard, FeaturedProjects)
  about/         — About page (ProfessionalSummary, SkillsSection, ExperienceList, etc.)
  projects/      — ProjectsList (grid of ProjectCards reused from base/)
  contact/       — ContactCard
  ThemeSwitcher  — Floating theme picker
```

### Key Configuration Files

| File | Purpose |
|---|---|
| `src/payload.config.ts` | Payload CMS setup (collections, globals, DB, storage, editor) |
| `next.config.ts` | Uses `withPayload()` plugin, image domains, webpack aliases |
| `eslint.config.mjs` | ESLint flat config (Next.js + TS rules) |
| `vitest.config.mts` | Vitest config for integration tests |
| `playwright.config.ts` | Playwright config for E2E tests |
| `src/assets/themes.css` | 4 theme CSS variable definitions |
| `src/assets/styles.css` | Tailwind v4 entry + `@theme` tokens |
| `src/payload-types.ts` | Auto-generated TS types for all CMS models |

### Tests

- Integration tests: `tests/int/*.int.spec.ts` (Vitest + jsdom, setup in `vitest.setup.ts`)
- E2E tests: `tests/e2e/*.e2e.spec.ts` (Playwright against running dev server)
- Helpers: `tests/helpers/` (login, seedUser)

### Environment Variables

Requires `.env` with:
- `MONGODB_URI` — MongoDB connection string
- `PAYLOAD_SECRET` — Payload encryption secret
- `BLOB_READ_WRITE_TOKEN` — Vercel Blob storage token (for media uploads)