import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { ConfirmationPage } from "@/features";

export const ConfirmationRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/confirmation",
  component: ConfirmationPage,
});