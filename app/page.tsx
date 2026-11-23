import Link from "next/link";
import SiteHeader, { CONTACT_EMAIL } from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Masthead from "./components/Masthead";
import Postmark from "./components/Postmark";
import IssueCard from "./components/IssueCard";
import {
  academicYear,
  asset,
  extractId,
  issueSlug,
  newestFirst,
} from "./lib/util";
import { Journal } from "./lib/definitions";
import { sliderItems } from "@/data/sliderItems";

// The sections that come back in every issue, named as they are in print.
const sections = [
  {
    name: "Social Synergies",
    about: "Essays and opinion on what students are talking about.",
  },
  {
    name: "Humans of CMUQ",
    about: "Interviews, trips and clubs. The people who make up campus.",
  },
  {
    name: "Members Only",
    about: "Notes and favourites from the Lam7a team.",
  },
  {
    name: "Artscapes",
    about: "Student art, photo dumps and reviews.",
  },
  {
    name: "Mind Maze",
    about: "Word searches, cryptograms and other puzzles.",
  },
];

const prints = [
  {
    src: "/assets/mainpage/2.jpeg",
    alt: "Three students holding up the first issue, New Beginnings",
  },
  {
    src: "/assets/bg2.webp",
    alt: "A chalkboard sign at a launch table that reads: Lam7a magazine, New Beginnings, grab a copy",
  },
  {
    src: "/assets/mainpage/22.jpeg",
    alt: "A stack of early Lam7a issues fanned out on a table",
  },
  {
    src: "/assets/mainpage/23.jpeg",
    alt: "Someone holding a copy of the Merged issue",
  },
];

export default function Page() {
  const issues = newestFirst(sliderItems);
  const latest = issues[0];
  const latestId = extractId(latest);

  // Group the archive by academic year, newest year first.
  const years: { label: string; issues: Journal[] }[] = [];
  for (const issue of issues) {
    const label = academicYear(issue);
    const group = years.find((y) => y.label === label);
    if (group) group.issues.push(issue);
    else years.push({ label, issues: [issue] });
  }

  return (
    <>
      <SiteHeader />
      <main>
        <section
          className="hero"
          style={
            {
              "--wash": latest.wash,
              "--accent": latest.ink,
            } as React.CSSProperties
          }
        >
          <div className="wrap hero__grid">
            <div className="hero__words">
              <h1 className="hero__logo">
                <Masthead />
              </h1>
              <p className="hero__tagline">
                A magazine for the students, by the students.
              </p>
              <p className="hero__about">
                Lam7a (<span lang="ar">لمحة</span>) means a glimpse. Every
                issue is a glimpse into student life at Carnegie Mellon
                University in Qatar: the essays, interviews, art and puzzles
                our classmates send in.
              </p>
              <div className="hero__actions">
                <Link className="btn" href={`/magazine/${issueSlug(latest)}`}>
                  Read issue {latestId}
                </Link>
                <Link className="link" href="#issues">
                  Browse all {issues.length} issues
                </Link>
              </div>
            </div>

            <Link
              href={`/magazine/${issueSlug(latest)}`}
              className="hero__cover"
              aria-label={`Read issue ${latestId}${
                latest.theme ? `, ${latest.theme}` : ""
              }`}
            >
              <span className="tape tape--top" aria-hidden="true" />
              <img
                src={asset(latest.imageurl)}
                alt={`Cover of issue ${latestId}`}
              />
              <Postmark
                className="hero__postmark"
                top={`NO. ${latestId}`}
                bottom={`${latest.month.slice(0, 3).toUpperCase()} ${
                  latest.year
                }`}
              />
              <span className="hero__note hand" aria-hidden="true">
                the latest issue{latest.theme ? `: ${latest.theme}` : ""}
              </span>
            </Link>
          </div>
        </section>

        <div className="airmail" aria-hidden="true" />

        <section className="wrap block" aria-labelledby="inside-title">
          <h2 id="inside-title" className="block__title">
            In every issue
          </h2>
          <ul className="stamps">
            {sections.map((section) => (
              <li className="stamp" key={section.name}>
                <div className="stamp__paper">
                  <div className="stamp__inner">
                    <h3>{section.name}</h3>
                    <p>{section.about}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="wrap block" id="issues" aria-labelledby="issues-title">
          <h2 id="issues-title" className="block__title">
            The archive
          </h2>
          <p className="block__lede">
            Every issue since the first one in August 2022. Pick a cover to
            flip through it.
          </p>
          {years.map((year) => (
            <div className="year" key={year.label}>
              <h3 className="year__label">{year.label}</h3>
              <ul className="shelf">
                {year.issues.map((issue) => (
                  <li key={issue.name}>
                    <IssueCard issue={issue} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="wrap block" id="submit" aria-labelledby="submit-title">
          <div className="postcard">
            <div className="postcard__message">
              <h2 id="submit-title" className="postcard__title">
                Issue {latestId + 1} is open for submissions
              </h2>
              <p>
                Writing, art, photos, a puzzle, an opinion you can&rsquo;t keep
                to yourself. If you study at CMU-Q, send it in.
              </p>
              <p className="hand postcard__sign">The Lam7a team</p>
            </div>
            <div className="postcard__address">
              <span className="postcard__stamp" aria-hidden="true">
                <span className="stamp__paper">
                  <img src={asset(latest.imageurl)} alt="" loading="lazy" />
                </span>
              </span>
              <p className="postcard__to hand">Send to</p>
              <a className="postcard__line" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
              <span className="postcard__line" aria-hidden="true" />
              <span className="postcard__line" aria-hidden="true" />
              <a className="btn" href={`mailto:${CONTACT_EMAIL}`}>
                Email your submission
              </a>
            </div>
          </div>
        </section>

        <section className="wrap block" aria-labelledby="photos-title">
          <h2 id="photos-title" className="block__title">
            Off the page
          </h2>
          <p className="block__lede">
            Launch days and copies spotted around campus.
          </p>
          <ul className="prints">
            {prints.map((print) => (
              <li className="print" key={print.src}>
                <span className="tape" aria-hidden="true" />
                <img src={asset(print.src)} alt={print.alt} loading="lazy" />
              </li>
            ))}
          </ul>
          <p className="block__more">
            <Link className="link" href="/gallery">
              See all the photos
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
