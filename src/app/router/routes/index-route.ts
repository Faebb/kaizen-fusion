import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "@/app";

export const IndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/login" });
  },
});
