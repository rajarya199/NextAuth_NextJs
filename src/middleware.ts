import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";


// authorized() → Use to check if a token exists (auth or not).

// middleware() → Use to check roles, route paths, and redirect logic.

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

     // Define public paths
    const isPublicPath =
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/verifyemail";

    // Redirect authenticated users away from public pages
        // 🧾 If logged in and on login/signup — redirect to home

    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

      // 🔐 Protect /admin routes
    if (pathname.startsWith("/admin")) {
      if (!token || token.role !== "admin") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }
      // 🚫 Not logged in and trying to access protected route
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }


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