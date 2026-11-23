import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/app/components/SiteHeader";
import SiteFooter from "@/app/components/SiteFooter";
import FlipViewer from "@/app/components/FlipViewer";
import { sliderItems } from "@/data/sliderItems";
import { countPages } from "@/app/lib/pages";
import {
  asset,
  extractId,
  issueSlug,
  issueTitle,
  newestFirst,
} from "@/app/lib/util";
import { Journal } from "@/app/lib/definitions";

type Params = { params: { pdf: string } };

const findIssue = (slug: string) =>
  sliderItems.find((item) => issueSlug(item) === slug);

export function generateStaticParams() {
  return sliderItems
    .map(issueSlug)
    .filter(Boolean)
    .map((pdf) => ({ pdf }));
}

export function generateMetadata({ params }: Params): Metadata {
  const issue = findIssue(params.pdf);
  if (!issue) return {};
  const id = extractId(issue);
  return {
    title: issue.theme ? `Issue ${id}: ${issue.theme}` : `Issue ${id}`,
    description: `Read issue ${id} of Lam7a, published ${issue.month} ${issue.year}.`,
  };
}

function Neighbour({ issue, label }: { issue: Journal; label: string }) {
  return (
    <Link href={`/magazine/${issueSlug(issue)}`} className="neighbour">
      <img src={asset(issue.imageurl)} alt="" loading="lazy" />
      <span>
        <span className="hand neighbour__label">{label}</span>
        <span className="neighbour__title">
          Issue {extractId(issue)}
          {issue.theme ? `: ${issue.theme}` : ""}
        </span>
      </span>
    </Link>
  );
}

const Page = ({ params }: Params) => {
  const issue = findIssue(params.pdf);
  if (!issue) notFound();

  const id = extractId(issue);
  const pageCount = countPages(params.pdf, issue.pageCount);
  const ordered = newestFirst(sliderItems);
  const position = ordered.indexOf(issue);
  const newer = ordered[position - 1];
  const older = ordered[position + 1];

  return (
    <div
      className="issue"
      style={
        { "--wash": issue.wash, "--accent": issue.ink } as React.CSSProperties
      }
    >
      <SiteHeader />
      <main className="wrap issue__main">
        <p className="issue__back">
          <Link className="link" href="/#issues">
            All issues
          </Link>
        </p>
        <h1 className="issue__title">{issueTitle(issue)}</h1>
        <p className="issue__meta">
          {issue.theme ? `Issue ${id}, ` : ""}
          {issue.month} {issue.year}. {pageCount} pages.
        </p>

        <FlipViewer
          issueSlug={params.pdf}
          pageCount={pageCount}
          title={`Lam7a issue ${id}`}
        />

        {(newer || older) && (
          <nav className="neighbours" aria-label="Other issues">
            {older ? <Neighbour issue={older} label="the one before" /> : <span />}
            {newer ? <Neighbour issue={newer} label="the one after" /> : <span />}
          </nav>
        )}
      </main>
      <SiteFooter />
    </div>
  );
};

export default Page;
