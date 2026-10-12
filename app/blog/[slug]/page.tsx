import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollProgress from "../../components/scroll-progress";
import { formatDate, getPost, posts, type BlogPost } from "../posts";
import { postContent } from "../content";
import { SITE_AUTHOR, SITE_EMAIL, SITE_URL } from "../../site";
import Nav from "../../_v2/components/nav";
import { Segment } from "../../_v2/components/segment";
import { Button, SegmentFooter } from "../../_v2/components/ui";
import Shell, { darkViewport } from "../../_v2/shell";

export const viewport = darkViewport;

/** An older or newer post: the title large, the direction small below it. */
function Neighbour({ post, label, delay }: { post: BlogPost; label: string; delay: number }) {
  return (
    <Segment delay={delay} className="flex-1 bg-[var(--bg-elevated)]">
      <Link href={`/blog/${post.slug}`} className="group flex h-full items-center gap-5 p-3 pr-6 transition-colors hover:bg-white/[0.03]">
        {post.cover && (
          <div className="relative aspect-[2/1] w-[120px] shrink-0 overflow-hidden rounded-[16px] sm:w-[200px]">
            <Image src={post.cover} alt="" fill sizes="200px" className="object-cover" />
          </div>
        )}
        <div className="flex min-w-0 flex-col gap-1 py-3">
          <p className="font-display text-[clamp(20px,2.2vw,28px)] leading-[1.1] tracking-[-0.025em]">{post.title}</p>
          <p className="t-label text-[color:var(--text-secondary)]">{label}</p>
        </div>
      </Link>
    </Segment>
  );
}

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
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollProgress />
      <Nav active="blog" />
      <main className="container-v2 flex flex-col gap-2 pt-[84px] pb-6 lg:pt-[76px]">
        {post.cover && (
          <Segment className="bg-[var(--bg-elevated)]">
            <div className="relative aspect-[2/1] w-full">
              <Image
                src={post.cover}
                alt={post.coverAlt ?? post.title}
                fill
                priority
                sizes="(min-width: 1440px) 1280px, 100vw"
                className="object-cover"
              />
            </div>
            {post.coverCredit && <p className="t-label px-6 py-3 font-normal text-[color:var(--text-secondary)]">{post.coverCredit}</p>}
          </Segment>
        )}

        {/* Title block on paper, under the cover: the one light segment of the page. */}
        <Segment delay={0.08} className="bg-[var(--seg-paper)] px-7 pt-7 pb-8 text-black lg:px-14 lg:pt-10 lg:pb-12">
          <div className="flex flex-col gap-10 lg:gap-14">
            <Link
              href="/blog"
              className="t-label inline-flex items-center gap-1 self-start text-black/55 transition-colors hover:text-black"
            >
              <ChevronLeft size={16} aria-hidden />
              All posts
            </Link>
            <div className="flex flex-col gap-6">
              <h1 className="font-display t-headline max-w-[1000px]">{post.title}</h1>
              <p className="t-lead max-w-[760px] text-black/70">{post.description}</p>
            </div>
          </div>
          <SegmentFooter tone="light" className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="t-label text-black/55">
              By {SITE_AUTHOR}, <time dateTime={post.date}>{formatDate(post.date)}</time>. {post.readingTime}.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {post.draft && (
                <span className="inline-flex items-center rounded-lg border border-black/40 px-3 py-[7px] text-[13px] font-medium leading-[1.2]">Draft</span>
              )}
              {post.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-lg border border-black/18 px-2.5 py-1.5 text-[13px] font-medium leading-[1.2] text-black/70">
                  {tag}
                </span>
              ))}
            </div>
          </SegmentFooter>
        </Segment>

        {/* Body on the black page, with the contents in a sticky segment beside it. */}
        <div className="grid grid-cols-1 items-start gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:py-16">
          <article className="min-w-0 max-w-[760px] px-1 lg:pl-14">
            <Body />
          </article>

          {toc && toc.length > 0 && (
            <aside className="order-first rounded-[24px] bg-[var(--bg-elevated)] p-6 lg:sticky lg:top-24 lg:order-none">
              <p className="t-label text-[color:var(--text-secondary)]">Contents</p>
              <nav aria-label="Contents" className="mt-4 flex flex-col gap-3">
                {toc.map((entry) => (
                  <a key={entry.id} href={`#${entry.id}`} className="t-label font-normal text-white/72 transition-colors hover:text-white">
                    {entry.label}
                  </a>
                ))}
              </nav>
            </aside>
          )}
        </div>

        <Segment className="bg-[var(--seg-lilac)] px-7 py-10 text-black lg:px-14 lg:py-14">
          <div className="flex flex-col gap-4">
            <h2 className="font-display t-title">Disagree with any of this?</h2>
            <p className="t-lead max-w-[560px] text-black/70">
              I would rather be corrected than confident. Mail me and I will update the post.
            </p>
          </div>
          <SegmentFooter tone="light" className="mt-10">
            <Button href={`mailto:${SITE_EMAIL}?subject=${encodeURIComponent(`Correction: ${post.title}`)}`} variant="inverse" icon={Mail}>
              Send a correction
            </Button>
          </SegmentFooter>
        </Segment>

        {(prev || next) && (
          <nav aria-label="More posts" className="flex flex-col gap-2 md:flex-row">
            {prev && <Neighbour post={prev} label="Older post" delay={0} />}
            {next && <Neighbour post={next} label="Newer post" delay={0.08} />}
          </nav>
        )}
      </main>
    </Shell>
  );
}
