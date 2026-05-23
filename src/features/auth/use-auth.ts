import { useAuthStore } from "./use-auth-store";

export const useAuth = () => {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const tenant = useAuthStore((s) => s.tenant);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return {
    isAuthenticated: !!token,
    token,
    user,
    tenant,
    logout: clearAuth,
  };
};
