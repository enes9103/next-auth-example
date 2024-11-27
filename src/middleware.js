import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ req, token }) {
      // Only require auth for protected routes
      const path = req.nextUrl.pathname;
      const protectedPaths = ["/dashboard", "/profile"];
      const isProtectedPath = protectedPaths.some(prefix => 
        path.startsWith(prefix)
      );
      
      return !isProtectedPath || !!token;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};