import axios from "axios";
import { API_KAIZEN } from "./config";
import { useAuthStore } from "@/features/auth/use-auth-store";

export const httpClient = axios.create({
  baseURL: API_KAIZEN.baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT from the auth store (if any) to every request.
httpClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401, clear the auth state so the UI can react.
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  },
);
