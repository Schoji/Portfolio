import { posts } from "../blog/posts";
import { SITE_AUTHOR, SITE_EMAIL, SITE_URL } from "../site";

// Prerendered at build time — the feed only changes when a post does.
export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const published = posts
    .filter((p) => !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));

  const items = published
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${esc(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${esc(post.description)}</description>
${post.tags.map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const lastBuildDate = new Date(
    published[0]?.date ?? Date.now(),
  ).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_AUTHOR)} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Notes on technical writing, developer tooling and the things I build.</description>
    <language>en</language>
    <managingEditor>${SITE_EMAIL} (${esc(SITE_AUTHOR)})</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
