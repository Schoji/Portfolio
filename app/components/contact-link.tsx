"use client";
import React, { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";

/**
 * One secondary contact channel, rendered as a list row rather than a card:
 * a small inline icon, the channel name, and the handle. Channels without a
 * URL (Discord) copy their handle to the clipboard instead of navigating.
 */
export default function ContactLink({
  icon: Icon,
  label,
  handle,
  url,
}: {
  icon: React.ElementType;
  label: string;
  handle: string;
  url: string | null;
}) {
  const [copied, setCopied] = useState(false);

  const body = (
    <>
      <Icon size={17} className="shrink-0 text-zinc-400" />
      <span className="w-24 shrink-0 text-sm font-medium text-zinc-200">
        {label}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm text-[var(--text-muted)]">
        {handle}
      </span>
    </>
  );

  const rowClass =
    "flex items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors hover:bg-zinc-900/60";

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClass} group`}
      >
        {body}
        <ArrowUpRight
          size={15}
          className="shrink-0 text-zinc-500 transition-colors group-hover:text-zinc-300"
        />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={rowClass}
      onClick={() => {
        navigator.clipboard.writeText(handle);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      aria-label={`Copy ${label} handle ${handle}`}
    >
      {body}
      <span className="flex shrink-0 items-center gap-1.5 text-xs text-[var(--text-muted)]">
        {copied ? (
          <>
            <Check size={14} style={{ color: "var(--accent)" }} />
            Copied
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy
          </>
        )}
      </span>
    </button>
  );
}
