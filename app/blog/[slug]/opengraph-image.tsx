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
      <div style={{ width: "100%", height: "100%", display: "flex", padding: 24, background: "#000" }}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          // The v2 paper segment, inset on the black page like on the site.
          // Satori cannot read CSS variables, so v2.css's colours repeat here.
          background: "#f2f2f0",
          borderRadius: 32,
          color: "#000",
        }}
      >
        <div style={{ display: "flex", fontSize: 30, color: "rgba(0,0,0,0.55)" }}>
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
                color: "rgba(0,0,0,0.7)",
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
            borderTop: "2px solid rgba(0,0,0,0.1)",
            paddingTop: 32,
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ fontWeight: 700 }}>Piotr Wittig</span>
          </div>
          <div style={{ color: "rgba(0,0,0,0.55)" }}>
            {post ? formatDate(post.date) : ""}
          </div>
        </div>
      </div>
      </div>
    ),
    size,
  );
}
