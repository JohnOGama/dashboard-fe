import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/websites", "/api", "/documents", "/users"];

export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("auth");
  if (!cookie && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL("/login", request.nextUrl.origin);
    return NextResponse.redirect(new URL(absoluteUrl.toString()));
  }
}
