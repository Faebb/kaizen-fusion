import { createRootRouteWithContext, createRouter, notFound } from "@tanstack/react-router"
import { queryClient, MainLayout } from "@/shared"
import type { QueryClient } from "@tanstack/react-query"
import { ReservationRoute, ConfirmationRoute, OrderConfirmationRoute, MenuRoute, MenuDetailRoute, CartRoute, CheckoutRoute } from "@/app"

export type RouterContext = {
  queryClient: QueryClient
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: MainLayout,
  errorComponent: notFound
})
const routeTree = rootRoute.addChildren([
  ReservationRoute,
  ConfirmationRoute,
  OrderConfirmationRoute,
  MenuRoute,
  MenuDetailRoute,
  CartRoute,
  CheckoutRoute
])

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  basepath: "/kaizen-fusion"
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}