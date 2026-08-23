/* eslint-disable @next/next/no-html-link-for-pages -- Native navigations avoid a Firefox hang in Next's client router. */
import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, ChevronLeft, Clock, Rss } from "lucide-react";
import { formatDate, listedPosts } from "./posts";
import { SITE_AUTHOR, SITE_URL } from "../site";

const ACCENT = "var(--accent)";
const ACCENT_BORDER = "rgb(var(--accent-rgb) / 0.5)";

export const metadata: Metadata = {
  title: "Blog — Writing, Tools & Build Notes",
  description:
    "Notes on technical writing, developer tooling and the things I build. Long-form posts, no newsletter popups.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": `${SITE_URL}/feed.xml` },
  },
  openGraph: {
    type: "website",
    siteName: "Piotr Wittig Portfolio",
    locale: "en_US",
    title: "Blog — Writing, Tools & Build Notes | Piotr Wittig",
    description:
      "Notes on technical writing, developer tooling and the things I build.",
    url: "/blog",
  },
  twitter: { card: "summary_large_image" },
};

export default function BlogIndex() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: `${SITE_AUTHOR} — Blog`,
        description:
          "Notes on technical writing, developer tooling and the things I build.",
        url: `${SITE_URL}/blog`,
        inLanguage: "en",
        author: { "@type": "Person", name: SITE_AUTHOR, url: SITE_URL },
        blogPost: listedPosts.map((post) => ({
          "@type": "BlogPosting",
          headline: post.title,
          url: `${SITE_URL}/blog/${post.slug}`,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: `${SITE_URL}/blog`,
          },
        ],
      },
    ],
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "var(--page-gradient)",
        backgroundAttachment: "fixed",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="/" className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: ACCENT }}>.</span>
          </a>
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            Back home
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-5 pb-10 pt-36 sm:px-8 md:pt-40">
        <h1 className="mt-3 text-5xl font-bold leading-[1.05] md:text-6xl">
          <span className="text-white">Things I figured out </span>
          <span className="hero-accent">and wrote down.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Mostly long-form: technical writing, developer tooling, and notes from
          whatever I am building. I write a post when I go looking for something
          and cannot find it.
        </p>

        <a
          href="/feed.xml"
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:border-[rgb(var(--accent-rgb)/0.7)]"
        >
          <Rss size={15} style={{ color: ACCENT }} />
          RSS feed
        </a>
      </section>

      {/* Posts */}
      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col gap-5 border-t border-zinc-800 pt-10">
          {listedPosts.length === 0 && (
            <p className="text-[var(--text-muted)]">Nothing published yet.</p>
          )}

          {listedPosts.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="hover-glow group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 md:p-8"
            >
              {/* The frame carries no border: the card around it already has
                  one, and two concentric borders read as a card in a card. */}
              {post.cover && (
                <div className="relative aspect-[2/1] w-full overflow-hidden rounded-xl">
                  <Image
                    src={post.cover}
                    alt={post.coverAlt ?? post.title}
                    fill
                    sizes="(max-width: 896px) 100vw, 896px"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {post.readingTime}
                </span>
                {post.draft && (
                  <span className="rounded-full border border-amber-500/40 px-2.5 py-0.5 font-bold uppercase tracking-[0.15em] text-amber-300/90">
                    Draft
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold leading-snug text-white transition-colors group-hover:text-[var(--accent-light)] md:text-3xl">
                {post.title}
              </h2>

              <p className="max-w-2xl leading-relaxed text-zinc-400">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tech-pill rounded-full border px-3 py-1 text-xs font-medium"
                    style={{ borderColor: ACCENT_BORDER, color: ACCENT }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span
                className="mt-1 flex items-center gap-2 text-sm font-semibold"
                style={{ color: ACCENT }}
              >
                Read the post
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
