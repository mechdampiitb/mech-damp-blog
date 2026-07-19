import { NextResponse } from "next/server";
import { getSubmissions, saveSubmissions, getCourses, saveCourses, getExperiences, saveExperiences } from "@/lib/data";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status, adminComment } = await req.json();

  const submissions = await getSubmissions();
  const index = submissions.findIndex((s) => s.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  submissions[index].status = status;
  if (adminComment !== undefined) submissions[index].adminComment = adminComment;
  await saveSubmissions(submissions);

  // If approved, push it into the live database files so it shows up on the site
  if (status === "approved") {
    const submission = submissions[index];
    if (submission.type === "experience") {
      const experiences = await getExperiences();
      if (!experiences.some((e) => e.id === submission.id)) {
        experiences.push(submission);
        await saveExperiences(experiences);
      }
    } else {
      const courses = await getCourses();
      let course = courses.find((c) => c.courseCode === submission.courseCode);

      if (!course) {
        course = {
          id: crypto.randomUUID(),
          courseCode: submission.courseCode,
          courseName: submission.courseName,
          department: submission.department,
          credits: submission.credits,
          reviews: [],
        };
        courses.push(course);
      }
      if (!course.reviews.some((r) => r.id === submission.id)) {
        course.reviews.push(submission);
        await saveCourses(courses);
      }
    }
  }

  return NextResponse.json(submissions[index]);
}