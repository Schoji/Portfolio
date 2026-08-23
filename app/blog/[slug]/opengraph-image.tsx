import { ImageResponse } from "next/og";
import { formatDate, getPost, posts } from "../posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog post by Piotr Wittig";

// Prerender one card per post instead of rendering them on request.
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

/** Cut at a word boundary so the card never ends mid-word. */
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—-]$/, "")}…`;
}

/**
 * Social/search preview card, built per post. No custom font is loaded — the
 * default sans keeps the build fast and the file small; the layout carries the
 * brand (black background, cyan accent, the trailing dot from the logo).
 */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse at 50% 0%, #17171a 0%, #0a0a0a 65%)",
          color: "#fafafa",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 30,
            color: "#a1a1aa",
          }}
        >
          <span style={{ color: "#e0a33e", fontSize: 40 }}>{"//"}</span>
          <span>{`piotrwittig.com${post ? ` — ${post.readingTime}` : ""}`}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: post && post.title.length > 44 ? 76 : 92,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 1000,
            }}
          >
            {post?.title ?? "Blog"}
          </div>
          {post && (
            <div
              style={{
                fontSize: 32,
                lineHeight: 1.4,
                color: "#a1a1aa",
                maxWidth: 900,
                display: "flex",
              }}
            >
              {truncate(post.description, 150)}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #27272a",
            paddingTop: 32,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: 700 }}>Piotr Wittig</span>
            <span style={{ fontWeight: 700, color: "#e0a33e" }}>.</span>
          </div>
          <div style={{ color: "#71717a" }}>
            {post ? formatDate(post.date) : ""}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
