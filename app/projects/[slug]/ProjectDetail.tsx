"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigations avoid a Firefox hang in Next's client router. */
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  Heart,
  Sparkles,
} from "lucide-react";
import { FaApple, FaLinux, FaWindows } from "react-icons/fa";
import type { ElementType } from "react";
import ProjectActions from "../../components/project-actions";
import ProjectGallery from "../../components/project-gallery";
import { projects, type Project } from "../projects";

const ACCENT = "var(--accent)";
const ACCENT_BORDER = "rgba(34,211,238,0.5)";

const OS_ICON: Record<string, ElementType> = {
  Windows: FaWindows,
  macOS: FaApple,
  Linux: FaLinux,
};

// Derive a human category/platform label from existing data (no new fields).
function deriveCategory(p: Project): string {
  if (p.phone) return "Mobile App";
  const tech = p.technologies.join(" ").toLowerCase();
  if (/tauri|electron/.test(tech)) return "Desktop App";
  if (/esp32|arduino|embedded/.test(tech)) return "Hardware";
  return "Web App";
}

// Accent-filled per-OS download pills, reused in the hero and the download CTA.
function DownloadButtons({
  downloads,
}: {
  downloads: NonNullable<Project["downloads"]>;
}) {
  return (
    <>
      {downloads.map((d) => {
        const OsIcon = OS_ICON[d.os];
        return (
          <a
            key={d.os}
            href={d.url}
            download
            className="flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-150 hover:scale-105 active:scale-95"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 20px rgba(34,211,238,0.35)",
            }}
          >
            {OsIcon ? <OsIcon size={18} /> : <Download size={18} />}
            {d.os}
          </a>
        );
      })}
    </>
  );
}

export default function ProjectDetail({ slug }: { slug: string }) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const {
    title,
    tagline,
    year,
    story,
    role,
    status,
    heroBackground,
    description,
    features,
    technologies,
    imageSource,
    phone,
    buttonText,
    buttonURL,
    icon,
    appStoreURL,
    playStoreURL,
    downloads,
    donateURL,
  } = project;

  const images = Array.isArray(imageSource) ? imageSource : [imageSource];
  const category = deriveCategory(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1c1c2e 0%, #0a0a0a 60%)",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="/" className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: ACCENT }}>.</span>
          </a>
          <a
            href="/#projects"
            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            All projects
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-800/80">
        {heroBackground && (
          <div className="absolute inset-0">
            <Image
              src={heroBackground}
              alt=""
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          </div>
        )}
        <div className="relative mx-auto max-w-6xl px-5 pb-14 pt-36 sm:px-8 md:pt-40">
          <div className="flex items-center gap-2 text-sm">
            <a
              href="/#projects"
              className="text-zinc-500 transition-colors hover:text-zinc-300"
            >
              Projects
            </a>
            <ChevronRight size={14} className="text-zinc-600" />
            <span style={{ color: ACCENT }}>{title}</span>
          </div>

          <span
            className="mt-6 inline-block rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.15em]"
            style={{ borderColor: ACCENT_BORDER, color: ACCENT }}
          >
            {category}
          </span>

          <h1 className="mt-5 text-5xl font-bold leading-[1.02] text-white sm:text-6xl md:text-7xl">
            {title}
          </h1>

          {tagline && (
            <p
              className="mt-5 max-w-2xl text-xl font-medium leading-snug md:text-2xl"
              style={{ color: ACCENT }}
            >
              {tagline}
            </p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {downloads && downloads.length > 0 && (
              <DownloadButtons downloads={downloads} />
            )}
            <ProjectActions
              buttonText={buttonText}
              buttonURL={buttonURL}
              icon={icon}
              appStoreURL={appStoreURL}
              playStoreURL={playStoreURL}
              accentPrimary={!downloads?.length}
              noLinksLabel={status ?? undefined}
            />
          </div>
        </div>
      </section>

      {/* Body: description + highlights | tech stack */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
        <div className="flex min-w-0 flex-col gap-12">
          <p className="text-lg leading-relaxed text-zinc-300 md:text-xl">
            {description}
          </p>

          {/* The Story / Backstory */}
          {story && (
            <div>
              <span
                className="font-mono text-xs uppercase tracking-[0.25em]"
                style={{ color: ACCENT }}
              >
                {"// The Story"}
              </span>
              <h2 className="mt-2 text-2xl font-bold md:text-3xl">Backstory</h2>
              <p className="mt-5 leading-relaxed text-zinc-400">{story}</p>
            </div>
          )}

          {/* Highlights (from existing features) */}
          <div>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Sparkles size={18} style={{ color: ACCENT }} />
              Highlights
            </div>
            <div className="mt-5 flex flex-col gap-3">
              {features.map((feature, i) => {
                const f =
                  typeof feature === "string"
                    ? { title: feature, subtitle: undefined }
                    : feature;
                return (
                  <div
                    key={i}
                    className="hover-glow flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-3.5"
                  >
                    <Check
                      size={18}
                      style={{ color: ACCENT }}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium leading-snug">{f.title}</p>
                      {f.subtitle && (
                        <p className="mt-1 text-sm text-zinc-500">
                          {f.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tech stack card */}
        <aside className="hover-glow rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 lg:sticky lg:top-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Tech Stack
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            {technologies.map((t, i) => (
              <span
                key={i}
                className="tech-pill rounded-full border px-3.5 py-1.5 text-sm font-medium"
                style={{ borderColor: ACCENT_BORDER, color: ACCENT }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-5 border-t border-zinc-800 pt-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                Platform
              </p>
              <p className="mt-1.5 text-zinc-200">{category}</p>
            </div>
            {year && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Year
                </p>
                <p className="mt-1.5 text-zinc-200">{year}</p>
              </div>
            )}
            {status && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Status
                </p>
                <p className="mt-1.5 text-zinc-200">{status}</p>
              </div>
            )}
            {role && (
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  Role
                </p>
                <p className="mt-1.5 text-zinc-200">{role}</p>
              </div>
            )}
          </div>
        </aside>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        <div className="border-t border-zinc-800 pt-14">
          <span
            className="font-mono text-xs uppercase tracking-[0.25em]"
            style={{ color: ACCENT }}
          >
            {"// Gallery"}
          </span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Screenshots</h2>
          <div className="mt-8">
            <ProjectGallery images={images} phone={phone} title={title} />
          </div>
        </div>
      </section>

      {/* Download CTA */}
      {downloads && downloads.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
          <div className="hover-glow rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 text-center md:p-12">
            <span
              className="font-mono text-xs uppercase tracking-[0.25em]"
              style={{ color: ACCENT }}
            >
              {"// Download"}
            </span>
            <h2 className="mt-2 text-3xl font-bold md:text-4xl">
              Get {title}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              Free and open source. Pick your platform and start sorting.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <DownloadButtons downloads={downloads} />
            </div>

            {donateURL && (
              <div className="mt-4 flex justify-center">
                <a
                  href={donateURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-semibold text-zinc-200 transition-colors hover:border-cyan-400/70"
                >
                  <Heart size={16} style={{ color: ACCENT }} />
                  Support with a donation
                </a>
              </div>
            )}

            <p className="mx-auto mt-6 max-w-xl text-xs leading-relaxed text-zinc-600">
              Provided “as is”, without warranty. Back up your files before use
              — by downloading you accept that you use it at your own risk.
            </p>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="grid grid-cols-2 gap-4 border-t border-zinc-800 pt-8">
          <a
            href={`/projects/${prev.slug}`}
            className="hover-glow group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              <ChevronLeft size={14} style={{ color: ACCENT }} />
              Previous
            </div>
            <p className="mt-2 truncate font-semibold text-zinc-200 group-hover:text-white">
              {prev.title}
            </p>
          </a>
          <a
            href={`/projects/${next.slug}`}
            className="hover-glow group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-right"
          >
            <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Next
              <ChevronRight size={14} style={{ color: ACCENT }} />
            </div>
            <p className="mt-2 truncate font-semibold text-zinc-200 group-hover:text-white">
              {next.title}
            </p>
          </a>
        </div>
      </section>
    </div>
  );
}
