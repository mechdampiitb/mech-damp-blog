import React from "react";
import { Course } from "@/lib/types";

interface CourseCardProps {
  course: Course;
  onClick?: () => void;
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const reviewsCount = course.reviews?.length || 0;
  const avgDifficulty = reviewsCount > 0 
    ? (course.reviews.reduce((acc, r) => acc + r.difficulty, 0) / reviewsCount).toFixed(1)
    : "N/A";

  const avgWorkload = reviewsCount > 0
    ? (course.reviews.reduce((acc, r) => acc + r.workloadHoursPerWeek, 0) / reviewsCount).toFixed(0)
    : "N/A";

  return (
    <div 
      onClick={onClick}
      className="apple-card apple-card-hover p-6 cursor-pointer flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text)] bg-[var(--surface)] px-2.5 py-1 rounded">
            {course.department}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] font-semibold bg-[var(--surface)] px-2.5 py-1 rounded">
            {course.credits} Credits
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-[var(--text)] group-hover:opacity-75 transition-opacity duration-200">
          {course.courseCode}
        </h3>
        <p className="text-[var(--text-muted)] font-normal text-sm mt-1 line-clamp-1">
          {course.courseName}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Difficulty</span>
          <span className="font-bold text-[var(--text)] mt-0.5 flex items-baseline gap-0.5">
            {avgDifficulty} <span className="text-[8px] text-[var(--text-muted)] font-normal">/ 5</span>
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Workload</span>
          <span className="font-bold text-[var(--text)] mt-0.5 flex items-baseline gap-0.5">
            {avgWorkload} <span className="text-[8px] text-[var(--text-muted)] font-normal">h/w</span>
          </span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Reviews</span>
          <span className="font-bold text-[var(--text)] mt-0.5">
            {reviewsCount}
          </span>
        </div>
      </div>
    </div>
  );
}
