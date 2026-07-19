import Link from "next/link";
import { getCourses, getExperiences } from "@/lib/data";
import Hero from "@/components/Hero";

export default async function Home() {
  const courses = await getCourses();
  const experiences = await getExperiences();

  const totalExperiences = experiences.length;

  return (
    <div className="flex flex-col gap-20 pb-20 animate-fade-in transition-all duration-300">
      {/* About Section */}
      <section className="px-6 max-w-5xl mx-auto w-full pt-12 flex flex-col md:flex-row gap-8 md:gap-16 select-none animate-slide-up">
        <div className="md:w-1/3 flex flex-col gap-5">
          <img
            src="/damp-greyscale.svg"
            alt="Mech DAMP Logo"
            className="w-20 h-20 dark:invert transition-opacity duration-300 hover:opacity-80"
          />
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">About DAMP</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text)] tracking-tight">
              The bridge between experience and confusion.
            </h2>
          </div>
        </div>
        <div className="md:w-2/3 flex flex-col gap-6 text-sm md:text-base text-[var(--text-muted)] font-light leading-relaxed pt-2">
          <p className="text-[var(--text)] font-normal text-base md:text-lg leading-relaxed">
            Mechanical Engineering is more than just gears, levers, and late-night CAD struggles—it’s about navigating a maze of courses, projects, and opportunities.
          </p>
          <p>
            The Mechanical Department Academic Mentorship Program (Mech-DAMP) is here to make that journey smoother (and maybe a little less stressful).
          </p>
          <p>
            Think of us as the bridge between experience and confusion: seniors sharing their hard-earned tips, mentors helping with academics, and faculty staying connected with students. From course reviews to project leads, Mech-DAMP is your pit stop for everything mechanical—minus the grease.
          </p>
        </div>
      </section>

      {/* Hero Section */}
      <div className="border-t border-[var(--border)] pt-8">
        <Hero coursesCount={courses.length} experiencesCount={totalExperiences} />
      </div>

      {/* Info Sections */}
      <section className="px-6 max-w-5xl mx-auto w-full select-none border-t border-[var(--border)] pt-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-3">Academic Mentorship Platform</h2>
          <p className="text-[var(--text-muted)] max-w-xl mx-auto text-sm md:text-base font-light">
            Mech DAMP provides peer-to-peer insights on coursework and career opportunities in Mechanical Engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="apple-card p-8 flex flex-col gap-5">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--text)] border border-[var(--border)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">Course Reviews</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
                Find honest advice about courses, professor teaching styles, grading metrics, and workload expectations from juniors and seniors.
              </p>
            </div>
            <Link href="/courses" className="text-[var(--text)] hover:opacity-75 text-xs font-bold uppercase tracking-wider mt-auto flex items-center gap-1">
              Browse Reviews &rarr;
            </Link>
          </div>

          {/* Card 2 */}
          <div className="apple-card p-8 flex flex-col gap-5">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--text)] border border-[var(--border)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 .414-.336.75-.75.75H4.5a.75.75 0 0 1-.75-.75v-4.25m16.5 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 14.15m17.25 0c-.39-.148-.813-.225-1.25-.225H5.25c-.437 0-.86.077-1.25.225m17.25 0V7.5a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 7.5v6.65M12 9v2m0 0v2m0-2h2m-2 0H10" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">Internship Logs</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
                Learn about core engineering positions, research programs abroad, and corporate non-core internship placement rounds.
              </p>
            </div>
            <Link href="/experiences" className="text-[var(--text)] hover:opacity-75 text-xs font-bold uppercase tracking-wider mt-auto flex items-center gap-1">
              Read Internship Logs &rarr;
            </Link>
          </div>

          {/* Card 3 */}
          <div className="apple-card p-8 flex flex-col gap-5">
            <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center text-[var(--text)] border border-[var(--border)]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-[var(--text)] mb-2">Mentor Guidance</h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light">
                Struggling with subject choices, branch adjustments, or deciding on a minor? Get in touch with our student coordinators and mentors.
              </p>
            </div>
            <Link href="/team" className="text-[var(--text)] hover:opacity-75 text-xs font-bold uppercase tracking-wider mt-auto flex items-center gap-1">
              Meet the Team &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Contribute CTA */}
      <section className="px-6 max-w-5xl mx-auto w-full">
        <div className="relative rounded-2xl p-8 md:p-12 border border-[var(--border)] bg-[var(--surface)]">
          <div className="relative z-10 max-w-2xl flex flex-col gap-4">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--text)]">Help future batches succeed</h3>
            <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed font-light">
              Your semester reviews and internship prep advice could be the guidance a junior needs. Submitting a review takes 5 minutes, and all submissions are anonymous to the general public.
            </p>
            <div className="mt-2">
              <Link href="/contribute" className="inline-flex items-center justify-center apple-btn-primary px-6 py-3 text-sm font-semibold">
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}