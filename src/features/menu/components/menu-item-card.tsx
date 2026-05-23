import { useCartStore, type MenuItemType } from "@/features";
import { showSuccessToast, useCurrentSlug } from "@/lib";
import { Button, Image } from "@/shared";
import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

interface MenuItemCardProps {
    item: MenuItemType;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
    const navigate = useNavigate()
    const slug = useCurrentSlug()
    const addToCart = useCartStore((state) => state.addToCart)
    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation()
        addToCart(item, 1)
        showSuccessToast(`🥢 ${item.name} agregado`)
    }
    return (

        <div
            onClick={() => navigate({ to: "/$slug/menu/$id", params: { slug, id: item.id } })}
            className="group cursor-pointer rounded-2xl overflow-hidden 
  border border-white/10 
  bg-linear-to-b from-[#1a0d10] to-[#12080a]
  shadow-[0_10px_30px_rgba(0,0,0,0.6)]
  transition-all duration-300 
  hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
        >
            <div className="relative h-44 w-full overflow-hidden">
                <Image
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-3 right-3 
      bg-black/70 backdrop-blur-md 
      border border-white/10
      px-3 py-1 rounded-full">

                    <span className="text-gold-accent font-semibold text-sm">
                        ${item.price.toLocaleString("es-CO")}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col justify-between gap-4">

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white leading-tight">
                        {item.name}
                    </h3>

                    <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
                        {item.description ?? "Delicioso plato asiático"}
                    </p>
                </div>

                <div className="flex items-center justify-between">

                    <span className="text-xs tracking-wide text-slate-400 group-hover:text-white transition">
                        Ver detalle →
                    </span>

                    <Button onClick={handleAdd}
                        className="size-10 rounded-full 
        bg-primary 
        flex items-center justify-center 
        shadow-[0_4px_15px_rgba(193,11,45,0.5)]
        transition-all 
        hover:scale-110 active:scale-95"
                    >
                        <Plus size={18} className="text-white" />
                    </Button>

                </div>
            </div>
        </div>
    )
}