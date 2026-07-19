import fs from "fs/promises";
import path from "path";
import { CourseReviewSubmission, Course, ExperienceSubmission, TeamMember } from "./types";

const submissionsPath = path.join(process.cwd(), "src/lib/data/submissions.json");
const coursesPath = path.join(process.cwd(), "src/lib/data/courses.json");
const experiencesPath = path.join(process.cwd(), "src/lib/data/experiences.json");
const teamPath = path.join(process.cwd(), "src/lib/data/team.json");

export async function getSubmissions(): Promise<any[]> {
  const raw = await fs.readFile(submissionsPath, "utf-8");
  return JSON.parse(raw);
}

export async function saveSubmissions(data: any[]) {
  await fs.writeFile(submissionsPath, JSON.stringify(data, null, 2));
}

export async function getCourses(): Promise<Course[]> {
  const raw = await fs.readFile(coursesPath, "utf-8");
  return JSON.parse(raw);
}

export async function saveCourses(data: Course[]) {
  await fs.writeFile(coursesPath, JSON.stringify(data, null, 2));
}

export async function getExperiences(): Promise<ExperienceSubmission[]> {
  try {
    const raw = await fs.readFile(experiencesPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveExperiences(data: ExperienceSubmission[]) {
  await fs.writeFile(experiencesPath, JSON.stringify(data, null, 2));
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const raw = await fs.readFile(teamPath, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveTeamMembers(data: TeamMember[]) {
  await fs.writeFile(teamPath, JSON.stringify(data, null, 2));
}