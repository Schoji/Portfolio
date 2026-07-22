"use client";
import React from "react";
import { ArrowRight, ChevronDown, ChevronRight, Code } from "lucide-react";
import { motion } from "motion/react";
import ProjectMedia from "./project-media";
import ProjectActions from "./project-actions";

const Portfolio = ({
  imageSource,
  title,
  description,
  technologies,
  invertOrder = false,
  phone = true,
  buttonText = null,
  buttonURL = null,
  icon: Icon = null,
  slug,
  id,
  nextHref,
  appStoreURL = null,
  playStoreURL = null,
}: {
  imageSource: string | string[];
  title: string;
  description: string;
  technologies: Array<string>;
  invertOrder: boolean;
  phone: boolean;
  buttonText: string | null;
  buttonURL: string | null;
  icon?: React.ElementType | null;
  slug: string;
  id?: string;
  nextHref?: string;
  appStoreURL?: string | null;
  playStoreURL?: string | null;
}) => {
  // Two-tone title: last word rendered in the accent color.
  const words = title.trim().split(" ");
  const titleHead = words.slice(0, -1).join(" ");
  const titleTail = words[words.length - 1];

  return (
    <div
      id={id}
      className="relative px-4 sm:px-8 md:px-12 lg:px-20 pt-24 pb-16 lg:pt-20 lg:pb-12 min-h-[100svh] gap-8 md:gap-12 lg:gap-16 grid grid-cols-1 lg:grid-cols-2 items-center border-b border-zinc-800 overflow-hidden"
    >
      <div className={invertOrder ? "lg:order-2" : "lg:order-1"}>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <ProjectMedia imageSource={imageSource} phone={phone} title={title} />
        </motion.div>
      </div>

      <div className={invertOrder ? "lg:order-1" : "lg:order-2"}>
        <motion.div
          className="flex flex-col p-2 sm:p-3 justify-center gap-5 min-w-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500">Projects</span>
            <ChevronRight size={14} className="text-zinc-600" />
            <span style={{ color: "var(--accent)" }}>{title}</span>
          </div>

          {/* Title */}
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

          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
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
                  className="tech-pill rounded-full border px-4 py-1.5 text-sm font-medium"
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

          {/* Actions */}
          <div className="flex flex-wrap gap-3 mt-4">
            {/* A native navigation avoids a Firefox hang in Next's client router. */}
            <a
              href={`/projects/${slug}`}
              className="flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold text-black transition-all duration-150 hover:scale-105 active:scale-95"
              style={{
                background: "var(--accent)",
                boxShadow: "0 0 25px rgba(34,211,238,0.35)",
              }}
            >
              Read more
              <ArrowRight size={18} />
            </a>
            <ProjectActions
              buttonText={buttonText}
              buttonURL={buttonURL}
              icon={Icon}
              appStoreURL={appStoreURL}
              playStoreURL={playStoreURL}
            />
          </div>
        </motion.div>
      </div>

      {nextHref && (
        <a
          href={nextHref}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-400 transition-colors animate-bounce"
        >
          <ChevronDown size={24} />
        </a>
      )}
    </div>
  );
};

export default Portfolio;
