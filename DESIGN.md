---
version: draft-2
name: Portfolio v2 — Black segments
description: "Pure black canvas with large, rounded, single-colour segments arranged like iOS cards. Minimal chrome, one idea per screen, colour only where it carries meaning. Bricolage Grotesque for headlines, Geist for everything else."
status: "Implemented sitewide (app/_v2): home, /projects, project pages, blog, 404 and error. Project pages and the blog were designed in code, not in Figma."
figma:
  file: "Untitled (Figwright plugin session)"
  page: "v2 — Black segments"

colors:
  bg-black: "#000000"          # page background, always pure black
  bg-elevated: "#1C1C1E"       # dark segments, nav pill (iOS secondarySystemBackground)
  bg-elevated-2: "#2C2C2E"     # chips/thumbs inside dark segments
  text-primary: "#FFFFFF"
  text-secondary: "#8E8E93"    # iOS gray; labels and meta on dark
  seg-paper: "#F2F2F0"         # light segment (hero)
  seg-clay: "#D9734E"          # Plan PM / mobile
  seg-lilac: "#A98BEA"         # A.L.E.K.S.Y, SoundNest / desktop
  seg-butter: "#F4D46B"        # Linder, GitHub activity / hardware
  seg-sage: "#C6E7A2"          # About stats, NavigatorPM / web

typography:
  display:   { family: "Bricolage Grotesque", weight: 600, size: 128-152, lineHeight: 0.92, tracking: -4% }
  title:     { family: "Bricolage Grotesque", weight: 600, size: 40,      lineHeight: 1.05, tracking: -2.5% }
  lead:      { family: "Geist", weight: 400, size: 24, lineHeight: 1.40, tracking: -1% }
  body:      { family: "Geist", weight: 400, size: 17, lineHeight: 1.45, tracking: -0.5% }
  label:     { family: "Geist", weight: 500, size: 14, lineHeight: 1.30 }
  button:    { family: "Geist", weight: 550, size: 16, lineHeight: 1.20 }
  tag:       { family: "Geist", weight: 500, size: 13, lineHeight: 1.20 }
  numerals:  { family: "Geist", weight: 500, note: "All big numbers use Geist, never Bricolage" }

radius:
  segment: 32
  tile: 24
  inner-thumb: 16-20
  pill: 9999
  tag: 8

spacing:
  page-max-width: 1280
  page-gutter: "clamp(16px, 5vw, 96px)"   # 80px each side at 1440
  segment-gap: 8
  segment-padding: 56 (large) / 40 (narrow) / 28 (tiles)
---

# Portfolio v2 — design notes

Audience: recruiters (the site is a CV companion). Goal: a "wow" first impression without the
cluttered, templated look of most developer portfolios.

## Core idea

- **Pure black page (`#000`)** with large, rounded, colour-block segments sitting 8 px apart,
  like cards in an iOS app.
- **One idea per screen.** Each section fits one 1440×900 viewport and is built from **1–2
  segments**. If a screen has more than one strong element, it reads as overwhelming.
- **Colour is rationed.** At most one pastel segment per screen besides paper white. Colour
  appears progressively as the visitor scrolls rather than all at once.
- **Content sits in a 1280 px container** with side margins (80 px at 1440).

## Segment anatomy (applies everywhere)

Every segment follows the same structure so empty space always means the same thing:

1. **Top: title block** — heading, then lead, then meta. Order always goes large → small.
   Never put a small label *above* a huge heading (small → LARGE → small reads as broken).
2. **Bottom: footer** — separated by a 1 px hairline (black or white at 10–15 %). Holds facts,
   tags or actions.
3. Space between top and bottom is intentional and consistent; avoid `space-between` layouts
   that leave a lone label stranded in a corner.

## Typography rules

- Two families with clearly separate jobs: **Bricolage Grotesque** (headlines, has character)
  and **Geist** (lead, body, labels, buttons, tags). Using two faces is what fixed text
  "blending together".
- **Numbers always in Geist.** Bricolage numerals look poor at display sizes (e.g. "17").
- One display-size heading per screen.
- Secondary text inside a sentence (e.g. "Mostly Flutter, Next.js and Python.") at ≥ 55 %
  opacity — 38 % was too faint.

## Components

### Navbar (approved — keep as is)
Round white "PW" logo, nav links in a dark `#1C1C1E` pill (active item white, others gray),
white "Get in touch" pill on the right. No arrows in button labels.

### Technology tags
- Each technology tag carries its brand logo (Simple Icons) and is tinted with the brand colour:
  border at 38 %, fill at 9 %, logo at full colour, text white. Dark brand colours are lifted to
  stay readable. The map lives in `app/_v2/tech.ts`; unknown names fall back to the plain tag.

### Buttons vs tags (must never look alike)
- **Buttons:** 52 px tall pills, filled. Primary = white with black text. Secondary = white
  12 % fill with an icon (GitHub / Apple / Google Play from `react-icons/si`).
- **Tags:** 13 px text, small 8 px-radius rectangles with a 1 px outline, no fill, preceded by a
  gray "Built with" label. Different size, shape and fill from buttons.

### Device presentation
- Devices are objects placed on a coloured card and **bleed off the card's bottom edge**
  (only top corners visible), with a soft tinted drop shadow. This hides the radius mismatch
  between device and segment.
- Window chrome for desktop/web: macOS-style title bar with traffic lights.
- Do **not** crop a landscape window off the left/right side — it looks like a mistake.

## Screens

| # | Screen | Layout | Status |
|---|--------|--------|--------|
| 01 | Hero | Three bentos: paper segment ("Hi, I'm Piotr." + lead, footer: See my work / Download CV) + smaller portrait (top right) + dark facts tile (bottom right: Szczecin, Politechnika Morska, project count) | Built (changed in code: the full-height portrait was too dominant) |
| 02 | About | Dark segment (quote + lead, footer "Tools I reach for first" tags) + sage segment ("18 projects since 2022", breakdown 7 web / 4 mobile / 3 desktop / 3 hardware / 1 game) | Approved |
| 03a | Project — mobile | Clay segment with one phone bleeding off the bottom (left, 500 px) + dark info segment (tabs 01/05, title, lead, meta, footer tags + buttons) | Approved — Plan PM stays in this layout |
| 03b | Project — landscape (desktop/web) | Full-width coloured "stage" with one large window bleeding off the bottom + dark info bar below (title 64 px + meta + tags left, lead + buttons right) | Mostly OK, "something is slightly off" — revisit |
| 04 | GitHub | Dark segment (headline, 4 real stats, 26-week contribution heatmap in butter ramp, "Open GitHub profile") + butter segment "Where the commits went" (bar chart per repo) | Approved |
| 05 | Contact | Lilac segment ("Let's talk.", lead, email + Write an email / Copy address) + row of 4 dark tiles: LinkedIn, GitHub, Discord (Copy), Facebook | Approved |
| 06 | More projects | Replaced by a dark band after the featured screens ("13 more projects" + "See all 18 projects") linking to `/projects`: a filterable list, one row per project with a thumbnail on its kind colour | Built, not reviewed in Figma |

### Featured projects
- The pinned, scroll-driven sequence was built and then **dropped**: it felt like scroll hijacking.
  Each featured project is now its own screen in normal scroll, with the tab row (01/05 …) as
  links between them. The counter follows the current featured count (01/05).
- Featured set (chosen in the project picker): Plan PM, Until Done, Linder,
  A.L.E.K.S.Y v2, GCodec. Mobile apps use layout 03a, the rest use the stage layout.
- Linder uses fresh captures of its TUXEDO OS, deepin and PureOS profiles, layered
  as a deck on the lilac stage with perspective, reflections and shadows.
- Every bento grows into place as it enters the viewport (96% → 100%, small rise, short
  stagger); devices slide up after their segment lands. Content stays visible without JS and
  under `prefers-reduced-motion`.

- GCodec uses a transparent 2400px Benchy render generated from actual G-code
  toolpaths, floating above a tilted viewer grid on a graphite stage. Bright,
  dense green extrusion and blue travel paths retain the app's visual character. The original
  screenshot stays in the case study. `scripts/render-gcodec-benchy.py` creates
  the projected toolpaths; the featured image preserves the green/blue/red key.

### Stack overview on /projects
- Above the list: a **Languages** donut (each public repo I own or committed to counts once,
  under its primary language, live from GitHub; top languages + Other; categorical slots validated
  for the dark segment) beside **Most used** (technologies by number of projects, from
  projects.ts, as bars with their logo tags). Byte-based language stats stay rejected.

### Remaining projects
- Not all on the home page: the featured five get screens, the rest live on `/projects` with
  filters by kind (web / mobile / desktop / hardware / game).
- Kind colours: clay = mobile, sage = web, lilac = desktop, butter = hardware, paper = game
  (used for filter dots and highlight icons).
- Every row on `/projects` has an **editorial cover** in the project's own palette: name with an
  icon, real screens tilted on a tinted ground and one project-specific detail. No feature-label
  chips: they read as filler. Data in `app/_v2/covers.ts`.
- Cover hover (also on keyboard focus): phones fan apart, windows and photos straighten and lift,
  screens zoom in slightly the corner glow grows and the icon tilts. Out-expo
  easing, ~650 ms; off under reduced motion.

### Project pages (`/projects/[slug]`)
- **Not a copy of the home screens.** A first version reused the home layout (visual segment +
  info panel in one viewport); it read as recycled and was dropped. The page keeps the old site's
  structure, redrawn in v2 type and colour.
- **Hero**: breadcrumb (Projects > title), big title, tagline and buttons on the left; the hero
  image on the right (mobile apps: up to three phones, the middle one in front; software: first
  screenshot in a window; hardware: first photo). Behind it, a blurred wash of the same image.
  Projects with `heroBackground` use that photo as the backdrop instead and skip the image.
- **Body**: description, backstory, problems along the way, takeaways and highlights in one text
  column, each block opened by a hairline; beside it a sticky dark card with the "Built with" tags
  and the facts (platform, year, status, role).
- Then demo video, screenshots (phones in portrait tiles, the rest at their real ratio, fullscreen
  viewer), Sortra's paper download block, and previous / next.

### Blog
- Index mirrors `/projects`: big title, lead, RSS button, one dark row per post (cover left).
- Post: cover first in its own segment, then the title block on **paper** (back link, title, deck;
  footer: author, date, reading time, tags), then the text directly on black (max 760px) with the contents in a
  sticky dark segment. The closing "Disagree with any of this?" segment is lilac.
- Prose: Bricolage for section titles and quotes, Geist 18px / 1.6 for body at 72% white,
  asides and tables as `#1C1C1E` blocks. In the ASD-STE100 comparison, clay marks the draft and its
  flagged phrases, sage marks the STE side.
- Reading progress: a thin white line along the top edge of the window.

### 404 / error
- One paper segment: the code in Geist numerals, a headline, a line of help, two buttons.

### Social cards
- Blog OG images use the paper segment inset on black, black text, no accent colour.

## Data and content rules

- **No invented facts or AI-sounding filler.** E.g. "pulled live from GitHub" was removed.
- Contact tiles: icon discs use each platform's brand colour (GitHub stays white). The tiles
  still feel empty; content for them is an open item.
- GitHub numbers come from the GraphQL API for user `Schoji` (last 12 months at time of
  design: 746 contributions, 618 commits, 104 pull requests, 23 repositories; top repos by
  commits: plan_pm 271, hubmi.pl 49, Linder 42, kni-site 40, voice-assistant 31). In code these
  must be fetched live, not hard-coded.
- Language breakdown by bytes was rejected as misleading (vendored JS, Unity C#).
- Avoid template tells: middle-dot meta strings ("A · B · C"), arrows appended to buttons,
  all-caps eyebrows, monospace labels, numbered markers for non-sequences.

## Assets

- Plan PM: dark-mode screenshots of the redesigned app (`feature/ui-redesign`), taken in the iOS
  Simulator (iPhone 17 Pro, 1206×2622) on real timetable data. Avoid screens that show a real
  lecturer's name (the expanded class card). The two floating class cards on the home screen are
  crops of `public/plan_pm/lectures.webp`.
- Other project images come from `public/` (convert `.webp` to PNG for Figma).
- "Download CV" requires a CV PDF that does not exist yet.
