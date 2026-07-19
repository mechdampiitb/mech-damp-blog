"use client";
import React, { useEffect, useState } from "react";
import CourseCard from "@/components/CourseCard";
import { Course } from "@/lib/types";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedCredits, setSelectedCredits] = useState("All");
  const [selectedDiff, setSelectedDiff] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses");
        if (res.ok) {
          const data = await res.json();
          setCourses(data);
          setFilteredCourses(data);
        }
      } catch (err) {
        console.error("Error loading courses:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (search.trim() !== "") {
      const q = search.toLowerCase();
      result = result.filter(
        (c) =>
          c.courseCode.toLowerCase().includes(q) ||
          c.courseName.toLowerCase().includes(q) ||
          c.reviews.some((r) => r.professor.toLowerCase().includes(q))
      );
    }

    if (selectedDept !== "All") {
      result = result.filter((c) => c.department === selectedDept);
    }

    if (selectedCredits !== "All") {
      result = result.filter((c) => c.credits === Number(selectedCredits));
    }

    if (selectedDiff !== "All") {
      result = result.filter((c) => {
        const avgDiff = c.reviews.reduce((acc, r) => acc + r.difficulty, 0) / c.reviews.length;
        if (selectedDiff === "Easy (1-2)") return avgDiff <= 2.5;
        if (selectedDiff === "Medium (3)") return avgDiff > 2.5 && avgDiff <= 3.5;
        if (selectedDiff === "Hard (4-5)") return avgDiff > 3.5;
        return true;
      });
    }

    setFilteredCourses(result);
  }, [search, selectedDept, selectedCredits, selectedDiff, courses]);

  const departments = ["All", ...Array.from(new Set(courses.map((c) => c.department)))];
  const creditsList = ["All", ...Array.from(new Set(courses.map((c) => String(c.credits))))];

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto min-h-screen animate-fade-in relative transition-all duration-300">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--text)]">Course Reviews</h1>
        <p className="text-[var(--text-muted)] text-sm md:text-base font-light">
          Find student-moderated reviews, grading schemes, workloads, and preparation advice for Mechanical Engineering courses.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 p-6 rounded-xl border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex flex-col gap-1.5 md:col-span-1">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Search</label>
          <input
            type="text"
            placeholder="Code, title, professor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full apple-input px-4 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Department</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full apple-input px-3 py-2 text-sm cursor-pointer"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Credits</label>
          <select
            value={selectedCredits}
            onChange={(e) => setSelectedCredits(e.target.value)}
            className="w-full apple-input px-3 py-2 text-sm cursor-pointer"
          >
            {creditsList.map((cred) => (
              <option key={cred} value={cred}>
                {cred === "All" ? "All" : `${cred} Credits`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Difficulty</label>
          <select
            value={selectedDiff}
            onChange={(e) => setSelectedDiff(e.target.value)}
            className="w-full apple-input px-3 py-2 text-sm cursor-pointer"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy (1-2)">Easy (1 - 2.5)</option>
            <option value="Medium (3)">Medium (2.5 - 3.5)</option>
            <option value="Hard (4-5)">Hard (3.5 - 5)</option>
          </select>
        </div>
      </div>

      {/* Main Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-6 h-6 border-2 border-[var(--text)] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className="text-center py-20 border border-[var(--border)] bg-[var(--surface)] rounded-xl p-8">
          <p className="text-[var(--text-muted)] font-medium">No courses found matching your query.</p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedDept("All");
              setSelectedCredits("All");
              setSelectedDiff("All");
            }}
            className="mt-4 text-[10px] font-bold uppercase tracking-wider border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] px-4 py-2 rounded hover:border-[var(--text)] transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => setSelectedCourse(course)}
            />
          ))}
        </div>
      )}

      {/* Reviews Modal Overlay */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-[var(--surface-card)] border border-[var(--border)] rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-xl animate-slide-up">
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[var(--border)] flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded">
                  {selectedCourse.department}
                </span>
                <h2 className="text-2xl font-bold text-[var(--text)] mt-2">
                  {selectedCourse.courseCode} — {selectedCourse.courseName}
                </h2>
                <p className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider mt-1">
                  {selectedCourse.credits} Credits • {selectedCourse.reviews.length} Student Reviews
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-[var(--text-muted)] hover:text-[var(--text)] p-1.5 bg-[var(--surface)] border border-[var(--border)] rounded-lg cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex flex-col gap-6 bg-[var(--bg)]/50">
              {selectedCourse.reviews.map((review) => (
                <div key={review.id} className="border border-[var(--border)] bg-[var(--surface-card)] rounded-xl p-6 relative">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 pb-4 border-b border-[var(--border)]">
                    <div>
                      <h4 className="font-bold text-[var(--text)] text-sm uppercase tracking-wider">
                        Taken in {review.semester} {review.year}
                      </h4>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">
                        Instructed by <span className="text-[var(--text)] font-semibold">{review.professor}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-semibold bg-[var(--surface)] px-4 py-2 border border-[var(--border)] rounded-lg">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Difficulty</span>
                        <span className="text-[var(--text)] font-bold text-sm mt-0.5">
                          {review.difficulty} <span className="text-[10px] text-[var(--text-muted)] font-normal">/ 5</span>
                        </span>
                      </div>
                      <div className="h-6 w-px bg-[var(--border)]" />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Workload</span>
                        <span className="text-[var(--text)] font-bold text-sm mt-0.5">
                          {review.workloadHoursPerWeek} <span className="text-[10px] text-[var(--text-muted)] font-normal">h/w</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col gap-1 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-lg">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Attendance Policy</span>
                      <p className="text-xs text-[var(--text)] leading-relaxed font-light">{review.attendancePolicy || "No policy specified."}</p>
                    </div>
                    <div className="flex flex-col gap-1 bg-[var(--surface)] border border-[var(--border)] p-4 rounded-lg">
                      <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Grading Breakdown</span>
                      <p className="text-xs text-[var(--text)] leading-relaxed font-light">{review.gradingBreakdown || "No breakdown specified."}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-2">Review Summary</span>
                    <p className="text-xs text-[var(--text)] leading-relaxed font-light whitespace-pre-line">{review.summary}</p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {review.tags?.map((t) => (
                      <span key={t} className="text-[9px] font-bold bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)] px-2 py-0.5 rounded uppercase tracking-wider">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-start md:items-center text-[10px] text-[var(--text-muted)] gap-2">
                    <span>
                      Reviewed by <span className="text-[var(--text)] font-semibold">{review.reviewerName}</span> ({review.reviewerBatch})
                    </span>
                    <span>Submitted on {new Date(review.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
