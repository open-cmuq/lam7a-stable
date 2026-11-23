import Link from "next/link";
import Masthead from "./Masthead";
import { CONTACT_EMAIL, INSTAGRAM_URL } from "./SiteHeader";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer" id="contact">
      <div className="airmail" aria-hidden="true" />
      <div className="wrap site-footer__row">
        <div>
          <Link href="/" aria-label="Lam7a, home" className="site-footer__logo">
            <Masthead />
          </Link>
          <p className="site-footer__tag">
            A magazine for the students, by the students.
          </p>
        </div>
        <div className="site-footer__contact">
          <p className="hand">Questions? Reach out to us.</p>
          <p>
            <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </p>
          <p>
            <a
              className="link"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
            >
              @lam7a_mag on Instagram
            </a>
          </p>
        </div>
      </div>
      <p className="wrap site-footer__credit">Computing Club {year}</p>
    </footer>
  );
}
