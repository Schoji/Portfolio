import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "../projects";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  // `seoTitle` is keyword-first and descriptive (~50–60 chars); the root
  // layout's title.template appends " | Piotr Wittig". OG/Twitter titles
  // don't use the template, so build the full string explicitly.
  const pageTitle = project.seoTitle ?? project.title;
  const fullTitle = `${pageTitle} | Piotr Wittig`;
  // Short meta description (70–155 chars) for search/social; the full
  // `description` still renders in the page body.
  const metaDescription = project.seoDescription ?? project.description;
  const cover = Array.isArray(project.imageSource)
    ? project.imageSource[0]
    : project.imageSource;

  return {
    title: pageTitle,
    description: metaDescription,
    publisher: "Piotr Wittig",
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: fullTitle,
      description: metaDescription,
      url: `/projects/${slug}`,
      images: [{ url: cover, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: metaDescription,
      images: [cover],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  return <ProjectDetail slug={slug} />;
}
