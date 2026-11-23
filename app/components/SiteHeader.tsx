import Link from "next/link";
import Masthead from "./Masthead";

export const CONTACT_EMAIL = "lam7a-mag@andrew.cmu.edu";
export const INSTAGRAM_URL = "https://www.instagram.com/lam7a_mag/";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap site-header__row">
        <Link href="/" className="site-header__logo" aria-label="Lam7a, home">
          <Masthead />
        </Link>
        <nav aria-label="Main">
          <ul className="site-nav">
            <li>
              <Link href="/#issues">Issues</Link>
            </li>
            <li>
              <Link href="/gallery">Photos</Link>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/#submit">Submit</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
