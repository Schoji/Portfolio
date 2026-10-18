"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import HackathonPhotos, { type HackathonPhoto } from "./hackathon-photos";
import { Segment } from "./segment";
import { SegmentFooter } from "./ui";

type ShowcaseEvent = {
  title: string;
  brand: string;
  photos: HackathonPhoto[];
};

const INTERVAL = 5000;
const CONTROL = "grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-black/15 text-white transition-colors hover:bg-black/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-default disabled:opacity-35";

export default function HackathonShowcase({ events, children }: { events: ShowcaseEvent[]; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.15 });
  const reduceMotion = useReducedMotion();
  // Alternate events on every slide, then move to the next photo in each gallery.
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const eventIndex = slide % events.length;
  const event = events[eventIndex];
  const photoIndex = Math.floor(slide / events.length) % event.photos.length;
  const photo = event.photos[photoIndex];
  const playing = !paused && !hovered && !focused && !galleryOpen && !reduceMotion && visible;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (!document.hidden && !document.querySelector("dialog[open]")) setSlide((value) => value + 1);
    }, INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, slide]);

  return (
    <section
      ref={ref}
      id="hackathons"
      data-nav="about"
      aria-labelledby="hackathons-title"
      className="container-v2 rounded-[40px] pt-[84px] pb-6 transition-[background-color] duration-1000 motion-reduce:transition-none lg:pt-[76px] lg:pb-12"
      style={{ backgroundColor: `color-mix(in srgb, ${event.brand} 7%, black)` }}
    >
      <div className="flex flex-col gap-2 lg:flex-row">
        <Segment
          className="flex min-w-0 flex-col justify-between gap-8 px-7 py-8 text-white transition-[background-color] duration-1000 motion-reduce:transition-none lg:w-[38%] lg:shrink-0 lg:px-8 lg:py-10"
          style={{ backgroundColor: event.brand }}
        >
          <div className="flex flex-col gap-5">
            <h2 id="hackathons-title" className="font-display t-title">Hackathons</h2>
            <p className="t-lead text-white/85">New teams, tight deadlines, working prototypes.</p>
          </div>

          <div className="flex flex-col gap-3">
            <div
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onFocusCapture={() => setFocused(true)}
              onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}
            >
              <HackathonPhotos
                title={event.title}
                photos={event.photos}
                startIndex={photoIndex}
                onOpenChange={setGalleryOpen}
                cover={
                  <>
                    <span className="relative block aspect-[4/3] overflow-hidden bg-black">
                      <AnimatePresence initial={false}>
                        <motion.span
                          key={photo.src}
                          className="absolute inset-0"
                          initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: reduceMotion ? 0 : 0.8 }}
                        >
                          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 480px, 90vw" className="object-contain" />
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="flex min-h-[76px] items-center justify-between gap-3 px-4 py-3 transition-colors group-hover:bg-white/15 group-focus-visible:bg-white/15">
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="font-display text-xl leading-tight">{event.title}</span>
                        <span className="t-label text-white/65">{photoIndex + 1} / {event.photos.length} photos</span>
                      </span>
                      <Camera size={22} aria-hidden="true" className="shrink-0" />
                    </span>
                  </>
                }
              />
            </div>

            <div role="group" aria-label="Hackathon slideshow controls">
              <div className="flex items-center justify-center">
                {events.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    aria-label={`Show ${item.title}`}
                    aria-pressed={index === eventIndex}
                    onClick={() => setSlide(index)}
                    className="group grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-black/15 focus-visible:outline-2 focus-visible:outline-white"
                  >
                    <span className={`h-2 rounded-full transition-[width,background-color] motion-reduce:transition-none ${index === eventIndex ? "w-6 bg-white" : "w-2 bg-white/45 group-hover:bg-white/80"}`} />
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between gap-2">
                <button type="button" className={CONTROL} aria-label="Previous hackathon photo" onClick={() => setSlide((value) => Math.max(0, value - 1))} disabled={slide === 0}><ChevronLeft size={20} /></button>
                {!reduceMotion && (
                  <button type="button" className={CONTROL} aria-label={paused ? "Play slideshow" : "Pause slideshow"} onClick={() => setPaused((value) => !value)}>{paused ? <Play size={17} /> : <Pause size={17} />}</button>
                )}
                <button type="button" className={CONTROL} aria-label="Next hackathon photo" onClick={() => setSlide((value) => value + 1)}><ChevronRight size={20} /></button>
              </div>
            </div>
          </div>

          <SegmentFooter tone="dark" className="flex items-end gap-5 border-white/25">
            <p className="t-numeral text-[72px] leading-[0.85] tracking-[-0.07em]">{String(events.length).padStart(2, "0")}</p>
            <p className="t-label pb-1 text-white/80">hackathons since 2025</p>
          </SegmentFooter>
        </Segment>
        {children}
      </div>
    </section>
  );
}
