/* eslint-disable @next/next/no-html-link-for-pages -- Native navigations avoid a Firefox hang in Next's client router. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, Clock, List } from "lucide-react";
import Image from "next/image";
import ScrollProgress from "../../components/scroll-progress";
import { formatDate, getPost, posts } from "../posts";
import { postContent } from "../content";
import { SITE_AUTHOR, SITE_URL } from "../../site";

const ACCENT = "var(--accent)";
const ACCENT_BORDER = "rgb(var(--accent-rgb) / 0.5)";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const pageTitle = post.seoTitle ?? post.title;
  const fullTitle = `${pageTitle} | Piotr Wittig`;
  const metaDescription = post.seoDescription ?? post.description;

  return {
    title: pageTitle,
    description: metaDescription,
    authors: [{ name: "Piotr Wittig" }],
    publisher: "Piotr Wittig",
    keywords: post.tags,
    alternates: { canonical: `/blog/${slug}` },
    // Keep unfinished posts out of the index while the URL stays shareable.
    // Spread rather than pass `undefined`: an explicit undefined would wipe the
    // root layout's `index, follow` instead of inheriting it.
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: "article",
      siteName: "Piotr Wittig Portfolio",
      locale: "en_US",
      title: fullTitle,
      description: metaDescription,
      url: `/blog/${slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE_AUTHOR],
      tags: post.tags,
      // Images are left to opengraph-image.tsx on purpose: the generated card
      // carries the title and the site's branding, which beats any cover photo
      // in a social feed. `cover` is the on-page image only.
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const content = post ? postContent[slug] : undefined;
  if (!post || !content) notFound();

  const { Body, toc, faq } = content;
  const index = posts.findIndex((p) => p.slug === slug);
  const prev = posts[index + 1];
  const next = posts[index - 1];
  const url = `${SITE_URL}/blog/${slug}`;
  const author = {
    "@type": "Person",
    name: SITE_AUTHOR,
    url: SITE_URL,
  };

  // One @graph instead of three <script> tags: the article, the breadcrumb
  // trail Google shows under the result, and the FAQ block (eligible for the
  // expandable question rich result).
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.seoDescription ?? post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        keywords: post.tags.join(", "),
        articleSection: post.tags[0],
        inLanguage: "en",
        image: post.cover
          ? `${SITE_URL}${post.cover}`
          : `${url}/opengraph-image`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author,
        publisher: author,
        isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog` },
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
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      ...(faq && faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faq.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
              })),
            },
          ]
        : []),
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
      <ScrollProgress />

      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-5">
          <a href="/" className="text-2xl font-semibold">
            Piotr Wittig<span style={{ color: ACCENT }}>.</span>
          </a>
          <a
            href="/blog"
            className="flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
          >
            <ChevronLeft size={16} />
            All posts
          </a>
        </div>
      </header>

      {/* Title block */}
      <section className="border-b border-zinc-800/80">
        <div className="mx-auto max-w-6xl px-5 pb-12 pt-36 sm:px-8 md:pt-40">
          <div className="flex items-center gap-2 text-sm">
            <a
              href="/blog"
              className="text-[var(--text-muted)] transition-colors hover:text-zinc-300"
            >
              Blog
            </a>
            <ChevronRight size={14} className="text-zinc-500" />
            <span className="truncate" style={{ color: ACCENT }}>
              {post.title}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
            <span className="font-semibold text-zinc-400">
              By {SITE_AUTHOR}
            </span>
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

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl">
            {post.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            {post.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tech-pill rounded-full border px-3.5 py-1.5 text-sm font-medium"
                style={{ borderColor: ACCENT_BORDER, color: ACCENT }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cover image, when the post has one */}
      {post.cover && (
        <div className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
          <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl border border-zinc-800">
            <Image
              src={post.cover}
              alt={post.coverAlt ?? post.title}
              fill
              priority
              sizes="(max-width: 1152px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
          {post.coverCredit && (
            <p className="mt-2 text-xs text-[var(--text-muted)]">{post.coverCredit}</p>
          )}
        </div>
      )}

      {/* Body + sticky contents */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-5 py-14 sm:px-8 md:py-20 lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16">
        <article className="min-w-0">
          <Body />
        </article>

        {toc && toc.length > 0 && (
          <aside className="order-first hover-glow rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 lg:order-none lg:sticky lg:top-24">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
              <List size={14} style={{ color: ACCENT }} />
              Contents
            </p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              {toc.map((entry) => (
                <a
                  key={entry.id}
                  href={`#${entry.id}`}
                  className="text-zinc-400 transition-colors hover:text-[var(--accent-light)]"
                >
                  {entry.label}
                </a>
              ))}
            </nav>
          </aside>
        )}
      </section>

      {/* Prev / next + CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
        <div className="border-t border-zinc-800 pt-10">
          <div className="hover-glow rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center md:p-10">
            <h2 className="text-2xl font-bold md:text-3xl">
              Disagree with any of this?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-zinc-400">
              I would rather be corrected than confident. Mail me and I will
              update the post.
            </p>
            <a
              href="mailto:piotr.wittig@gmail.com"
              className="mt-6 inline-block rounded-full px-7 py-3 font-bold text-black transition-transform hover:scale-105"
              style={{
                background: ACCENT,
                boxShadow: "0 0 30px rgb(var(--accent-rgb) / calc(0.35 * var(--glow-strength)))",
              }}
            >
              Send a correction
            </a>
          </div>

          {(prev || next) && (
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {prev && (
                <a
                  href={`/blog/${prev.slug}`}
                  className="hover-glow group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5"
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    <ChevronLeft size={14} style={{ color: ACCENT }} />
                    Older
                  </div>
                  <p className="mt-2 truncate font-semibold text-zinc-200 group-hover:text-white">
                    {prev.title}
                  </p>
                </a>
              )}
              {next && (
                <a
                  href={`/blog/${next.slug}`}
                  className="hover-glow group rounded-2xl border border-zinc-800 bg-zinc-900/30 p-5 text-right sm:col-start-2"
                >
                  <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-muted)]">
                    Newer
                    <ChevronRight size={14} style={{ color: ACCENT }} />
                  </div>
                  <p className="mt-2 truncate font-semibold text-zinc-200 group-hover:text-white">
                    {next.title}
                  </p>
                </a>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
