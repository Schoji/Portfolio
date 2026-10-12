import { projects } from "../projects/projects";

/**
 * The featured projects in the "Work" sequence. Copy is written for the v2
 * layout (short lead + one meta line); links come from `projects.ts` so there
 * is still one source of truth for URLs.
 */
export type Featured = {
  slug: string;
  /** Tab label and heading. */
  title: string;
  lead: string;
  meta: string;
  tags: string[];
  /** "mobile" = 03a (phone beside the info panel), "stage" = screenshot or photo beside the info panel. */
  layout: "mobile" | "stage";
  visual: { kind: "phone" | "window" | "photo"; src: string; alt: string; position?: string; aspectRatio?: string };
  /** Stage gradient (top → bottom) and the tint of the device's drop shadow. */
  color: { from: string; to: string; shadow: string };
  links: { github?: string; appStore?: string; googlePlay?: string; site?: string };
};

/** Stage ground: the project's gradient. */
export function stageBg(p: Featured) {
  return { backgroundImage: `linear-gradient(180deg, ${p.color.from}, ${p.color.to})` };
}

const PERIWINKLE = { from: "#B4C6FB", to: "#8197EE", shadow: "rgb(22 34 92 / 0.3)" };
const LILAC = { from: "#BEA6F3", to: "#9A78E2", shadow: "rgb(38 13 77 / 0.35)" };
const BUTTER = { from: "#F7DE88", to: "#EDC24F", shadow: "rgb(77 58 0 / 0.3)" };

function linksFor(slug: string): Featured["links"] {
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const url = p.buttonURL ?? undefined;
  const isGithub = url?.includes("github.com");
  return {
    github: isGithub ? url : undefined,
    site: url && !isGithub ? url : undefined,
    appStore: p.appStoreURL ?? undefined,
    googlePlay: p.playStoreURL ?? undefined,
  };
}

export const featured: Featured[] = [
  {
    slug: "plan-pm",
    title: "Plan PM",
    lead: "The Politechnika Morska timetable, personalized and fully offline. Built because the university portal kept falling over; now around 1,000 downloads on iOS and Android.",
    meta: "Mobile app, 2025. Lead developer and project manager in a team of four.",
    tags: ["Flutter", "Supabase", "Python", "Beautiful Soup"],
    layout: "mobile",
    visual: { kind: "phone", src: "/plan_pm/lectures.webp", alt: "Plan PM timetable for a Tuesday, four classes in dark mode" },
    color: PERIWINKLE,
    links: linksFor("plan-pm"),
  },
  {
    slug: "until-done",
    title: "Until Done",
    lead: "Reminders that keep coming until the task is done. A free, fully offline app with an escalating notification engine — built because I kept forgetting the reminder apps themselves.",
    meta: "Mobile app, 2025. Solo project. Live on the App Store.",
    tags: ["Flutter", "SQLite", "RxDart", "Local notifications"],
    layout: "mobile",
    visual: { kind: "phone", src: "/until_done/1.webp", alt: "Until Done task timeline and reminders" },
    color: BUTTER,
    links: linksFor("until-done"),
  },
  {
    slug: "linuxinder",
    title: "Linder",
    lead: "Tinder, but for Linux distributions. Swipe through 83 distro profiles, find your match, and discover the red flag it saved for after you committed.",
    meta: "Web app, 2026. Solo project. Live and open source.",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
    layout: "stage",
    visual: { kind: "window", src: "/v2/linder/bazzite.webp", aspectRatio: "672 / 694", alt: "Linder dating profile for Bazzite, with its colorful desktop, bio and personality tags" },
    color: LILAC,
    links: { ...linksFor("linuxinder"), github: "https://github.com/Schoji/Linder" },
  },
  {
    slug: "aleksy-v2",
    title: "A.L.E.K.S.Y v2",
    lead: "Say Aleksy, ask a question, and hear an answer in the cloned voice of a real friend. A Raspberry Pi handles the wake word, audio and OLED face; a Mac mini runs the speech and language models.",
    meta: "Hardware build, 2026. Solo project, built for a university event.",
    tags: ["Python", "Raspberry Pi 5", "MLX", "OmniVoice", "WebSockets"],
    layout: "stage",
    visual: { kind: "photo", src: "/v2/aleksy/render-v1.webp", aspectRatio: "1 / 1", alt: "Studio visualization of A.L.E.K.S.Y v2: mint-green enclosure, four speaker grilles and a glowing OLED face" },
    color: LILAC,
    links: linksFor("aleksy-v2"),
  },
  {
    slug: "gcodec",
    title: "GCodec",
    lead: "See what a slicer sends to your printer. A small 3D G-code viewer with a hand-written parser, colour-coded moves, and a mouse-controlled orbit camera.",
    meta: "Desktop tool, 2026. Solo project. Written in C, open source.",
    tags: ["C", "raylib", "CMake"],
    layout: "stage",
    visual: { kind: "window", src: "/gcodec/1.webp", aspectRatio: "800 / 632", alt: "GCodec showing the Benchy print path in 3D: green extrusion, blue travel and red retractions" },
    color: { from: "var(--bg-elevated-2)", to: "var(--bg-black)", shadow: "rgb(0 0 0 / 0.65)" },
    links: linksFor("gcodec"),
  },
];
