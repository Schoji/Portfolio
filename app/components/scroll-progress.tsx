"use client";
import { motion, useScroll } from "motion/react";

/**
 * Reading progress on blog posts: a thin white line along the top edge of the
 * window that fills from left to right as the reader scrolls toward the end.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-white/80"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
