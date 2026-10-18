"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { SiDiscord, SiFacebook, SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { ComponentType } from "react";
import { SITE_EMAIL } from "../../site";
import { Button, SegmentFooter } from "./ui";
import { Segment, reveal } from "./segment";
import { trackContact } from "../analytics";

type Channel = {
  name: string;
  handle: string;
  icon: ComponentType<{ size?: number }>;
  /** Brand colour of the icon disc; the tile picks up a faint wash of it on hover. */
  brand: string;
  /** Icon colour on the disc. */
  ink: string;
  /** No URL means the tile copies the handle instead of opening a page. */
  url?: string;
};

const CHANNELS: Channel[] = [
  {
    name: "LinkedIn",
    handle: "piotr-wittig",
    icon: FaLinkedin,
    brand: "#0A66C2",
    ink: "#fff",
    url: "https://linkedin.com/in/piotr-wittig-357bb9369",
  },
  // GitHub's mark is monochrome, so it stays white on the dark tile.
  { name: "GitHub", handle: "Schoji", icon: SiGithub, brand: "#ffffff", ink: "#000", url: "https://github.com/Schoji" },
  { name: "Discord", handle: "schoji", icon: SiDiscord, brand: "#5865F2", ink: "#fff" },
  {
    name: "Facebook",
    handle: "Piotr Wittig",
    icon: SiFacebook,
    brand: "#0866FF",
    ink: "#fff",
    url: "https://www.facebook.com/profile.php?id=100010308513992",
  },
];

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1800);
    } catch {
      // Clipboard can be blocked; the address is still visible to select.
    }
  };
  return { copied, copy };
}

export default function Contact() {
  const { copied, copy } = useCopy();
  return (
    <section id="contact" data-nav="contact" className="screen container-v2">
      <div className="flex h-full flex-col gap-2">
        <Segment className="flex flex-1 flex-col justify-between gap-6 bg-[var(--seg-lilac)] px-7 pt-10 pb-8 text-black lg:px-14 lg:pt-8 lg:pb-8">
          <div className="flex flex-col gap-6">
            <h2 className="font-display t-title-xl">Let&apos;s talk.</h2>
            <p className="t-lead max-w-[620px] text-black/72">
              Open to new opportunities and interesting projects, or just a conversation about what
              you are building. Email is the surest way to reach me, and I answer within a day.
            </p>
          </div>
          <SegmentFooter tone="light" className="flex flex-col gap-5 border-black/14 pt-7">
            <p className="font-display t-title break-all sm:break-normal">{SITE_EMAIL}</p>
            <div className="flex flex-wrap gap-2.5">
              <Button href={`mailto:${SITE_EMAIL}`} variant="inverse" onClick={() => trackContact("email", "mailto")}>
                Write an email
              </Button>
              <Button onClick={() => { copy("email", SITE_EMAIL); trackContact("email", "copy"); }} variant="secondary-light">
                <span aria-live="polite">{copied === "email" ? "Copied" : "Copy address"}</span>
              </Button>
            </div>
          </SegmentFooter>
        </Segment>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:h-[180px] lg:shrink-0 lg:grid-cols-4">
          {CHANNELS.map((c, i) => {
            const Icon = c.icon;
            const action = c.url ? "Open" : copied === c.name ? "Copied" : "Copy";
            const body = (
              <>
                <span className="flex items-center justify-between">
                  <span
                    className="grid size-[52px] place-items-center rounded-full transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.brand, color: c.ink }}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="t-label text-[color:var(--text-secondary)]" aria-live="polite">
                    {action}
                  </span>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display t-tile">{c.name}</span>
                  <span className="t-label text-[color:var(--text-secondary)]">{c.handle}</span>
                </span>
              </>
            );
            const cls =
              "group flex h-full min-h-[180px] flex-col justify-between gap-5 rounded-[24px] bg-[var(--bg-elevated)] p-7 text-left transition-colors hover:bg-[color-mix(in_srgb,var(--brand)_14%,var(--bg-elevated))] lg:rounded-[32px]";
            return (
              <motion.li data-reveal key={c.name} {...reveal(0.08 + i * 0.06)} style={{ "--brand": c.brand } as React.CSSProperties}>
                {c.url ? (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContact(c.name.toLowerCase(), "open")}
                    className={cls}
                  >
                    {body}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => { copy(c.name, c.handle); trackContact(c.name.toLowerCase(), "copy"); }}
                    className={`${cls} w-full`}
                  >
                    {body}
                  </button>
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
