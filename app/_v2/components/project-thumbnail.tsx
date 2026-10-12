import Image from "next/image";
import { FileImage, FileText, FolderOpen, Lightbulb, Music2 } from "lucide-react";
import { COVERS } from "../covers";
import EditorialCover from "./editorial-cover";
import { featured } from "../featured";
import { FeaturedCover } from "./featured-cover";

const sizes = "(min-width: 1024px) 320px, (min-width: 640px) 280px, 100vw";

/** Small editorial covers; original screenshots stay in the project galleries. */
export function ProjectThumbnail({ slug, image, color }: { slug: string; image: string; color: string }) {
  // The five home-page projects reuse their home composition.
  const feature = featured.find((f) => f.slug === slug);
  if (feature) return <FeaturedCover p={feature} />;
  const cover = COVERS[slug];
  if (cover) return <EditorialCover c={cover} />;
  const custom = ["hubmi", "soundnest", "sortra"].includes(slug);
  return (
    <div aria-hidden="true" className={`project-thumbnail relative aspect-[16/10] overflow-hidden rounded-[16px] lg:rounded-[20px] ${custom ? `thumbnail-${slug}` : ""}`} style={custom ? undefined : { background: color }}>
      {slug === "hubmi" ? (
        <>
          <span className="thumbnail-brand"><Lightbulb /></span>
          <div className="thumbnail-window hubmi-window">
            <Image src="/hubmi/home.webp" alt="" fill sizes={sizes} className="object-cover" />
          </div>
          <span className="hubmi-orbit" />
        </>
      ) : slug === "soundnest" ? (
        <>
          <span className="thumbnail-brand"><Music2 /></span>
          <div className="thumbnail-window soundnest-window">
            <Image src="/v2/soundnest.webp" alt="" fill sizes={sizes} className="object-cover" />
          </div>
          <div className="thumbnail-float soundnest-art"><div className="soundnest-artwork" /></div>
          <div className="soundnest-bars">{[28, 55, 38, 80, 60, 100, 72, 40, 62, 30].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
        </>
      ) : slug === "sortra" ? (
        <>
          <span className="thumbnail-brand"><FolderOpen /></span>
          <div className="thumbnail-window sortra-window">
            <Image src="/v2/sortra/app.webp" alt="" fill sizes={sizes} className="object-cover" />
          </div>
          <div className="thumbnail-float sortra-files"><span><FileImage /></span><span><FileText /></span><span><FolderOpen /></span></div>
        </>
      ) : <Image src={image} alt="" fill sizes={sizes} className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.03]" />}
    </div>
  );
}
