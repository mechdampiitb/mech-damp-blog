"use client";
import React, { useState } from "react";

type FieldErrors = Record<string, string>;

function validate(payload: Record<string, any>): FieldErrors {
  const errors: FieldErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.courseCode || String(payload.courseCode).trim().length < 2)
    errors.courseCode = "Required.";
  if (!payload.courseName || String(payload.courseName).trim().length < 2)
    errors.courseName = "Required.";
  if (!payload.department || String(payload.department).trim().length < 2)
    errors.department = "Required.";
  if (!payload.credits || Number.isNaN(payload.credits) || payload.credits <= 0)
    errors.credits = "Enter a valid credit count.";
  if (!payload.workloadHoursPerWeek || Number.isNaN(payload.workloadHoursPerWeek) || payload.workloadHoursPerWeek < 0)
    errors.workloadHoursPerWeek = "Enter estimated hours/week.";
  if (!payload.professor || String(payload.professor).trim().length < 2)
    errors.professor = "Required.";
  if (!payload.year || Number.isNaN(payload.year))
    errors.year = "Enter a valid year.";
  if (!payload.rating || payload.rating < 1 || payload.rating > 5)
    errors.rating = "Pick a rating between 1 and 5.";
  if (!payload.summary || String(payload.summary).trim().length < 50)
    errors.summary = "Add a bit more detail (min 50 characters).";
  if (!payload.reviewerName || String(payload.reviewerName).trim().length < 2)
    errors.reviewerName = "Required.";
  if (!payload.reviewerBatch || String(payload.reviewerBatch).trim().length < 4)
    errors.reviewerBatch = "Enter a valid roll number/batch.";
  if (!payload.reviewerEmail || !emailRegex.test(String(payload.reviewerEmail)))
    errors.reviewerEmail = "Enter a valid email address.";

  return errors;
}

export default function SubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState(3);
  const [rating, setRating] = useState(3);
  const [attendanceMandatory, setAttendanceMandatory] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);

    const payload = {
      type: "course",
      courseCode: (form.get("courseCode") as string)?.trim(),
      courseName: (form.get("courseName") as string)?.trim(),
      department: (form.get("department") as string)?.trim(),
      semester: form.get("semester"),
      year: Number(form.get("year")),
      professor: (form.get("professor") as string)?.trim(),
      credits: Number(form.get("credits")),
      difficulty: Number(difficulty),
      rating: Number(rating),
      workloadHoursPerWeek: Number(form.get("workload")),
      attendanceMandatory,
      attendancePolicy: (form.get("attendancePolicy") as string)?.trim() || "",
      gradingBreakdown: (form.get("gradingBreakdown") as string)?.trim() || "",
      summary: (form.get("summary") as string)?.trim(),
      tags: ((form.get("tags") as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
      reviewerName: (form.get("reviewerName") as string)?.trim(),
      reviewerBatch: (form.get("reviewerBatch") as string)?.trim(),
      reviewerEmail: (form.get("reviewerEmail") as string)?.trim(),
    };

    const errors = validate(payload);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix the highlighted fields.");
      return;
    }
    setFieldErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.details?.join(", ") || "Something went wrong — try again.");
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

  const ratingLabels: Record<number, string> = {
    1: "Would not recommend",
    2: "Below average",
    3: "Decent",
    4: "Good, would recommend",
    5: "Excellent, must take",
  };

  const errClass = (field: string) => (fieldErrors[field] ? "border-red-500" : "");

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
          <input name="courseCode" placeholder="e.g. ME 201" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("courseCode")}`} />
          {fieldErrors.courseCode && <p className="text-red-500 text-[10px]">{fieldErrors.courseCode}</p>}
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Course Name</label>
          <input name="courseName" placeholder="e.g. Fluid Mechanics" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("courseName")}`} />
          {fieldErrors.courseName && <p className="text-red-500 text-[10px]">{fieldErrors.courseName}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Department / Division</label>
          <input name="department" placeholder="e.g. Thermal & Fluids" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("department")}`} />
          {fieldErrors.department && <p className="text-red-500 text-[10px]">{fieldErrors.department}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Credits</label>
          <input name="credits" type="number" placeholder="e.g. 6" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("credits")}`} />
          {fieldErrors.credits && <p className="text-red-500 text-[10px]">{fieldErrors.credits}</p>}
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Workload (hrs/week)</label>
          <input name="workload" type="number" placeholder="e.g. 8" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("workloadHoursPerWeek")}`} />
          {fieldErrors.workloadHoursPerWeek && <p className="text-red-500 text-[10px]">{fieldErrors.workloadHoursPerWeek}</p>}
        </div>
      </div>

      {/* Professor and Semester */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Professor</label>
          <input name="professor" placeholder="e.g. Prof. Amit Agrawal" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("professor")}`} />
          {fieldErrors.professor && <p className="text-red-500 text-[10px]">{fieldErrors.professor}</p>}
        </div>
        <div className="flex grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Sem Taken</label>
            <select name="semester" required className="w-full apple-input px-2 py-2.5 text-sm cursor-pointer">
              <option value="Autumn">Autumn</option>
              <option value="Spring">Spring</option>
              <option value="Summer">Summer</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Year taken</label>
            <input name="year" type="number" defaultValue={new Date().getFullYear()} required className={`w-full apple-input px-2 py-2.5 text-sm ${errClass("year")}`} />
          </div>
        </div>
      </div>
      {fieldErrors.year && <p className="text-red-500 text-[10px] -mt-4">{fieldErrors.year}</p>}

      {/* Difficulty + Rating sliders side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Course Difficulty</label>
            <span className="text-[10px] font-bold text-[var(--text)] bg-[var(--surface-card)] border border-[var(--border)] px-2 py-0.5 rounded">
              {diffLabels[difficulty]}
            </span>
          </div>
          <input type="range" min="1" max="5" step="1" value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            style={{ accentColor: "var(--text)" }}
            className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer mt-2" />
          <div className="flex justify-between text-[9px] text-[var(--text-muted)] px-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Overall Rating</label>
            <span className="text-[10px] font-bold text-[var(--text)] bg-[var(--surface-card)] border border-[var(--border)] px-2 py-0.5 rounded">
              {ratingLabels[rating]}
            </span>
          </div>
          <input type="range" min="1" max="5" step="1" value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            style={{ accentColor: "var(--text)" }}
            className="w-full h-1 bg-[var(--border)] rounded-lg appearance-none cursor-pointer mt-2" />
          <div className="flex justify-between text-[9px] text-[var(--text-muted)] px-1">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
          </div>
        </div>
      </div>

      {/* Policy and Grading */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Attendance Policy</label>
            <label className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
              <input type="checkbox" checked={attendanceMandatory} onChange={(e) => setAttendanceMandatory(e.target.checked)} />
              Mandatory
            </label>
          </div>
          <textarea name="attendancePolicy" placeholder="e.g. Strict 75% attendance check. DX awarded if below." rows={2}
            className="w-full apple-input px-4 py-2 text-sm resize-none" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Grading Breakdown</label>
          <textarea name="gradingBreakdown" placeholder="e.g. Quizzes: 20%, Midsem: 35%, Endsem: 45%" rows={2}
            className="w-full apple-input px-4 py-2 text-sm resize-none" />
        </div>
      </div>

      {/* Review text */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Your Review / Insights</label>
        <textarea name="summary" placeholder="Share study strategies, critical textbook references, tutorial recommendations, and general experiences that will help your juniors..." required rows={5}
          className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("summary")}`} />
        {fieldErrors.summary && <p className="text-red-500 text-[10px]">{fieldErrors.summary}</p>}
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Tags (comma separated)</label>
        <input name="tags" placeholder="e.g. coding-heavy, math-heavy, project-included, friendly-grading" className="w-full apple-input px-4 py-2.5 text-sm" />
      </div>

      {/* Reviewer Credentials */}
      <div className="border-t border-[var(--border)] pt-6 flex flex-col gap-4">
        <h4 className="text-xs font-bold text-[var(--text)] uppercase tracking-wider">Reviewer Identity (Only visible to admin coordinators)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <input name="reviewerName" placeholder="Your Name" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("reviewerName")}`} />
            {fieldErrors.reviewerName && <p className="text-red-500 text-[10px]">{fieldErrors.reviewerName}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <input name="reviewerBatch" placeholder="Your Roll No / Batch (e.g. 23B0300)" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("reviewerBatch")}`} />
            {fieldErrors.reviewerBatch && <p className="text-red-500 text-[10px]">{fieldErrors.reviewerBatch}</p>}
          </div>
          <div className="flex flex-col gap-1.5">
            <input name="reviewerEmail" type="email" placeholder="Your Email Address" required className={`w-full apple-input px-4 py-2.5 text-sm ${errClass("reviewerEmail")}`} />
            {fieldErrors.reviewerEmail && <p className="text-red-500 text-[10px]">{fieldErrors.reviewerEmail}</p>}
          </div>
        </div>
      </div>

      {/* Error alert */}
      {error && <p className="text-red-500 text-xs font-medium text-center">{error}</p>}

      {/* Actions */}
      <div className="mt-2">
        <button type="submit" disabled={loading}
          className="w-full bg-[var(--text)] text-[var(--bg)] border border-transparent font-semibold px-6 py-3 rounded-xl transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 hover:opacity-90">
          {loading && <div className="w-4 h-4 border-2 border-[var(--bg)] border-t-transparent rounded-full animate-spin" />}
          Submit Review
        </button>
      </div>
    </form>
  );
}