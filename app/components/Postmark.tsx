/**
 * A round postal cancellation mark, like the stamps and postmarks that run
 * through the print issues. `top` and `bottom` are short lines for the middle.
 */
export default function Postmark({
  top,
  bottom,
  className = "",
}: {
  top: string;
  bottom: string;
  className?: string;
}) {
  return (
    <svg
      className={`postmark ${className}`}
      viewBox="0 0 260 160"
      aria-hidden="true"
    >
      <defs>
        <path id="postmark-arc-top" d="M 26 80 A 54 54 0 0 1 134 80" />
        <path id="postmark-arc-bottom" d="M 20 80 A 60 60 0 0 0 140 80" />
      </defs>
      <g fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="80" cy="80" r="70" />
        <circle cx="80" cy="80" r="40" strokeWidth="1.5" />
        <path d="M150 50 q14 -9 28 0 t28 0 t28 0 t28 0" />
        <path d="M154 70 q14 -9 28 0 t28 0 t28 0 t28 0" />
        <path d="M154 90 q14 -9 28 0 t28 0 t28 0 t28 0" />
        <path d="M150 110 q14 -9 28 0 t28 0 t28 0 t28 0" />
      </g>
      <g fill="currentColor" className="postmark__text">
        <text fontSize="13" letterSpacing="2.2" textAnchor="middle">
          <textPath href="#postmark-arc-top" startOffset="50%">
            LAM7A MAGAZINE
          </textPath>
        </text>
        <text fontSize="12" letterSpacing="2" textAnchor="middle">
          <textPath href="#postmark-arc-bottom" startOffset="50%">
            CMU-Q · DOHA, QATAR
          </textPath>
        </text>
        <text x="80" y="77" fontSize="17" textAnchor="middle" fontWeight="700">
          {top}
        </text>
        <text x="80" y="96" fontSize="15" textAnchor="middle">
          {bottom}
        </text>
      </g>
    </svg>
  );
}
