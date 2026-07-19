"use client";
import React, { useState } from "react";

export default function SubmissionForm() {
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
      type: "course",
      courseCode: form.get("courseCode"),
      courseName: form.get("courseName"),
      department: form.get("department"),
      semester: form.get("semester"),
      year: Number(form.get("year")),
      professor: form.get("professor"),
      credits: Number(form.get("credits")),
      difficulty: Number(difficulty),
      workloadHoursPerWeek: Number(form.get("workload")),
      attendancePolicy: form.get("attendancePolicy"),
      gradingBreakdown: form.get("gradingBreakdown"),
      summary: form.get("summary"),
      tags: (form.get("tags") as string)?.split(",").map((t) => t.trim()).filter(Boolean) ?? [],
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
    1: "Very Easy (Piece of cake)",
    2: "Easy (Standard course)",
    3: "Medium (Moderate pressure)",
    4: "Hard (Challenging concepts)",
    5: "Extreme (Heavy math/Nightmare workload)",
  };

  if (submitted) {
    return (
      <div className="border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] p-6 rounded-xl flex flex-col items-center text-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-full border border-[var(--text)] text-[var(--text)] flex items-center justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-base font-bold text-[var(--text)]">Review Submitted Successfully!</h3>
        <p className="text-xs text-[var(--text-muted)] max-w-md font-light">
          Thank you! Your course review has been queued. It will appear on the site once reviewed by the DAMP coordinators for authenticity.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-2xl border border-[var(--border)] bg-[var(--surface)]/20 p-6 rounded-xl transition-all duration-300">
      {/* Course Core Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5 col-span-1">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Course Code</label>
          <input
            name="courseCode"
            placeholder="e.g. ME 201"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Course Name</label>
          <input
            name="courseName"
            placeholder="e.g. Fluid Mechanics"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Department / Division</label>
          <input
            name="department"
            placeholder="e.g. Thermal & Fluids"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Credits</label>
          <input
            name="credits"
            type="number"
            placeholder="e.g. 6"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Workload (hrs/week)</label>
          <input
            name="workload"
            type="number"
            placeholder="e.g. 8"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
      </div>

      {/* Professor and Semester */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Professor</label>
          <input
            name="professor"
            placeholder="e.g. Prof. Amit Agrawal"
            required
            className="w-full apple-input px-4 py-2.5 text-sm"
          />
        </div>
        <div className="flex grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Sem Taken</label>
            <select
              name="semester"
              required
              className="w-full apple-input px-2 py-2.5 text-sm cursor-pointer"
            >
              <option value="Autumn">Autumn</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Year taken</label>
            <input
              name="year"
              type="number"
              defaultValue={new Date().getFullYear()}
              required
              className="w-full apple-input px-2 py-2.5 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Interactive Difficulty Slider */}
      <div className="flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Course Difficulty</label>
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
          <span>1 (Relaxed)</span>
          <span>2</span>
          <span>3 (Moderate)</span>
          <span>4</span>
          <span>5 (Demanding)</span>
        </div>
      </div>

      {/* Policy and Grading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Attendance Policy</label>
          <textarea
            name="attendancePolicy"
            placeholder="e.g. Strict 75% attendance check. DX awarded if below."
            rows={2}
            className="w-full apple-input px-4 py-2 text-sm resize-none"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Grading Breakdown</label>
          <textarea
            name="gradingBreakdown"
            placeholder="e.g. Quizzes: 20%, Midsem: 35%, Endsem: 45%"
            rows={2}
            className="w-full apple-input px-4 py-2 text-sm resize-none"
          />
        </div>
      </div>

      {/* Review text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Your Review / Insights</label>
        <textarea
          name="summary"
          placeholder="Share study strategies, critical textbook references, tutorial recommendations, and general experiences that will help your juniors..."
          required
          rows={5}
          className="w-full apple-input px-4 py-2.5 text-sm"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Tags (comma separated)</label>
        <input
          name="tags"
          placeholder="e.g. coding-heavy, math-heavy, project-included, friendly-grading"
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
          Submit Review
        </button>
      </div>
    </form>
  );
}