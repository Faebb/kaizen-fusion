import { httpClient } from "@/services";
import type { AuthResult, AuthTenant, AuthUser, LoginPayload, RegisterPayload } from "./types";

export const registerService = async (body: RegisterPayload): Promise<AuthResult> => {
  const { data } = await httpClient.post("/api/auth/register", body);
  return data.data;
};

export const loginService = async (body: LoginPayload): Promise<AuthResult> => {
  const { data } = await httpClient.post("/api/auth/login", body);
  return data.data;
};

export const meService = async (): Promise<{ user: AuthUser; tenant: AuthTenant }> => {
  const { data } = await httpClient.get("/api/auth/me");
  return data.data;
};
