import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (
      req.nextUrl.pathname.startsWith("/student") &&
      req.nextauth.token?.role !== "student"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/teacher") &&
      req.nextauth.token?.role !== "teacher"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/student/:path*", "/teacher/:path*", "/admin/:path*"],
};
