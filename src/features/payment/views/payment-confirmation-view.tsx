import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle, ShoppingBag, CreditCard, Banknote } from "lucide-react";
import { queryKeys } from "@/shared";
import { Button } from "@/shared";
import type { CreateOrderDTO } from "@/features/payment/services/order-service";

export const PaymentConfirmationView = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const order = queryClient.getQueryData<CreateOrderDTO & { id?: string }>(
        queryKeys.order.create()
    );

    if (!order) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 px-6 text-center">
                <p className="text-slate-400">No hay información de pago.</p>
                <Button variant="primary" onClick={() => navigate({ to: "/menu" })}>
                    IR AL MENÚ
                </Button>
            </div>
        );
    }

    const paymentIcon = order.paymentMethod === "card"
        ? <CreditCard className="w-6 h-6 text-gold-accent" />
        : <Banknote className="w-6 h-6 text-gold-accent" />;

    const paymentLabel = order.paymentMethod === "card" ? "Tarjeta" : "Efectivo";

    return (
        <div className="flex flex-col items-center justify-center text-center px-6 gap-10">

            <div className="flex flex-col items-center gap-3">
                <span className="text-primary text-xs tracking-[0.3em] uppercase opacity-80">
                    Pago confirmado
                </span>
                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    ¡Gracias por tu pedido!
                </h1>
                <p className="text-slate-400 text-sm md:text-base max-w-xs">
                    Tu orden ha sido recibida y está en preparación.
                </p>
            </div>

            <div className="relative flex items-center justify-center">
                <div className="absolute size-56 md:size-72 rounded-full border border-primary/30 animate-[spin_12s_linear_infinite]" />
                <div className="absolute size-56 md:size-72 rounded-full bg-[radial-gradient(circle,rgba(193,11,45,0.15),transparent_70%)]" />
                <div className="relative flex size-48 md:size-64 flex-col items-center justify-center rounded-full border border-primary/40 bg-linear-to-br from-[#1a0d10] to-[#12080a] backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(193,11,45,0.4)]">
                    <CheckCircle className="w-16 h-16 text-primary" />
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm bg-white/5 border border-white/10 rounded-xl px-6 py-5 backdrop-blur-md text-left">
                <p className="text-slate-300 text-sm flex justify-between">
                    <span>Cliente</span>
                    <span className="text-white font-semibold">{order.customerName}</span>
                </p>
                <p className="text-slate-300 text-sm flex justify-between">
                    <span>Método de pago</span>
                    <span className="text-white font-semibold flex items-center gap-1">
                        {paymentIcon} {paymentLabel}
                    </span>
                </p>
                <p className="text-slate-300 text-sm flex justify-between">
                    <span>Propina</span>
                    <span className="text-white font-medium">${order.tipValue.toFixed(2)}</span>
                </p>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-white font-bold">Total</span>
                    <span className="text-gold-accent font-bold text-lg">${order.total.toFixed(2)}</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full max-w-sm">
                <div className="flex items-center gap-2 text-slate-400 text-sm justify-center">
                    <ShoppingBag className="w-4 h-4" />
                    <span>{order.items.length} {order.items.length === 1 ? "producto" : "productos"}</span>
                </div>
                <Button
                    variant="primary"
                    onClick={() => navigate({ to: "/menu" })}
                    className="w-full text-lg py-4 rounded-xl shadow-[0_8px_30px_rgba(193,11,45,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    VER MENÚ
                </Button>
            </div>

        </div>
    );
};
