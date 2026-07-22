import React from "react";
import { ExternalLink } from "lucide-react";
import { SiGithub, SiApple } from "react-icons/si";

// Google Play's multicolor play triangle (brand-adequate coloring).
const GooglePlayIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
    style={{ flexShrink: 0 }}
  >
    <path d="M3 2.5 L3 21.5 L13 12 Z" fill="#00d2ff" />
    <path d="M3 2.5 L13 12 L21 11.2 Z" fill="#ff3d3d" />
    <path d="M3 21.5 L13 12 L21 12.8 Z" fill="#ffce00" />
    <path d="M13 12 L21 11.2 L21 12.8 Z" fill="#00e676" />
  </svg>
);

const PILL =
  "flex items-center gap-2.5 rounded-full bg-zinc-900 border border-zinc-800 px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:scale-105 hover:border-zinc-600 active:scale-95 cursor-pointer";

export default function ProjectActions({
  buttonText,
  buttonURL,
  icon: Icon = null,
  appStoreURL = null,
  playStoreURL = null,
}: {
  buttonText: string | null;
  buttonURL: string | null;
  icon?: React.ElementType | null;
  appStoreURL?: string | null;
  playStoreURL?: string | null;
}) {
  const isGithub = (buttonURL ?? "").includes("github.com");
  const ButtonIcon = Icon ?? (isGithub ? SiGithub : ExternalLink);

  return (
    <div className="flex flex-wrap gap-3">
      {buttonText != null ? (
        <a className={PILL} href={buttonURL ?? undefined}>
          <ButtonIcon size={18} />
          <span>{buttonText}</span>
        </a>
      ) : !appStoreURL && !playStoreURL ? (
        <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-zinc-800 bg-zinc-900 text-zinc-500 text-sm cursor-not-allowed opacity-60">
          <span className="font-semibold">Currently in development</span>
        </div>
      ) : null}
      {appStoreURL && (
        <a
          className={PILL}
          href={appStoreURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiApple size={18} />
          <span>App Store</span>
        </a>
      )}
      {playStoreURL && (
        <a
          className={PILL}
          href={playStoreURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GooglePlayIcon size={18} />
          <span>Google Play</span>
        </a>
      )}
    </div>
  );
}
