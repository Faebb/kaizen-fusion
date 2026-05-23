import { createRoute } from "@tanstack/react-router";
import { DashboardRoute } from "./dashboard-route";
import { DashboardMenuPage } from "@/features";

export const DashboardMenuRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/menu",
  component: DashboardMenuPage,
});
