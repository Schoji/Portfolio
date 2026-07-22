# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000. Uses `next dev --webpack` (**not** Turbopack): Next 16's default Turbopack dev server freezes Firefox on dynamic routes (e.g. `/projects/[slug]`). Production and other browsers are unaffected; only the dev bundler was switched.
- `npm run build` — production build (uses Turbopack, the Next 16 default; works fine)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test suite in this project.

## Architecture

Personal portfolio built with the **Next.js App Router** (`app/`), React 19, TypeScript, Tailwind CSS v4, and DaisyUI (`black` theme only). One long client-rendered landing page (`app/page.tsx`) plus statically-generated per-project detail pages.

- `app/layout.tsx` — root layout. Holds all SEO: `Metadata` (OpenGraph, Twitter, robots), the **Space Grotesk** font (via `next/font/google`, exposed as `--font-space-grotesk` and wired to `--font-sans`/`--font-mono` in `globals.css`), and a JSON-LD `Person` schema injected into `<head>`. `metadataBase` and canonical identity point at `https://piotrwittig.com`.
- `app/projects/projects.ts` — **the source of truth for all showcased projects** (`projects: Project[]`). Add/edit a project by editing an entry here; each has a unique `slug`. Shared by the home page and the detail pages. `features` accepts plain strings or `{ title, subtitle?, icon? }` objects. Because entries hold icon **component references**, never pass a whole `Project` across a Server→Client boundary — pass the `slug` and let the client look it up.
- `app/page.tsx` — the landing page (`"use client"`). Maps `projects` into `<Portfolio>` cards (condensed: no Key Features) and contains the navbar, hero, About Me, projects loop, and contact sections.
- `app/projects/[slug]/page.tsx` — server component; `generateStaticParams` prewrites one page per project slug, `generateMetadata` sets per-project SEO, then renders `<ProjectDetail slug=… />`. `ProjectDetail.tsx` (`"use client"`) is the full project view (full description + **Key Features** grid) with its own header/back link.
- `app/components/` — presentational components:
  - `portfolio.tsx` — one condensed project card on the landing page (`mockup-phone`/`mockup-window` via `phone`, `invertOrder` swaps columns). Shows breadcrumb, two-tone title (last word in accent cyan + glow), tech pills, a **Read more** link to `/projects/[slug]`, and the action buttons. Key Features live only on the detail page.
  - `project-media.tsx` — shared image frame + carousel (prev/next + dots) for single image or array. Used by both the card and the detail page.
  - `project-actions.tsx` — shared brand-colored pill buttons: GitHub (`SiGithub`), App Store (`SiApple`), Google Play (inline multicolor `GooglePlayIcon`), or a generic link (`ExternalLink`/`SiGithub` for github URLs); "Currently in development" pill when no links. No hooks, so it works in server or client trees.
  - `github-activity.tsx` — client-side `fetch` of the public GitHub events API for user `Schoji`, parsed into a recent-activity feed.
  - `snake-game.tsx` — self-playing snake animation (canvas/refs, BFS AI, auto-restart) rendered as the bottom layer of the hero background, beneath the radial glow and content. Drawn in the accent cyan (`rgb(34,211,238)` / `#67e8f9` food).
  - `badge.tsx`, `card.tsx` — small UI primitives (tech pills; contact cards with clipboard-copy toast).
- `public/` — project screenshots. Multi-image projects use per-project subfolders (e.g. `public/plan_pm/`, `public/until_done/`). Image paths in `projects.ts` are relative to `public/`.

### Conventions & gotchas

- The GitHub username `Schoji` is hardcoded in both `github-activity.tsx` and the `<GitHubCalendar>` in `page.tsx`.
- **Framer Motion import inconsistency:** `page.tsx` imports from `framer-motion`; the components import from `motion/react`. Both resolve via the `motion` package — match the surrounding file when editing.
- Icons come from three libraries: `lucide-react`, `react-icons` (Si/Fa/Bs/Lia sets), plus per-project overrides via the `icon` field in `projects.ts`.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Dark styling is done with explicit `zinc`/`black` Tailwind classes plus the DaisyUI `black` theme, not a theme toggle.
- Full-height sections use `min-h-[100svh]` and vertically center their content so each fits in one viewport. `globals.css` also overrides daisyUI's fixed-size `.mockup-phone-display` (390×845px) to scale by viewport height, and sets `scroll-padding-top` so anchored jumps clear the fixed navbar. If you add tall content to a project card, keep this fit in mind.
- Brand colors live as CSS vars in `globals.css`: `--accent` (cyan `#22d3ee`, used for the logo dot, hero CTA, badge, and stats) and `--secondary` (purple `#a855f7`, matching the hero snake). The two-tone glowing hero heading uses the `.hero-accent` class (gradient text clipped + `drop-shadow` glow — note `text-shadow` won't work on clipped text).
