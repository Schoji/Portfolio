"use client";

import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export type HackathonPhoto = { src: string; alt: string };

const CONTROL = "grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export default function HackathonPhotos({ title, photos, preview = "cover", cover, startIndex = 0, onOpenChange }: {
  title: string;
  photos: HackathonPhoto[];
  preview?: "cover" | "button";
  cover?: ReactNode;
  startIndex?: number;
  onOpenChange?: (open: boolean) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const photo = photos[active];
  const step = (direction: number) => setActive((index) => (index + direction + photos.length) % photos.length);

  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        aria-label={`View ${title} gallery, ${photos.length} photos`}
        aria-haspopup="dialog"
        onClick={() => {
          setActive(startIndex);
          dialog.current?.showModal();
          setIsOpen(true);
          onOpenChange?.(true);
        }}
        className={preview === "cover"
          ? "group block w-full cursor-pointer overflow-hidden rounded-[20px] bg-black text-left text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          : "t-button group inline-flex min-h-[52px] cursor-pointer items-center gap-2.5 rounded-full border border-[color-mix(in_srgb,var(--event-accent)_45%,transparent)] bg-[color-mix(in_srgb,var(--event-accent)_8%,transparent)] px-5 text-white transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--event-accent)] hover:bg-[color-mix(in_srgb,var(--event-accent)_18%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--event-accent)] motion-reduce:transform-none motion-reduce:transition-none"}
      >
        {cover ?? (preview === "cover" ? <>
        <span className="relative block aspect-[4/3] overflow-hidden">
          <Image
            src={photos[0].src}
            alt={photos[0].alt}
            fill
            sizes="(min-width: 1600px) 440px, (min-width: 1024px) 30vw, 90vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] group-focus-visible:scale-[1.03] motion-reduce:transition-none"
          />
        </span>
        <span className="t-label flex min-h-14 items-center justify-between gap-3 px-4 py-3 transition-colors group-hover:bg-white/15 group-focus-visible:bg-white/15">
          <span>{title}</span>
          <span className="flex items-center gap-2"><Camera size={16} aria-hidden="true" />View {photos.length} photos</span>
        </span>
        </> : <>
          <Camera size={18} aria-hidden="true" />
          <span>See photos</span>
          <span className="t-numeral grid size-6 place-items-center rounded-full bg-white/15 text-xs">{photos.length}</span>
        </>)}
      </button>

      <dialog
        ref={dialog}
        aria-label={`${title} photo gallery`}
        onClose={() => { setIsOpen(false); onOpenChange?.(false); }}
        onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            step(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
        className="fixed inset-0 m-0 h-[100dvh] max-h-none w-screen max-w-none flex-col items-center justify-center gap-4 border-0 bg-black/95 p-4 text-white backdrop:bg-black/80 open:flex sm:p-6"
      >
        {isOpen && (
          <>
            <div className="relative mt-14 min-h-0 w-full flex-1">
              <Image src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex shrink-0 items-center gap-4 pb-2">
              <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={CONTROL}><ChevronLeft size={22} /></button>
              <span className="t-label t-numeral min-w-20 text-center" aria-live="polite" aria-atomic="true">{active + 1} / {photos.length}</span>
              <button type="button" onClick={() => step(1)} aria-label="Next photo" className={CONTROL}><ChevronRight size={22} /></button>
            </div>
          </>
        )}
        <button type="button" onClick={() => dialog.current?.close()} aria-label="Close photo gallery" className={`${CONTROL} absolute top-4 right-4`}><X size={22} /></button>
      </dialog>
    </>
  );
}
