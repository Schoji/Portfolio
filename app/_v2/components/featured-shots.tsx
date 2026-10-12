"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Box, Heart, Mic, Star, X } from "lucide-react";
import { createContext, useContext, useState, type CSSProperties, type ReactNode } from "react";
import type { Featured } from "../featured";
import { EASE_OUT } from "./segment";

/*
 * "Featured shots": the phone on a project's stage, dressed up the way an App
 * Store marketing shot is — the app's logo as a giant tone-on-tone watermark,
 * a soft light and grain on the gradient, and real pieces of the UI lifted
 * out of the screen and floating over the device.
 *
 * Everything floating is positioned and sized in % / `cqw` of the phone box,
 * so the whole composition scales with the phone at every breakpoint.
 *
 * Rotations live on an inner element: the reduced-motion and no-JS rules in
 * v2.css reset `transform` on every `[data-reveal]` element.
 */

/**
 * True when a composition is drawn as a small cover on /projects
 * (featured-cover.tsx). Images then ask for small widths instead of the
 * home-screen sizes, so a ~300px cover does not download 700px images.
 */
export const InCover = createContext(false);

function useSizes(full: string) {
  return useContext(InCover) ? "200px" : full;
}

/** Soft light from the top left. Exported so a cover can spread it edge to edge. */
export const LIGHT = "radial-gradient(120% 80% at 15% 0%, rgb(255 255 255 / 0.32), transparent 60%)";

export const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/** Light from the top left, grain over the gradient, and the logo watermark. */
function Atmosphere({ children }: { children?: ReactNode }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="shot-light absolute inset-0" style={{ background: LIGHT }} />
      {children}
      <div className="shot-grain absolute inset-0 opacity-[0.12] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
    </div>
  );
}

/** A floating piece of UI: rises in after the phone, then drifts gently. */
function Float({
  className = "",
  style,
  rotate = 0,
  delay = 0.6,
  drift = 0,
  hover = [0, -8],
  children,
}: {
  className?: string;
  style?: CSSProperties;
  rotate?: number;
  delay?: number;
  /** Phase offset of the idle drift, in seconds. */
  drift?: number;
  /** Where the piece moves (x, y in % of itself) while its /projects cover is hovered. */
  hover?: [number, number];
  children: ReactNode;
}) {
  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      className={`absolute ${className}`}
      style={style}
    >
      <div className="shot-hover" style={{ "--hx": `${hover[0]}%`, "--hy": `${hover[1]}%` } as CSSProperties}>
        <div className="shot-drift" style={{ animationDelay: `${-drift}s` }}>
          <div style={{ transform: `rotate(${rotate}deg)` }}>{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

/** The screenshot sits inside a tilted device, with a separate metal chassis. */
function Phone({ p }: { p: Featured }) {
  const sizes = useSizes("(min-width: 1600px) 380px, (min-width: 1024px) 360px, 65vw");
  return (
    <div className="shot-device">
      <div aria-hidden className="shot-chassis" />
      <div aria-hidden className="shot-button shot-button-volume" />
      <div aria-hidden className="shot-button shot-button-power" />
      <div className="shot-face" style={{ boxShadow: `0 30px 60px -18px ${p.color.shadow}` }}>
        <div className="shot-screen">
          <Image src={p.visual.src} alt={p.visual.alt} fill sizes={sizes} className="object-cover object-top" />
          <div aria-hidden className="shot-glass" />
        </div>
      </div>
    </div>
  );
}

/** Shared frame: atmosphere, then the phone box that floating pieces are placed against. */
function Stage({ p, watermark, children }: { p: Featured; watermark: ReactNode; children: ReactNode }) {
  return (
    <>
      <Atmosphere>{watermark}</Atmosphere>
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
        className={`shot-composition absolute left-1/2 top-[10%] w-[68%] max-w-[380px] -translate-x-1/2 [container-type:inline-size] ${p.slug === "until-done" ? "shot-composition-reverse" : ""}`}
        style={{ aspectRatio: "380 / 826" }}
      >
        <div className="shot-hover absolute inset-0" style={{ "--hx": "0%", "--hy": "-3%" } as CSSProperties}>
          <Phone p={p} />
        </div>
        {children}
      </motion.div>
    </>
  );
}

/** A screenshot crop with the card's own corner radius and a lifted shadow. */
function Crop({ src, ratio, radius, shadow }: { src: string; ratio: string; radius: string; shadow: string }) {
  const sizes = useSizes("420px");
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        aspectRatio: ratio,
        borderRadius: radius,
        boxShadow: `0 1px 0 rgb(255 255 255 / 0.25) inset, 0 24px 48px -8px ${shadow}, 0 8px 16px -4px ${shadow}`,
      }}
    >
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plan PM: two classes lifted out of the timetable                     */
/* ------------------------------------------------------------------ */

function DolphinMark({ className = "", style }: { className?: string; style?: CSSProperties }) {
  const mask = "url(/v2/featured/plan-pm-dolphin.webp) center / contain no-repeat";
  return <div className={className} style={{ ...style, WebkitMask: mask, mask }} />;
}

const CLASSES = [
  // Positions match the cards' own place on the screen (58.7% and 70.9% down,
  // 4% in), nudged up and out so they read as lifted off the timetable.
  { src: "/v2/featured/plan-pm-lecture-1.webp", ratio: "1104 / 279", top: 56, left: -9, rotate: -5 },
  { src: "/v2/featured/plan-pm-lecture-2.webp", ratio: "1104 / 279", top: 70, left: 14, rotate: 4 },
];

function PlanPmShot({ p }: { p: Featured }) {
  const shadow = "rgb(22 34 92 / 0.4)";
  return (
    <Stage
      p={p}
      watermark={
        <DolphinMark
          className="absolute -left-[42%] -top-[6%] aspect-[1926/2000] w-[150%] -rotate-[8deg]"
          style={{ backgroundColor: "rgb(255 255 255 / 0.22)" }}
        />
      }
    >
      {/* App icon, as it sits on the home screen. */}
      <Float className="-right-[13%] top-[3%] w-[24cqw]" rotate={9} delay={0.55} drift={1.2} hover={[18, -18]}>
        <div
          className="grid aspect-square place-items-center rounded-[22%] bg-white"
          style={{ boxShadow: `0 1px 0 rgb(255 255 255 / 0.6) inset, 0 20px 40px -8px ${shadow}` }}
        >
          <DolphinMark className="aspect-[1926/2000] w-[74%] bg-black" />
        </div>
      </Float>

      {/* Upcoming classes lift out of the home screen. */}
      {CLASSES.map((c, i) => (
        <Float
          key={c.src}
          className="w-[96%]"
          style={{ top: `${c.top}%`, left: `${c.left}%`, zIndex: i + 1 }}
          rotate={c.rotate}
          delay={0.8 + i * 0.15}
          drift={i * 1.3}
          hover={i === 0 ? [-12, -30] : [12, 30]}
        >
          <Crop src={c.src} ratio={c.ratio} radius="5.2cqw" shadow={shadow} />
        </Float>
      ))}
    </Stage>
  );
}

/* ------------------------------------------------------------------ */
/* Until Done: the reminders that do not stop                          */
/* ------------------------------------------------------------------ */

/** The Until Done check, drawn as a vector so it stays sharp on any tile. */
function Check({ className = "", style, color }: { className?: string; style?: CSSProperties; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id="ud-check" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38C9D4" />
          <stop offset="1" stopColor="#1279C2" />
        </linearGradient>
      </defs>
      <path
        d="M26 52 L43 69 L74 33"
        fill="none"
        stroke={color ?? "url(#ud-check)"}
        strokeWidth="13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** An iOS notification banner, with the copy the app actually sends. */
function Notification({ title, body, time }: { title: string; body: string; time: string }) {
  return (
    <div
      className="flex items-start gap-[3.4cqw] rounded-[6cqw] border border-white/10 p-[3.8cqw] text-white"
      style={{
        // Solid rather than backdrop-blurred: the blur drew vertical stripes
        // while the cards drift and scale.
        background: "rgb(30 30 32 / 0.95)",
        boxShadow: "0 1px 0 rgb(255 255 255 / 0.12) inset, 0 24px 48px -10px rgb(77 58 0 / 0.5)",
      }}
    >
      <div className="grid size-[11.5cqw] shrink-0 place-items-center rounded-[2.8cqw] bg-white">
        <Check className="size-[10cqw]" />
      </div>
      <div className="min-w-0 flex-1 leading-[1.25]">
        <div className="flex items-baseline justify-between gap-[2cqw]">
          <span className="truncate text-[4.6cqw] font-semibold">{title}</span>
          <span className="shrink-0 text-[3.8cqw] text-white/50">{time}</span>
        </div>
        <p className="text-[4.2cqw] text-white/80">{body}</p>
      </div>
    </div>
  );
}

const REMINDERS = [
  { time: "4m ago", title: "1 task is overdue!", body: "The task ‘Send weekly report’ is past its deadline." },
  { time: "2m ago", title: "1 task is overdue!", body: "The task ‘Send weekly report’ is past its deadline." },
  { time: "now", title: "2 tasks are overdue!", body: "‘Send weekly report’ and ‘Book dentist appointment’ are past their deadlines." },
];

function UntilDoneShot({ p }: { p: Featured }) {
  return (
    <Stage
      p={p}
      watermark={
        <Check
          className="absolute -left-[30%] top-[22%] w-[130%] -rotate-[6deg]"
          color="rgb(255 255 255 / 0.3)"
        />
      }
    >
      {/* They keep coming: each reminder lands a beat after the last, and
          the latest is the one closest to you. */}
      {REMINDERS.map((n, i) => (
        <Float
          key={n.time}
          className="w-[112%]"
          style={{ top: `${20 + i * 19}%`, left: `${[-18, 6, -12][i]}%`, zIndex: i }}
          rotate={[-3, 2.5, -1.5][i]}
          delay={0.6 + i * 0.35}
          drift={i * 1.3}
          hover={([[-10, -40], [10, 0], [-8, 40]] as [number, number][])[i]}
        >
          <Notification {...n} />
        </Float>
      ))}
    </Stage>
  );
}

type Swipe = "pass" | "like" | "superlike";

// Where each card sits in the deck, front first.
const DECK_SLOTS = [
  { x: "0%", y: "0%", rotate: -5, rotateX: 5, rotateY: -12, scale: 1, zIndex: 3 },
  { x: "-9%", y: "-3%", rotate: -16, rotateX: 0, rotateY: 0, scale: 0.97, zIndex: 2 },
  { x: "8%", y: "-8%", rotate: 12, rotateX: 0, rotateY: 0, scale: 0.94, zIndex: 1 },
];

// Where a card flies when swiped: left for pass, right for like, up for a super like.
const SWIPE_OUT: Record<Swipe, { x: string; y: string; rotate: number }> = {
  pass: { x: "-130%", y: "8%", rotate: -28 },
  like: { x: "130%", y: "8%", rotate: 28 },
  superlike: { x: "0%", y: "-140%", rotate: 0 },
};

/**
 * Linder's deck, semi-interactive on the home page: the three buttons swipe
 * the front profile away (left, right or up) and it rejoins at the back, so
 * the distros loop. On a /projects cover the deck is inside a link, so the
 * buttons are drawn but do nothing there.
 */
function LinderShot({ p }: { p: Featured }) {
  const inCover = useContext(InCover);
  const back = useSizes("(min-width: 1024px) 440px, 65vw");
  const front = useSizes("(min-width: 1600px) 480px, (min-width: 1024px) 440px, 65vw");
  const profiles = [
    { src: p.visual.src, alt: p.visual.alt },
    { src: "/v2/linder/tuxedo.webp", alt: "Linder dating profile for TUXEDO OS" },
    { src: "/v2/linder/pureos.webp", alt: "Linder dating profile for PureOS" },
  ];
  const [top, setTop] = useState(0);
  const [swipe, setSwipe] = useState<Swipe | null>(null);

  const go = (kind: Swipe) => {
    if (!swipe) setSwipe(kind);
  };
  const landed = () => {
    if (!swipe) return;
    setSwipe(null);
    setTop((t) => (t + 1) % profiles.length);
  };

  const controls: { kind: Swipe; label: string; className: string; icon: ReactNode }[] = [
    { kind: "pass", label: "Pass", className: "linder-pass", icon: <X strokeWidth={2.5} /> },
    { kind: "superlike", label: "Super like", className: "linder-superlike", icon: <Star className="fill-current" strokeWidth={2.5} /> },
    { kind: "like", label: "Like", className: "linder-like", icon: <Heart strokeWidth={2.5} /> },
  ];

  return (
    <>
      <Atmosphere>
        <Heart className="absolute -right-[24%] top-[12%] size-[110%] -rotate-[18deg] text-white/20" strokeWidth={0.7} />
      </Atmosphere>
      <div aria-hidden className="absolute left-[8%] top-[7%] flex items-center gap-3 text-black">
        <Image src="/v2/linder/icon.svg" alt="" width={40} height={40} className="rounded-xl" />
        <span className="shot-text font-display text-3xl">Linder</span>
      </div>
      <div className="shot-hover absolute inset-0" style={{ "--hx": "0%", "--hy": "-5%" } as CSSProperties}>
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
          className="linder-deck"
        >
          {profiles.map((profile, i) => {
            const slot = (i - top + profiles.length) % profiles.length;
            const leaving = slot === 0 && swipe !== null;
            const pose = leaving ? { ...DECK_SLOTS[0], ...SWIPE_OUT[swipe], opacity: 0, zIndex: 4 } : { ...DECK_SLOTS[slot], opacity: 1 };
            return (
              <motion.div
                key={profile.src}
                aria-hidden={slot !== 0}
                className="linder-card"
                initial={false}
                animate={pose}
                transition={{ duration: leaving ? 0.42 : 0.6, ease: leaving ? [0.4, 0, 1, 1] : EASE_OUT }}
                onAnimationComplete={leaving ? landed : undefined}
                style={{ zIndex: pose.zIndex, boxShadow: slot === 0 ? `0 35px 65px -15px ${p.color.shadow}` : undefined }}
              >
                <Image src={profile.src} alt={slot === 0 ? profile.alt : ""} fill sizes={slot === 0 ? front : back} />
                {slot === 0 && <div aria-hidden className="shot-glass" />}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      <div className="linder-controls" aria-hidden={inCover || undefined}>
        {controls.map((c) =>
          inCover ? (
            <span key={c.kind} className={c.className}>
              {c.icon}
            </span>
          ) : (
            <button key={c.kind} type="button" aria-label={c.label} className={c.className} onClick={() => go(c.kind)}>
              {c.icon}
            </button>
          ),
        )}
      </div>
    </>
  );
}

function GcodecShot({ p }: { p: Featured }) {
  return (
    <>
      <Atmosphere />
      <div aria-hidden className="gcodec-grid" />
      <div aria-hidden className="absolute left-[8%] top-[7%] flex items-center gap-3 text-white">
        <span className="grid size-10 place-items-center rounded-xl border border-white/20 bg-black/90 text-[var(--seg-sage)]"><Box size={24} strokeWidth={1.5} /></span>
        <span className="shot-text font-display text-3xl">GCodec</span>
      </div>
      <motion.div
        data-reveal
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1, ease: EASE_OUT, delay: 0.25 }}
        className="gcodec-preview"
      >
        <div className="gcodec-window" style={{ boxShadow: `0 35px 70px -15px ${p.color.shadow}` }}>
          <div aria-hidden className="gcodec-titlebar">
            <span /><span /><span /><p>gcode Viewer</p>
          </div>
          <div aria-hidden className="gcodec-floor" />
        </div>
      </motion.div>
      <div className="shot-hover absolute inset-0" style={{ "--hx": "0%", "--hy": "-7%" } as CSSProperties}>
        <motion.div
          data-reveal
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.4 }}
          className="gcodec-benchy"
        >
          <div className="shot-drift relative h-full w-full">
            <Image src="/v2/gcodec/benchy-toolpaths-v2.webp" alt="Benchy floating above the viewer, rendered from its original G-code toolpaths" fill unoptimized sizes="(min-width: 1024px) 700px, 90vw" className="object-contain" />
          </div>
        </motion.div>
      </div>
      <div className="shot-text gcodec-legend">
        <span><i className="gcodec-extrusion" />Extrusion</span>
        <span><i className="gcodec-travel" />Travel</span>
        <span><i className="gcodec-retraction" />Retraction</span>
      </div>
    </>
  );
}

const FACE_STATES = ["Idle", "Listening", "Thinking", "Talking", "Sleeping", "Error"];

/** Geometry follows voice-assistant-v2/client/oled/face.py (128 × 64 OLED). */
function AleksyFace() {
  return (
    <div className="aleksy-face-cycle" aria-label="OLED expressions: idle, listening, thinking, talking, sleeping and error">
      {FACE_STATES.map((state, index) => (
        <svg key={state} viewBox="0 0 128 64" className={`aleksy-face-frame aleksy-face-${state.toLowerCase()}`} style={{ animationDelay: `${index * 3}s` }} aria-hidden>
          <text x="64" y="11" textAnchor="middle" fill="#f7de88" fontSize="9" fontWeight="600">{state}</text>
          {state === "Listening" && Array.from({ length: 16 }, (_, i) => (
            <rect key={i} className="aleksy-meter" x={33 + i * 4} y={14 - (4 + (i * 7) % 9)} width="2" height={4 + (i * 7) % 9} fill="#f7de88" style={{ animationDelay: `${i * -0.13}s` }} />
          ))}
          <g className={state === "Sleeping" || state === "Error" ? "" : "aleksy-blink"} fill="#32e7f2" stroke="#32e7f2">
            {[42, 86].map((x) => state === "Error" ? (
              <path key={x} d={`M${x - 7} 29l14 14m-14 0l14-14`} fill="none" strokeWidth="3" />
            ) : state === "Sleeping" ? (
              <path key={x} d={`M${x - 9} 36q9 9 18 0`} fill="none" strokeWidth="2" />
            ) : (
              <rect key={x} x={x - (state === "Listening" ? 10 : 9) + (state === "Thinking" ? 6 : 0)} y={state === "Thinking" ? 25 : state === "Listening" ? 24 : 26} width={state === "Listening" ? 20 : 18} height={state === "Thinking" ? 14 : state === "Listening" ? 24 : 20} rx="5" stroke="none" />
            ))}
          </g>
          <g fill="#32e7f2" stroke="#32e7f2" strokeWidth="2">
            {state === "Idle" && <path d="M54 53q10 8 20 0" fill="none" />}
            {state === "Listening" && <circle cx="64" cy="55" r="3" fill="none" />}
            {state === "Thinking" && <path d="M58 56l14-2" />}
            {state === "Talking" && <ellipse className="aleksy-talking-mouth" cx="64" cy="55" rx="8" ry="4" />}
            {state === "Sleeping" && <circle cx="64" cy="55" r="3" fill="none" />}
            {state === "Error" && <path d="M54 59q10-9 20 0" fill="none" />}
          </g>
          {state === "Sleeping" && <text x="94" y="22" fill="#f7de88" fontSize="10">zZ</text>}
        </svg>
      ))}
    </div>
  );
}

function AleksyShot({ p }: { p: Featured }) {
  const sizes = useSizes("(min-width: 1024px) 700px, 95vw");
  return (
    <>
      <Atmosphere />
      <div aria-hidden className="absolute bottom-[22%] left-[14%] h-[8%] w-[72%] rounded-[50%] bg-black/20 blur-2xl" />
      <Float className="inset-[4%]" delay={0.2} hover={[0, -3]}>
        <div className="relative aspect-square w-full" style={{ filter: `drop-shadow(0 28px 24px ${p.color.shadow})` }}>
          <Image src={p.visual.src} alt={p.visual.alt} fill sizes={sizes} className="object-contain" />
        </div>
      </Float>
      <div className="absolute inset-0" style={{ containerType: "inline-size" }}>
        <Float className="shot-text left-[7%] top-[12%] w-[43%]" rotate={-7} delay={0.5} drift={1}>
          <div className="aleksy-bubble aleksy-bubble-light">
            <span className="aleksy-caption">WAKE WORD</span>
            <span className="aleksy-phrase">“Hey, Aleksy”</span>
          </div>
        </Float>
        <Float className="right-[6%] top-[20%] w-[32%]" rotate={9} delay={0.7} drift={3} hover={[16, -16]}>
          <div className="aleksy-oled">
            <AleksyFace />
          </div>
        </Float>
        <Float className="bottom-[22%] left-[6%] w-[47%]" rotate={-5} delay={0.8} drift={2} hover={[-14, 14]}>
          <div className="aleksy-bubble aleksy-bubble-dark">
            <span className="shot-text aleksy-caption flex items-center gap-2"><Mic size={14} aria-hidden /> LISTENING</span>
            <div className="aleksy-wave" aria-hidden>
              {[20, 35, 60, 42, 78, 100, 68, 40, 82, 58, 100, 72, 45, 65, 90, 52, 30, 48, 20].map((height, i) => (
                <i key={i} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
        </Float>
        <Float className="shot-text bottom-[9%] right-[6%] w-[49%]" rotate={6} delay={1} drift={4}>
          <div className="aleksy-bubble aleksy-bubble-light">
            <span className="aleksy-caption">VOICE RESPONSE</span>
            <span className="aleksy-phrase">“One moment…”</span>
          </div>
        </Float>
      </div>
    </>
  );
}

/** Slug → composition. Projects without one keep their standard device. */
export const featuredShots: Record<string, (props: { p: Featured }) => ReactNode> = {
  "plan-pm": PlanPmShot,
  "until-done": UntilDoneShot,
  "linuxinder": LinderShot,
  "gcodec": GcodecShot,
  "aleksy-v2": AleksyShot,
};
