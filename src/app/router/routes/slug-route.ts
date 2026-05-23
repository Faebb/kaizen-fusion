import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";

export const SlugRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$slug",
});
