import React from "react";
import Link from "next/link";

interface HeroProps {
  coursesCount: number;
  experiencesCount: number;
}

export default function Hero({ coursesCount, experiencesCount }: HeroProps) {
  return (
    <section className="relative py-20 md:py-28 px-6 max-w-4xl mx-auto flex flex-col items-center text-center gap-6 select-none">

      {/* Headline */}
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[var(--text)] max-w-3xl leading-[1.1] animate-slide-up">
        Semester survival guide by Mech seniors.
      </h1>

      {/* Sub-headline */}
      <p className="text-[var(--text-muted)] text-base md:text-lg max-w-xl font-normal leading-relaxed animate-slide-up" style={{ animationDelay: "100ms" }}>
        Browse honest course reviews, preparation tips, and internship logs written by students, for students.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full sm:w-auto animate-slide-up" style={{ animationDelay: "200ms" }}>
        <Link
          href="/courses"
          className="apple-btn-primary px-8 py-3 text-sm font-semibold text-center hover:opacity-90"
        >
          Explore Courses
        </Link>
        <Link
          href="/experiences"
          className="apple-btn-secondary px-8 py-3 text-sm font-semibold text-center"
        >
          Read Internships
        </Link>
        <Link
          href="/contribute"
          className="apple-btn-secondary px-8 py-3 text-sm font-semibold text-center"
        >
          Submit Review
        </Link>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mt-16 p-6 border border-[var(--border)] bg-[var(--surface)] rounded-2xl w-full max-w-2xl animate-slide-up" style={{ animationDelay: "300ms" }}>
        <div className="flex flex-col items-center">
          <span className="text-2xl md:text-3xl font-extrabold text-[var(--text)]">{coursesCount}+</span>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">Courses Covered</span>
        </div>
        <div className="flex flex-col items-center border-l border-[var(--border)] px-2">
          <span className="text-2xl md:text-3xl font-extrabold text-[var(--text)]">{experiencesCount}+</span>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">Internship Logs</span>
        </div>
        <div className="flex flex-col items-center col-span-2 md:col-span-1 border-t md:border-t-0 md:border-l border-[var(--border)] pt-4 md:pt-0">
          <span className="text-2xl md:text-3xl font-extrabold text-[var(--text)]">100%</span>
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">Student Verified</span>
        </div>
      </div>
    </section>
  );
}
