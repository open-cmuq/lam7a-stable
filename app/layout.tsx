import type { Metadata } from "next";
import { Caveat, Newsreader, Playfair_Display } from "next/font/google";
import { asset } from "./lib/util";
import "./globals.css";

// Display: a high-contrast italic serif, the same family of letterforms as
// the Lam7a masthead on every cover.
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
// Text: a serif made for reading.
const text = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-text",
  display: "swap",
  adjustFontFallback: false,
});
// Handwriting, for the small pencilled notes.
const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lam7a, the CMU-Q student magazine",
    template: "%s | Lam7a",
  },
  description:
    "Lam7a is the student magazine of Carnegie Mellon University in Qatar: a glimpse into student life, made by students, for students.",
  themeColor: "#F1EADB",
  icons: {
    icon: asset("/favicon.ico"),
  },
  keywords:
    "CMUQ, CMU, cmu, cmuq, cmu qatar, cmuq qatar, Student Magazine, Lam7a, Qatar, University, News, Stories",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${text.variable} ${hand.variable}`}>
        {children}
      </body>
    </html>
  );
}
