import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const publicRoutes = createRouteMatcher([
  "/",
  "/api/clerk-webhook",
  "/api/drive-activity/notification",
  "/api/payment/success",
]);

const ignoredRoutes = createRouteMatcher([
  "/api/auth/callback/discord",
  "/api/auth/callback/notion",
  "/api/auth/callback/slack",
  "/api/flow",
  "/api/cron/wait",
]);

export default clerkMiddleware((auth, req) => {
  // Restrict admin routes to users with specific permissions
  if (ignoredRoutes(req)) {
    auth().protect((has) => {
      return (
        has({ permission: "org:sys_memberships:manage" }) ||
        has({ permission: "org:sys_domains_manage" })
      );
    });
  }
  // Restrict organization routes to signed in users
  if (publicRoutes(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
