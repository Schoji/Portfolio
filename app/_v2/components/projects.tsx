"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Globe } from "lucide-react";
import { SiApple, SiGithub, SiGoogleplay } from "react-icons/si";
import { projects } from "../../projects/projects";
import { featured, stageBg, type Featured } from "../featured";
import { featuredShots } from "./featured-shots";
import { Rise, Segment } from "./segment";
import { BuiltWith, Button, SegmentFooter } from "./ui";

const N = featured.length;
const pad = (n: number) => String(n).padStart(2, "0");
const anchor = (p: Featured) => `work-${p.slug}`;

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */


/** One phone, bleeding off the bottom edge of the clay segment (03a). */
function PhoneVisual({ p }: { p: Featured }) {
  const Shot = featuredShots[p.slug];
  if (Shot) return <Shot p={p} />;
  return (
    <Rise className="absolute inset-0">
    <div
      className="absolute left-1/2 top-[12%] w-[76%] max-w-[380px] -translate-x-1/2 overflow-hidden rounded-[48px] lg:rounded-[56px]"
      style={{
        aspectRatio: "380 / 826",
        outline: "10px solid #1c1c1f",
        boxShadow: `0 30px 70px ${p.color.shadow}`,
      }}
    >
      <Image src={p.visual.src} alt={p.visual.alt} fill sizes="380px" className="object-cover object-top" />
    </div>
    </Rise>
  );
}

/** A full desktop screenshot or photo, centred inside its half of the screen. */
function StageDeviceFrame({ p }: { p: Featured }) {
  const shadow = { boxShadow: `0 30px 70px ${p.color.shadow}` };
  if (p.visual.kind === "photo") {
    return (
      <div
        className="absolute left-1/2 top-1/2 h-[88%] max-w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px]"
        style={{ ...shadow, aspectRatio: p.visual.aspectRatio }}
      >
        <Image src={p.visual.src} alt={p.visual.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-contain" />
      </div>
    );
  }
  return (
    <div
      className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[14px] border border-white/12 bg-[#2a2a2c]"
      style={shadow}
    >
      {/* macOS title bar */}
      <div className="flex h-9 items-center gap-2 pl-4" aria-hidden>
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#febc2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="relative w-full" style={{ aspectRatio: p.visual.aspectRatio }}>
        <Image src={p.visual.src} alt={p.visual.alt} fill sizes="(min-width: 1024px) 560px, 90vw" className="object-contain" />
      </div>
    </div>
  );
}

function StageDevice({ p }: { p: Featured }) {
  const Shot = featuredShots[p.slug];
  if (Shot) return <Shot p={p} />;
  return (
    <Rise className="absolute inset-0">
      <StageDeviceFrame p={p} />
    </Rise>
  );
}

/* ------------------------------------------------------------------ */
/* Info                                                                */
/* ------------------------------------------------------------------ */

/** Project index: the current one in white, the others link to their screens. */
function Tabs({ index }: { index: number }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="t-label t-numeral text-white">
        {pad(index + 1)} / {pad(N)}
      </span>
      <ul className="flex flex-wrap items-center gap-x-[18px] gap-y-1">
        {featured.map((f, i) => (
          <li key={f.slug}>
            <a
              href={`#${anchor(f)}`}
              aria-current={i === index ? "true" : undefined}
              className={`t-label transition-colors ${
                i === index ? "text-white" : "text-[color:var(--text-secondary)] hover:text-white"
              }`}
            >
              {f.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Actions({ p }: { p: Featured }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={`/projects/${p.slug}`}
        className="t-button inline-flex h-[52px] items-center rounded-full bg-white px-[26px] text-black transition-colors hover:bg-white/90"
      >
        Check it out
      </Link>
      {p.links.github && (
        <Button href={p.links.github} external variant="secondary" icon={SiGithub}>
          GitHub
        </Button>
      )}
      {p.links.appStore && (
        <Button href={p.links.appStore} external variant="secondary" icon={SiApple}>
          App Store
        </Button>
      )}
      {p.links.googlePlay && (
        <Button href={p.links.googlePlay} external variant="secondary" icon={SiGoogleplay}>
          Google Play
        </Button>
      )}
      {p.links.site && (
        <Button href={p.links.site} external variant="secondary" icon={Globe}>
          Live site
        </Button>
      )}
    </div>
  );
}

/** Shared info panel: project details above, tags and actions in the footer. */
function ProjectInfo({ p, tabs }: { p: Featured; tabs: ReactNode }) {
  return (
    <div className="flex h-full flex-col justify-between gap-6">
      <div className="flex flex-col gap-8 lg:gap-6">
        {tabs}
        <div className="flex flex-col gap-5">
          <h2 className={`font-display ${p.layout === "mobile" ? "t-title-xl" : "text-[clamp(36px,4vw,56px)] leading-none tracking-[-0.04em]"}`}>{p.title}</h2>
          <p className="t-lead lg:text-xl max-w-[600px] text-white/72">{p.lead}</p>
          <p className="t-label text-[color:var(--text-secondary)]">{p.meta}</p>
        </div>
      </div>
      <SegmentFooter tone="dark" className="flex flex-col gap-5">
        <BuiltWith items={p.tags} />
        <Actions p={p} />
      </SegmentFooter>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

/**
 * One screen per project, in normal document flow. 03a (mobile) puts the phone
 * beside the info panel; landscape projects split the screen into equal halves.
 * Below lg both stack, visual first.
 */
function ProjectScreen({ p, index }: { p: Featured; index: number }) {
  const tabs = <Tabs index={index} />;
  if (p.layout === "mobile") {
    return (
      <section id={anchor(p)} data-nav="work" className="screen container-v2">
        <div className="flex h-full flex-col gap-2 lg:flex-row">
          <Segment className="aspect-[4/5] max-h-[640px] shrink-0 lg:aspect-auto lg:max-h-none lg:w-[39%]" style={stageBg(p)}>
            <PhoneVisual p={p} />
          </Segment>
          <Segment delay={0.08} className="flex-1 bg-[var(--bg-elevated)] px-7 pt-7 pb-8 lg:px-12 lg:pt-8 lg:pb-10">
            <ProjectInfo p={p} tabs={tabs} />
          </Segment>
        </div>
      </section>
    );
  }
  return (
    <section id={anchor(p)} data-nav="work" className="screen container-v2">
      <div className="flex h-full flex-col gap-2 lg:flex-row">
        <Segment className="aspect-square shrink-0 lg:aspect-auto lg:w-[calc(50%-4px)]" style={stageBg(p)}>
          <StageDevice p={p} />
        </Segment>
        <Segment delay={0.08} className="min-w-0 flex-1 bg-[var(--bg-elevated)] px-7 pt-7 pb-8 lg:px-10 lg:pt-8 lg:pb-9">
          <ProjectInfo p={p} tabs={tabs} />
        </Segment>
      </div>
    </section>
  );
}

export default function Projects() {
  return (
    <div id="work">
      {featured.map((p, i) => (
        <ProjectScreen key={p.slug} p={p} index={i} />
      ))}
      {/* Only a curated few get a screen; this band leads to the rest. */}
      <div className="container-v2 pb-6">
        <Segment className="flex flex-col gap-6 bg-[var(--bg-elevated)] px-7 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-12 lg:py-10">
          <div className="flex flex-col gap-2">
            <p className="font-display t-title">{projects.length - featured.length} more projects</p>
            <p className="t-body text-white/72">Web apps, desktop tools, hardware builds and a game.</p>
          </div>
          <Link
            href="/projects"
            className="t-button inline-flex h-[52px] shrink-0 items-center self-start rounded-full bg-white px-6 text-black transition-colors hover:bg-white/90 sm:self-auto"
          >
            See all {projects.length} projects
          </Link>
        </Segment>
      </div>
    </div>
  );
}
