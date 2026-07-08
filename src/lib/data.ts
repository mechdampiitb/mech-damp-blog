import fs from "fs/promises";
import path from "path";
import { CourseReviewSubmission, Course } from "./types";

const submissionsPath = path.join(process.cwd(), "src/lib/data/submissions.json");
const coursesPath = path.join(process.cwd(), "src/lib/data/courses.json");

export async function getSubmissions(): Promise<CourseReviewSubmission[]> {
  const raw = await fs.readFile(submissionsPath, "utf-8");
  return JSON.parse(raw);
}

export async function saveSubmissions(data: CourseReviewSubmission[]) {
  await fs.writeFile(submissionsPath, JSON.stringify(data, null, 2));
}

export async function getCourses(): Promise<Course[]> {
  const raw = await fs.readFile(coursesPath, "utf-8");
  return JSON.parse(raw);
}

export async function saveCourses(data: Course[]) {
  await fs.writeFile(coursesPath, JSON.stringify(data, null, 2));
}