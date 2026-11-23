"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { asset } from "../lib/util";

interface Props {
  issueSlug: string;
  pageCount: number;
  title: string;
}

const PAGE_RATIO = 1.414; // A4, height / width

const pageSrc = (issueSlug: string, page: number) =>
  asset(
    `/magazine-pages/${issueSlug}/page-${String(page).padStart(2, "0")}.jpg`
  );

/** Works out a page size that fits the window: two pages side by side when there is room, one when there isn't. */
function useBookSize() {
  const [size, setSize] = useState<{
    width: number;
    height: number;
    single: boolean;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const availableWidth = Math.min(window.innerWidth - 32, 1180);
      // leave room for the header, the issue title and the page buttons
      const availableHeight = Math.max(window.innerHeight - 310, 360);
      const single = availableWidth < 720;
      const widthFromHeight = availableHeight / PAGE_RATIO;
      const widthFromWidth = single ? availableWidth : availableWidth / 2;
      const width = Math.floor(Math.min(widthFromHeight, widthFromWidth, 620));
      setSize((previous) =>
        previous && previous.width === width && previous.single === single
          ? previous
          : { width, height: Math.round(width * PAGE_RATIO), single }
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

export default function FlipViewer({ issueSlug, pageCount, title }: Props) {
  const bookRef = useRef<any>(null);
  const size = useBookSize();
  const [page, setPage] = useState(0); // index of the left-most page showing

  const prev = useCallback(() => bookRef.current?.pageFlip()?.flipPrev(), []);
  const next = useCallback(() => bookRef.current?.pageFlip()?.flipNext(), []);

  // Arrow keys turn the page.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // Fetch the next few pages ahead of time so a turn never lands on a blank.
  useEffect(() => {
    for (let ahead = 1; ahead <= 4; ahead++) {
      const upcoming = page + 1 + ahead;
      if (upcoming <= pageCount) new Image().src = pageSrc(issueSlug, upcoming);
    }
  }, [page, pageCount, issueSlug]);

  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  // Which pages are on show, in words.
  let showing = `Page ${page + 1}`;
  if (size && !size.single && page > 0 && page + 2 <= pageCount) {
    showing = `Pages ${page + 1} and ${page + 2}`;
  }
  const atStart = page === 0;
  const atEnd = size?.single ? page >= pageCount - 1 : page + 2 >= pageCount;

  return (
    <div className="reader">
      <div
        className="reader__stage"
        style={size ? { minHeight: size.height } : undefined}
      >
        {size ? (
          // @ts-ignore react-pageflip's types ask for every optional prop
          <HTMLFlipBook
            key={`${size.width}-${size.single}`}
            ref={bookRef}
            width={size.width}
            height={size.height}
            size="fixed"
            showCover={true}
            startPage={page}
            className="reader__book"
            flippingTime={550}
            usePortrait={size.single}
            mobileScrollSupport={true}
            swipeDistance={30}
            maxShadowOpacity={0.35}
            onFlip={(event: { data: number }) => setPage(event.data)}
          >
            {pages.map((number) => (
              <div key={number} className="reader__page">
                <img
                  src={pageSrc(issueSlug, number)}
                  alt={`${title}, page ${number}`}
                  loading={number <= 4 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                />
              </div>
            ))}
          </HTMLFlipBook>
        ) : (
          <img
            className="reader__placeholder"
            src={pageSrc(issueSlug, 1)}
            alt={`${title}, page 1`}
          />
        )}
      </div>

      <div className="reader__controls">
        <button
          type="button"
          className="btn btn--quiet"
          onClick={prev}
          disabled={atStart}
        >
          Previous
        </button>
        <p className="reader__count" aria-live="polite">
          {showing} <span>of {pageCount}</span>
        </p>
        <button
          type="button"
          className="btn"
          onClick={next}
          disabled={atEnd}
        >
          Next
        </button>
      </div>
      <p className="reader__hint hand">
        drag a corner, swipe, or use the arrow keys
      </p>
    </div>
  );
}
