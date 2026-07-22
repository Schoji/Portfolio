"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- Native navigations avoid a Firefox hang in Next's client router. */
import { ArrowLeft, Check, ChevronRight, Code, Zap } from "lucide-react";
import ProjectMedia from "../../components/project-media";
import ProjectActions from "../../components/project-actions";
import { projects } from "../projects";

export default function ProjectDetail({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return null;
  const {
    title,
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
  } = project;

  const words = title.trim().split(" ");
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words[words.length - 1];

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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 backdrop-blur-md bg-black/70">
        <div className="flex items-center justify-between px-5 h-14">
          <a href="/" className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: "var(--accent)" }}>.</span>
          </a>
          <a
            href="/#projects"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Back to projects
          </a>
        </div>
      </header>
      <div className="h-14 w-full" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-16 grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Media */}
        <div className="flex justify-center">
          <ProjectMedia imageSource={imageSource} phone={phone} title={title} />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6 min-w-0">
          <div className="flex items-center gap-2 text-sm">
            <a
              href="/#projects"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Projects
            </a>
            <ChevronRight size={14} className="text-zinc-600" />
            <span style={{ color: "var(--accent)" }}>{title}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.05]">
            {titleHead && <span className="text-white">{titleHead} </span>}
            <span
              style={{
                color: "var(--accent)",
                textShadow: "0 0 25px rgba(34,211,238,0.5)",
              }}
            >
              {titleTail}
            </span>
          </h1>

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            {description}
          </p>

          {/* Technologies */}
          <div className="mt-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-zinc-300">
              <Code size={16} style={{ color: "var(--accent)" }} />
              Technologies
            </div>
            <div className="flex flex-wrap gap-3">
              {technologies.map((technology, index) => (
                <span
                  key={index}
                  className="rounded-full border px-4 py-1.5 text-sm font-medium"
                  style={{
                    borderColor: "rgba(34,211,238,0.5)",
                    color: "var(--accent)",
                  }}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mt-2 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-zinc-300">
              <Zap size={16} style={{ color: "var(--accent)" }} />
              Key Features
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => {
                const f =
                  typeof feature === "string" ? { title: feature } : feature;
                const FIcon = f.icon ?? Check;
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-3.5 flex items-start gap-3 transition-colors hover:border-zinc-700"
                  >
                    <FIcon
                      size={18}
                      style={{ color: "var(--accent)" }}
                      className="mt-0.5 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-semibold leading-tight">{f.title}</p>
                      {f.subtitle && (
                        <p className="text-zinc-500 text-sm mt-1">
                          {f.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-4">
            <ProjectActions
              buttonText={buttonText}
              buttonURL={buttonURL}
              icon={icon}
              appStoreURL={appStoreURL}
              playStoreURL={playStoreURL}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
