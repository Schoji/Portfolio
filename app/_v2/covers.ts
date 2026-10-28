import type { LucideIcon } from "lucide-react";
import {
  Camera,
  Cpu,
  Ghost,
  Landmark,
  Music,
  Navigation,
  NotebookPen,
  Radar,
  Route,
  ScanEye,
  TrendingUp,
  Users,
} from "lucide-react";

/**
 * Editorial covers for the /projects list, for projects without a hand-built
 * cover. Each picks a layout and a piece of decoration of its own, so no two
 * covers read alike:
 *
 * - `fan`: one to three phones fanned out (they spread further on hover)
 * - `stack`: up to three windows cascading (they fan apart on hover)
 * - `window`: one large window bleeding off the bottom right (it rises)
 * - `polaroids`: photos as tilted prints (they scatter)
 *
 * `decor` names the project-specific extra drawn in project-thumbnail.tsx.
 *
 * hubmi, SoundNest and Sortra have hand-built covers in project-thumbnail.tsx;
 * the five featured projects reuse their home-page composition (featured-cover.tsx).
 */
export type Cover = {
  /** Base colour and the glow colour in one corner. */
  ground: [base: string, glow: string];
  ink: string;
  /** Colour of the decoration (radar, route, braces…). */
  accent: string;
  icon: LucideIcon;
  layout: "fan" | "stack" | "window" | "polaroids";
  images: string[];
  decor?: "radar" | "path" | "cursors" | "sparkline" | "route" | "discord" | "wave" | "flashlight" | "brackets";
};

export const COVERS: Record<string, Cover> = {
  "your-path": {
    ground: ["#fff2d3", "#f2bf4b"],
    ink: "#4a3500",
    accent: "#b07c00",
    icon: Route,
    layout: "stack",
    images: ["/your_path/1.webp", "/your_path/2.webp", "/your_path/3.webp"],
    decor: "path",
  },
  kanarradar: {
    ground: ["#d8f3e6", "#49b38a"],
    ink: "#0d3b2a",
    accent: "#12805a",
    icon: Radar,
    layout: "fan",
    images: ["/kanar_radar.webp"],
    decor: "radar",
  },
  "juan-note": {
    ground: ["#ffe9dc", "#f29c6b"],
    ink: "#4d2410",
    accent: "#d0581c",
    icon: NotebookPen,
    layout: "window",
    images: ["/juan_note.webp"],
    decor: "cursors",
  },
  "invest-me": {
    ground: ["#e0f6e8", "#6fcf97"],
    ink: "#0f3d24",
    accent: "#1f8a4c",
    icon: TrendingUp,
    layout: "window",
    images: ["/invest_me.webp"],
    decor: "sparkline",
  },
  "smart-doorbell": {
    ground: ["#fff4cf", "#f2c94c"],
    ink: "#4a3a00",
    accent: "#5865f2",
    icon: Camera,
    layout: "polaroids",
    images: ["/doorbell.webp"],
    decor: "discord",
  },
  "aleksy-v1": {
    ground: ["#e3e9ff", "#9db4ff"],
    ink: "#1b2a5c",
    accent: "#4461d6",
    icon: Cpu,
    layout: "polaroids",
    images: ["/aleksy_v1/1.webp", "/aleksy_v1/2.webp", "/aleksy_v1/3.webp"],
    decor: "wave",
  },
  "navigator-pm": {
    ground: ["#e2f0ff", "#8ec5ff"],
    ink: "#0d2c52",
    accent: "#2775d6",
    icon: Navigation,
    layout: "window",
    images: ["/navigator_pm/1.webp"],
    decor: "route",
  },
  "latwa-ustawa": {
    ground: ["#ffe3e3", "#ef8a8a"],
    ink: "#4d1414",
    accent: "#c93a3a",
    icon: Landmark,
    layout: "fan",
    images: ["/latwa_ustawa/1.webp", "/latwa_ustawa/2.webp", "/latwa_ustawa/3.webp"],
  },
  horouge: {
    ground: ["#140909", "#7a1f1f"],
    ink: "#f6dede",
    accent: "#b32020",
    icon: Ghost,
    layout: "stack",
    images: ["/horouge/1.webp", "/horouge/2.webp", "/horouge/3.webp"],
    decor: "flashlight",
  },
  "kni-website": {
    ground: ["#e4e9ff", "#6c8cff"],
    ink: "#17255a",
    accent: "#3550d6",
    icon: Users,
    layout: "stack",
    images: ["/kni_site/1.webp", "/kni_site/2.webp", "/kni_site/3.webp"],
    decor: "brackets",
  },
  filharmonia: {
    ground: ["#141414", "#8a6d2f"],
    ink: "#ffffff",
    accent: "#ad9450",
    icon: Music,
    layout: "stack",
    images: ["/filharmonia/home.webp", "/filharmonia/repertoire.webp", "/filharmonia/concert.webp"],
  },
  "world-of-drones": {
    ground: ["#1a1410", "#e8622c"],
    ink: "#ffffff",
    accent: "#f07a3e",
    icon: ScanEye,
    layout: "polaroids",
    images: ["/world_of_drones/drone.webp", "/world_of_drones/dashboard.webp", "/world_of_drones/team-photo.webp"],
  },
};
