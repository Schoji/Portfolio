# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the dev server at http://localhost:3000. Uses `next dev --webpack` (**not** Turbopack): Next 16's default Turbopack dev server freezes Firefox on dynamic routes (e.g. `/projects/[slug]`). Production and other browsers are unaffected; only the dev bundler was switched.
- `npm run build` — production build (uses Turbopack, the Next 16 default; works fine)
- `npm run start` — serve the production build
- `npm run lint` — ESLint (`next/core-web-vitals` + `next/typescript`)

There is no test suite in this project.

## Architecture

Personal portfolio built with the **Next.js App Router** (`app/`), React 19, TypeScript and Tailwind CSS v4. Every page uses the **v2 "black segments" design** (see `DESIGN.md`): home, `/projects`, the project pages, the blog, 404 and the error page.

- `app/layout.tsx` — root layout. Holds all SEO: `Metadata` (OpenGraph, Twitter, robots), a JSON-LD `Person` schema, and a blocking inline script that adds `.js` to `<html>` (see the reveal note below — `suppressHydrationWarning` on `<html>` is required because of it). `metadataBase` and canonical identity point at `https://piotrwittig.com`.
- `app/projects/projects.ts` — **the source of truth for all showcased projects** (`projects: Project[]`). Add/edit a project by editing an entry here; each has a unique `slug`. Shared by the home page, `/projects` and the detail pages. Every entry has a `kind` (`web` / `mobile` / `desktop` / `hardware` / `game`), which drives the `/projects` filters and the breakdown on the home page. `features` accepts plain strings or `{ title, subtitle?, icon? }` objects. Because entries hold icon **component references**, never pass a whole `Project` across a Server→Client boundary — pass the `slug` and let the client look it up.
- `app/_v2/` — the v2 design. A **private folder** (leading `_`), so nothing in it is a route; route files import from it.
  - `shell.tsx` — wraps a v2 page: Bricolage Grotesque + Geist fonts (plus Geist Mono, only for inline code in posts), `v2.css` tokens, Motion settings. Also exports `darkViewport`, which route files re-export as `viewport`. **Every route renders inside `Shell`** — there is no shared layout for it.
  - `home.tsx` — the home page body: Hero, GitHub, About, five project screens, Contact. `app/page.tsx` renders it inside `Shell` and sets `revalidate = 3600`.
  - `featured.ts` — the five projects that get a full screen on the home page, with v2-specific copy, layout (`mobile` = phone beside the info panel, `stage` = wide visual above an info bar) and colour. URLs still come from `projects.ts`; Linder also links to its source repository.
  - `github.ts` — GitHub GraphQL stats for the last 12 months, plus `getGitHubLanguages()` (repos counted by primary language, for the donut on `/projects`). Needs `GITHUB_TOKEN` (in `.env.local` locally, and in the host's env for production). Without it, development shows a labelled placeholder and production hides the stats.
  - `project-page.tsx` — the body of `/projects/[slug]` (server component), the old site's structure in v2 styling: hero (breadcrumb, title, tagline, buttons beside the hero image: phones for mobile apps, a window or photo otherwise; `heroBackground` replaces it as a backdrop), a text column (description, backstory, problems, takeaways, highlights) beside a sticky stack/facts card, then demo video, screenshots, Sortra's download block and previous/next. It deliberately does not reuse the home-page project screens.
  - `tech.ts` — logo + brand colour per technology name, used by `TechTag` (`components/ui.tsx`) wherever technologies are listed. Add an entry when a new technology appears in `projects.ts`.
  - `components/featured-cover.tsx` — renders a featured project's home composition at its design size and scales it into a `/projects` cover. The server renders it at the desktop cover size so it shows without JS; `InCover` (from `featured-shots.tsx`) makes its images request small widths.
  - `components/stack-overview.tsx` — the Languages donut + Most used bars on `/projects`.
  - `covers.ts` — the editorial covers on `/projects` (ground colours, icon, layout, screens, decoration). hubmi, SoundNest and Sortra have hand-built covers in `components/project-thumbnail.tsx`; every other project needs an entry here.
  - `kinds.ts` — `KIND`: label, plural and segment colour per project kind. Plain module so server and client code can both import it.
  - `image-ratio.ts` — reads an image's ratio from `public/` with `sharp` at build time, so frames and gallery tiles take the real shape instead of cropping.
  - `components/segment.tsx` — `Segment` (every rounded bento; grows into place on scroll) and `Rise` (devices sliding up). `components/ui.tsx` — `Button` (52px pills), `Tag` (outlined 8px chips), `SegmentFooter`. Buttons and tags must never look alike.
  - `components/screenshot-gallery.tsx` (server) + `components/gallery.tsx` (client) — screenshot grid with a fullscreen viewer; used by the project pages and the DeathAdder post.
  - `components/status-page.tsx` — the shared body of `not-found.tsx` and `error.tsx`.
  - `components/nav.tsx` — takes `active` on pages without `data-nav` sections (`work` on project pages, `blog` on the blog).
- `app/page.tsx` — the home route; renders `_v2/home.tsx` inside the v2 shell.
- `app/projects/page.tsx` — `/projects`, every project in the v2 design with kind filters (`_v2/components/project-list.tsx`). The home page links here after the featured five.
- `app/projects/[slug]/page.tsx` — server component; `generateStaticParams` prewrites one page per project slug, `generateMetadata` sets per-project SEO, then renders `_v2/project-page.tsx` inside `Shell`.
- `app/blog/` — the blog. Same split as projects: `posts.ts` holds the metadata array (`posts: BlogPost[]`, plus `listedPosts` / `getPost` / `formatDate` helpers), and each post **body** is its own module under `app/blog/content/`, registered by slug in `app/blog/content/index.ts` (`postContent[slug] = { Body, toc }`). `app/blog/page.tsx` is the index; `app/blog/[slug]/page.tsx` prewrites one page per slug, sets per-post SEO and a JSON-LD `BlogPosting`, then renders the body plus a sticky table of contents from the module's `toc` export. Post bodies are **server** components — only `comparison.tsx` inside them is `"use client"`.
  - There is no MDX and no `@tailwindcss/typography`. Post bodies compose the primitives in `app/blog/prose.tsx` (`Lead`, `Section`, `P`, `UL`/`LI`, `Steps`, `Callout`, `Quote`, `RuleTable`, `StatRow`, `Table`, `Faq`, `Figure`, `C`, `A`) so every post keeps the same rhythm and palette. They are drawn in v2 (Bricolage headings, Geist text, `#1C1C1E` blocks) and rely on running inside `Shell`. Note `Section` takes only `id` and `title` — the old `// LABEL` eyebrow was removed sitewide.
  - `posts.ts` supports `draft: true`: the page is still built (so the URL is shareable for review) but it is hidden from the index in production builds and marked `noindex`. Flip the flag to publish.
  - SEO per post lives in `[slug]/page.tsx`: canonical, OG/Twitter, `noindex` for drafts, and a JSON-LD `@graph` with `BlogPosting` + `BreadcrumbList` + `FAQPage`. The FAQ array comes from the content module (`faq`), so the visible Q&A and the structured data cannot drift. `[slug]/opengraph-image.tsx` and `blog/opengraph-image.tsx` generate the 1200×630 social cards with `next/og` — no image files to maintain. Satori gotcha: **every `<div>` with more than one child needs an explicit `display`**, and `{a} {b}` counts as two children (use a template string).
  - `app/blog/comparison.tsx` — the "normal English vs ASD-STE100" side-by-side. Data-driven (`ComparisonExample[]`): `flags` are **literal substrings** of the `plain` text that get marked as slop, and word counts / longest-sentence numbers are computed at render time — so if you edit the text, the stats stay honest, but prose that quotes those numbers must be re-checked.
- `app/components/scroll-progress.tsx` — the reading progress line on blog posts. Everything else lives in `app/_v2/`.
- Site-wide SEO plumbing: `app/site.ts` holds `SITE_URL`/`SITE_NAME`/`SITE_AUTHOR`/`SITE_EMAIL` (the single place the canonical origin is written). `app/sitemap.ts` → `/sitemap.xml` (home + `/projects` + `/blog` + published posts + every project; drafts excluded), `app/robots.ts` → `/robots.txt`, `app/feed.xml/route.ts` → a static RSS feed (`dynamic = "force-static"`) advertised via `alternates.types` in the root layout. The home page links `/blog` from the navbar, so the section is reachable from the crawl root.
- `public/` — project screenshots. Multi-image projects use per-project subfolders (e.g. `public/plan_pm/`, `public/until_done/`). Image paths in `projects.ts` are relative to `public/`.

### Conventions & gotchas

- The GitHub username `Schoji` is hardcoded in `app/_v2/github.ts` and in the contact links.
- **Design tokens live in `app/_v2/v2.css`, scoped to `.v2`** (segment colours, type scale, `.screen` = one viewport per section on desktop). `globals.css` only holds Tailwind, a black page ground and the no-JS / reduced-motion guards; the old brass accent, glow and page-gradient tokens are gone, as are DaisyUI and IBM Plex. Use the v2 colours, never a new literal hue: the one exception is the two `opengraph-image.tsx` files, which repeat the paper and black values because Satori cannot read CSS variables.
- **Motion imports:** import from `motion/react`.
- Icons come from three libraries: `lucide-react`, `react-icons` (Si/Fa/Bs/Lia sets), plus per-project overrides via the `icon` field in `projects.ts`.
- Path alias `@/*` maps to the repo root (`tsconfig.json`).
- Dark styling is fixed (no theme toggle): pages are black, segments are `#1C1C1E` or a v2 colour. Body text on dark is white at reduced opacity (`text-white/72`) and meta text uses `--text-secondary`; avoid `zinc-500`/`zinc-600` for text, they fail WCAG AA on these grounds.
- On desktop each `.screen` fills one viewport (`100svh`) with its segments capped at 640px; below `lg` screens stack and flow. `globals.css` sets `scroll-padding-top` and `v2.css` gives `section[id]` a scroll margin so anchored jumps clear the fixed navbar.
- **Content must never need JS to be visible.** Motion writes `style="opacity:0;…"` into the server HTML for every scroll reveal, so `globals.css` (and, for v2, the `[data-reveal]` rules in `v2.css`) keeps that content visible until the inline script in `layout.tsx` adds `.js` to `<html>`. The selector matches Motion's *unspaced* `opacity:0` form on purpose — after hydration Motion rewrites it with spaces, and from then on it should own the reveal. This covers no-JS and blocked scripts, **not** a failed hydration (the script has already run by then). A `prefers-reduced-motion` block resolves the same reveals unconditionally.
- Sitewide there is **one `h1` per page** and no skipped levels. On the home page that `h1` is the name in the hero; each section and project screen title is an `h2`.
