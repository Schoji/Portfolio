import type { ComponentType, ReactNode } from "react";
import { techStyle } from "../tech";

/**
 * The bottom block of a segment, set off by a 1px hairline. `tone` is the
 * segment's ground: dark segments get a white hairline, light ones a black one.
 */
export function SegmentFooter({
  tone,
  className = "",
  children,
}: {
  tone: "dark" | "light";
  className?: string;
  children: ReactNode;
}) {
  const line = tone === "dark" ? "border-white/10" : "border-black/10";
  return <div className={`border-t ${line} pt-6 ${className}`}>{children}</div>;
}

type Icon = ComponentType<{ className?: string; size?: number }>;

const buttonStyles = {
  // White pill with black text, on dark grounds.
  primary: "bg-white text-black hover:bg-white/90",
  // Black pill with white text, on light grounds.
  inverse: "bg-black text-white hover:bg-black/85",
  // Translucent white on dark grounds; the one that carries an icon.
  secondary: "bg-white/12 text-white hover:bg-white/20",
  // Translucent black on light grounds.
  "secondary-light": "bg-black/7 text-black hover:bg-black/12",
} as const;

/** Buttons are 52px filled pills. They must never look like tags. */
export function Button({
  href,
  onClick,
  variant,
  icon: IconComp,
  children,
  external,
  download,
}: {
  href?: string;
  onClick?: () => void;
  variant: keyof typeof buttonStyles;
  icon?: Icon;
  children: ReactNode;
  external?: boolean;
  /** Link to a file to save rather than a page to open. */
  download?: boolean;
}) {
  const cls = `t-button inline-flex h-[52px] shrink-0 items-center gap-2.5 rounded-full ${
    IconComp ? "pl-5 pr-[22px]" : "px-6"
  } transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${
    buttonStyles[variant]
  }`;
  const inner = (
    <>
      {IconComp && <IconComp size={18} className="shrink-0" />}
      {children}
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        download={download || undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/** Tags: small outlined rectangles with no fill. Different size, shape and fill from buttons. */
export function Tag({ children, strong = false }: { children: ReactNode; strong?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border border-white/18 text-[13px] font-medium leading-[1.2] ${
        strong ? "px-3 py-[7px] text-white" : "px-2.5 py-1.5 text-white/75"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * A technology tag: the same outlined rectangle, tinted with the technology's
 * own colour and led by its logo. Unknown names fall back to a plain `Tag`.
 */
export function TechTag({ name, strong = false }: { name: string; strong?: boolean }) {
  const tech = techStyle(name);
  if (!tech) return <Tag strong={strong}>{name}</Tag>;
  const { icon: Logo, color } = tech;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border text-[13px] font-medium leading-[1.2] text-white ${
        strong ? "px-3 py-[7px]" : "px-2.5 py-1.5"
      }`}
      style={{
        borderColor: `color-mix(in srgb, ${color} 38%, transparent)`,
        background: `color-mix(in srgb, ${color} 9%, transparent)`,
      }}
    >
      {Logo && <Logo size={13} className="shrink-0" aria-hidden style={{ color }} />}
      {name}
    </span>
  );
}

/** "Built with" + tags, the footer line of a project. */
export function BuiltWith({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="t-label mr-0 text-[color:var(--text-secondary)]">Built with</span>
      {items.map((t) => (
        <TechTag key={t} name={t} />
      ))}
    </div>
  );
}
