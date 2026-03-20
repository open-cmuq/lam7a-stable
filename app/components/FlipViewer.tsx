"use client";
import { useRef } from "react";
import HTMLFlipBook from "react-pageflip";

interface Props {
  issueSlug: string; // e.g. "issue20"
  pageCount: number;
}

export default function FlipViewer({ issueSlug, pageCount }: Props) {
  const bookRef = useRef<any>(null);
  const pages = Array.from({ length: pageCount }, (_, i) =>
    `/magazine-pages/${issueSlug}/page-${String(i + 1).padStart(2, "0")}.jpg`
  );

  return (
    <div className="flex flex-col items-center gap-6">
      {/* @ts-ignore */}
      <HTMLFlipBook
        ref={bookRef}
        width={420}
        height={590}
        size="fixed"
        showCover={true}
        className="shadow-2xl"
        flippingTime={700}
        usePortrait={false}
      >
        {pages.map((src, i) => (
          <div key={i} className="w-full h-full bg-white overflow-hidden">
            <img src={src} alt={`Page ${i + 1}`} className="w-full h-full object-contain" />
          </div>
        ))}
      </HTMLFlipBook>

      <div className="flex gap-4">
        <button
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          className="rounded-md bg-[#B22F04] px-6 py-2 font-semibold text-white hover:opacity-90"
        >
          ← Prev
        </button>
        <button
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          className="rounded-md bg-[#B22F04] px-6 py-2 font-semibold text-white hover:opacity-90"
        >
          Next →
        </button>
      </div>
    </div>
  );
}