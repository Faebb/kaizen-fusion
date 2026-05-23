import { createRoute } from "@tanstack/react-router";
import { DashboardRoute } from "./dashboard-route";
import { DashboardOrdersPage } from "@/features";

export const DashboardOrdersRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/orders",
  component: DashboardOrdersPage,
});
