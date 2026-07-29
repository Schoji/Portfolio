import type { ComponentType } from "react";
import type { FaqItem } from "../prose";
import SteBody, {
  faq as steFaq,
  toc as steToc,
} from "./plain-english-vs-asd-ste100";
import MouseBody, {
  faq as mouseFaq,
  toc as mouseToc,
} from "./deathadder-essential-shell-transplant";

export type TocEntry = { id: string; label: string };

/**
 * Post bodies live here, one module per slug. Metadata stays in `posts.ts`.
 * Each module default-exports the body and may export a `toc` for the sidebar
 * and a `faq` — the same array renders on the page and becomes `FAQPage`
 * structured data, so the two cannot disagree.
 *
 * The bodies are server components (only `comparison.tsx` inside them is a
 * client component), so this map is only ever read on the server — never pass
 * an entry across a Server→Client boundary.
 */
export const postContent: Record<
  string,
  { Body: ComponentType; toc?: TocEntry[]; faq?: FaqItem[] }
> = {
  "plain-english-vs-asd-ste100": { Body: SteBody, toc: steToc, faq: steFaq },
  "deathadder-essential-shell-transplant": {
    Body: MouseBody,
    toc: mouseToc,
    faq: mouseFaq,
  },
};
