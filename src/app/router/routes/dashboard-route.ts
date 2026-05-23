import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "@/app";
import { DashboardPage } from "@/features";
import { useAuthStore } from "@/features/auth/use-auth-store";

export const DashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
  beforeLoad: () => {
    const token = useAuthStore.getState().token;
    if (!token) {
      throw redirect({ to: "/login" });
    }
  },
});
