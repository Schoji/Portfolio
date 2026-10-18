import Link from "next/link";
import type { CSSProperties } from "react";
import { Code2 } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "@/app/projects/projects";
import { Segment } from "./segment";
import HackathonShowcase from "./hackathon-showcase";
import HackathonPhotos, { type HackathonPhoto } from "./hackathon-photos";

const WUD_PHOTOS: HackathonPhoto[] = [
  { src: "/hackathons/wud-2026/team.webp", alt: "The six-person WUD 2026 team posing together at the hackathon" },
  { src: "/hackathons/wud-2026/workspace.webp", alt: "Four WUD participants standing behind a table of laptops" },
  { src: "/hackathons/wud-2026/behind-the-scenes.webp", alt: "A selfie in the WUD hackathon room with teammates working in the background" },
  { src: "/hackathons/wud-2026/team-selfie.webp", alt: "Three teammates pulling faces for a selfie at WUD 2026" },
  { src: "/hackathons/wud-2026/coding-room.webp", alt: "WUD teammates taking a break around their workspace" },
];

const HACKYEAH_PHOTOS: HackathonPhoto[] = [
  { src: "/hackathons/hackyeah-2026/team-blocks.webp", alt: "The HackYeah 2026 team holding large pink letter blocks in the arena" },
  { src: "/hackathons/hackyeah-2026/team.webp", alt: "Six teammates posing behind the HackYeah sign" },
  { src: "/hackathons/hackyeah-2026/arena-lights.webp", alt: "Participants working under pink stage lights at HackYeah 2026" },
  { src: "/hackathons/hackyeah-2026/arena.webp", alt: "The HackYeah stage and tables of participants inside Tauron Arena" },
];

const HACKNATION_PHOTOS: HackathonPhoto[] = [
  { src: "/hackathons/hacknation-2025/team.webp", alt: "Five HackNation 2025 participants posing together in front of the stage" },
  { src: "/hackathons/hacknation-2025/team-stage.webp", alt: "A group photo at HackNation 2025 with the stage and participants in the background" },
];

const HACKYEAH_2025_PHOTOS: HackathonPhoto[] = [
  { src: "/hackathons/hackyeah-2025/workspace.webp", alt: "HackYeah 2025 participants working together at a table of laptops" },
  { src: "/hackathons/hackyeah-2025/arena.webp", alt: "An overhead view of the stage and participants at HackYeah 2025 in Tauron Arena" },
  { src: "/hackathons/hackyeah-2025/presentation.webp", alt: "A laptop showing a game presentation being prepared at HackYeah 2025" },
  { src: "/hackathons/hackyeah-2025/blender.webp", alt: "A laptop running Blender with a spider character model at HackYeah 2025" },
];

type Hackathon = {
  name: string;
  year: string;
  contribution: string;
  projectSlug?: string;
  repositoryUrl?: string;
  photos: HackathonPhoto[];
  brand: string;
  accent: string;
  city: string;
};

const HACKATHONS: Hackathon[] = [
  {
    name: "WUD",
    brand: "#4241CA",
    accent: "#9B9FF0",
    city: "Szczecin",
    year: "2026",
    photos: WUD_PHOTOS,
    repositoryUrl: "https://github.com/DudeQ7/wud2026",
    contribution:
      "Co-designed the UI/UX in Figma and built the Next.js frontend in a six-person team, with a focus on mobile interfaces and accessibility.",
  },
  {
    name: "HackYeah",
    brand: "#E6007E",
    accent: "#02BCC1",
    city: "Kraków",
    year: "2026",
    contribution:
      "Built public chat screens, AI integrations and admin workflows to connect local needs with social innovations.",
    projectSlug: "hubmi",
    photos: HACKYEAH_PHOTOS,
  },
  {
    name: "HackNation",
    brand: "#E6013A",
    accent: "#21D3E0",
    city: "Bydgoszcz",
    year: "2025",
    contribution:
      "Built the Flutter app and integration code for a tool that makes Polish parliamentary bills easier to understand.",
    projectSlug: "latwa-ustawa",
    photos: HACKNATION_PHOTOS,
  },
  {
    name: "HackYeah",
    brand: "#E6007E",
    accent: "#02BCC1",
    city: "Kraków",
    year: "2025",
    contribution:
      "Learned Godot while building gameplay, combat, animations and the health system for a horror roguelike in 24 hours.",
    projectSlug: "horouge",
    photos: HACKYEAH_2025_PHOTOS,
  },
];

export default function Hackathons() {
  return (
    <HackathonShowcase events={HACKATHONS.map((event) => ({ title: `${event.name} ${event.year}`, brand: event.brand, photos: event.photos }))}>
        <Segment delay={0.08} className="min-w-0 flex-1">
          <ol className="flex flex-col gap-2">
            {HACKATHONS.map((event) => {
              const project = projects.find((p) => p.slug === event.projectSlug);
              const action = project
                ? { href: `/projects/${project.slug}`, label: `Explore ${project.title}`, external: false }
                : event.repositoryUrl
                  ? { href: event.repositoryUrl, label: "GitHub", external: true }
                  : null;
              return (
                <li
                  key={`${event.name}-${event.year}`}
                  style={{ "--event-brand": event.brand, "--event-accent": event.accent } as CSSProperties}
                  className="relative overflow-hidden rounded-[24px] border border-white/8 bg-[var(--bg-elevated)] px-7 py-6 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_top_right,color-mix(in_srgb,var(--event-brand)_14%,transparent),transparent_65%)] after:absolute after:top-7 after:bottom-7 after:left-0 after:w-1 after:rounded-r-full after:bg-[linear-gradient(var(--event-brand),var(--event-accent))] lg:rounded-[32px] lg:px-10"
                >
                  <div className="relative flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display t-tile">{event.name} {event.year}</h3>
                    <span className="t-label text-white/65">{event.city}</span>
                  </div>
                  <p className="t-body mt-3 max-w-[640px] text-white/72">
                    {event.contribution}
                  </p>
                  <div className="relative mt-4 flex flex-wrap items-center gap-2.5">
                    {action && (
                      <Link
                        href={action.href}
                        {...(action.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="t-button inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full bg-[var(--event-brand)] px-5 text-white transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--event-brand)_85%,black)] hover:shadow-[0_6px_24px_color-mix(in_srgb,var(--event-brand)_30%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--event-accent)] motion-reduce:transform-none motion-reduce:transition-none"
                      >
                        {action.external ? <SiGithub size={18} aria-hidden="true" /> : <Code2 size={18} aria-hidden="true" />}
                        {action.label}
                      </Link>
                    )}
                    {event.photos && (
                      <HackathonPhotos title={`${event.name} ${event.year}`} photos={event.photos} preview="button" />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </Segment>
    </HackathonShowcase>
  );
}
