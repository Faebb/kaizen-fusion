import { Trash2 } from "lucide-react";
import { useAdminReservations, useDeleteReservation } from "../admin-query";

export const DashboardReservationsView = () => {
  const reservations = useAdminReservations();
  const deleteReservation = useDeleteReservation();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
          Operaciones
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Reservas</h1>
      </div>

      {reservations.isLoading && <p className="text-slate-400">Cargando…</p>}

      <div className="flex flex-col gap-3">
        {reservations.data?.map((r) => (
          <div
            key={r.id}
            className="bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10 rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">
                {new Date(r.createdAt).toLocaleString("es-CO")}
              </span>
              <span className="text-white font-medium">
                {r.guests} comensales
              </span>
              <span className="text-xs text-slate-400">
                Espera estimada: {r.waitTime} min
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[10px] tracking-widest uppercase text-slate-500">
                  Mesa
                </span>
                <span className="text-2xl font-bold text-gold-accent">
                  {r.table?.tableNumber}
                </span>
                <span className="text-xs text-slate-400">
                  {r.table?.tableType} · cap. {r.table?.capacity}
                </span>
              </div>
              <button
                onClick={() => deleteReservation.mutate(r.id)}
                disabled={deleteReservation.isPending}
                className="text-red-400 hover:text-red-300 transition disabled:opacity-50"
                title="Eliminar reserva"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {!reservations.isLoading && !reservations.data?.length && (
          <p className="text-slate-500 text-sm">Aún no hay reservas.</p>
        )}
      </div>
    </div>
  );
};
