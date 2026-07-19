import { NextResponse } from "next/server";
import { getSubmissions, saveSubmissions } from "@/lib/data";
import { CourseReviewSubmission } from "@/lib/types";
import { isAdminAuthed } from "@/lib/auth";

export async function GET(req: Request) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const all = await getSubmissions();
  const filtered = status ? all.filter((s) => s.status === status) : all;

  return NextResponse.json(filtered);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCourseSubmission(body: any): string[] {
  const errors: string[] = [];

  const requiredStrings = [
    "courseCode",
    "courseName",
    "department",
    "semester",
    "professor",
    "summary",
    "reviewerName",
    "reviewerBatch",
    "reviewerEmail",
  ];

  for (const f of requiredStrings) {
    if (!body[f] || typeof body[f] !== "string") {
      errors.push(`${f} is required`);
    }
  }

  const requiredNumbers = [
    "year",
    "credits",
    "difficulty",
    "rating",
    "workloadHoursPerWeek",
  ];

  for (const f of requiredNumbers) {
    if (typeof body[f] !== "number" || Number.isNaN(body[f])) {
      errors.push(`${f} must be a number`);
    }
  }

  if (body.difficulty < 1 || body.difficulty > 5) {
    errors.push("difficulty must be 1-5");
  }

  if (body.rating < 1 || body.rating > 5) {
    errors.push("rating must be 1-5");
  }

  return errors;
}

function validateExperienceSubmission(body: any): string[] {
  const errors: string[] = [];

  const requiredStrings = [
    "companyName",
    "role",
    "experienceType",
    "selectionProcess",
    "summary",
    "reviewerName",
    "reviewerBatch",
    "reviewerEmail",
  ];

  for (const f of requiredStrings) {
    if (!body[f] || typeof body[f] !== "string") {
      errors.push(`${f} is required`);
    }
  }

  if (
    typeof body.difficulty !== "number" ||
    body.difficulty < 1 ||
    body.difficulty > 5
  ) {
    errors.push("difficulty must be 1-5");
  }

  return errors;
}

export async function POST(req: Request) {
  const body = await req.json();
  const type = body.type === "experience" ? "experience" : "course";

  const errors =
    type === "experience"
      ? validateExperienceSubmission(body)
      : validateCourseSubmission(body);

  if (!body.reviewerEmail || !emailRegex.test(body.reviewerEmail)) {
    errors.push("reviewerEmail must be valid");
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: "Invalid submission", details: errors },
      { status: 400 }
    );
  }

  const submissions = await getSubmissions();

  const newSubmission: CourseReviewSubmission = {
    ...body,
    type,
    id: crypto.randomUUID(),
    status: "submitted",
    submittedAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  await saveSubmissions(submissions);

  return NextResponse.json(newSubmission, { status: 201 });
}