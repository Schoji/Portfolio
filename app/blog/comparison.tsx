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

const ACCENT = "var(--accent)";

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
        className="rounded bg-rose-500/20 px-1 text-rose-200 decoration-rose-400/60 decoration-wavy underline-offset-4"
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
    <div
      className="flex min-w-0 flex-col rounded-2xl border p-5"
      style={{
        borderColor: ste ? "rgb(var(--accent-rgb) / 0.35)" : "rgba(244,63,94,0.28)",
        background: ste ? "rgb(var(--accent-rgb) / 0.04)" : "rgba(244,63,94,0.04)",
      }}
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-zinc-800/80 pb-3">
        <span
          className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
          style={{ color: ste ? "var(--accent-light)" : "#fda4af" }}
        >
          {title}
        </span>
        <span className="shrink-0 font-mono text-xs text-[var(--text-muted)]">
          {words}w · longest {longest}
        </span>
      </div>

      {prefix && (
        <p className="mt-4 font-semibold leading-relaxed text-amber-200/90">
          {prefix}
        </p>
      )}

      {asSteps ? (
        <ol className="mt-4 flex flex-col gap-2">
          {paragraphs.map((p, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-zinc-300">
              <span className="font-mono text-sm text-[var(--text-muted)]">{i + 1}.</span>
              <span className="min-w-0">{p}</span>
            </li>
          ))}
        </ol>
      ) : (
        <div className="mt-4 flex flex-col gap-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="leading-relaxed text-zinc-300">
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
        <p className="text-sm text-[var(--text-muted)]">
          {examples.length} texts, same job, two styles.
        </p>
        <button
          type="button"
          onClick={() => setHighlight((h) => !h)}
          aria-pressed={highlight}
          className="flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-colors"
          style={{
            borderColor: highlight ? "rgb(var(--accent-rgb) / 0.5)" : "#3f3f46",
            color: highlight ? ACCENT : "#a1a1aa",
          }}
        >
          <Highlighter size={14} />
          {highlight ? "Hide" : "Show"} the {flagCount} flagged phrases
        </button>
      </div>

      {examples.map((example) => (
        <article
          key={example.id}
          id={example.id}
          className="scroll-mt-24 flex flex-col gap-4"
        >
          <div>
            <h3 className="text-lg font-bold text-white md:text-xl">
              {example.label}
            </h3>
            <p className="mt-1 max-w-[72ch] text-sm leading-relaxed text-[var(--text-muted)]">
              {example.context}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
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

          <p className="max-w-[72ch] text-sm leading-relaxed text-zinc-400">
            <span
              className="font-mono text-xs uppercase tracking-[0.15em]"
              style={{ color: ACCENT }}
            >
              What changed:{" "}
            </span>
            {example.note}
          </p>
        </article>
      ))}
    </div>
  );
}
