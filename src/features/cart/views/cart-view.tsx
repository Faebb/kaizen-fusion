import { useCartStore, CartItemCard } from "@/features"
import { Button } from "@/shared"
import { useNavigate } from "@tanstack/react-router"
import { useCurrentSlug } from "@/lib"

export function CartView() {

    const cart = useCartStore((state) => state.cart)
    const total = useCartStore((state) =>
        state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )
    const clearCart = useCartStore((state) => state.clearCart)
    const navigate = useNavigate()
    const slug = useCurrentSlug()

    if (!cart.length) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
                <p className="text-xl">Tu carrito está vacío 🥢</p>

                <Button onClick={() => navigate({ to: "/$slug/menu", params: { slug } })}>
                    Ir al menú
                </Button>
            </div>
        );
    }

    return (
        <div className="bg-background-dark text-white flex justify-center px-4 py-6">

            <div className="w-full max-w-3xl flex flex-col gap-6">

                <div className="flex items-center justify-between">
                    <button
                        onClick={() => navigate({ to: "/$slug/menu", params: { slug } })}
                        className="text-sm text-slate-400 hover:text-white transition"
                    >
                        ← Volver al menú
                    </button>

                    <button
                        onClick={clearCart}
                        className="text-sm text-red-400 hover:text-red-300 transition"
                    >
                        Vaciar
                    </button>
                </div>

                <h1 className="text-2xl font-bold tracking-tight">Tu pedido</h1>

                <div className="flex flex-col gap-4">
                    {cart.map((item) => (
                        <CartItemCard key={item.id} item={item} />
                    ))}
                </div>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5 flex flex-col gap-4">

                    <div className="flex justify-between text-sm text-slate-400">
                        <span>Subtotal</span>
                        <span>${total.toLocaleString("es-CO")}</span>
                    </div>

                    <div className="flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span className="text-gold-accent text-xl">
                            ${total.toLocaleString("es-CO")}
                        </span>
                    </div>

                    <Button
                        onClick={() => navigate({ to: "/$slug/checkout", params: { slug } })}
                        className="w-full py-4 text-lg font-semibold rounded-xl
          shadow-[0_10px_30px_rgba(193,11,45,0.5)]
          hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        Confirmar pedido
                    </Button>

                </div>

            </div>
        </div>
    )
}