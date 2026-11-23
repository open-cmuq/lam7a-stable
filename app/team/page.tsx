import type { Metadata } from "next";
import SiteHeader, { CONTACT_EMAIL } from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { asset } from "../lib/util";
import { teamMembers } from "@/data/team";

export const metadata: Metadata = {
  title: "The team",
  description: "The students who write, edit, design and run Lam7a.",
};

type Member = (typeof teamMembers)[number];

// How a role reads as a heading when more than one person shares it.
const plurals: Record<string, string> = {
  "Writer/Editor": "Writers and editors",
};
const heading = (position: string, count: number) =>
  count > 1 ? plurals[position] ?? `${position}s` : position;

export default function Page() {
  // Group people by role, keeping the order they appear in data/team.ts.
  const roles: { position: string; members: Member[] }[] = [];
  for (const member of teamMembers) {
    const role = roles.find((r) => r.position === member.position);
    if (role) role.members.push(member);
    else roles.push({ position: member.position, members: [member] });
  }

  return (
    <>
      <SiteHeader />
      <main className="wrap team">
        <h1 className="page-title">The team</h1>
        <p className="block__lede">
          Lam7a is written, edited, designed and run by students at CMU-Q.
          This is who is behind the current issues.
        </p>

        <div className="colophon">
          {roles.map((role) => (
            <section className="colophon__role" key={role.position}>
              <h2>{heading(role.position, role.members.length)}</h2>
              <ul>
                {role.members.map((member) => (
                  <li
                    key={member.name}
                    className={member.imageURL ? "person person--print" : "person"}
                  >
                    {member.imageURL && (
                      <span className="print person__photo">
                        <span className="tape" aria-hidden="true" />
                        <img
                          src={asset(member.imageURL)}
                          alt={member.name}
                          loading="lazy"
                        />
                      </span>
                    )}
                    <span className="person__text">
                      <span className="person__name">{member.name}</span>
                      <span className="person__class">
                        Class of {member.classYear}
                      </span>
                      {member.description && (
                        <span className="person__note hand">
                          &ldquo;{member.description}&rdquo;
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="team__join">
          Want to write, design or help run the magazine?{" "}
          <a className="link" href={`mailto:${CONTACT_EMAIL}`}>
            Email the team
          </a>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
