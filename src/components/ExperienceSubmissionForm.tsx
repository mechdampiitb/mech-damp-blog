"use client";
import { useState } from "react";

export default function ExperienceSubmissionForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const payload = {
      type: "experience",
      companyName: form.get("companyName"),
      role: form.get("role"),
      experienceType: form.get("experienceType"),
      stipendOrCtc: form.get("stipendOrCtc"),
      selectionProcess: form.get("selectionProcess"),
      difficulty: Number(form.get("difficulty")),
      takeaways: form.get("takeaways"),
      summary: form.get("summary"),
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
      <p className="text-green-700 font-medium p-4 bg-green-50 border border-green-200 rounded-lg">
        Submitted! Your experience review will show up on the site once an admin approves it.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-xl">
      <input
        name="companyName"
        placeholder="Company / Organization Name (e.g. Bajaj Auto, ITC, Tata Motors)"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="role"
        placeholder="Role / Designation (e.g. R&D Intern, Core Engineer, Analyst)"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <select
        name="experienceType"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        <option value="">Select Experience Type</option>
        <option value="Core Internship">Core Internship</option>
        <option value="Non-Core Internship">Non-Core Internship</option>
        <option value="Research Internship / University">Research Internship / University</option>
        <option value="Full-Time Placement">Full-Time Placement</option>
        <option value="Other">Other</option>
      </select>
      <input
        name="stipendOrCtc"
        placeholder="Stipend / CTC (Optional, e.g. 80k/month)"
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="difficulty"
        type="number"
        min="1"
        max="5"
        placeholder="Selection Difficulty (1-5)"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        name="selectionProcess"
        placeholder="Selection Process Details (Resume shortlist, Aptitude Test, Technical Rounds, HR Round)"
        required
        rows={4}
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        name="summary"
        placeholder="Detailed Experience Review (Work culture, project quality, mentorship, day-to-day experience)"
        required
        rows={5}
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <textarea
        name="takeaways"
        placeholder="Preparation Tips & Takeaways for Juniors (Courses to do, software to learn, interview advice)"
        rows={3}
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="reviewerName"
        placeholder="Your Name"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="reviewerBatch"
        placeholder="Your Batch (e.g. 24B2106)"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      <input
        name="reviewerEmail"
        type="email"
        placeholder="Your Email"
        required
        className="border p-2.5 rounded-lg text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer mt-2"
      >
        Submit Experience Review
      </button>
    </form>
  );
}
