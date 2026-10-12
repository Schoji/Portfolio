"use client";

import { useEffect, useRef, useState } from "react";
import { stageBg, type Featured } from "../featured";
import { featuredShots, InCover } from "./featured-shots";

/**
 * The home-page composition of a featured project, reused as its cover on
 * /projects. The composition is laid out at a fixed design size (some of its
 * pieces are sized in px) and scaled down, so it looks exactly like the home
 * screen, only smaller. Mobile compositions are wide and fill the cover's
 * width (the phone bleeds off the bottom, as at home); stage compositions are
 * square and fit the cover's height, centred on the same gradient.
 */
const DESIGN = {
  mobile: { w: 1088, h: 680, fit: "width" },
  stage: { w: 720, h: 720, fit: "height" },
} as const;

/**
 * The cover's size on desktop (the list's 320px thumbnail column). The server
 * renders at this size, so the cover is drawn without JS and does not pop in;
 * the ResizeObserver then corrects it for other widths.
 */
const ASSUMED = { width: 320, height: 200 };

function fit(d: (typeof DESIGN)[keyof typeof DESIGN], width: number, height: number) {
  const scale = d.fit === "width" ? width / d.w : height / d.h;
  return { scale, x: (width - d.w * scale) / 2 };
}

export function FeaturedCover({ p }: { p: Featured }) {
  const Shot = featuredShots[p.slug];
  const box = useRef<HTMLDivElement>(null);
  const d = DESIGN[p.layout];
  const [frame, setFrame] = useState(() => fit(d, ASSUMED.width, ASSUMED.height));

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0) setFrame(fit(d, width, height));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [d]);

  return (
    <div
      ref={box}
      aria-hidden="true"
      className="project-thumbnail featured-cover relative aspect-[16/10] overflow-hidden rounded-[16px] lg:rounded-[20px]"
      style={stageBg(p)}
    >
      {Shot && (
        <div
          className="absolute top-0 left-0"
          style={{ width: d.w, height: d.h, transform: `translateX(${frame.x}px) scale(${frame.scale})`, transformOrigin: "0 0" }}
        >
          <div className="relative h-full w-full">
            <InCover.Provider value>
              <Shot p={p} />
            </InCover.Provider>
          </div>
        </div>
      )}
    </div>
  );
}
