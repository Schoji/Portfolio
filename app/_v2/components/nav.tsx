"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const LINKS = [
  { id: "work", label: "Work", href: "/#work" },
  { id: "about", label: "About", href: "/#about" },
  { id: "blog", label: "Blog", href: "/blog" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export type NavId = "work" | "about" | "blog" | "contact";

/**
 * Each section declares which nav item it belongs to with `data-nav`
 * (the hero and the projects are Work, About and GitHub are About). The item
 * of whichever section crosses the middle of the viewport is shown as active.
 */
function useActiveSection(fixed?: NavId | null): NavId | null {
  const [active, setActive] = useState<NavId | null>(fixed === undefined ? "work" : fixed);
  useEffect(() => {
    if (fixed !== undefined) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.getAttribute("data-nav") as NavId);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [fixed]);
  return active;
}

/**
 * `active` pins the highlighted item on pages without `data-nav` sections
 * (projects, blog); `null` highlights nothing (404, error).
 */
export default function Nav({ active: fixed }: { active?: NavId | null } = {}) {
  const active = useActiveSection(fixed);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  return (
    // A black band behind the bar that fades out below it: segments scroll under
    // the band instead of meeting the pills edge to edge.
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-black after:absolute after:inset-x-0 after:top-full after:h-6 after:bg-gradient-to-b after:from-black after:to-transparent">
      <div className="container-v2 flex items-center justify-between gap-3 pt-4 pb-3">
        <div className="pointer-events-auto flex items-center gap-2">
          <Link
            href="/#top"
            onClick={() => setOpen(false)}
            aria-label="Piotr Wittig, back to top"
            className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-[16px] font-bold tracking-[-0.005em] text-black"
          >
            PW
          </Link>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="v2-navigation"
            onClick={() => setOpen((value) => !value)}
            className="t-nav h-12 rounded-full bg-[var(--bg-elevated)] px-4 ring-1 ring-white/10 sm:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
          <nav
            id="v2-navigation"
            aria-label="Main"
            className={`${open ? "block" : "hidden"} absolute top-[72px] right-[var(--gutter)] left-[var(--gutter)] rounded-[24px] bg-[var(--bg-elevated)] px-6 py-2 ring-1 ring-white/10 ring-inset sm:static sm:block sm:rounded-full sm:py-0.5`}
          >
            <ul className="flex items-center justify-between gap-4 sm:gap-7">
              {LINKS.map((l) => {
                const isActive = l.id === active;
                const cls = `t-nav inline-flex min-h-11 items-center transition-colors ${
                  isActive ? "text-white" : "text-[color:var(--text-secondary)] hover:text-white"
                }`;
                return (
                  <li key={l.id}>
                    <Link
                      href={l.href}
                      className={cls}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <Link
          href="/#contact"
          onClick={() => setOpen(false)}
          className="t-nav pointer-events-auto rounded-full bg-white px-[22px] py-3.5 text-black transition-colors hover:bg-white/90"
        >
          Get in touch
        </Link>
      </div>
    </header>
  );
}
