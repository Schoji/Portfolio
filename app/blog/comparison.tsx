"use client";
import { useMemo, useState } from "react";
import { Highlighter } from "lucide-react";

/**
 * The centerpiece of the ASD-STE100 post: an unedited draft on the left, the
 * STE rewrite on the right, with the mechanical problems in the left column
 * highlighted. The left panel is deliberately labelled "Typical draft", not
 * "Plain English" — plain language is a third thing and the post says so.
 * `flags` are literal substrings, so post data never contains a regex.
 */
export type ComparisonExample = {
  id: string;
  /** Kind of text: "README intro", "Error message", … */
  label: string;
  /** One line of setup: what this text has to do. */
  context: string;
  /** Paragraphs (or list items) of the unedited draft. */
  plain: string[];
  /** Paragraphs (or list items) of the STE version. */
  ste: string[];
  /** Literal substrings in `plain` to mark as slop. */
  flags?: string[];
  /** Render the STE side as a numbered list (procedures). */
  steAsSteps?: boolean;
  /** Line above the STE steps — a warning belongs before the hazard, not in step 1. */
  stePrefix?: string;
  /** What the rewrite actually changed, and what it cost. */
  note: string;
};

function wordCount(paragraphs: string[]): number {
  const words = paragraphs.join(" ").trim().split(/\s+/);
  return words[0] === "" ? 0 : words.length;
}

/** Longest sentence in words — the number STE caps at 20/25. */
function longestSentence(paragraphs: string[]): number {
  return paragraphs
    .join(" ")
    .split(/(?<=[.!?])\s+/)
    .reduce((max, s) => {
      const n = s.trim() ? s.trim().split(/\s+/).length : 0;
      return Math.max(max, n);
    }, 0);
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Split a paragraph on the flagged substrings and wrap the matches. */
function markSlop(text: string, flags: string[]) {
  if (flags.length === 0) return text;
  const pattern = new RegExp(
    `(${flags.map(escapeRegExp).sort((a, b) => b.length - a.length).join("|")})`,
    "gi",
  );
  return text.split(pattern).map((part, i) =>
    flags.some((f) => f.toLowerCase() === part.toLowerCase()) ? (
      <mark
        key={i}
        className="rounded bg-[color:var(--seg-clay)]/25 px-1 text-white decoration-[color:var(--seg-clay)] decoration-wavy underline-offset-4"
        style={{ textDecorationLine: "underline" }}
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function Panel({
  variant,
  title,
  paragraphs,
  flags,
  asSteps,
  prefix,
}: {
  variant: "plain" | "ste";
  title: string;
  paragraphs: string[];
  flags: string[];
  asSteps?: boolean;
  prefix?: string;
}) {
  const ste = variant === "ste";
  const all = prefix ? [prefix, ...paragraphs] : paragraphs;
  const words = wordCount(all);
  const longest = longestSentence(all);

  return (
    <div className="flex min-w-0 flex-col rounded-[20px] bg-[var(--bg-elevated)] p-5 md:p-6">
      <div className="flex flex-col gap-1 border-b border-white/10 pb-3">
        <span className="t-label flex items-center gap-2 text-white">
          <span aria-hidden className="size-2 rounded-full" style={{ background: ste ? "var(--seg-sage)" : "var(--seg-clay)" }} />
          {title}
        </span>
        <span className="t-label t-numeral font-normal text-[color:var(--text-secondary)]">
          {words} words, longest sentence {longest}
        </span>
      </div>

      {prefix && (
        <p className="t-body mt-4 font-medium text-[color:var(--seg-butter)]">
          {prefix}
        </p>
      )}

      {asSteps ? (
        <ol className="mt-4 flex flex-col gap-2">
          {paragraphs.map((p, i) => (
            <li key={i} className="t-body flex gap-3 text-white/80">
              <span className="t-numeral text-[color:var(--text-secondary)]">{i + 1}.</span>
              <span className="min-w-0">{p}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="t-body text-white/80">
              {ste ? p : markSlop(p, flags)}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comparison({
  examples,
}: {
  examples: ComparisonExample[];
}) {
  const [highlight, setHighlight] = useState(true);
  const flagCount = useMemo(
    () => examples.reduce((n, e) => n + (e.flags?.length ?? 0), 0),
    [examples],
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="t-label font-normal text-[color:var(--text-secondary)]">
          {examples.length} texts, same job, two styles.
        </p>
        <button
          type="button"
          onClick={() => setHighlight((h) => !h)}
          aria-pressed={highlight}
          className={`t-nav inline-flex min-h-11 items-center gap-2 rounded-full px-5 transition-colors ${
            highlight ? "bg-white text-black hover:bg-white/90" : "bg-white/12 text-white hover:bg-white/20"
          }`}
        >
          <Highlighter size={14} />
          {highlight ? "Hide" : "Show"} the {flagCount} flagged phrases
        </button>
      </div>

      {examples.map((example) => (
        <article
          key={example.id}
          id={example.id}
          className="scroll-mt-28 flex flex-col gap-4"
        >
          <div>
            <h3 className="font-display text-[24px] leading-[1.15] tracking-[-0.02em] text-white">
              {example.label}
            </h3>
            <p className="t-body mt-1 max-w-[72ch] text-[color:var(--text-secondary)]">
              {example.context}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-2 lg:grid-cols-2">
            <Panel
              variant="plain"
              title="Typical draft"
              paragraphs={example.plain}
              flags={highlight ? (example.flags ?? []) : []}
            />
            <Panel
              variant="ste"
              title="ASD-STE100"
              paragraphs={example.ste}
              flags={[]}
              asSteps={example.steAsSteps}
              prefix={example.stePrefix}
            />
          </div>

          <p className="t-body max-w-[72ch] text-white/72">
            <span className="font-medium text-white">What changed: </span>
            {example.note}
          </p>
        </article>
      ))}
    </div>
  );
}
