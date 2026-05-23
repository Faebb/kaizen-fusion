import { z } from "zod";

export const registerSchema = z.object({
  restaurantName: z.string().min(2, "Nombre del restaurante requerido"),
  name: z.string().min(2, "Tu nombre es requerido"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Mínimo 8 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(1, "Contraseña requerida"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
