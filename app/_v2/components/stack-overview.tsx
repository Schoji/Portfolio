"use client";

import { useState } from "react";
import type { LanguageShare } from "../github";
import { Segment } from "./segment";
import { TechTag } from "./ui";

// Categorical slots, dark steps (validated on #1C1C1E: lightness band, chroma,
// CVD ΔE ≥ 8 between neighbours, contrast ≥ 3:1). Fixed order, never cycled;
// anything past slot 5 folds into "Other".
const SLOTS = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181"];
const OTHER = "#5a5a5f";
const MAX_SLICES = 4;

type Slice = { name: string; repos: number; color: string; detail?: string };

function slices(languages: LanguageShare[]): Slice[] {
  const top = languages.slice(0, MAX_SLICES).filter((l) => l.repos > 1);
  const rest = languages.slice(top.length);
  const out: Slice[] = top.map((l, i) => ({ ...l, color: SLOTS[i] }));
  if (rest.length) {
    out.push({
      name: "Other",
      repos: rest.reduce((n, l) => n + l.repos, 0),
      color: OTHER,
      detail: rest.map((l) => l.name).join(", "),
    });
  }
  return out;
}

/** Donut arcs with a 2px surface gap between segments. */
function Donut({ data, total, active, onActive }: { data: Slice[]; total: number; active: string | null; onActive: (n: string | null) => void }) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const gap = data.length > 1 ? 3 : 0;
  // Where each arc starts along the circle: the sum of the arcs before it.
  const starts = data.map((_, i) => data.slice(0, i).reduce((n, s) => n + (s.repos / total) * c, 0));
  return (
    <svg viewBox="0 0 180 180" className="size-[180px] shrink-0 -rotate-90 lg:size-[200px]" role="img" aria-label="Languages by repository count">
      {data.map((s, i) => {
        const len = (s.repos / total) * c;
        const dash = `${Math.max(len - gap, 0.5)} ${c}`;
        return (
          <circle
            key={s.name}
            cx="90"
            cy="90"
            r={r}
            fill="none"
            stroke={s.color}
            strokeWidth={active === s.name ? 26 : 22}
            strokeDasharray={dash}
            strokeDashoffset={-starts[i]}
            opacity={active && active !== s.name ? 0.35 : 1}
            className="cursor-default transition-[opacity,stroke-width] duration-200"
            onMouseEnter={() => onActive(s.name)}
            onMouseLeave={() => onActive(null)}
          >
            <title>{`${s.name}: ${s.repos} ${s.repos === 1 ? "repository" : "repositories"}${s.detail ? ` (${s.detail})` : ""}`}</title>
          </circle>
        );
      })}
    </svg>
  );
}

export default function StackOverview({
  languages,
  repos,
  technologies,
  projectCount,
}: {
  languages: LanguageShare[] | null;
  repos: number;
  technologies: { name: string; projects: number }[];
  projectCount: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const data = languages ? slices(languages) : [];
  const total = data.reduce((n, s) => n + s.repos, 0);
  const maxTech = Math.max(1, ...technologies.map((t) => t.projects));

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      {data.length > 0 && (
        <Segment className="flex flex-col gap-8 bg-[var(--bg-elevated)] px-7 py-8 lg:w-[calc(50%-4px)] lg:px-10 lg:py-10">
          <div className="flex flex-col gap-2">
            <h2 className="font-display t-tile">Languages</h2>
            <p className="t-label font-normal text-[color:var(--text-secondary)]">
              Main language of each of the {repos} public repositories I own or have committed to, live from GitHub.
            </p>
          </div>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
            <div className="relative">
              <Donut data={data} total={total} active={active} onActive={setActive} />
              <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
                <div>
                  <p className="t-numeral text-[40px] leading-none tracking-[-0.03em]">
                    {active ? data.find((s) => s.name === active)?.repos : repos}
                  </p>
                  <p className="t-label mt-1 font-normal text-[color:var(--text-secondary)]">{active ?? "repositories"}</p>
                </div>
              </div>
            </div>
            <ul className="flex w-full flex-col">
              {data.map((s) => (
                <li
                  key={s.name}
                  onMouseEnter={() => setActive(s.name)}
                  onMouseLeave={() => setActive(null)}
                  className={`flex items-baseline gap-3 border-t border-white/10 py-2.5 transition-opacity first:border-t-0 ${
                    active && active !== s.name ? "opacity-40" : ""
                  }`}
                >
                  <span aria-hidden className="size-2.5 shrink-0 translate-y-[1px] rounded-full" style={{ background: s.color }} />
                  <span className="min-w-0 flex-1">
                    <span className="t-body text-white">{s.name}</span>
                    {s.detail && <span className="t-label block font-normal text-[color:var(--text-secondary)]">{s.detail}</span>}
                  </span>
                  <span className="t-body t-numeral text-white">{s.repos}</span>
                  <span className="t-label t-numeral w-10 text-right font-normal text-[color:var(--text-secondary)]">
                    {Math.round((s.repos / total) * 100)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Segment>
      )}

      <Segment delay={0.08} className="flex min-w-0 flex-1 flex-col gap-8 bg-[var(--bg-elevated)] px-7 py-8 lg:px-10 lg:py-10">
        <div className="flex flex-col gap-2">
          <h2 className="font-display t-tile">Most used</h2>
          <p className="t-label font-normal text-[color:var(--text-secondary)]">
            How many of these {projectCount} projects use each technology.
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {technologies.map((t) => (
            <li key={t.name} className="grid grid-cols-[minmax(0,150px)_1fr_auto] items-center gap-4">
              <span className="justify-self-start">
                <TechTag name={t.name} />
              </span>
              <span className="h-2 overflow-hidden rounded-full bg-[var(--bg-elevated-2)]" aria-hidden>
                <span className="block h-full rounded-full bg-white/70" style={{ width: `${(t.projects / maxTech) * 100}%` }} />
              </span>
              <span className="t-label t-numeral w-6 text-right text-white">{t.projects}</span>
            </li>
          ))}
        </ul>
      </Segment>
    </div>
  );
}
