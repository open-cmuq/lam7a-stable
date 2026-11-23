import fs from "fs";
import path from "path";

/**
 * Counts the page images that actually exist for an issue in
 * public/magazine-pages/<slug>/, so the reader never shows blank pages
 * when the number in data/sliderItems.tsx is out of date.
 * Runs at build time only.
 */
export function countPages(slug: string, fallback: number): number {
  try {
    const dir = path.join(process.cwd(), "public", "magazine-pages", slug);
    const count = fs
      .readdirSync(dir)
      .filter((file) => /^page-\d+\.jpg$/.test(file)).length;
    return count > 0 ? count : fallback;
  } catch {
    return fallback;
  }
}
