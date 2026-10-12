import { SiGithub } from "react-icons/si";
import type { GitHubStats, HeatLevel } from "../github";
import { Button, SegmentFooter } from "./ui";
import { Segment } from "./segment";

// Butter ramp on the dark segment: empty days are the chip grey, active days
// mix butter into the segment ground.
const HEAT: Record<HeatLevel, string> = {
  0: "var(--bg-elevated-2)",
  1: "color-mix(in srgb, var(--seg-butter) 32%, var(--bg-elevated))",
  2: "color-mix(in srgb, var(--seg-butter) 55%, var(--bg-elevated))",
  3: "color-mix(in srgb, var(--seg-butter) 78%, var(--bg-elevated))",
  4: "var(--seg-butter)",
};

const fmt = new Intl.NumberFormat("en-US");

export default function GitHubSection({ stats }: { stats: GitHubStats | null }) {
  const statItems = stats
    ? [
        { value: stats.contributions, label: "contributions" },
        { value: stats.commits, label: "commits" },
        { value: stats.pullRequests, label: "pull requests" },
        { value: stats.repositories, label: "repositories" },
      ]
    : [];
  const maxCommits = Math.max(1, ...(stats?.topRepos.map((r) => r.commits) ?? []));

  return (
    <section id="github" data-nav="about" className="screen container-v2">
      <div className="flex h-full flex-col gap-2 lg:flex-row">
        <Segment className="flex min-w-0 flex-1 flex-col justify-between gap-6 bg-[var(--bg-elevated)] px-7 pt-10 pb-8 lg:px-14 lg:pt-8 lg:pb-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display t-headline max-w-[700px]">What I&apos;ve been building lately</h2>
            {stats && (
              <>
                <p className="t-label text-[color:var(--text-secondary)]">
                  {stats.placeholder
                    ? "Placeholder data. Set GITHUB_TOKEN to load the real numbers."
                    : "In the last 12 months"}
                </p>
                <dl className="flex flex-wrap gap-x-8 gap-y-6 pt-2">
                  {statItems.map((s) => (
                    <div key={s.label} className="flex flex-col-reverse gap-1">
                      <dt className="t-label text-[color:var(--text-secondary)]">{s.label}</dt>
                      <dd className="t-numeral text-[44px] leading-none tracking-[-0.04em]">
                        {fmt.format(s.value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            )}
          </div>

          {stats && (
            <div
              role="img"
              aria-label="Contribution heatmap for the last 26 weeks"
              className="grid w-full grid-cols-[repeat(26,minmax(0,1fr))] grid-rows-7 gap-[3px] sm:gap-[5px]"
            >
              {stats.weeks.flatMap((week, w) =>
                week.map((day, d) => (
                  <span
                    key={`${w}-${d}`}
                    className="aspect-square rounded-[4px]"
                    style={{ background: HEAT[day.level], gridRow: d + 1, gridColumn: w + 1 }}
                  />
                )),
              )}
            </div>
          )}

          <SegmentFooter tone="dark" className="flex flex-wrap items-center justify-between gap-4">
            <p className="t-label text-[color:var(--text-secondary)]">
              {stats ? "Last 6 months, one square per day." : "Activity is on my GitHub profile."}
            </p>
            <Button href="https://github.com/Schoji" external variant="secondary" icon={SiGithub}>
              Open GitHub profile
            </Button>
          </SegmentFooter>
        </Segment>

        {stats && (
          <Segment delay={0.08} className="flex shrink-0 flex-col gap-4 bg-[var(--seg-butter)] px-7 pt-10 pb-8 text-black lg:w-[35.9%] lg:px-10 lg:pt-8">
            <h3 className="font-display t-title">Where the commits went</h3>
            <p className="t-body text-black/65">
              Commits per repository in the last 12 months.
              {stats.topRepos[0] && !stats.placeholder && (
                <> Most of the year went into {stats.topRepos[0].name}.</>
              )}
            </p>
            <ul className="mt-auto flex flex-col gap-2 pt-6">
              {stats.topRepos.map((r, i) => (
                <li key={`${r.name}-${i}`} className="flex flex-col gap-2 py-1.5">
                  <div className="flex items-center justify-between">
                    <span className="t-body font-[550]">{r.name}</span>
                    <span className="t-body t-numeral text-black/60">{r.commits}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-black"
                      style={{ width: `${(r.commits / maxCommits) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </Segment>
        )}
      </div>
    </section>
  );
}
