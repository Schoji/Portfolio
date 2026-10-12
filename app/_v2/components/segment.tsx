"use client";

import { MotionConfig, motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

// Out-expo: fast start, long soft landing, so a segment grows into place
// instead of popping.
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function MotionPreferences({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/**
 * Entrance shared by every bento: grows from 96% and rises 24px as it enters
 * the viewport, once. `delay` staggers segments within one screen.
 *
 * Motion renders the initial `opacity:0` into the server HTML; globals.css
 * keeps that visible without JS and under prefers-reduced-motion.
 */
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, scale: 0.96, y: 24 },
    whileInView: { opacity: 1, scale: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.8, ease: EASE_OUT, delay },
  } satisfies HTMLMotionProps<"div">;
}

/**
 * Entrance for rows in a long list: each slides up from below on its own as
 * the visitor scrolls to it, instead of growing in place.
 */
export function slideUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 96 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.9, ease: EASE_OUT, delay },
  } satisfies HTMLMotionProps<"div">;
}

/** A rounded colour block, the building unit of every screen. */
export function Segment({
  className = "",
  style,
  delay = 0,
  enter = "grow",
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  /** `grow` for screens (default), `slide` for rows of a list. */
  enter?: "grow" | "slide";
  children?: ReactNode;
}) {
  return (
    <motion.div
      data-reveal
      {...(enter === "slide" ? slideUp(delay) : reveal(delay))}
      style={style}
      className={`relative overflow-hidden rounded-[24px] lg:rounded-[32px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

/** A device or photo sliding up into its segment after the segment has landed. */
export function Rise({ className = "", delay = 0.25, children }: { className?: string; delay?: number; children: ReactNode }) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
