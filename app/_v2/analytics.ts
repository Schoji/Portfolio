import { track } from "@vercel/analytics";

/**
 * Client-only analytics events, sent to Vercel Web Analytics. They appear
 * under Analytics → Custom Events; no database is involved. Only import this
 * module from "use client" components — `track` relies on `window.va`.
 */

export function trackProjectOpened(slug: string, source: "list" | "featured") {
  track("Project Opened", { slug, source });
}

export function trackProjectLink(
  slug: string,
  type: "github" | "app-store" | "google-play" | "live-site",
) {
  track("Project Link Clicked", { slug, type });
}

export function trackSeeAllProjects() {
  track("See All Projects");
}

export function trackContact(channel: string, action: "open" | "copy" | "mailto") {
  track("Contact", { channel, action });
}

export function trackNav(target: string) {
  track("Nav Clicked", { target });
}
