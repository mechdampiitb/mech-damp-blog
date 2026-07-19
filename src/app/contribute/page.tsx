"use client";
import React, { useState } from "react";
import SubmissionForm from "@/components/SubmissionForm";
import ExperienceSubmissionForm from "@/components/ExperienceSubmissionForm";

export default function ContributePage() {
  const [activeTab, setActiveTab] = useState<"courses" | "experiences" | string>("courses");

  return (
    <div className="px-6 py-12 max-w-3xl mx-auto min-h-screen animate-fade-in transition-all duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]">Contribute a Review</h1>
        <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed font-light">
          Share your academic experiences or placement insights to help current students make informed choices. All published entries are fully anonymous.
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-[var(--border)] mb-8 gap-6 bg-[var(--surface)] px-4 pt-4 rounded-t-xl">
        <button
          type="button"
          onClick={() => setActiveTab("courses")}
          className={`pb-3.5 font-bold text-xs uppercase tracking-wider relative transition-colors cursor-pointer ${
            activeTab === "courses"
              ? "text-[var(--text)] font-extrabold"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Course Review
          {activeTab === "courses" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text)] rounded-t-full transition-all" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("experiences")}
          className={`pb-3.5 font-bold text-xs uppercase tracking-wider relative transition-colors cursor-pointer ${
            activeTab === "experiences"
              ? "text-[var(--text)] font-extrabold"
              : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Internship & Career Log
          {activeTab === "experiences" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text)] rounded-t-full transition-all" />
          )}
        </button>
      </div>

      {/* Tab Content Box */}
      <div className="transition-all duration-300">
        {activeTab === "courses" ? (
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
              <h2 className="text-xs font-bold text-[var(--text)] mb-1 uppercase tracking-wider">Course Insights</h2>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-light">
                Give your inputs on grading weightages, lecture attendance guidelines, exams difficulty, and useful textbooks.
              </p>
            </div>
            <SubmissionForm />
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl">
              <h2 className="text-xs font-bold text-[var(--text)] mb-1 uppercase tracking-wider">Internships & Placement</h2>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-light">
                Document selection rounds, technical and HR interview questions, preparation tips, and key takeaways for juniors.
              </p>
            </div>
            <ExperienceSubmissionForm />
          </div>
        )}
      </div>
    </div>
  );
}