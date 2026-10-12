import type { ProjectKind } from "../projects/projects";

// Kind colours follow DESIGN.md: clay = mobile, sage = web, lilac = desktop,
// butter = hardware. The game takes the paper white.
export const KIND: Record<ProjectKind, { label: string; plural: string; color: string }> = {
  mobile: { label: "Mobile app", plural: "Mobile", color: "var(--seg-clay)" },
  web: { label: "Web app", plural: "Web", color: "var(--seg-sage)" },
  desktop: { label: "Desktop app", plural: "Desktop", color: "var(--seg-lilac)" },
  hardware: { label: "Hardware build", plural: "Hardware", color: "var(--seg-butter)" },
  game: { label: "Game", plural: "Game", color: "var(--seg-paper)" },
};
