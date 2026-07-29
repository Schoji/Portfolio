import type { MetadataRoute } from "next";
import { projects } from "./projects/projects";
import { posts } from "./blog/posts";
import { SITE_URL } from "./site";

/**
 * Emitted at /sitemap.xml. Drafts are excluded — they carry `noindex`, so
 * listing them would only feed Search Console a contradiction.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const published = posts.filter((p) => !p.draft);
  const newestPost = published
    .map((p) => p.updated ?? p.date)
    .sort()
    .at(-1);

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/blog`,
      ...(newestPost ? { lastModified: new Date(newestPost) } : {}),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...published.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updated ?? post.date),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...projects.map((project) => ({
      url: `${SITE_URL}/projects/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
