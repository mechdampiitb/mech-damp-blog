"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";

export default function AdminQueue() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"course" | "experience">("course");
  const [comments, setComments] = useState<Record<string, string>>({});
  const [actioningId, setActioningId] = useState<string | null>(null);
  const router = useRouter();

  async function load() {
    try {
      const res = await fetch("/api/submissions?status=submitted");
      if (res.ok) {
        setSubmissions(await res.json());
      }
    } catch (err) {
      console.error("Error loading submissions:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAct(id: string, action: "approved" | "rejected" | "changes_requested") {
    setActioningId(id);
    const adminComment = comments[id] || "";

    try {
      const res = await fetch(`/api/submissions/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: action, adminComment }),
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        setComments((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        await load();
      }
    } catch (err) {
      console.error("Error updating submission:", err);
    } finally {
      setActioningId(null);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin-logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const courseSubmissions = submissions.filter((s) => s.type !== "experience");
  const experienceSubmissions = submissions.filter((s) => s.type === "experience");
  const currentList = activeTab === "course" ? courseSubmissions : experienceSubmissions;

  return (
    <div className="px-6 py-12 max-w-5xl mx-auto min-h-screen animate-fade-in flex flex-col gap-8 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] font-display">Moderation Desk</h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">Review pending course recommendations and career logs.</p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--text)] bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-2 hover:border-[var(--text)] transition-all cursor-pointer"
        >
          Sign Out
        </button>
      </div>

      {/* Navigation tabs */}
      <div className="flex gap-4 border-b border-[var(--border)] pb-3">
        <button
          onClick={() => setActiveTab("course")}
          className={`pb-2.5 font-bold text-xs uppercase tracking-wider relative transition-colors cursor-pointer ${
            activeTab === "course" ? "text-[var(--text)] font-extrabold" : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Course Reviews ({courseSubmissions.length})
          {activeTab === "course" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text)] rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`pb-2.5 font-bold text-xs uppercase tracking-wider relative transition-colors cursor-pointer ${
            activeTab === "experience" ? "text-[var(--text)] font-extrabold" : "text-[var(--text-muted)] hover:text-[var(--text)]"
          }`}
        >
          Internships ({experienceSubmissions.length})
          {activeTab === "experience" && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--text)] rounded-full" />
          )}
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-6 h-6 border-2 border-[var(--text)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : currentList.length === 0 ? (
        <div className="text-center py-20 border border-[var(--border)] bg-[var(--surface)] rounded-xl p-8">
          <p className="text-[var(--text-muted)] font-medium">Nothing pending in this queue.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {currentList.map((s) => (
            <div key={s.id} className="apple-card p-6 flex flex-col gap-6 relative">
              {/* Card Title details */}
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text)] bg-[var(--surface)] px-2 py-0.5 rounded">
                      {s.type === "experience" ? s.experienceType : s.department}
                    </span>
                    <StatusBadge status={s.status} />
                  </div>
                  <h2 className="text-xl font-bold text-[var(--text)] mt-2 font-display">
                    {s.type === "experience"
                      ? `${s.companyName} — ${s.role}`
                      : `${s.courseCode} — ${s.courseName}`}
                  </h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Submitted by <span className="text-[var(--text)] font-semibold">{s.reviewerName}</span> ({s.reviewerBatch} • {s.reviewerEmail}) on {new Date(s.submittedAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Specific Content details */}
              {s.type !== "experience" ? (
                // Course submission info
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold border-y border-[var(--border)] py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Professor</span>
                    <span className="text-[var(--text)] mt-1 text-sm font-semibold">{s.professor}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Sem & Credits</span>
                    <span className="text-[var(--text)] mt-1 text-sm font-semibold">{s.semester} • {s.credits} Credits</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Difficulty & Workload</span>
                    <span className="text-[var(--text)] mt-1 text-sm font-semibold">Diff: {s.difficulty}/5 • Workload: {s.workloadHoursPerWeek} h/w</span>
                  </div>
                </div>
              ) : (
                // Experience submission info
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold border-y border-[var(--border)] py-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Stipend / CTC</span>
                    <span className="text-[var(--text)] mt-1 text-sm font-semibold">{s.stipendOrCtc || "N/A"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Selection Difficulty</span>
                    <span className="text-[var(--text)] mt-1 text-sm font-semibold">Diff: {s.difficulty}/5</span>
                  </div>
                </div>
              )}

              {/* Submissions Detail summaries */}
              <div className="flex flex-col gap-4 text-xs font-light">
                {s.type === "experience" && (
                  <div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Selection Process</span>
                    <p className="text-[var(--text)] leading-relaxed bg-[var(--surface-card)] border border-[var(--border)] p-4 rounded-xl whitespace-pre-line">{s.selectionProcess}</p>
                  </div>
                )}
                
                <div>
                  <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                    {s.type === "experience" ? "Experience Summary" : "Review Summary"}
                  </span>
                  <p className="text-[var(--text)] leading-relaxed bg-[var(--surface-card)] border border-[var(--border)] p-4 rounded-xl whitespace-pre-line">{s.summary}</p>
                </div>

                {s.type === "experience" && s.takeaways && (
                  <div>
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Preparation Tips & Takeaways</span>
                    <p className="text-[var(--text)] leading-relaxed bg-[var(--surface)] border border-[var(--border)] p-4 rounded-xl whitespace-pre-line">{s.takeaways}</p>
                  </div>
                )}

                {s.type !== "experience" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Attendance Policy</span>
                      <p className="text-[var(--text)] leading-relaxed bg-[var(--surface-card)] border border-[var(--border)] p-4 rounded-xl font-light">{s.attendancePolicy || "N/A"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">Grading Breakdown</span>
                      <p className="text-[var(--text)] leading-relaxed bg-[var(--surface-card)] border border-[var(--border)] p-4 rounded-xl font-light">{s.gradingBreakdown || "N/A"}</p>
                    </div>
                  </div>
                )}

                {s.tags && s.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.tags.map((t: string) => (
                      <span key={t} className="text-[9px] font-bold bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5 rounded uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Admin Comments and Controls */}
              <div className="border-t border-[var(--border)] pt-6 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Admin Comment / Reason (Required for requesting changes/rejecting)</label>
                  <textarea
                    placeholder="Provide comment for changes requested or rejection reasons..."
                    value={comments[s.id] || ""}
                    onChange={(e) => setComments({ ...comments, [s.id]: e.target.value })}
                    rows={2}
                    className="w-full apple-input px-4 py-2 text-sm resize-none"
                  />
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    onClick={() => handleAct(s.id, "approved")}
                    disabled={actioningId !== null}
                    className="apple-btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:opacity-90 disabled:opacity-40 cursor-pointer"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleAct(s.id, "changes_requested")}
                    disabled={actioningId !== null || !comments[s.id]?.trim()}
                    className="apple-btn-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Request Changes
                  </button>
                  <button
                    onClick={() => handleAct(s.id, "rejected")}
                    disabled={actioningId !== null || !comments[s.id]?.trim()}
                    className="apple-btn-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:border-red-500/40 hover:text-red-500"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}