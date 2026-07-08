"use client";
import { useState } from "react";

export default function SubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      courseCode: form.get("courseCode"),
      courseName: form.get("courseName"),
      department: form.get("department"),
      semester: form.get("semester"),
      year: Number(form.get("year")),
      professor: form.get("professor"),
      credits: Number(form.get("credits")),
      difficulty: Number(form.get("difficulty")),
      workloadHoursPerWeek: Number(form.get("workload")),
      attendancePolicy: form.get("attendancePolicy"),
      gradingBreakdown: form.get("gradingBreakdown"),
      summary: form.get("summary"),
      tags: (form.get("tags") as string)?.split(",").map((t) => t.trim()) ?? [],
      reviewerName: form.get("reviewerName"),
      reviewerBatch: form.get("reviewerBatch"),
      reviewerEmail: form.get("reviewerEmail"),
    };

    const res = await fetch("/api/submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setSubmitted(true);
    } else {
      setError("Something went wrong — try again.");
    }
  }

  if (submitted) {
    return (
      <p className="text-green-700">
        Submitted! It'll show up on the site once an admin approves it.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <input name="courseCode" placeholder="Course Code (e.g. ME300)" required className="border p-2 rounded" />
      <input name="courseName" placeholder="Course Name" required className="border p-2 rounded" />
      <input name="department" placeholder="Department" required className="border p-2 rounded" />
      <input name="semester" placeholder="Semester (e.g. Spring)" required className="border p-2 rounded" />
      <input name="year" type="number" placeholder="Year taken" required className="border p-2 rounded" />
      <input name="professor" placeholder="Professor" required className="border p-2 rounded" />
      <input name="credits" type="number" placeholder="Credits" required className="border p-2 rounded" />
      <input name="difficulty" type="number" min="1" max="5" placeholder="Difficulty (1-5)" required className="border p-2 rounded" />
      <input name="workload" type="number" placeholder="Workload (hrs/week)" required className="border p-2 rounded" />
      <input name="attendancePolicy" placeholder="Attendance Policy" className="border p-2 rounded" />
      <textarea name="gradingBreakdown" placeholder="Grading Breakdown" className="border p-2 rounded" />
      <textarea name="summary" placeholder="Your review" required className="border p-2 rounded" rows={5} />
      <input name="tags" placeholder="Tags, comma separated (coding-heavy, math-heavy)" className="border p-2 rounded" />
      <input name="reviewerName" placeholder="Your Name" required className="border p-2 rounded" />
      <input name="reviewerBatch" placeholder="Your Batch (e.g. 24B2106)" required className="border p-2 rounded" />
      <input name="reviewerEmail" type="email" placeholder="Your Email" required className="border p-2 rounded" />
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700">
        Submit Review
      </button>
    </form>
  );
}