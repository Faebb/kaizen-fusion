import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Button, Input } from "@/shared";
import { loginSchema, type LoginFormValues } from "./auth-schema";
import { useLoginMutation } from "./auth-query";

export const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const mutation = useLoginMutation();
  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-linear-to-b from-[#2a1418] to-[#1a0d10] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-6">

        <div className="text-center">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
            Acceso administrador
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Inicia sesión
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Gestiona tu restaurante en Kaizen
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="tu@restaurante.com"
            {...register("email")}
            error={errors.email?.message}
          />

          <Input
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" loading={mutation.isPending} className="mt-2">
            Entrar
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400">
          ¿Aún no tienes restaurante?{" "}
          <Link to="/register" className="text-gold-accent hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};
