import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { CartPage } from "@/features";

export const CartRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/cart",
  component: CartPage,
});