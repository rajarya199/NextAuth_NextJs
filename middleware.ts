import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
           pathname === "/register" ||
          pathname === "/" 
        )
          return true;

        if (pathname === "/") {
          return true;
        }

                // All other routes require authentication

                  return !!token; //if token return true

      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};