import { projects, type ProjectKind } from "../../projects/projects";
import { SegmentFooter, TechTag } from "./ui";
import { Segment } from "./segment";

const TOOLS = ["Flutter", "Next.js", "FastAPI", "Python", "Supabase", "React Native", "Flask"];

const KIND_LABELS: Record<ProjectKind, [string, string]> = {
  web: ["web app", "web apps"],
  mobile: ["mobile app", "mobile apps"],
  desktop: ["desktop app", "desktop apps"],
  hardware: ["hardware build", "hardware builds"],
  game: ["game", "games"],
};

// Counted from projects.ts, largest first, so adding a project updates the card.
const BREAKDOWN = (Object.keys(KIND_LABELS) as ProjectKind[])
  .map((kind) => ({ kind, count: projects.filter((p) => p.kind === kind).length }))
  .filter((k) => k.count > 0)
  .sort((a, b) => b.count - a.count)
  .map(({ kind, count }) => `${count} ${KIND_LABELS[kind][count === 1 ? 0 : 1]}`);

export default function About() {
  return (
    <section id="about" data-nav="about" className="screen container-v2">
      <div className="flex h-full flex-col gap-2 lg:flex-row">
        <Segment className="flex min-w-0 flex-1 flex-col justify-between gap-16 bg-[var(--bg-elevated)] px-7 pt-10 pb-8 lg:px-14 lg:pt-8 lg:pb-8">
          <div className="flex flex-col gap-6">
            <h2 className="font-display t-headline max-w-[760px]">
              &ldquo;I write code occasionally on purpose.&rdquo;
            </h2>
            <p className="t-lead max-w-[640px] text-white/72">
              I&apos;m a developer and AI specialist who values pragmatism. I care about performance,
              interfaces people can actually use, and architecture that still makes sense a year
              later.
            </p>
          </div>
          <SegmentFooter tone="dark" className="flex flex-col gap-2">
            <p className="t-label text-[color:var(--text-secondary)]">Tools I reach for first</p>
            <ul className="flex flex-wrap gap-2 pt-2">
              {TOOLS.map((t) => (
                <li key={t}>
                  <TechTag strong name={t} />
                </li>
              ))}
            </ul>
          </SegmentFooter>
        </Segment>
        <Segment delay={0.08} className="flex shrink-0 flex-col gap-2 bg-[var(--seg-sage)] px-7 pt-10 pb-8 text-black lg:w-[34.4%] lg:px-10 lg:pt-8 lg:pb-8">
          <p className="t-numeral text-[clamp(120px,12.8vw,184px)] leading-[0.85] tracking-[-0.07em]">
            {projects.length}
          </p>
          <p className="t-lead text-black/55">projects since 2022</p>
          <ul className="mt-auto flex flex-col gap-2.5 pt-6">
            {BREAKDOWN.map((b) => (
              <li key={b} className="t-numeral text-[26px] leading-[1.15] tracking-[-0.02em]">
                {b}
              </li>
            ))}
          </ul>
        </Segment>
      </div>
    </section>
  );
}
