import { NextResponse } from "next/server";
import { getExperiences } from "@/lib/data";

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json(experiences);
}
