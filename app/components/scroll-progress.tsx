"use client";
import { motion, useScroll } from "motion/react";

/**
 * Thin accent-colored bar pinned to the bottom edge of the navbar that
 * fills from left to right as the user scrolls toward the bottom of the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed top-14 left-0 right-0 z-[60] h-1 origin-left opacity-50"
      style={{
        scaleX: scrollYProgress,
        background:
          "linear-gradient(90deg, var(--accent-dark) 0%, var(--accent) 55%, var(--accent-light) 100%)",
        boxShadow: "0 0 10px rgb(var(--accent-rgb) / calc(0.7 * var(--glow-strength)))",
      }}
    />
  );
}
