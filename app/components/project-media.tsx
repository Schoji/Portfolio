"use client";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Minus, X } from "lucide-react";
import { motion } from "motion/react";

export default function ProjectMedia({
  imageSource,
  phone,
  title,
}: {
  imageSource: string | string[];
  phone: boolean;
  title?: string;
}) {
  const images = Array.isArray(imageSource) ? imageSource : [imageSource];
  const [current, setCurrent] = useState(0);
  const multi = images.length > 1;

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  return (
    <div className="relative overflow-hidden">
      {phone ? (
        <div className="mockup-phone relative mx-4 border-4">
          {/* iPhone-style side buttons */}
          <span className="phone-side-btn is-left silent" />
          <span className="phone-side-btn is-left vol-up" />
          <span className="phone-side-btn is-left vol-down" />
          <span className="phone-side-btn is-right power" />
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
                  alt={title ? `${title} screenshot ${i + 1}` : "Project screenshot"}
                  fill={true}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 400px"
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="hover-glow w-full overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 shadow-2xl">
          {/* macOS-style title bar: traffic lights left, centered title */}
          <div className="relative flex items-center h-9 px-3 border-b border-zinc-700/80 bg-gradient-to-b from-zinc-700/70 to-zinc-800/90">
            <div className="group flex items-center gap-2">
              {(["close", "min", "full"] as const).map((type, i) => (
                <span
                  key={type}
                  className="flex h-3 w-3 cursor-pointer items-center justify-center rounded-full"
                  style={{ background: ["#ff5f57", "#febc2e", "#28c840"][i] }}
                >
                  <span
                    className="opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    style={{ color: "rgba(0,0,0,0.55)" }}
                  >
                    {type === "close" && <X size={9} strokeWidth={3.5} />}
                    {type === "min" && <Minus size={9} strokeWidth={3.5} />}
                    {type === "full" && (
                      <svg width={9} height={9} viewBox="0 0 10 10" fill="currentColor">
                        <path d="M1.5 4.5V1.5H4.5z" />
                        <path d="M8.5 5.5V8.5H5.5z" />
                      </svg>
                    )}
                  </span>
                </span>
              ))}
            </div>
            {title && (
              <span className="absolute left-1/2 -translate-x-1/2 max-w-[60%] truncate text-xs font-semibold text-zinc-300">
                {title}
              </span>
            )}
          </div>
          <div className="relative w-full overflow-hidden bg-zinc-950">
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
                  alt={title ? `${title} screenshot ${i + 1}` : "Project screenshot"}
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
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all z-10 group cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft
              size={18}
              className="transition-transform duration-200 group-hover:-translate-x-0.5"
            />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-1.5 transition-all z-10 group cursor-pointer"
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
                className={`w-1.5 h-1.5 cursor-pointer rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/30"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
