import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { LoginPage } from "@/features";

export const LoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});
