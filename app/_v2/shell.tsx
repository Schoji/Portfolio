import type { ReactNode } from "react";
import type { Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { GalaxyBackdrop } from "./components/galaxy-backdrop";
import { MotionPreferences } from "./components/segment";
import "./v2.css";

// Two faces with separate jobs (DESIGN.md): Bricolage for headlines, Geist for
// everything else, numerals included. Both are variable, so weights like 550
// from the Figma file resolve without listing them.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin", "latin-ext"],
});

// Only for inline code in blog posts.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

// A dark page that says so: Chrome's auto-dark and similar modes skip pages
// declaring color-scheme dark instead of inverting the light segments.
// Route files re-export this as their own `viewport`.
export const darkViewport: Viewport = { colorScheme: "dark", themeColor: "#000000" };

/**
 * Wraps every page drawn in the v2 design: fonts, tokens (v2.css) and the
 * Motion settings. `app/_v2` is a private folder, so nothing in it is a route;
 * pages import this instead of sharing a layout.
 */
export default function Shell({ children }: { children: ReactNode }) {
  return (
    <div className={`v2 ${bricolage.variable} ${geist.variable} ${geistMono.variable} min-h-screen`}>
      <GalaxyBackdrop />
      {/* Positioned so it paints above the fixed backdrop. */}
      <div className="relative">
        <MotionPreferences>{children}</MotionPreferences>
      </div>
    </div>
  );
}
