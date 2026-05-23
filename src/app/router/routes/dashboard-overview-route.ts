import { createRoute } from "@tanstack/react-router";
import { DashboardRoute } from "./dashboard-route";
import { DashboardOverviewPage } from "@/features";

export const DashboardOverviewRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/",
  component: DashboardOverviewPage,
});
