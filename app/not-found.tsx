import Link from "next/link";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="wrap lost">
        <h1 className="page-title">This page isn&rsquo;t in any issue</h1>
        <p className="block__lede">
          The link may be old, or the page may have moved.
        </p>
        <p>
          <Link className="btn" href="/">
            Back to the homepage
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
