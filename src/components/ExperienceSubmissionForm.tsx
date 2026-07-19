"use client";
import React, { useState } from "react";

export default function ExperienceSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(3);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = new FormData(e.currentTarget);

    const payload = {
      type: "experience",
      companyName: form.get("companyName"),
      role: form.get("role"),
      experienceType: form.get("experienceType"),
      stipendOrCtc: form.get("stipendOrCtc"),
      selectionProcess: form.get("selectionProcess"),
      difficulty: Number(difficulty),
      takeaways: form.get("takeaways"),
      summary: form.get("summary"),
      reviewerName: form.get("reviewerName"),
      reviewerBatch: form.get("reviewerBatch"),
      reviewerEmail: form.get("reviewerEmail"),
    };

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Something went wrong — try again.");
      }
    } catch (err) {
      setError("Network error — check your connection.");
    } finally {
      setLoading(false);
    }
  }

  const diffLabels: Record<number, string> = {
    1: "Very Easy (Shortlist direct)",
    2: "Easy (Simple CV/Basic review)",
    3: "Medium (Aptitude test + 1 interview)",
    4: "Hard (Test + multiple interviews)",
    5: "Extreme (Tough technical + panel grill)",
  };

  if (submitted) {
    return (
      <div className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-6 rounded-xl flex flex-col items-center text-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-full border border-[var(--text)] text-[var(--text)] flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[var(--text)]">Log Submitted Successfully!</h3>
        <p className="text-xs text-[var(--text-muted)] max-w-md font-light">
          Thank you! Your experience review has been queued. It will appear on the site once reviewed by the DAMP coordinators for authenticity.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl border border-[var(--border)] bg-[var(--surface)]/20 p-6 rounded-xl transition-all duration-300">
      {/* Company and Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Company / Organization</label>
          <input
            name="companyName"
            placeholder="e.g. Jaguar Land Rover, ITC, BCG"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Role / Profile</label>
          <input
            name="role"
            placeholder="e.g. Aerodynamics Intern, Analyst"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Type and Stipend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Experience Type</label>
          <select
            name="experienceType"
            required
            className="w-full apple-input px-3 py-2.5 text-sm cursor-pointer"
          >
            <option value="">Select Category</option>
            <option value="Core Internship">Core Internship</option>
            <option value="Non-Core Internship">Non-Core Internship</option>
            <option value="Research Internship / University">Research Internship / University</option>
            <option value="Full-Time Placement">Full-Time Placement</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Stipend / CTC (Optional)</label>
          <input
            name="stipendOrCtc"
            placeholder="e.g. 1.2 Lakh/month"
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Difficulty Slider */}
      <div className="flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Selection Difficulty</label>
          <span className="text-[10px] font-bold text-[var(--text)] bg-[var(--surface-card)] border border-[var(--border)] px-2 py-0.5 rounded">
            {diffLabels[difficulty]}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={difficulty}
          onChange={(e) => setDifficulty(Number(e.target.value))}
          style={{ accentColor: "var(--text)" }}
          className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer mt-2"
        />
        <div className="flex justify-between text-[9px] text-[var(--text-muted)] px-1">
          <span>1 (Straightforward)</span>
          <span>2</span>
          <span>3 (Balanced)</span>
          <span>4</span>
          <span>5 (Highly Competitive)</span>
        </div>
      </div>

      {/* Selection Process details */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Selection Process Details</label>
        <textarea
          name="selectionProcess"
          placeholder="Step-by-step description: CGPA cutoff, Aptitude tests, GD topics, technical and HR interview rounds..."
          required
          rows={4}
          className="w-full apple-input px-4 py-2.5 text-sm"
        />
      </div>

      {/* Experience Summary */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Detailed Experience Review</label>
        <textarea
          name="summary"
          placeholder="Describe your day-to-day project tasks, office/lab work culture, quality of mentorship, resources available, and general takeaways..."
          required
          rows={5}
          className="w-full apple-input px-4 py-2.5 text-sm"
        />
      </div>

      {/* Preparation advice */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Preparation Tips & Takeaways</label>
        <textarea
          name="takeaways"
          placeholder="Advice for juniors: target courses, must-learn software (MATLAB, Solidworks, Fluent), coding languages, case study practice materials..."
          rows={3}
          className="w-full apple-input px-4 py-2.5 text-sm"
        />
      </div>

      {/* Reviewer Credentials */}
      <div className="border-t border-[var(--border)] pt-6 flex flex-col gap-4">
        <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Reviewer Identity (Only visible to admin coordinators)</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <input
              name="reviewerName"
              placeholder="Your Name"
              required
              className="w-full apple-input px-4 py-2.5 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              name="reviewerBatch"
              placeholder="Your Roll No / Batch (e.g. 23B0300)"
              required
              className="w-full apple-input px-4 py-2.5 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <input
              name="reviewerEmail"
              type="email"
              placeholder="Your Email Address"
              required
              className="w-full apple-input px-4 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

      {/* Actions */}
      <div className="mt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--text)] text-[var(--bg)] border border-transparent font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90"
        >
          {loading && <div className="w-4 h-4 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />}
          Submit Experience Review
        </button>
      </div>
    </form>
  );
}
