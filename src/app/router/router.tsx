import { createRootRouteWithContext, createRouter, notFound } from "@tanstack/react-router"
import { queryClient, MainLayout } from "@/shared"
import type { QueryClient } from "@tanstack/react-query"
import {
  ReservationRoute,
  ConfirmationRoute,
  OrderConfirmationRoute,
  MenuRoute,
  MenuDetailRoute,
  CartRoute,
  CheckoutRoute,
  LoginRoute,
  RegisterRoute,
} from "@/app"

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
  CheckoutRoute,
  LoginRoute,
  RegisterRoute,
])

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
})

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}
