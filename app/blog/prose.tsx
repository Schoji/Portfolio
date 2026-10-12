import Image from "next/image";
import { Check, X } from "lucide-react";
import type { ElementType, ReactNode } from "react";

/**
 * Hand-rolled prose primitives for blog posts. The project has no MDX and no
 * @tailwindcss/typography, so post bodies compose these instead of raw tags,
 * which keeps every post on the same rhythm. They render inside the v2 shell:
 * Bricolage for headings, Geist for text, white at reduced opacity for body
 * copy, dark #1C1C1E blocks for asides. All of these are server-safe (no hooks).
 */

/** Big opening paragraph, one per post. */
export function Lead({ children }: { children: ReactNode }) {
  return (
<p className="t-lead text-white">{children}</p>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="t-body text-[18px] leading-[1.6] text-white/72">{children}</p>;
}

/**
 * A titled block. `id` is the TOC anchor target.
 */
export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display t-title">{title}</h2>
      <div className="mt-6 flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display mt-2 text-[24px] leading-[1.15] tracking-[-0.02em] text-white">
      {children}
    </h3>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-3">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="t-body flex gap-3.5 text-[18px] leading-[1.6] text-white/72">
      <span aria-hidden className="mt-[11px] block size-1.5 shrink-0 rounded-full bg-white/45" />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

/** Numbered steps — used for the self-check list. */
export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3.5">
          <span className="t-numeral mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-white/12 text-[13px] text-white">
            {i + 1}
          </span>
          <span className="t-body min-w-0 text-[18px] leading-[1.6] text-white/72">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Inline code: a quiet chip, not a second typeface fighting the text. */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.86em] text-white">
      {children}
    </code>
  );
}

export function A({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/.test(href);
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : undefined)}
      className="text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
    >
      {children}
    </a>
  );
}

/** Aside box — history, caveats, sources. */
export function Callout({
  icon: Icon,
  title,
  children,
}: {
  icon?: ElementType;
  title?: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[24px] bg-[var(--bg-elevated)] p-6 md:p-7">
      {title && (
        <p className="t-button flex items-center gap-2.5 text-white">
          {Icon && <Icon size={18} className="shrink-0 text-white/60" />}
          {title}
        </p>
      )}
      <div className="t-body mt-3 flex flex-col gap-3 text-white/72">
        {children}
      </div>
    </div>
  );
}

/** Pull quote. */
export function Quote({
  children,
  cite,
}: {
  children: ReactNode;
  cite?: string;
}) {
  return (
    <blockquote className="font-display border-l-2 border-white/25 pl-6 text-[clamp(22px,2vw,28px)] leading-[1.25] tracking-[-0.015em] text-white">
      {children}
      {cite && (
        <footer className="t-label mt-3 font-[family-name:var(--font-geist)] text-[color:var(--text-secondary)]">
          {cite}
        </footer>
      )}
    </blockquote>
  );
}

export type Rule = {
  /** Rule family: Words, Verbs, Sentences, Punctuation, Structure. */
  group: string;
  rule: string;
  avoid: string;
  use: string;
};

/**
 * The rules reference. A real <table> is unreadable on a phone, so each rule
 * is a card with an avoid/use pair.
 */
export function RuleTable({ rules }: { rules: Rule[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {rules.map((r) => (
        <div key={r.rule} className="flex flex-col gap-4 rounded-[20px] bg-[var(--bg-elevated)] p-5">
          <div className="flex flex-col gap-1">
            <p className="t-body font-medium text-white">{r.rule}</p>
            <span className="t-label text-[color:var(--text-secondary)]">{r.group}</span>
          </div>
          <div className="t-label flex flex-col gap-2 border-t border-white/10 pt-4 font-normal">
            <p className="flex gap-2 text-white/60">
              <X size={15} aria-label="Avoid" className="mt-[2px] shrink-0 text-[color:var(--seg-clay)]" />
              <span>{r.avoid}</span>
            </p>
            <p className="flex gap-2 text-white">
              <Check size={15} aria-label="Use" className="mt-[2px] shrink-0 text-[color:var(--seg-sage)]" />
              <span>{r.use}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A photo with a caption. Sizes assume the post's single-column width. */
export function Figure({
  src,
  alt,
  caption,
  width = 1600,
  height = 1200,
  priority,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <figure className="flex flex-col gap-2">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 720px"
        className="w-full rounded-[20px]"
      />
      {caption && (
        <figcaption className="t-label font-normal text-[color:var(--text-secondary)]">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Small data table. Scrolls inside itself rather than widening the page. */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-[20px] bg-[var(--bg-elevated)]">
      <table className="t-label w-full text-left font-normal">
        <thead>
          <tr className="border-b border-white/10">
            {head.map((h) => (
              <th key={h} className="px-5 py-3.5 font-medium text-[color:var(--text-secondary)]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-white/[0.06] last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "whitespace-nowrap px-5 py-3.5 font-medium text-white"
                      : "px-5 py-3.5 text-white/72"
                  }
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Question/answer pairs. Answers are plain strings on purpose: the same array
 * feeds the `FAQPage` JSON-LD on the post page, so the visible text and the
 * structured data can never drift apart.
 */
export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <div key={item.q} className="py-6">
          <h3 className="t-button text-[18px] text-white">{item.q}</h3>
          <p className="t-body mt-2 text-white/72">{item.a}</p>
        </div>
      ))}
    </div>
  );
}

/** Numbers row — word counts, sentence lengths, whatever a post measures. */
export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-1 rounded-[20px] bg-[var(--bg-elevated)] p-5">
          <span className="t-numeral text-[36px] leading-none tracking-[-0.03em] text-white">{s.value}</span>
          <span className="t-label font-normal text-[color:var(--text-secondary)]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
