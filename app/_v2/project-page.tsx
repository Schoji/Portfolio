import Image from "next/image";
import Link from "next/link";
import type { ComponentType, ElementType, ReactNode } from "react";
import { Check, ChevronLeft, ChevronRight, Download, Globe, Heart } from "lucide-react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { SiApple, SiGithub, SiGoogleplay } from "react-icons/si";
import { projects, type Project } from "../projects/projects";
import Nav from "./components/nav";
import ScreenshotGallery from "./components/screenshot-gallery";
import { Rise, Segment } from "./components/segment";
import { imageRatio } from "./image-ratio";
import { Button, TechTag } from "./components/ui";
import { KIND } from "./kinds";

type IconType = ComponentType<{ className?: string; size?: number }>;

const OS_ICON: Record<string, IconType> = { Windows: FaWindows, macOS: FaApple, Linux: FaLinux };

const imagesOf = (p: Project) => (Array.isArray(p.imageSource) ? p.imageSource : [p.imageSource]);

function Actions({ p }: { p: Project }) {
  const isGithub = p.buttonURL?.includes("github.com");
  const MainIcon = (p.icon ?? (isGithub ? SiGithub : Globe)) as IconType;
  const mainLabel = isGithub ? "GitHub" : p.buttonText?.startsWith("Visit") ? "Live site" : p.buttonText;
  return (
    <div className="flex flex-wrap gap-2">
      {p.downloads?.map((d, i) => (
        <Button key={d.os} href={d.url} download variant={i === 0 ? "primary" : "secondary"} icon={OS_ICON[d.os] ?? Download}>
          {d.os}
        </Button>
      ))}
      {p.buttonURL && (
        <Button href={p.buttonURL} external variant={p.downloads?.length ? "secondary" : "primary"} icon={MainIcon}>
          {mainLabel}
        </Button>
      )}
      {p.appStoreURL && (
        <Button href={p.appStoreURL} external variant="secondary" icon={SiApple}>
          App Store
        </Button>
      )}
      {p.playStoreURL && (
        <Button href={p.playStoreURL} external variant="secondary" icon={SiGoogleplay}>
          Google Play
        </Button>
      )}
    </div>
  );
}

const WINDOW_BAR = (
  <div className="flex h-8 items-center gap-1.5 pl-3.5" aria-hidden>
    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
    <span className="size-2.5 rounded-full bg-[#febc2e]" />
    <span className="size-2.5 rounded-full bg-[#28c840]" />
  </div>
);

/**
 * The hero image. Mobile apps show up to three screens as phones, the middle
 * one in front; everything else shows its first image at its real ratio, in a
 * window for software and as a plain photo for hardware.
 */
function HeroVisual({ p, ratio }: { p: Project; ratio: number }) {
  const images = imagesOf(p);
  const shadow = "0 40px 80px -20px rgb(0 0 0 / 0.8)";
  if (p.phone) {
    const shots = images.slice(0, 3);
    const place = shots.length === 1 ? ["z-10"] : shots.length === 2 ? ["-rotate-6 translate-x-[12%]", "z-10 rotate-3 -translate-x-[12%]"] : ["-rotate-6 translate-x-[30%] translate-y-[6%]", "z-10", "rotate-6 -translate-x-[30%] translate-y-[6%]"];
    // The middle phone takes z-10 so it sits in front of its neighbours.
    return (
      <div className="flex items-center justify-center py-4">
        {shots.map((src, i) => (
          <div
            key={src}
            className={`relative w-[34%] max-w-[220px] shrink-0 overflow-hidden rounded-[28px] bg-black lg:rounded-[34px] ${place[i]}`}
            style={{ aspectRatio: "9 / 19.5", outline: "6px solid #1c1c1f", boxShadow: shadow }}
          >
            <Image src={src} alt={i === 0 ? `${p.title} screens` : ""} fill priority sizes="220px" className="object-cover object-top" />
          </div>
        ))}
      </div>
    );
  }
  const windowed = p.kind !== "hardware";
  return (
    <div
      className={`mx-auto w-full overflow-hidden ${windowed ? "rounded-[14px] border border-white/12 bg-[#2a2a2c]" : "rounded-[24px]"}`}
      style={{ boxShadow: shadow, maxWidth: ratio < 1 ? `${Math.round(520 * ratio)}px` : undefined }}
    >
      {windowed && WINDOW_BAR}
      <div className="relative w-full" style={{ aspectRatio: ratio }}>
        <Image src={images[0]} alt={`${p.title} screenshot`} fill priority sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" />
      </div>
    </div>
  );
}

/**
 * Hero: breadcrumb, title, tagline and links beside the hero image, over a
 * blurred wash of that image. A project with `heroBackground` uses that photo
 * as the backdrop instead, since it already shows the product.
 */
async function Hero({ p }: { p: Project }) {
  const first = imagesOf(p)[0];
  const backdrop = p.heroBackground;
  // The ratio only frames the hero image, which a backdrop replaces.
  const ratio = backdrop ? 1 : await imageRatio(first);
  return (
    <header className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        {backdrop ? (
          <>
            <Image src={backdrop} alt="" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
          </>
        ) : (
          <Image src={first} alt="" fill sizes="50vw" className="scale-125 object-cover opacity-30 blur-3xl saturate-150" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      </div>
      <div
        className={`container-v2 relative grid items-center gap-12 pt-[128px] pb-14 lg:pt-[150px] lg:pb-20 ${
          backdrop ? "" : "lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16"
        }`}
      >
        <div className="flex min-w-0 flex-col">
          <nav aria-label="Breadcrumb" className="t-label flex items-center gap-1.5">
            <Link href="/projects" className="text-[color:var(--text-secondary)] transition-colors hover:text-white">
              Projects
            </Link>
            <ChevronRight size={14} aria-hidden className="text-white/30" />
            <span aria-current="page" className="text-white">{p.title}</span>
          </nav>
          <h1 className="font-display mt-6 text-[clamp(56px,7vw,112px)] leading-[0.92] tracking-[-0.04em] [overflow-wrap:anywhere]">{p.title}</h1>
          {p.tagline && <p className="t-lead mt-6 max-w-[620px] text-white/72">{p.tagline}</p>}
          <div className="mt-10">
            <Actions p={p} />
            {!p.buttonURL && !p.appStoreURL && !p.playStoreURL && !p.downloads?.length && p.status && (
              <p className="t-label text-[color:var(--text-secondary)]">{p.status}</p>
            )}
          </div>
        </div>
        {!backdrop && (
          <Rise delay={0.1}>
            <HeroVisual p={p} ratio={ratio} />
          </Rise>
        )}
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Body                                                                */
/* ------------------------------------------------------------------ */

/** One block of the main column: a hairline, then a heading and its content. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-6 border-t border-white/10 pt-10">
      <h2 className="font-display t-title">{title}</h2>
      {children}
    </section>
  );
}

function Highlights({ p }: { p: Project }) {
  if (!p.features.length) return null;
  return (
    <Block title="Highlights">
      <ul className="grid gap-2 sm:grid-cols-2">
        {p.features.map((feature, i) => {
          const f = typeof feature === "string" ? { title: feature, subtitle: undefined, icon: undefined } : feature;
          const Icon = (f.icon ?? Check) as ElementType;
          return (
            <li key={i} className="flex items-start gap-4 rounded-[20px] bg-[var(--bg-elevated)] p-5">
              <Icon size={20} aria-hidden className="mt-0.5 shrink-0 text-white/60" />
              <div className="flex flex-col gap-1">
                <p className="t-body font-medium text-white">{f.title}</p>
                {f.subtitle && <p className="t-label font-normal text-white/60">{f.subtitle}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </Block>
  );
}

function ListBlock({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <Block title={title}>
      <ul className="flex flex-col gap-3">
        {items.map((item, i) => (
          <li key={i} className="t-body flex gap-3.5 text-[18px] leading-[1.6] text-white/72">
            <span aria-hidden className="mt-[11px] block size-1.5 shrink-0 rounded-full bg-white/45" />
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </Block>
  );
}

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <dt className="t-label text-[color:var(--text-secondary)]">{label}</dt>
      <dd className="t-body text-white">{children}</dd>
    </div>
  );
}

/** Side card: the stack, then the facts. Sticky beside the text on desktop. */
function StackCard({ p }: { p: Project }) {
  return (
    <aside className="rounded-[24px] bg-[var(--bg-elevated)] p-6 lg:sticky lg:top-24 lg:p-7">
      <p className="t-label text-[color:var(--text-secondary)]">Built with</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {p.technologies.map((t) => (
<TechTag key={t} strong name={t} />
        ))}
      </div>
      <dl className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6">
        <Fact label="Platform">{KIND[p.kind].label}</Fact>
        {p.year && (
          <Fact label="Year">
            <span className="t-numeral">{p.year}</span>
          </Fact>
        )}
        {p.status && <Fact label="Status">{p.status}</Fact>}
        {p.role && <Fact label="Role">{p.role}</Fact>}
      </dl>
    </aside>
  );
}

function Body({ p }: { p: Project }) {
  return (
    <div className="container-v2 grid grid-cols-1 items-start gap-12 pb-16 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-20">
      <div className="flex min-w-0 max-w-[780px] flex-col gap-12">
        <p className="t-lead text-white">{p.description}</p>
        {p.story && (
          <Block title="Backstory">
            <p className="t-body text-[18px] leading-[1.6] text-white/72">{p.story}</p>
          </Block>
        )}
        <ListBlock title="Problems along the way" items={p.problems} />
        <ListBlock title="Takeaways" items={p.takeaways} />
        <Highlights p={p} />
      </div>
      <StackCard p={p} />
    </div>
  );
}

function Demo({ p }: { p: Project }) {
  if (!p.video) return null;
  return (
    <section className="container-v2 pb-16">
      <div className="border-t border-white/10 pt-10">
        <h2 className="font-display t-title">Demo</h2>
        <div
          className={`mt-8 overflow-hidden rounded-[24px] bg-[var(--bg-elevated)] ${
            p.video.vertical ? "mx-auto aspect-[9/16] w-full max-w-sm" : "aspect-video w-full"
          }`}
        >
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${p.video.youtubeId}`}
            title={`${p.title} demo video`}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}

function Screenshots({ p }: { p: Project }) {
  const images = imagesOf(p);
  return (
    <section className="container-v2 pb-16">
      <div className="border-t border-white/10 pt-10">
        <h2 className="font-display t-title">{images.length === 1 ? "Screenshot" : "Screenshots"}</h2>
        <div className="mt-8">
          <ScreenshotGallery images={images} phone={p.phone} title={p.title} />
        </div>
      </div>
    </section>
  );
}

/** Sortra's download block: paper, so it reads as the one action on the page. */
function Downloads({ p }: { p: Project }) {
  if (!p.downloads?.length) return null;
  return (
    <section className="container-v2 pb-16">
      <Segment className="bg-[var(--seg-paper)] px-7 py-10 text-center text-black lg:py-14">
        <h2 className="font-display t-title">Get {p.title}</h2>
        <p className="t-lead mx-auto mt-3 max-w-[560px] text-black/70">Free and open source. Pick your platform.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {p.downloads.map((d) => (
            <Button key={d.os} href={d.url} download variant="inverse" icon={OS_ICON[d.os] ?? Download}>
              {d.os}
            </Button>
          ))}
          {p.donateURL && (
            <Button href={p.donateURL} external variant="secondary-light" icon={Heart}>
              Support with a donation
            </Button>
          )}
        </div>
        <p className="t-label mx-auto mt-6 max-w-[620px] font-normal text-black/55">
          Provided as is, without warranty. Back up your files before use; by downloading you accept that you use it at
          your own risk.
        </p>
      </Segment>
    </section>
  );
}

/** Previous and next project, so a visitor can keep browsing without going back. */
function Neighbours({ index }: { index: number }) {
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const tile = (p: Project, label: string, alignEnd: boolean) => (
    <Link
      href={`/projects/${p.slug}`}
      className={`group flex flex-1 flex-col gap-1 rounded-[24px] bg-[var(--bg-elevated)] p-6 transition-colors hover:bg-[var(--bg-elevated-2)] ${alignEnd ? "sm:items-end sm:text-right" : ""}`}
    >
      <span className="t-label flex items-center gap-1 text-[color:var(--text-secondary)]">
        {!alignEnd && <ChevronLeft size={14} aria-hidden />}
        {label}
        {alignEnd && <ChevronRight size={14} aria-hidden />}
      </span>
      <span className="font-display text-[clamp(22px,2.4vw,32px)] leading-[1.1] tracking-[-0.025em]">{p.title}</span>
    </Link>
  );
  return (
    <nav aria-label="More projects" className="container-v2 pb-6">
      <div className="flex flex-col gap-2 border-t border-white/10 pt-10 sm:flex-row">
        {tile(prev, "Previous", false)}
        {tile(next, "Next", true)}
      </div>
    </nav>
  );
}

export default function ProjectPage({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  const p = projects[index];
  return (
    <>
      <Nav active="work" />
      <main>
        <Hero p={p} />
        <Body p={p} />
        <Demo p={p} />
        <Screenshots p={p} />
        <Downloads p={p} />
        <Neighbours index={index} />
      </main>
    </>
  );
}
