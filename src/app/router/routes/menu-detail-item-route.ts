import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { MenuDetailPage } from "@/features";

export const MenuDetailRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/menu/$id",
  component: MenuDetailPage,
});