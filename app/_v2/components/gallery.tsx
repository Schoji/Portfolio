"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { EASE_OUT } from "./segment";

export type Shot = { src: string; ratio: number };

/** Splits shots into two columns, each next shot going to the shorter one. */
function columns(shots: Shot[]) {
  const cols: { s: Shot; i: number }[][] = [[], []];
  const height = [0, 0];
  shots.forEach((s, i) => {
    const c = height[0] <= height[1] ? 0 : 1;
    cols[c].push({ s, i });
    height[c] += 1 / s.ratio;
  });
  return cols;
}

const ROUND = "grid size-12 place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/20";

/**
 * Screenshots in their own shapes: phones in an even row of portrait tiles,
 * everything else in two columns that keep each image's ratio. Any tile opens
 * a fullscreen view with arrow-key and Escape support.
 */
export default function Gallery({ shots, phone, title }: { shots: Shot[]; phone: boolean; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [shots.length],
  );

  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const isOpen = open !== null;

  // While open: keys drive the viewer, Tab stays inside it and the page
  // behind does not scroll. On close, focus returns to the tile that opened it.
  useEffect(() => {
    if (!isOpen) return;
    opener.current = document.activeElement as HTMLElement | null;
    dialog.current?.querySelector<HTMLElement>("button")?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialog.current) {
        const items = [...dialog.current.querySelectorAll<HTMLElement>("button")];
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      opener.current?.focus();
    };
  }, [isOpen, close, step]);

  const tile = (s: Shot, i: number) => (
    <button
      type="button"
      onClick={() => setOpen(i)}
      aria-label={`Open ${title} screenshot ${i + 1} of ${shots.length}`}
      className="group relative block w-full cursor-zoom-in overflow-hidden rounded-[16px] bg-[var(--bg-elevated-2)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:rounded-[20px]"
      style={{ aspectRatio: phone ? "9 / 19.5" : s.ratio }}
    >
      <Image
        src={s.src}
        alt={`${title} screenshot ${i + 1}`}
        fill
        sizes={phone ? "(min-width: 1024px) 250px, (min-width: 640px) 30vw, 48vw" : "(min-width: 640px) 640px, 100vw"}
        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
      />
    </button>
  );

  return (
    <>
      {phone ? (
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {shots.map((s, i) => (
            <li key={s.src}>{tile(s, i)}</li>
          ))}
        </ul>
      ) : (
        // Two real columns instead of CSS multi-column: each shot goes to the
        // shorter column, so tiles keep their own ratio and never overlap.
        <div className="grid items-start gap-2 sm:grid-cols-2">
          {columns(shots).map((col, c) => (
            <ul key={c} className="flex flex-col gap-2">
              {col.map(({ s, i }) => (
                <li key={s.src}>{tile(s, i)}</li>
              ))}
            </ul>
          ))}
        </div>
      )}

      <AnimatePresence>
        {open !== null && (
          <motion.div
            ref={dialog}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} screenshot ${open + 1} of ${shots.length}`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              key={open}
              className="relative h-[84svh] w-[92vw]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={shots[open].src} alt={`${title} screenshot ${open + 1}`} fill sizes="92vw" className="object-contain" />
            </motion.div>

            <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3" onClick={(e) => e.stopPropagation()}>
              {shots.length > 1 && (
                <button type="button" onClick={() => step(-1)} aria-label="Previous screenshot" className={ROUND}>
                  <ChevronLeft size={22} />
                </button>
              )}
              <span className="t-label t-numeral min-w-14 text-center text-white/72">
                {open + 1} / {shots.length}
              </span>
              {shots.length > 1 && (
                <button type="button" onClick={() => step(1)} aria-label="Next screenshot" className={ROUND}>
                  <ChevronRight size={22} />
                </button>
              )}
            </div>
            <button type="button" onClick={close} aria-label="Close" className={`${ROUND} absolute top-4 right-4`}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
