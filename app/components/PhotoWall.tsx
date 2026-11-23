"use client";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { images } from "@/data/images";
import { asset } from "../lib/util";

const slides = images.map(({ original, width, height }) => ({
  src: asset(original),
  width,
  height,
}));

export default function PhotoWall() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <ul className="wall">
        {images.map((image, i) => (
          <li key={image.src}>
            <button
              type="button"
              className="wall__photo"
              onClick={() => setIndex(i)}
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <img
                src={asset(image.src)}
                alt=""
                width={image.width}
                height={image.height}
                loading="lazy"
                decoding="async"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox
        slides={slides}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
}
