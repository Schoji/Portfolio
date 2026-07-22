# Repository Guidelines

## Project Structure & Module Organization

This portfolio uses the Next.js App Router. Route entry points live in `app/`: `page.tsx` renders the landing page, `layout.tsx` owns global metadata and layout, and `projects/[slug]/` provides statically generated project detail pages. Reusable React components belong in `app/components/`. Treat `app/projects/projects.ts` as the source of truth for project content and unique slugs. Global styles and brand variables live in `app/globals.css`. Store static images in `public/`; group project galleries in folders such as `public/plan_pm/` and reference them with paths relative to `public/`.

## Build, Test, and Development Commands

- `npm ci` installs the exact dependency versions from `package-lock.json`.
- `npm run dev` starts the local server at `http://localhost:3000` using webpack. Keep this flag: the development Turbopack server has caused Firefox issues on dynamic routes.
- `npm run lint` runs the Next.js Core Web Vitals and TypeScript ESLint rules.
- `npm run build` creates a production build and catches routing, type, and prerendering problems.
- `npm run start` serves the completed production build.

Run lint and build before opening a pull request.

## Coding Style & Naming Conventions

Write strict TypeScript and functional React components. Follow the existing two-space indentation, semicolons, and double quotes. Use PascalCase for exported components (`ProjectDetail.tsx`), kebab-case for shared component filenames (`project-media.tsx`), and camelCase for variables and props. Prefer the `@/` alias for root-relative imports. Match the animation import already used by the file (`framer-motion` or `motion/react`). Use Tailwind utilities and the CSS variables `--accent` and `--secondary` instead of introducing near-duplicate colors.

## Testing Guidelines

There is no automated test suite or coverage threshold yet. For every change, run `npm run lint` and `npm run build`, then manually verify the landing page and affected `/projects/<slug>` routes at desktop and mobile widths. If tests are introduced, colocate them as `*.test.ts` or `*.test.tsx` and add the runner to `package.json`.

## Commit & Pull Request Guidelines

Recent history uses short, sentence-style subjects such as `Fixed spacing in topbar.` Keep commits focused and describe the user-visible result; avoid mixing refactors with content changes. Pull requests should include a concise summary, validation commands, and linked issues when applicable. Add before/after screenshots for layout, animation, or responsive changes, and call out new assets or project slugs explicitly.
