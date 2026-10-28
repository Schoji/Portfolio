"use client";

import { useEffect, useRef } from "react";

/**
 * Looping Spore-style galaxy (rendered offline by ~/Coding/spore-galaxy with
 * `--arms 2 --seconds 48 --fps 30`) fixed behind the whole page. It is kept
 * faint and slow so it reads as texture: the segments are opaque, so it only
 * shows in the black gaps around them. The slowness is rendered into the
 * video, not set with playbackRate, which would drop the frame rate.
 * Under prefers-reduced-motion it stays on the poster frame.
 */
export function GalaxyBackdrop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => (query.matches ? video.pause() : void video.play().catch(() => {}));
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/v2/galaxy/poster.webp"
        className="h-full w-full object-cover opacity-25"
      >
        <source src="/v2/galaxy/galaxy.webm" type="video/webm" />
        <source src="/v2/galaxy/galaxy.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
