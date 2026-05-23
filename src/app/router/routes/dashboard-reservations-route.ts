import { createRoute } from "@tanstack/react-router";
import { DashboardRoute } from "./dashboard-route";
import { DashboardReservationsPage } from "@/features";

export const DashboardReservationsRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/reservations",
  component: DashboardReservationsPage,
});
