export type Journal = {
  imageurl: string;
  pdfurl: string;
  name: string;
  month: string;
  pageCount: number;
  year: number;
  /** The theme printed on the cover, e.g. "Rooted". Optional. */
  theme?: string;
  /** A strong colour taken from the cover, used for headings and buttons on the issue's page. Optional. */
  ink?: string;
  /** A pale colour taken from the cover, used as the page background behind the issue. Optional. */
  wash?: string;
};
