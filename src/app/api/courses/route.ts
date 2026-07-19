import { NextResponse } from "next/server";
import { getCourses } from "@/lib/data";
import { stripPrivateFields } from "@/lib/publicSanitize";

export async function GET() {
  const courses = await getCourses();

  const publicCourses = courses.map((course) => ({
    ...course,
    reviews: course.reviews.map(stripPrivateFields),
  }));

  return NextResponse.json(publicCourses);
}