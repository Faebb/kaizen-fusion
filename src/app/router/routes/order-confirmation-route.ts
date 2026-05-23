import { createRoute } from "@tanstack/react-router";
import { SlugRoute } from "./slug-route";
import { PaymentConfirmationPage } from "@/features";

export const OrderConfirmationRoute = createRoute({
  getParentRoute: () => SlugRoute,
  path: "/order-confirmation/$orderId",
  component: PaymentConfirmationPage,
});
