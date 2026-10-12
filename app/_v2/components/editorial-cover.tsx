import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { Bell, MapPin, QrCode } from "lucide-react";
import type { Cover } from "../covers";

const sizes = "(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw";

type Pose = CSSProperties & Record<`--${string}`, string>;

/**
 * Resting pose (x, y, r) and hover pose (hx, hy, hr, s) as CSS variables;
 * `.cover-piece` in v2.css animates between them while the row is hovered.
 */
function pose(p: Record<string, string | undefined>, style: CSSProperties = {}): Pose {
  return { ...style, ...Object.fromEntries(Object.entries(p).filter(([, v]) => v !== undefined).map(([k, v]) => [`--${k}`, v])) } as Pose;
}

function Shot({ src, className, style, position = "top" }: { src: string; className: string; style: Pose; position?: string }) {
  return (
    <div className={`cover-piece ${className}`} style={style}>
      <Image src={src} alt="" fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layouts                                                             */
/* ------------------------------------------------------------------ */

function Fan({ images }: { images: string[] }) {
  if (images.length === 1) {
    return <Shot src={images[0]} className="cover-phone" style={pose({ r: "-4deg", hy: "-3cqw", hr: "2deg", s: "1.04" }, { left: "52%", top: "14%" })} />;
  }
  // Outer phones first so the middle one sits on top.
  const spots = [
    { left: "30%", top: "26%", p: { r: "-10deg", hx: "-6cqw", hr: "-16deg" } },
    { left: "68%", top: "26%", p: { r: "10deg", hx: "6cqw", hr: "16deg" } },
    { left: "49%", top: "14%", p: { r: "0deg", hy: "-3cqw", s: "1.05" } },
  ];
  const order = images.length === 2 ? [spots[0], spots[2]] : spots;
  const srcs = images.length === 2 ? [images[1], images[0]] : [images[1], images[2], images[0]];
  return (
    <>
      {order.map((spot, i) => (
        <Shot key={srcs[i]} src={srcs[i]} className="cover-phone" style={pose(spot.p, { left: spot.left, top: spot.top })} />
      ))}
    </>
  );
}

function Stack({ images }: { images: string[] }) {
  const spots = [
    { left: "38%", top: "22%", p: { r: "6deg", hx: "6cqw", hy: "-3cqw", hr: "10deg" } },
    { left: "25%", top: "33%", p: { r: "1deg", hx: "1cqw", hy: "-1cqw", hr: "2deg" } },
    { left: "12%", top: "44%", p: { r: "-4deg", hx: "-4cqw", hy: "1cqw", hr: "-7deg" } },
  ];
  // The first image is the project's main screen, so it goes in front:
  // later images sit further back and are drawn first.
  const shown = images.slice(0, 3);
  const back = spots.slice(spots.length - shown.length);
  return (
    <>
      {[...shown].reverse().map((src, i) => (
        <Shot key={src} src={src} className="cover-window cover-window-sm" style={pose(back[i].p, { left: back[i].left, top: back[i].top })} />
      ))}
    </>
  );
}

function BigWindow({ src }: { src: string }) {
  return <Shot src={src} className="cover-window" style={pose({ r: "-3deg", hx: "-2cqw", hy: "-5cqw", hr: "0deg" }, { left: "18%", top: "26%", width: "92%", height: "86%" })} />;
}

function Polaroids({ images }: { images: string[] }) {
  const spots = [
    { left: "50%", top: "14%", p: { r: "7deg", hx: "5cqw", hy: "-2cqw", hr: "12deg" } },
    { left: "26%", top: "30%", p: { r: "-8deg", hx: "-6cqw", hy: "1cqw", hr: "-14deg" } },
    { left: "40%", top: "24%", p: { r: "-1deg", hy: "-3cqw", hr: "2deg", s: "1.05" } },
  ];
  const solo = [{ left: "44%", top: "18%", p: { r: "5deg", hy: "-3cqw", hr: "-2deg", s: "1.04" } }];
  // The first photo is the main one, so it takes the front spot (drawn last);
  // the others fill the spots behind it.
  const shown = images.slice(0, 3);
  const list = [...shown.slice(1), shown[0]];
  const used = shown.length === 1 ? solo : spots.slice(spots.length - shown.length);
  return (
    <>
      {list.map((src, i) => (
        <div key={src} className="cover-piece cover-polaroid" style={pose(used[i].p, { left: used[i].left, top: used[i].top })}>
          <div className="relative h-full w-full overflow-hidden">
            <Image src={src} alt="" fill sizes={sizes} className="object-cover" />
          </div>
        </div>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Decoration                                                          */
/* ------------------------------------------------------------------ */

function Decor({ c }: { c: Cover }): ReactNode {
  switch (c.decor) {
    case "radar":
      return (
        <div className="cover-radar" style={{ color: c.accent }}>
          <i />
          <i />
          <i />
          <span className="cover-radar-beam" />
        </div>
      );
    case "path":
      return (
        <svg className="cover-path" viewBox="0 0 160 100" preserveAspectRatio="none" style={{ color: c.accent }}>
          <path d="M6 92 C 40 92, 30 50, 70 52 S 110 20, 154 10" pathLength={1} />
          {[
            [6, 92],
            [70, 52],
            [154, 10],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3.2" />
          ))}
        </svg>
      );
    case "cursors":
      return (
        <>
          <span className="cover-piece cover-cursor" style={pose({ hx: "-7cqw", hy: "4cqw" }, { left: "58%", top: "46%", color: "#2f6fe4" })}>
            <CursorArrow />
            <b>Editing</b>
          </span>
          <span className="cover-piece cover-cursor" style={pose({ hx: "6cqw", hy: "-5cqw" }, { left: "34%", top: "62%", color: "#d0581c" })}>
            <CursorArrow />
          </span>
        </>
      );
    case "sparkline":
      return (
        <div className="cover-piece cover-spark" style={pose({ r: "4deg", hy: "-3cqw", hr: "0deg", s: "1.06" }, { right: "5%", top: "9%" })}>
          <svg viewBox="0 0 100 36" preserveAspectRatio="none">
            <path d="M2 30 L14 26 L24 28 L36 18 L48 21 L60 12 L72 15 L84 6 L98 4" pathLength={1} />
          </svg>
        </div>
      );
    case "route":
      return (
        <>
          <svg className="cover-path cover-route" viewBox="0 0 160 100" preserveAspectRatio="none" style={{ color: c.accent }}>
            <path d="M30 86 L30 60 L92 60 L92 34 L132 34" pathLength={1} />
          </svg>
          <span className="cover-piece cover-pin" style={pose({ hy: "-2cqw", s: "1.15" }, { left: "79%", top: "21%", background: c.accent })}>
            <MapPin />
          </span>
          <span className="cover-piece cover-qr" style={pose({ r: "-8deg", hr: "0deg", hy: "-2cqw" }, { right: "5%", bottom: "9%" })}>
            <QrCode />
          </span>
        </>
      );
    case "discord":
      return (
        <div className="cover-piece cover-discord" style={pose({ r: "-4deg", hx: "2cqw", hy: "-3cqw", hr: "0deg" }, { left: "6%", top: "28%" })}>
          <span className="cover-discord-avatar">
            <Bell />
          </span>
          <span className="cover-discord-lines">
            <b>Doorbell</b>
            <i />
            <i />
          </span>
        </div>
      );
    case "wave":
      return (
        <div className="cover-wave" style={{ color: c.accent }}>
          {[30, 55, 80, 45, 100, 70, 40, 85, 60, 35, 75, 50].map((h, i) => (
            <i key={i} style={{ height: `${h}%`, animationDelay: `${i * -0.11}s` }} />
          ))}
        </div>
      );
    case "flashlight":
      return <div className="cover-flashlight" />;
    case "brackets":
      return (
        <span className="cover-brackets" style={{ color: c.accent }}>
          {"{ }"}
        </span>
      );
    default:
      return null;
  }
}

function CursorArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden>
      <path d="M2 1 L14 8 L8.5 9.2 L6 15 Z" fill="currentColor" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

export default function EditorialCover({ c, title }: { c: Cover; title: string }) {
  const Icon = c.icon;
  const behind = c.decor === "radar" || c.decor === "path" || c.decor === "wave" || c.decor === "brackets";
  return (
    <div
      aria-hidden="true"
      className={`project-thumbnail cover relative aspect-[16/10] overflow-hidden rounded-[16px] lg:rounded-[20px] cover-${c.layout}`}
      style={{ background: c.ground[0], color: c.ink }}
    >
      <div className="cover-glow" style={{ background: `radial-gradient(ellipse at 88% 100%, ${c.ground[1]}, transparent 68%)` }} />
      {behind && <Decor c={c} />}
      <span className="thumbnail-brand">
        <Icon className="cover-icon" />
        {title}
      </span>
      {c.layout === "fan" && <Fan images={c.images} />}
      {c.layout === "stack" && <Stack images={c.images} />}
      {c.layout === "window" && <BigWindow src={c.images[0]} />}
      {c.layout === "polaroids" && <Polaroids images={c.images} />}
      {!behind && <Decor c={c} />}
    </div>
  );
}
