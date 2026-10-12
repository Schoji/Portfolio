import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Rss } from "lucide-react";
import { formatDate, listedPosts } from "./posts";
import { SITE_AUTHOR, SITE_URL } from "../site";
import Nav from "../_v2/components/nav";
import { Segment } from "../_v2/components/segment";
import { Button, Tag } from "../_v2/components/ui";
import Shell, { darkViewport } from "../_v2/shell";

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

export const viewport = darkViewport;

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
    <Shell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav active="blog" />
      <main className="container-v2 pt-[84px] pb-6 lg:pt-[76px]">
        <header className="flex flex-col gap-4 px-1 pt-8 pb-8 lg:pt-12">
          <h1 className="font-display t-title-xl max-w-[900px]">Things I figured out and wrote down.</h1>
          <p className="t-lead max-w-[640px] text-white/72">
            Mostly long-form: technical writing, developer tooling, and notes from whatever I am building. I write a
            post when I go looking for something and cannot find it.
          </p>
          <div className="pt-2">
            <Button href="/feed.xml" variant="secondary" icon={Rss}>
              RSS feed
            </Button>
          </div>
        </header>

        {listedPosts.length === 0 && <p className="t-body px-1 text-[color:var(--text-secondary)]">Nothing published yet.</p>}

        <ul className="flex flex-col gap-2">
          {listedPosts.map((post, i) => (
            <li key={post.slug}>
              <Segment delay={Math.min(i, 6) * 0.04} className="bg-[var(--bg-elevated)]">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-6 p-3 pb-7 transition-colors hover:bg-white/[0.03] md:grid-cols-[minmax(0,420px)_1fr] md:items-center md:pb-3 lg:gap-12"
                >
                  {post.cover && (
                    <div className="relative aspect-[2/1] overflow-hidden rounded-[16px] lg:rounded-[20px]">
                      <Image
                        src={post.cover}
                        alt={post.coverAlt ?? post.title}
                        fill
                        sizes="(min-width: 768px) 420px, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}
                  <div className="flex min-w-0 flex-col gap-3 px-4 md:px-0 md:pr-8">
                    <h2 className="font-display t-title">{post.title}</h2>
                    <p className="t-body max-w-[640px] text-white/72">{post.description}</p>
                    <p className="t-label text-[color:var(--text-secondary)]">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingTime}.
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.draft && <Tag strong>Draft</Tag>}
                      {post.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                </Link>
              </Segment>
            </li>
          ))}
        </ul>
      </main>
    </Shell>
  );
}
