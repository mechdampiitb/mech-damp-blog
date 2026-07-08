import Link from "next/link";
import { getCourses } from "@/lib/data";

export default async function Home() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-16 px-6 py-12 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="flex flex-col gap-4 items-start">
        <h1 className="text-4xl font-bold">
          Course reviews, experiences, and roadmaps — by Mech students, for
          Mech students.
        </h1>
        <p className="text-gray-600 text-lg">
          Everything you need to plan your semester, pick your minor, and
          figure out what's next.
        </p>
        <Link
          href="/courses"
          className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Browse Course Reviews
        </Link>
      </section>

      {/* Stats */}
      <section className="flex gap-12">
        <div>
          <p className="text-3xl font-bold">{courses.length}+</p>
          <p className="text-gray-600">Course Reviews</p>
        </div>
        {/* add more stat blocks as more collections exist */}
      </section>

      {/* About - replace this placeholder copy with your real About content */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">What is Mech DAMP?</h2>
        <p className="text-gray-700 max-w-2xl">
          Placeholder — swap in your real About Us copy here.
        </p>
      </section>
    </div>
  );
}