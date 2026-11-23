import { Journal } from "./definitions";

/**
 * Extracts the numerical ID from the Journal item's name.
 * @param item - The Journal item.
 * @returns The extracted ID as a number, or -1 if extraction fails.
 */
export const extractId = (item: Journal): number => {
  const match = item.name.match(/issue(\d+)/i);
  return match ? parseInt(match[1], 10) : -1;
};

/**
 * Finds the maximum ID among a list of Journal items.
 * @param items - An array of Journal items.
 * @returns The highest ID found, or 0 if no valid IDs are present.
 */
export const findMaxId = (items: Journal[]): number =>
  items.reduce((max, item) => Math.max(max, extractId(item)), 0);

export const ordinal = (n: number) =>
  `${n}${
    n % 100 >= 11 && n % 100 <= 13
      ? "th"
      : ["th", "st", "nd", "rd"][Math.min(n % 10, 4)] || "th"
  }`;

/**
 * Prefixes a file in public/ with the site's base path, so plain <img> tags
 * keep working when the site is served from a sub-folder (GitHub Pages).
 * Full URLs are returned untouched.
 */
export const asset = (path: string): string =>
  /^https?:\/\//.test(path)
    ? path
    : `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

/** "issue20" for the item whose pdfurl ends in /issue20.pdf */
export const issueSlug = (item: Journal): string =>
  item.pdfurl.split("/").pop()?.replace(".pdf", "") ?? "";

/** Issues sorted newest first. */
export const newestFirst = (items: Journal[]): Journal[] =>
  [...items].sort((a, b) => extractId(b) - extractId(a));

const MONTHS = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];

/**
 * The academic year an issue belongs to, e.g. "2025–26".
 * The year starts in August.
 */
export const academicYear = (item: Journal): string => {
  const month = MONTHS.indexOf(item.month.toLowerCase());
  const start = month >= 7 ? item.year : item.year - 1;
  return `${start}–${String((start + 1) % 100).padStart(2, "0")}`;
};

/** What to call an issue in a sentence: its theme if it has one, else "Issue 20". */
export const issueTitle = (item: Journal): string =>
  item.theme ?? `Issue ${extractId(item)}`;
