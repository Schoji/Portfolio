"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Screenshot gallery: a responsive grid of thumbnails (phone-shaped for mobile
 * projects, landscape otherwise) that open a fullscreen lightbox with keyboard
 * and arrow navigation.
 */
export default function ProjectGallery({
  images,
  phone,
  title,
}: {
  images: string[];
  phone: boolean;
  title: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  const multi = images.length > 1;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) =>
        i === null ? i : (i + dir + images.length) % images.length,
      ),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, step]);

  return (
    <>
      <div
        className={
          phone
            ? "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4"
            : "grid grid-cols-1 gap-5 sm:grid-cols-2"
        }
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setOpen(i)}
            aria-label={`Open ${title} screenshot ${i + 1}`}
            className={`group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-colors hover:border-cyan-400/50 ${
              phone ? "aspect-[9/19.5]" : "aspect-video"
            }`}
          >
            <Image
              src={src}
              alt={`${title} screenshot ${i + 1}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
              className="object-cover object-top"
            />
            <span className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Maximize2 size={15} />
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={20} />
            </button>

            {multi && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous"
                  className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next"
                  className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            <motion.div
              key={open}
              className="relative h-[88vh] w-[92vw]"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[open]}
                alt={`${title} screenshot ${open + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
