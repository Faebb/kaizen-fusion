import { useAdminOrders, useUpdateOrderStatus } from "../admin-query";
import { ORDER_STATUSES } from "../types";

const statusColor: Record<string, string> = {
  PENDING: "text-yellow-300 border-yellow-300/30 bg-yellow-300/10",
  CONFIRMED: "text-blue-300 border-blue-300/30 bg-blue-300/10",
  PREPARING: "text-orange-300 border-orange-300/30 bg-orange-300/10",
  DELIVERED: "text-green-300 border-green-300/30 bg-green-300/10",
  CANCELLED: "text-red-300 border-red-300/30 bg-red-300/10",
};

export const DashboardOrdersView = () => {
  const orders = useAdminOrders();
  const update = useUpdateOrderStatus();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
          Operaciones
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Órdenes</h1>
      </div>

      {orders.isLoading && <p className="text-slate-400">Cargando…</p>}

      <div className="flex flex-col gap-3">
        {orders.data?.map((order) => (
          <div
            key={order.id}
            className="bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10 rounded-xl px-5 py-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex flex-col">
                <span className="text-xs text-slate-500">
                  #{order.id.slice(0, 8)} · {new Date(order.createdAt).toLocaleString("es-CO")}
                </span>
                <span className="text-white font-medium">{order.customerName}</span>
                <span className="text-xs text-slate-400">{order.email}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-[10px] tracking-widest uppercase px-2.5 py-1 rounded-full border ${statusColor[order.status] ?? "border-white/10 text-slate-300"}`}
                >
                  {order.status}
                </span>
                <span className="text-gold-accent font-bold">
                  ${order.total.toLocaleString("es-CO")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs text-slate-400">
              {order.items.map((it) => (
                <span key={it.menuItemId} className="px-2 py-1 rounded-md bg-white/5">
                  {it.quantity}× {it.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {ORDER_STATUSES.filter((s) => s !== order.status).map((s) => (
                <button
                  key={s}
                  onClick={() => update.mutate({ id: order.id, status: s })}
                  disabled={update.isPending}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/15 text-slate-300 hover:bg-white/5 hover:text-white transition disabled:opacity-50"
                >
                  → {s}
                </button>
              ))}
            </div>
          </div>
        ))}

        {!orders.isLoading && !orders.data?.length && (
          <p className="text-slate-500 text-sm">Aún no hay órdenes.</p>
        )}
      </div>
    </div>
  );
};
