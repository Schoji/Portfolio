"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectKind } from "../../projects/projects";
import { Segment } from "./segment";
import { TechTag } from "./ui";
import { ProjectThumbnail } from "./project-thumbnail";
import { KIND } from "../kinds";

/** Plain data only: the full Project holds icon components, which cannot cross into a client tree. */
export type ListedProject = {
  slug: string;
  kind: ProjectKind;
  title: string;
  summary: string;
  year?: string;
  image: string;
  tags: string[];
};

type Filter = "all" | ProjectKind;

export default function ProjectList({ projects }: { projects: ListedProject[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const kinds = (Object.keys(KIND) as ProjectKind[]).filter((k) => projects.some((p) => p.kind === k));
  const visible = filter === "all" ? projects : projects.filter((p) => p.kind === filter);

  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...kinds.map((k) => ({ id: k, label: KIND[k].plural, count: projects.filter((p) => p.kind === k).length })),
  ];

  return (
    <div className="flex flex-col gap-2">
      {/* Filters: a segmented pill like the nav, so it reads as navigation, not as tags. */}
      <div className="flex justify-start py-4">
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1 rounded-[28px] bg-[var(--bg-elevated)] p-1.5">
          {options.map((o) => {
            const active = filter === o.id;
            return (
              <button
                key={o.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(o.id)}
                className={`t-nav inline-flex min-h-10 items-center gap-2 rounded-full px-4 transition-colors ${
                  active ? "bg-white text-black" : "text-[color:var(--text-secondary)] hover:text-white"
                }`}
              >
                {o.id !== "all" && (
                  <span aria-hidden className="size-2 rounded-full" style={{ background: KIND[o.id].color }} />
                )}
                {o.label}
                <span className={`t-numeral ${active ? "text-black/50" : "text-white/35"}`}>{o.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="flex flex-col gap-2" aria-live="polite">
        {visible.map((p, i) => (
          <li key={p.slug}>
            <Segment enter="slide" delay={Math.min(i, 3) * 0.08} className="bg-[var(--bg-elevated)]">
              <Link
                href={`/projects/${p.slug}`}
                className="group grid gap-6 p-3 pb-7 transition-colors hover:bg-white/[0.03] sm:grid-cols-[minmax(0,280px)_1fr] sm:items-center sm:pb-3 lg:grid-cols-[320px_1fr_auto] lg:gap-10"
              >
                <ProjectThumbnail slug={p.slug} image={p.image} color={KIND[p.kind].color} />
                <div className="flex min-w-0 flex-col gap-2 px-4 sm:px-0">
                  <h2 className="font-display t-tile">{p.title}</h2>
                  <p className="t-body max-w-[620px] text-white/72">{p.summary}</p>
                  <p className="t-label text-[color:var(--text-secondary)]">
                    {KIND[p.kind].label}
                    {p.year ? `, ${p.year}` : ""}
                  </p>
                </div>
                <div className="hidden max-w-[260px] flex-wrap justify-end gap-1.5 pr-5 lg:flex">
                  {p.tags.slice(0, 3).map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </div>
              </Link>
            </Segment>
          </li>
        ))}
      </ul>
    </div>
  );
}
