export type BlogPost = {
  slug: string;
  title: string;
  /** SEO <title> (~50–60 chars, keyword-first). Falls back to `title`. */
  seoTitle?: string;
  /** Deck shown under the title on the post and on the index card. */
  description: string;
  /** SEO meta description (70–155 chars). Falls back to `description`. */
  seoDescription?: string;
  /** ISO publish date, `YYYY-MM-DD`. */
  date: string;
  /** ISO date of the last meaningful edit, if any. */
  updated?: string;
  /** Human reading estimate, e.g. "9 min read". */
  readingTime: string;
  tags: string[];
  /**
   * Optional image in /public (e.g. `/blog/my-post.webp`). Rendered as the
   * post's cover and used for the OG/Twitter card instead of the generated
   * one. Only put a file here that you own or are licensed to publish.
   */
  cover?: string;
  /** Alt text for `cover`. Falls back to the title. */
  coverAlt?: string;
  /** Attribution line shown under the cover, e.g. "Photo: Name (license)". */
  coverCredit?: string;
  /**
   * Unfinished post. Still built (so the URL works for review) but hidden
   * from the index in production builds and marked `noindex`.
   */
  draft?: boolean;
};

export const posts: BlogPost[] = [
  {
    slug: "deathadder-essential-shell-transplant",
    title: "I gave a dead DeathAdder a 3D-printed body",
    seoTitle: "DeathAdder Essential 3D-Printed Shell Transplant",
    description:
      "A friend's DeathAdder Elite transplant failed, so I inherited the Essential's electronics and built a new shell around them in Rhino. It works, it is a design war crime, and every fault is documented on purpose.",
    seoDescription:
      "How I designed a custom 3D-printed shell around Razer DeathAdder Essential internals in Rhino — the constraints, the bill of materials, and every fault in the build.",
    date: "2026-07-28",
    readingTime: "7 min read",
    tags: ["3D Printing", "Rhino", "Hardware", "Mods"],
    cover: "/blog/deathadder/cover.webp",
    coverAlt:
      "The printed mouse shell, base plate, buttons, PCB and screws laid out on a table",
  },
  {
    slug: "plain-english-vs-asd-ste100",
    title: "A typical draft vs ASD-STE100",
    seoTitle: "ASD-STE100 by Example: Rules, Rewrites and Limits",
    description:
      "Five ordinary engineering drafts rewritten under ASD-STE100 Simplified Technical English, with the rule numbers from Issue 9 — what the aerospace standard actually fixes, what it permits, and where I go past it.",
    seoDescription:
      "ASD-STE100 Simplified Technical English compared side by side with ordinary drafts across READMEs, error messages, procedures and API docs, with Issue 9 rule numbers and how it differs from plain language.",
    date: "2026-07-28",
    readingTime: "9 min read",
    tags: ["Writing", "ASD-STE100", "Technical Docs", "AI"],
    cover: "/blog/plain-english-vs-asd-ste100-cover.webp",
    coverAlt:
      "An illustration of a thick manual seen on its fore-edge with four coloured index tabs, next to the words ASD-STE100 Simplified Technical English",
  },
];

/** Newest first — what the index renders. Drafts are hidden once deployed. */
export const listedPosts = posts
  .filter((p) => !p.draft || process.env.NODE_ENV !== "production")
  .sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/** "2026-07-28" → "28 July 2026" (locale-independent, no hydration drift). */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
