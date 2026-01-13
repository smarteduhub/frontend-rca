import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

interface CustomJwtPayload {
   exp?: number;
   role?: string;
}

// Define public paths that should be accessible without authentication
const PUBLIC_PATHS = [
   "/",
   "/about",
   "/contact",
   "/courses",
   "/help-center",
   "/login",
   "/activate",
   "/auth/callback",
   "/admin/login",
];

// Define role-based path patterns
const ROLE_PATHS = {
   admin: ["/admin"],
   teacher: ["/teacher"],
   student: ["/student"],
   parent: ["/parent"],
};

// Define role-specific home pages
const ROLE_HOME_PAGES = {
   admin: "/admin",
   teacher: "/teacher",
   student: "/student",
   parent: "/parent",
};

// Simple function to check if a path should be publicly accessible
function isPublicPath(pathname: string): boolean {
   if (PUBLIC_PATHS.includes(pathname)) return true;
   if (pathname.startsWith("/courses/")) return true;
   if (pathname.startsWith("/help-center/details/")) return true;
   return false;
}

export async function middleware(request: NextRequest) {
   // Handle i18n first
   const handleI18nRouting = createIntlMiddleware(routing);
   const response = await handleI18nRouting(request);

   const { pathname } = request.nextUrl;
   const localeMatch = pathname.match(/^\/(en|es|rw|mn)(\/|$)/);
   const localePrefix = localeMatch ? `/${localeMatch[1]}` : "";
   // strip locale from path for checks
   const pathNoLocale = localeMatch
      ? pathname.replace(`/${localeMatch[1]}`, "") || "/"
      : pathname;

   // Public paths allowed
   if (isPublicPath(pathNoLocale)) {
      return response;
   }

   // Helper to redirect to login with message
   const redirectToLogin = () => {
      const loginUrl = new URL(`${localePrefix}/login`, request.url);
      loginUrl.searchParams.set("reason", "auth_required");
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete("access_token");
      return res;
   };

   // Require token
   const token = request.cookies.get("access_token")?.value;
   if (!token) {
      return redirectToLogin();
   }

   // Validate token (expiry + role)
   let payload: CustomJwtPayload | undefined;
   try {
      payload = jwtDecode<CustomJwtPayload>(token);
   } catch (err) {
      return redirectToLogin();
   }

   if (payload?.exp && payload.exp < Date.now() / 1000) {
      return redirectToLogin();
   }

   const role = payload?.role?.toLowerCase();
   const enforceRole = (expected: keyof typeof ROLE_PATHS) =>
      pathNoLocale.startsWith(ROLE_PATHS[expected][0]);

   const isProtectedDashboard =
      pathNoLocale.startsWith("/admin") ||
      pathNoLocale.startsWith("/teacher") ||
      pathNoLocale.startsWith("/student") ||
      pathNoLocale.startsWith("/parent");

   // If hitting any protected dashboard route, enforce correct role; otherwise force login
   if (isProtectedDashboard) {
      if (
         (enforceRole("admin") && role !== "admin") ||
         (enforceRole("teacher") && role !== "teacher") ||
         (enforceRole("student") && role !== "student") ||
         (enforceRole("parent") && role !== "parent")
      ) {
         return redirectToLogin();
      }
   }

   return response;
}

export const config = {
   matcher: [
      "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
      "/:locale(en|es|rw|mn)(.*)",
   ],
};
