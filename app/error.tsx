"use client";
import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for debugging without leaking details to the UI.
    console.error(error);
  }, [error]);

  return (
    <div
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, #1c1c2e 0%, #0a0a0a 60%)",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="absolute left-5 top-5 text-2xl font-semibold"
      >
        Piotr Wittig<span style={{ color: "var(--accent)" }}>.</span>
      </Link>

      {/* Radial glow behind the code */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[700px] w-[700px] max-w-full rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(76,29,149,0.35) 0%, rgba(34,211,238,0.06) 42%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span
          className="inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em]"
          style={{
            color: "var(--accent)",
            borderColor: "rgba(34,211,238,0.55)",
            boxShadow: "0 0 20px rgba(34,211,238,0.15)",
          }}
        >
          Something went wrong
        </span>

        <h1 className="hero-accent text-7xl font-bold leading-none sm:text-8xl md:text-9xl">
          500
        </h1>

        <p className="max-w-md text-base text-zinc-400 md:text-lg">
          An unexpected error occurred while loading this page. You can try
          again or head back to the home page.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 rounded-full px-8 py-3 font-bold text-black transition-transform hover:scale-105"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 30px rgba(34,211,238,0.4)",
            }}
          >
            <RotateCcw size={18} />
            Try again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full border border-zinc-600 px-8 py-3 font-bold text-white transition-colors hover:border-cyan-400/70"
          >
            <ArrowLeft size={18} />
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
