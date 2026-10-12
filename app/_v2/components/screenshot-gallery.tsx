import { imageRatio } from "../image-ratio";
import Gallery from "./gallery";

/** Server wrapper: reads each image's ratio at build time, then hands off to the client gallery. */
export default async function ScreenshotGallery({ images, phone, title }: { images: string[]; phone: boolean; title: string }) {
  const shots = await Promise.all(images.map(async (src) => ({ src, ratio: await imageRatio(src) })));
  return <Gallery shots={shots} phone={phone} title={title} />;
}
