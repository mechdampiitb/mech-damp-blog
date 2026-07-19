import React from "react";
import { getTeamMembers } from "@/lib/data";
import { TeamMember } from "@/lib/types";

export default async function TeamPage() {
  const team = await getTeamMembers();

  const coordinators = team.filter((m) => m.role === "coordinator");
  const mentors = team.filter((m) => m.role === "mentor");

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto min-h-screen animate-fade-in flex flex-col gap-16 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]">Academic Mentorship Team</h1>
        <p className="text-[var(--text-muted)] text-sm md:text-base font-light">
          Feel free to reach out to our team of coordinators and department academic mentors for guidance on subject choices, internships, or adjustments.
        </p>
      </div>

      {/* Coordinators Section */}
      {coordinators.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="border-b border-[var(--border)] pb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-[var(--text)]">Department Coordinators</h2>
            <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider bg-[var(--surface)] px-2.5 py-0.5 rounded">
              Overall Admin
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coordinators.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>
      )}

      {/* Mentors Section */}
      {mentors.length > 0 && (
        <section className="flex flex-col gap-6">
          <div className="border-b border-[var(--border)] pb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-bold text-[var(--text)]">Academic Mentors</h2>
            <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-wider bg-[var(--surface)] px-2.5 py-0.5 rounded">
              Advisors
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentors.map((m) => (
              <TeamMemberCard key={m.id} member={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const initials = member.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="apple-card p-6 flex flex-col sm:flex-row gap-6 relative group">
      {/* Avatar column */}
      <div className="flex-shrink-0 flex justify-center sm:justify-start">
        <div className="w-18 h-18 rounded-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] flex items-center justify-center font-extrabold text-xl tracking-tighter">
          {initials}
        </div>
      </div>

      {/* Info column */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start gap-1">
            <h3 className="text-lg font-bold text-[var(--text)]">
              {member.name}
            </h3>
            <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-muted)] bg-[var(--surface)] px-2 py-0.5 rounded mt-0.5">
              {member.year}
            </span>
          </div>
          <p className="text-[10px] text-[var(--text-muted)] font-semibold mt-0.5">{member.branch}</p>

          {/* Interests tags */}
          <div className="flex flex-wrap gap-1 mt-3">
            {member.interests.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] px-2.5 py-0.5 rounded uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="flex items-center gap-3 mt-6 pt-4 border-t border-[var(--border)]">
          <a
            href={`mailto:${member.email}`}
            className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] hover:opacity-80 transition-opacity flex items-center gap-1 bg-[var(--surface)] px-3 py-1.5 border border-[var(--border)] rounded"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            Email
          </a>
          {member.whatsapp && (
            <a
              href={`https://wa.me/${member.whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] hover:opacity-80 transition-opacity flex items-center gap-1 bg-[var(--surface)] px-3 py-1.5 border border-[var(--border)] rounded"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.233 8.377 3.469 2.235 2.237 3.465 5.214 3.464 8.384-.003 6.536-5.328 11.86-11.859 11.86-2.007-.001-3.98-.51-5.741-1.479L0 24zm6.59-4.846c1.6.95 3.197 1.451 4.795 1.453 5.4 0 9.792-4.393 9.795-9.798.001-2.618-1.01-5.08-2.863-6.936C16.43 2.016 13.97 1 11.353 1 5.952 1 1.56 5.39 1.557 10.793c-.001 1.705.452 3.369 1.31 4.84L1.87 21.088l5.221-1.371z" />
              </svg>
              Chat
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
