import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { ReservationPage } from "@/features";

export const ReservationRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/",
  component: ReservationPage,
});