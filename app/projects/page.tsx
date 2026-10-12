import type { Metadata } from "next";
import Nav from "../_v2/components/nav";
import ProjectList, { type ListedProject } from "../_v2/components/project-list";
import StackOverview from "../_v2/components/stack-overview";
import { getGitHubLanguages } from "../_v2/github";
import Shell, { darkViewport } from "../_v2/shell";
import { projects } from "./projects";

const description = `All ${projects.length} projects by Piotr Wittig: mobile apps, web platforms, desktop tools, hardware builds and a game.`;

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Piotr Wittig", description, url: "/projects" },
};

export const viewport = darkViewport;
export const revalidate = 3600;

// Spellings that name the same technology in different project entries.
const SAME_AS: Record<string, string> = { Tailwind: "Tailwind CSS", "OpenAI API": "OpenAI", "Framer Motion": "Motion" };

/** Technologies by how many projects list them, most used first. */
function topTechnologies(limit: number) {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const t of new Set(p.technologies.map((t) => SAME_AS[t] ?? t))) counts.set(t, (counts.get(t) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, n]) => ({ name, projects: n }))
    .sort((a, b) => b.projects - a.projects || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export default async function ProjectsPage() {
  const github = await getGitHubLanguages();
  const items: ListedProject[] = projects.map((p) => ({
    slug: p.slug,
    kind: p.kind,
    title: p.title,
    summary: p.tagline ?? p.seoDescription ?? p.description,
    year: p.year,
    image: Array.isArray(p.imageSource) ? p.imageSource[0] : p.imageSource,
    tags: p.technologies,
  }));

  return (
    <Shell>
      <Nav />
      <main className="container-v2 pt-[84px] pb-6 lg:pt-[76px]">
        <header className="flex flex-col gap-4 px-1 pt-8 pb-2 lg:pt-12">
          <h1 className="font-display t-title-xl">All projects</h1>
          <p className="t-lead max-w-[640px] text-white/72">
            Everything I have built since 2022, from a university timetable app to a voice
            assistant. Each one opens its own page.
          </p>
        </header>
        <div className="pt-6 pb-4">
          <StackOverview
            languages={github?.languages ?? null}
            repos={github?.repos ?? 0}
            technologies={topTechnologies(8)}
            projectCount={projects.length}
          />
        </div>
        <ProjectList projects={items} />
      </main>
    </Shell>
  );
}
