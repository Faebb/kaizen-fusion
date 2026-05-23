import { createRoute } from "@tanstack/react-router";
import { DashboardRoute } from "./dashboard-route";
import { DashboardTablesPage } from "@/features";

export const DashboardTablesRoute = createRoute({
  getParentRoute: () => DashboardRoute,
  path: "/tables",
  component: DashboardTablesPage,
});
