import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { loginService, registerService } from "./auth-service";
import { useAuthStore } from "./use-auth-store";
import { showRemoveToast, showSuccessToast } from "@/lib";
import type { LoginPayload, RegisterPayload } from "./types";

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (body: LoginPayload) => loginService(body),
    onSuccess: (data) => {
      setAuth({ token: data.token, user: data.user, tenant: data.tenant });
      showSuccessToast("Bienvenido", data.user.name);
      navigate({ to: "/dashboard" });
    },
    onError: () => {
      showRemoveToast("Error", "Credenciales inválidas");
    },
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: (body: RegisterPayload) => registerService(body),
    onSuccess: (data) => {
      setAuth({ token: data.token, user: data.user, tenant: data.tenant });
      showSuccessToast("Restaurante registrado", `Bienvenido ${data.user.name}`);
      navigate({ to: "/dashboard" });
    },
    onError: (error: unknown) => {
      const message =
        (error as { response?: { data?: { error?: string } } })?.response?.data?.error ??
        "No se pudo completar el registro";
      showRemoveToast("Error", message);
    },
  });
};
