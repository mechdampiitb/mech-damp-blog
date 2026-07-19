"use client";
import React, { useEffect, useState } from "react";
import { ExperienceSubmission } from "@/lib/types";

const categories = ["All", "Core Internship", "Non-Core Internship", "Research Internship / University", "Full-Time Placement", "Other"];

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<ExperienceSubmission[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<ExperienceSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedExp, setSelectedExp] = useState<ExperienceSubmission | null>(null);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await fetch("/api/experiences");
        if (res.ok) {
          const data = await res.json();
          setExperiences(data);
          setFilteredExperiences(data);
        }
      } catch (err) {
        console.error("Error loading experiences:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  useEffect(() => {
    let result = experiences;

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.companyName.toLowerCase().includes(q) ||
          e.role.toLowerCase().includes(q) ||
          e.summary.toLowerCase().includes(q) ||
          e.selectionProcess.toLowerCase().includes(q)
      );
    }

    if (activeCategory !== "All") {
      result = result.filter((e) => e.experienceType === activeCategory);
    }

    setFilteredExperiences(result);
  }, [search, activeCategory, experiences]);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto min-h-screen animate-fade-in relative transition-all duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]">Internship & Placement Logs</h1>
        <p className="text-[var(--text-muted)] text-sm md:text-base font-light">
          Read selection processes, preparation advice, and work culture insights from Mechanical seniors.
        </p>
      </div>

      {/* Control Panel: Search & Category Tabs */}
      <div className="flex flex-col gap-6 mb-10">
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search by company, role, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>

        {/* Categories Tab Row */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--border)]">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--text)] text-[var(--bg)] border-transparent"
                    : "bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border)] hover:text-[var(--text)] hover:border-[var(--text)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Logs */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-6 h-6 border-2 border-[var(--text)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredExperiences.length === 0 ? (
        <div className="text-center py-20 border border-[var(--border)] bg-[var(--surface)] rounded-xl p-8">
          <p className="text-[var(--text-muted)] font-medium">No experience reviews found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              onClick={() => setSelectedExp(exp)}
              className="apple-card apple-card-hover p-6 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded">
                    {exp.experienceType}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)] font-semibold bg-[var(--surface)] px-2.5 py-1 rounded">
                    Diff {exp.difficulty}/5
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[var(--text)] group-hover:opacity-75 transition-opacity duration-200">
                  {exp.companyName}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                  {exp.role}
                </p>

                <p className="text-[var(--text-muted)] text-xs mt-4 line-clamp-3 leading-relaxed font-light">
                  {exp.summary}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)] flex justify-between items-center text-[10px] text-[var(--text-muted)]">
                <span>
                  Log by <span className="text-[var(--text)] font-semibold">{exp.reviewerName}</span> ({exp.reviewerBatch})
                </span>
                <span className="text-[var(--text)] font-semibold flex items-center gap-0.5">
                  Read Full Log &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Experience Details Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-xl animate-slide-up">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded">
                  {selectedExp.experienceType}
                </span>
                <h2 className="text-2xl font-bold text-[var(--text)] mt-2 font-display">
                  {selectedExp.companyName}
                </h2>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider mt-1 font-bold">
                  {selectedExp.role} {selectedExp.stipendOrCtc ? `• Stipend/CTC: ${selectedExp.stipendOrCtc}` : ""}
                </p>
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 bg-[var(--bg)]/50">
              {/* Difficulty and Metadata panel */}
              <div className="bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl flex items-center gap-6 text-xs">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Selection Difficulty</span>
                  <span className="text-[var(--text)] font-bold text-sm mt-0.5">
                    {selectedExp.difficulty} <span className="text-[10px] text-[var(--text-muted)] font-normal">/ 5</span>
                  </span>
                </div>
                <div className="h-8 w-px bg-[var(--border)]" />
                <div className="flex flex-col">
                  <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Log Submitted</span>
                  <span className="text-[var(--text)] font-semibold mt-0.5">
                    {new Date(selectedExp.submittedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Selection Process */}
              <div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Selection Rounds & Process</span>
                <div className="text-xs text-[var(--text)] leading-relaxed font-light whitespace-pre-line bg-[var(--surface-card)] border border-[var(--border)] p-5 rounded-xl">
                  {selectedExp.selectionProcess}
                </div>
              </div>

              {/* Detailed Summary */}
              <div>
                <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Internship / Work Experience</span>
                <p className="text-xs text-[var(--text)] leading-relaxed font-light whitespace-pre-line bg-[var(--surface-card)] border border-[var(--border)] p-5 rounded-xl">
                  {selectedExp.summary}
                </p>
              </div>

              {/* Prep Advice / Takeaways */}
              {selectedExp.takeaways && (
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Preparation Tips & Takeaways</span>
                  <p className="text-xs text-[var(--text)] leading-relaxed font-light whitespace-pre-line bg-[var(--surface)] border border-[var(--border)] p-5 rounded-xl">
                    {selectedExp.takeaways}
                  </p>
                </div>
              )}

              {/* Author Footer */}
              <div className="pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-[var(--text-muted)] gap-2">
                <span>
                  Log shared by <span className="text-[var(--text)] font-semibold">{selectedExp.reviewerName}</span> ({selectedExp.reviewerBatch})
                </span>
                <span>
                  Contact: <a href={`mailto:${selectedExp.reviewerEmail}`} className="text-[var(--text)] hover:underline">{selectedExp.reviewerEmail}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
