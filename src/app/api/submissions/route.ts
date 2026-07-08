import { NextResponse } from "next/server";
import { getSubmissions, saveSubmissions } from "@/lib/data";
import { CourseReviewSubmission } from "@/lib/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const all = await getSubmissions();
  const filtered = status ? all.filter((s) => s.status === status) : all;
  return NextResponse.json(filtered);
}

export async function POST(req: Request) {
  const body = await req.json();
  const submissions = await getSubmissions();

  const newSubmission: CourseReviewSubmission = {
    ...body,
    id: crypto.randomUUID(),
    status: "submitted",
    submittedAt: new Date().toISOString(),
  };

  submissions.push(newSubmission);
  await saveSubmissions(submissions);

  return NextResponse.json(newSubmission, { status: 201 });
}