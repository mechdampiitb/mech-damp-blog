import { NextRequest, NextResponse } from "next/server";

export default function proxy(req: NextRequest) {
  const isAdminAuthed = req.cookies.get("admin-auth")?.value === "true";
  const isLoginPage = req.nextUrl.pathname === "/admin/login";

  if (req.nextUrl.pathname.startsWith("/admin") && !isAdminAuthed && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};