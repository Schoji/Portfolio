import path from "node:path";
import sharp from "sharp";

/**
 * Width / height of an image in `public/`, read at build time so frames and
 * gallery tiles take the screenshot's real shape instead of cropping it.
 */
export async function imageRatio(src: string, fallback = 16 / 10): Promise<number> {
  try {
    const { width, height, orientation } = await sharp(path.join(process.cwd(), "public", src)).metadata();
    if (!width || !height) return fallback;
    // EXIF orientations 5–8 are rotated a quarter turn: the browser shows the
    // image with width and height swapped.
    return orientation && orientation >= 5 ? height / width : width / height;
  } catch {
    return fallback;
  }
}
