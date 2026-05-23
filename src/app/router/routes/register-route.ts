import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { RegisterPage } from "@/features";

export const RegisterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});
