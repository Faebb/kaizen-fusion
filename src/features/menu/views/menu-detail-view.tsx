import { useParams, useNavigate } from "@tanstack/react-router";
import { Button, GuestStepper, Image } from "@/shared";
import { CartSummaryView, useCartStore, useMenuItem } from "@/features";
import { useState } from "react";
import { showSuccessToast, useCurrentSlug } from "@/lib";

export function MenuDetailView() {
    const { id } = useParams({ from: "/$slug/menu/$id" })
    const navigate = useNavigate()
    const slug = useCurrentSlug()
    const { item, isLoading } = useMenuItem(id)
    const [quantity, setQuantity] = useState(1)

    const addToCart = useCartStore((state) => state.addToCart)

    if (isLoading) return <p className="text-white">Cargando...</p>;
    if (!item) return <p className="text-white">Producto no encontrado</p>;

    return (
        <div className=" bg-background-dark text-white flex flex-col">

            <div className="bg-background-dark flex justify-center px-4 py-6">

                <div className="w-full max-w-6xl  bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10  rounded-3xl  shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(244,192,37,0.08),transparent_60%)] pointer-events-none" />

                    <div className="relative z-10">

                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                            <button
                                onClick={() => navigate({ to: "/$slug/menu", params: { slug } })}
                                className="text-slate-400 hover:text-white transition text-sm"
                            >
                                ← Volver
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 px-6 md:px-10 py-10 pb-28 items-center">

                            <div className="w-full md:w-1/2">
                                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-64 md:h-105 object-cover"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                </div>
                            </div>

                            <div className="flex flex-col justify-between w-full md:w-1/2 min-h-105">

                                <div className="flex flex-col gap-6">

                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                                            {item.name}
                                        </h1>

                                        <p className="text-slate-400 mt-3 leading-relaxed max-w-md">
                                            {item.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-2">
                                        <span className="text-gold-accent text-3xl font-bold">
                                            ${item.price.toLocaleString("es-CO")}
                                        </span>

                                        <span className="text-sm text-slate-500">
                                            por unidad
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-3 pt-4">
                                        <span className="text-xs uppercase tracking-widest text-slate-500">
                                            Cantidad
                                        </span>

                                        <GuestStepper
                                            value={quantity}
                                            min={1}
                                            max={10}
                                            onChange={setQuantity}
                                        />
                                    </div>

                                </div>

                                <div className="mt-10 pt-6 border-t border-white/10">

                                    <div className="flex items-center justify-between gap-4">

                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">
                                                Total
                                            </span>
                                            <span className="text-2xl font-bold text-gold-accent">
                                                ${(item.price * quantity).toLocaleString("es-CO")}
                                            </span>
                                        </div>

                                        <Button
                                            onClick={() => {
                                                addToCart(item, quantity)
                                                showSuccessToast(
                                                    "Agregado al carrito 🛒",
                                                    `${quantity}x ${item.name}`
                                                )
                                            }}
                                            className="px-8 py-4 text-lg font-semibold rounded-xl shadow-[0_10px_30px_rgba(193,11,45,0.5)] hover:scale-[1.03] active:scale-[0.97] transition-all"
                                        >
                                            Agregar
                                        </Button>

                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <CartSummaryView />
        </div>
    )
}