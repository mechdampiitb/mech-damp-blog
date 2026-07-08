"use client";
import { useEffect, useState } from "react";
import { CourseReviewSubmission } from "@/lib/types";

export default function AdminQueue() {
  const [submissions, setSubmissions] = useState<CourseReviewSubmission[]>([]);

  async function load() {
    const res = await fetch("/api/submissions?status=submitted");
    setSubmissions(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function act(id: string, action: "approved" | "rejected" | "changes_requested") {
    await fetch(`/api/submissions/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status: action }),
    });
    load();
  }

  return (
    <div className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Pending Submissions</h1>
      {submissions.length === 0 && <p className="text-gray-600">Nothing pending.</p>}
      <div className="flex flex-col gap-6">
        {submissions.map((s) => (
          <div key={s.id} className="border rounded-lg p-5">
            <h2 className="font-semibold text-lg">
              {s.courseCode} — {s.courseName}
            </h2>
            <p className="text-sm text-gray-600 mb-3">
              By {s.reviewerName} ({s.reviewerBatch})
            </p>
            <p className="mb-4">{s.summary}</p>
            <div className="flex gap-3">
              <button onClick={() => act(s.id, "approved")} className="bg-green-600 text-white px-4 py-2 rounded">
                Approve
              </button>
              <button onClick={() => act(s.id, "rejected")} className="bg-red-600 text-white px-4 py-2 rounded">
                Reject
              </button>
              <button onClick={() => act(s.id, "changes_requested")} className="bg-yellow-500 text-white px-4 py-2 rounded">
                Request Changes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}