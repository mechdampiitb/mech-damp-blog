import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg)] px-6 py-12 text-xs text-[var(--text-muted)] mt-auto transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-extrabold text-sm tracking-tight text-[var(--text)] font-display">Mech DAMP</span>
          <p className="text-[10px]">Department Academic Mentorship Program, IIT Bombay</p>
        </div>

        <div className="flex gap-6 font-semibold uppercase tracking-wider">
          <Link href="/contribute" className="hover:text-[var(--text)] transition-colors">
            Contribute a Review
          </Link>
          <a
            href="https://www.me.iitb.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text)] transition-colors"
          >
            IITB Mechanical Dept
          </a>
        </div>

        <p className="text-[10px]">
          © {new Date().getFullYear()} Mech DAMP, IIT Bombay.
        </p>
      </div>
    </footer>
  );
}