import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { MenuPage } from "@/features";

export const MenuRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/menu",
  component: MenuPage,
});