import { NextResponse } from "next/server";
import { getExperiences } from "@/lib/data";
import { stripPrivateFields } from "@/lib/publicSanitize";

export async function GET() {
  const experiences = await getExperiences();
  const publicData = experiences.map(stripPrivateFields);
  return NextResponse.json(publicData);
}