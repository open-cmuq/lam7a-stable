import { asset } from "../lib/util";

/**
 * The Lam7a wordmark, drawn in whatever the current text colour is.
 * The logo file is white-on-transparent, so it is used as a mask.
 */
export default function Masthead({ className = "" }: { className?: string }) {
  const url = `url(${asset("/lam7a-logo.webp")})`;
  return (
    <span
      role="img"
      aria-label="Lam7a"
      className={`masthead ${className}`}
      style={{ WebkitMaskImage: url, maskImage: url }}
    />
  );
}
