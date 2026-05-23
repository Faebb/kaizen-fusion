import { useConfirmation, TableAssignedRing } from "@/features"
import { Button } from "@/shared"
import { useNavigate } from "@tanstack/react-router"
import { useCurrentSlug } from "@/lib"

export const ConfirmationView = () => {

    const { reservation } = useConfirmation()
    const navigate = useNavigate()
    const slug = useCurrentSlug()

    if (!reservation) {
        return <p>No hay reserva</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center text-center px-6 gap-10">

            <div className="flex flex-col items-center gap-3">
                <span className="text-primary text-xs tracking-[0.3em] uppercase opacity-80">
                    Reserva confirmada
                </span>

                <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                    Tu mesa está lista
                </h1>

                <p className="text-slate-400 text-sm md:text-base max-w-xs">
                    Te hemos asignado la mejor opción disponible para tu grupo.
                </p>
            </div>

            <TableAssignedRing tableNumber={reservation.tableNumber} />

            <div className="flex flex-col gap-3 bg-white/5 border border-white/10 rounded-xl px-6 py-4 backdrop-blur-md">
                <p className="text-slate-300 text-sm">
                    Tipo de mesa:{" "}
                    <span className="text-white font-semibold">
                        {reservation.tableType}
                    </span>
                </p>

                <p className="text-slate-400 text-sm">
                    Tiempo estimado:{" "}
                    <span className="text-white font-medium">
                        {reservation.waitTime} min
                    </span>
                </p>
            </div>
            <div className="w-full max-w-xs">
                <Button
                    variant="primary"
                    onClick={() => navigate({ to: "/$slug/menu", params: { slug } })}
                    className="w-full text-lg py-4 rounded-xl 
        shadow-[0_8px_30px_rgba(193,11,45,0.4)]
        hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    VER MENÚ
                </Button>
            </div>

        </div>
    )
}