import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { PaymentConfirmationPage } from "@/features";

export const OrderConfirmationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order-confirmation",
  component: PaymentConfirmationPage,
});
