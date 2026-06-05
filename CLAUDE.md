# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Professional website for **Dra. Conceição Lopes**, a lawyer based in Nelas, Viseu District, Portugal. The site is in **Portuguese (pt-PT)** and handles appointment scheduling, SEO, and lead capture via Firebase. All user-facing text must remain in Portuguese.

## Commands

```bash
npm start                          # Dev server (http://localhost:4200)
npm run build                      # Production build with SSR prerendering
npm test                           # Unit tests (Karma + Jasmine)
npm run watch                      # Dev build with watch mode
npm run serve:ssr:advogada-site    # Run the prebuilt SSR Express server
```

No dedicated lint command — TypeScript strict mode (`tsconfig.json`) is the primary code quality gate.

To run a single test file, use:
```bash
npx ng test --include='src/app/path/to/file.spec.ts'
```

## Architecture

**Angular 21 SPA with SSR**, deployed on Vercel. The app uses:
- **Zoneless change detection** (`provideZonelessChangeDetection()` in `app.config.ts`) — no Zone.js-based triggering; reactivity is signals-driven.
- **Standalone components** throughout — no NgModules anywhere.
- **Firebase Firestore** for lead persistence (`FirebaseService`), **EmailJS** for email notifications to the lawyer on form submission.
- **Angular SSR + prerendering** — `angular.json` sets `prerender: true`. The build outputs static HTML for all routes, served via `server.ts` (Express 5).

### Key Data Flow: Appointment Scheduling

`SchedulingComponent` (`/agendamento`) → `FirebaseService.submitLead()` (writes to `leads` Firestore collection) → `EmailService` sends notification via EmailJS. Firebase write is critical; email failure is non-blocking.

### Routing

All routes except `/` (HomeComponent, eagerly loaded) use `loadComponent` lazy loading:

| Path | Component |
|------|-----------|
| `/` | HomeComponent |
| `/sobre` | AboutComponent |
| `/areas` | PracticeAreasComponent |
| `/agendamento` | SchedulingComponent |
| `/politica-privacidade` | PrivacyPolicyComponent |
| `/politica-cookies` | CookiePolicyComponent |

### Layout Shell

`AppComponent` renders `HeaderComponent` → `<router-outlet>` → `FooterComponent` → `CookieConsentComponent`. No shared state between layout and pages.

### SEO Pattern

Every page component calls `SeoService.update()` in its constructor, passing `title`, `description`, and `canonical` URL. The service sets `<title>`, standard meta, Open Graph, Twitter Card, and the canonical `<link>`. Pages that render structured data (FAQ, LegalService JSON-LD) inject it as a `<script type="application/ld+json">` directly in the template.

### Custom UI Components (`/components/magic-ui/`)

These are animation-heavy presentational components (marquee, blur-fade, bento-grid, border-beam, etc.). They use `IntersectionObserver` for scroll-triggered effects and CSS keyframes defined in `tailwind.config.js`. Do not add business logic here.

## Conventions

**Dependency injection:** Always use `inject()` (not constructor injection).

**State:** Use Angular signals. No RxJS subjects for local state. No global state library (NgRx, etc.).

**Utilities:** `src/app/utils/cn.ts` exports a `cn()` helper (wraps `clsx` + `tailwind-merge`) — use it for conditional Tailwind class composition.

**Styling:** TailwindCSS only. Custom design tokens in `tailwind.config.js`:
- `primary` (#0c3835, deep teal), `secondary` (#78572b, warm brown), `accent` (#8B6F4E)
- `font-serif` → Playfair Display, `font-sans` → Inter

**Environment config:** Firebase credentials live in `src/environments/environment.ts` (dev) and `environment.prod.ts` (prod). EmailJS service/template IDs are hardcoded in `EmailService` — move to environment files if they change.

**Firestore schema** (`leads` collection): `firstName`, `lastName`, `email`, `phone`, `date`, `time`, `reason`, `createdAt` (server timestamp).
