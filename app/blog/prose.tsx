import Image from "next/image";
import type { ElementType, ReactNode } from "react";

/**
 * Hand-rolled prose primitives for blog posts. The project has no MDX and no
 * @tailwindcss/typography, so post bodies compose these instead of raw tags —
 * that keeps every post on the same rhythm and the same zinc/cyan palette.
 * All of these are server-safe (no hooks).
 */

const ACCENT = "var(--accent)";
const ACCENT_BORDER = "rgb(var(--accent-rgb) / 0.5)";

/** Big opening paragraph, one per post. */
export function Lead({ children }: { children: ReactNode }) {
  return (
    <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
      {children}
    </p>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="leading-relaxed text-zinc-400">{children}</p>;
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
    <section id={id} className="scroll-mt-24">
      <h2 className="text-2xl font-bold text-white md:text-3xl">
        {title}
      </h2>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-2 text-lg font-bold text-zinc-100 md:text-xl">
      {children}
    </h3>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2.5">{children}</ul>;
}

export function LI({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 leading-relaxed text-zinc-400">
      <span aria-hidden className="mt-2.5 shrink-0" style={{ color: ACCENT }}>
        <span className="block h-1.5 w-1.5 rounded-full bg-current" />
      </span>
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
          <span
            className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold"
            style={{ borderColor: ACCENT_BORDER, color: ACCENT }}
          >
            {i + 1}
          </span>
          <span className="min-w-0 leading-relaxed text-zinc-400">{item}</span>
        </li>
      ))}
    </ol>
  );
}

/** Inline monospace. Space Grotesk is the mono face here, so add a tint. */
export function C({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-zinc-800 bg-zinc-900/70 px-1.5 py-0.5 text-[0.9em] text-zinc-200">
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
      className="underline decoration-[rgb(var(--accent-rgb)/0.4)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
      style={{ color: ACCENT }}
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
    <div className="hover-glow rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 md:p-6">
      {title && (
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-zinc-300">
          {Icon && <Icon size={16} style={{ color: ACCENT }} />}
          {title}
        </p>
      )}
      <div className="mt-3 flex flex-col gap-3 text-sm leading-relaxed text-zinc-400 md:text-base">
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
    <blockquote
      className="border-l-2 pl-5 text-lg italic leading-relaxed text-zinc-300 md:text-xl"
      style={{ borderColor: ACCENT_BORDER }}
    >
      {children}
      {cite && (
        <footer className="mt-2 text-sm not-italic text-[var(--text-muted)]">
          — {cite}
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
        <div
          key={r.rule}
          className="hover-glow flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 p-4"
        >
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {r.group}
            </span>
            <p className="mt-1 font-semibold leading-snug text-zinc-100">
              {r.rule}
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-sm">
            <p className="text-rose-300/80">
              <span className="font-mono text-xs text-rose-400/70">✗ </span>
              {r.avoid}
            </p>
            <p className="text-[var(--accent-light)]">
              <span className="font-mono text-xs text-[rgb(var(--accent-rgb)/0.7)]">✓ </span>
              {r.use}
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
        className="w-full rounded-2xl border border-zinc-800"
      />
      {caption && (
        <figcaption className="text-sm text-[var(--text-muted)]">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Small data table. Scrolls inside itself rather than widening the page. */
export function Table({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800 bg-zinc-900/40">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-800">
            {head.map((h) => (
              <th
                key={h}
                className="px-4 py-3 font-mono text-xs uppercase tracking-[0.15em] text-[var(--text-muted)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-zinc-800/60 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={
                    j === 0
                      ? "whitespace-nowrap px-4 py-3 font-semibold text-zinc-200"
                      : "px-4 py-3 text-zinc-400"
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
    <div className="flex flex-col divide-y divide-zinc-800 border-y border-zinc-800">
      {items.map((item) => (
        <div key={item.q} className="py-5">
          <h3 className="font-bold leading-snug text-zinc-100 md:text-lg">
            {item.q}
          </h3>
          <p className="mt-2 leading-relaxed text-zinc-400">{item.a}</p>
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
    <div className="grid grid-cols-2 gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1">
          <span
            className="text-2xl font-bold md:text-3xl"
            style={{
              color: ACCENT,
              textShadow: "0 0 20px rgb(var(--accent-rgb) / calc(0.4 * var(--glow-strength)))",
            }}
          >
            {s.value}
          </span>
          <span className="text-center text-xs text-[var(--text-muted)]">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
