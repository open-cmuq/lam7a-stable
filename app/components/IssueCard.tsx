import Link from "next/link";
import { Journal } from "../lib/definitions";
import { asset, extractId, issueSlug } from "../lib/util";

/** One cover in the archive: the cover itself, then its number, theme and date. */
export default function IssueCard({ issue }: { issue: Journal }) {
  const id = extractId(issue);
  return (
    <Link href={`/magazine/${issueSlug(issue)}`} className="issue-card">
      <span className="issue-card__cover">
        <img
          src={asset(issue.imageurl)}
          alt={`Cover of issue ${id}${issue.theme ? `, ${issue.theme}` : ""}`}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="issue-card__no hand">No. {id}</span>
      {issue.theme && <span className="issue-card__theme">{issue.theme}</span>}
      <span className="issue-card__date">
        {issue.month} {issue.year}
      </span>
    </Link>
  );
}
