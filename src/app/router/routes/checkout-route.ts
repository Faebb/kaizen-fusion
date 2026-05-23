import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { CheckoutPage } from "@/features";

export const CheckoutRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/checkout",
  component: CheckoutPage,
});