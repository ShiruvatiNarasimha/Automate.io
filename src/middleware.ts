import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/clerk-webhook(.*)",
  "/api/drive-activity/notification(.*)",
]);

const ignoredRoutes = createRouteMatcher([
  "/api/auth/callback/discord(.*)",
  "/api/auth/callback/notion(.*)",
  "/api/auth/callback/slack(.*)",
  "/api/flow(.*)",
  "/api/cron/wait(.*)",
]);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

// This logic means that all routes except publicRoutes and ignoredRoutes,  are protected ( i.e. Login is required )
export default clerkMiddleware((auth, req) => {
  if (!(publicRoutes(req) || ignoredRoutes(req))) {
    auth().protect();
  }
});
