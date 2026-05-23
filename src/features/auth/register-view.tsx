import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Button, Input } from "@/shared";
import { registerSchema, type RegisterFormValues } from "./auth-schema";
import { useRegisterMutation } from "./auth-query";

export const RegisterView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { restaurantName: "", name: "", email: "", password: "" },
  });

  const mutation = useRegisterMutation();
  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-linear-to-b from-[#2a1418] to-[#1a0d10] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex flex-col gap-6">

        <div className="text-center">
          <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
            Registra tu restaurante
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Crea tu cuenta
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Empieza a recibir pedidos en minutos
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <Input
            label="Nombre del restaurante"
            placeholder="Kaizen Fusion"
            {...register("restaurantName")}
            error={errors.restaurantName?.message}
          />

          <Input
            label="Tu nombre"
            placeholder="Nombre del propietario"
            autoComplete="name"
            {...register("name")}
            error={errors.name?.message}
          />

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
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
            {...register("password")}
            error={errors.password?.message}
          />

          <Button type="submit" loading={mutation.isPending} className="mt-2">
            Crear cuenta
          </Button>
        </form>

        <p className="text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-gold-accent hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
