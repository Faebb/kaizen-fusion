import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser, AuthTenant } from "./types";

interface AuthStore {
  token: string | null;
  user: AuthUser | null;
  tenant: AuthTenant | null;
  setAuth: (data: { token: string; user: AuthUser; tenant: AuthTenant }) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      tenant: null,
      setAuth: (data) =>
        set({ token: data.token, user: data.user, tenant: data.tenant }),
      clearAuth: () => set({ token: null, user: null, tenant: null }),
    }),
    { name: "auth-storage" },
  ),
);
