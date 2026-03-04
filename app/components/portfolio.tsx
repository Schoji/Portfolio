"use client";
import Image from "next/image";
import React, { useState } from "react";
import CustomBadge from "./badge";
import { ChevronDown, ChevronLeft, ChevronRight, Code } from "lucide-react";
import { motion } from "motion/react";
import { SiGithub, SiAppstore, SiGoogleplay } from "react-icons/si";

const Portfolio = ({
  imageSource,
  title,
  description,
  features,
  technologies,
  invertOrder = false,
  phone = true,
  buttonText = null,
  buttonURL = null,
  icon: Icon = null,
  id,
  nextHref,
  appStoreURL = null,
  playStoreURL = null,
}: {
  imageSource: string | string[];
  title: string;
  description: string;
  features: Array<string>;
  technologies: Array<string>;
  invertOrder: boolean;
  phone: boolean;
  buttonText: string | null;
  buttonURL: string | null;
  icon?: React.ElementType | null;
  id?: string;
  nextHref?: string;
  appStoreURL?: string | null;
  playStoreURL?: string | null;
}) => {
  const images = Array.isArray(imageSource) ? imageSource : [imageSource];
  const [current, setCurrent] = useState(0);
  const multi = images.length > 1;

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div
      id={id}
      className="relative p-4 sm:p-8 md:p-12 lg:p-20 min-h-screen gap-10 md:gap-16 lg:gap-20 grid grid-cols-1 lg:grid-cols-2 items-center border-b border-zinc-600 overflow-hidden"
    >
      <div className={invertOrder ? "lg:order-2" : "lg:order-1"}>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden">
            {phone ? (
              <div className="mockup-phone border-2">
                <div className="mockup-phone-display relative overflow-hidden">
                  {images.map((src, i) => (
                    <motion.div
                      key={i}
                      className="absolute inset-0"
                      animate={{
                        opacity: i === current ? 1 : 0,
                        x: i === current ? 0 : i < current ? -40 : 40,
                      }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                    >
                      <Image
                        src={src}
                        alt="Portfolio"
                        fill={true}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                        style={{ objectFit: "cover" }}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mockup-window border border-zinc-500">
                <div className="relative w-full p-2 overflow-hidden">
                  {images.map((src, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        opacity: i === current ? 1 : 0,
                        x: i === current ? 0 : i < current ? -40 : 40,
                      }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{
                        position: i === 0 ? "relative" : "absolute",
                        inset: 0,
                      }}
                    >
                      <Image
                        className="object-contain w-full h-auto"
                        src={src}
                        alt="Portfolio"
                        width={3796}
                        height={1842}
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 80vw, 900px"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {multi && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all z-10 group cursor-w-resize"
                  aria-label="Previous image"
                >
                  <ChevronLeft
                    size={18}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                  />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all z-10 group cursor-e-resize"
                  aria-label="Next image"
                >
                  <ChevronRight
                    size={18}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/30"}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>

      <div className={invertOrder ? "lg:order-1" : "lg:order-2"}>
        <motion.div
          className="flex flex-col p-2 sm:p-4 md:p-6 justify-center gap-4 md:gap-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold">{title}</h1>
          <p className="text-zinc-400 text-base sm:text-lg">{description}</p>
          <div></div>
          <div className="flex gap-2 items-center">
            <ChevronRight size={18} />
            <p className="font-bold">Key Features</p>
          </div>
          <ul className="list-disc grid grid-cols-1 sm:grid-cols-2 grid-rows-3 gap-2 sm:gap-3 text-zinc-400 pl-5">
            {features.map((feature, index) => (
              <li key={index} className="text-zinc-400 p-1">
                {feature}
              </li>
            ))}
          </ul>
          <div></div>
          <div className="flex gap-2 items-center">
            <Code size={18} />
            <p className="font-bold">Technologies</p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {technologies.map((technology, index) => (
              <CustomBadge key={index} content={technology} />
            ))}
          </div>
          <div></div>
          <div className="flex flex-wrap gap-2">
            {buttonText != null ? (
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-zinc-600 bg-black text-white text-sm transition-all duration-150 hover:scale-105 hover:border-zinc-400 active:scale-95 cursor-pointer"
                href={buttonURL ?? undefined}
              >
                <span className="text-lg">
                  {Icon ? <Icon /> : <SiGithub />}
                </span>
                <span className="font-semibold text-base">{buttonText}</span>
              </a>
            ) : !appStoreURL && !playStoreURL ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-xl border border-zinc-700 bg-black text-zinc-500 text-sm cursor-not-allowed opacity-60">
                <span className="font-semibold text-base">
                  Currently in development
                </span>
              </div>
            ) : null}
            {appStoreURL && (
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-zinc-600 bg-black text-white text-sm transition-all duration-150 hover:scale-105 hover:border-zinc-400 active:scale-95 cursor-pointer"
                href={appStoreURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiAppstore size={24} />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-zinc-400 text-xs">Download on the</span>
                  <span className="font-semibold text-base">App Store</span>
                </div>
              </a>
            )}
            {playStoreURL && (
              <a
                className="flex items-center gap-3 px-4 py-2 rounded-xl border border-zinc-600 bg-black text-white text-sm transition-all duration-150 hover:scale-105 hover:border-zinc-400 active:scale-95 cursor-pointer"
                href={playStoreURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGoogleplay size={24} />
                <div className="flex flex-col leading-tight text-left">
                  <span className="text-zinc-400 text-xs">GET IT ON</span>
                  <span className="font-semibold text-base">Google Play</span>
                </div>
              </a>
            )}
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
