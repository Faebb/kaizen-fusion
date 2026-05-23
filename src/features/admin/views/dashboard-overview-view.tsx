import { Link } from "@tanstack/react-router";
import { ShoppingBag, CalendarClock, UtensilsCrossed, Armchair } from "lucide-react";
import {
  useAdminCategories,
  useAdminMenuItems,
  useAdminOrders,
  useAdminReservations,
  useAdminTables,
} from "../admin-query";

const Stat = ({
  to,
  icon: Icon,
  label,
  value,
  hint,
}: {
  to: string;
  icon: typeof ShoppingBag;
  label: string;
  value: string | number;
  hint?: string;
}) => (
  <Link
    to={to}
    className="group bg-linear-to-b from-[#1a0d10] to-[#12080a] border border-white/10 rounded-2xl px-6 py-5 hover:border-primary/40 transition-all"
  >
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</span>
      <Icon className="w-4 h-4 text-primary opacity-70 group-hover:opacity-100" />
    </div>
    <p className="text-3xl font-bold text-white">{value}</p>
    {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
  </Link>
);

export const DashboardOverviewView = () => {
  const orders = useAdminOrders();
  const reservations = useAdminReservations();
  const categories = useAdminCategories();
  const items = useAdminMenuItems();
  const tables = useAdminTables();

  const pendingOrders = orders.data?.filter((o) => o.status === "PENDING").length ?? 0;
  const occupiedTables = tables.data?.filter((t) => t.isOccupied).length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <span className="text-primary text-xs font-semibold tracking-[0.3em] uppercase opacity-80">
          Resumen
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mt-2">Inicio</h1>
        <p className="text-slate-400 text-sm mt-2">
          Estado actual de tu restaurante.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat
          to="/dashboard/orders"
          icon={ShoppingBag}
          label="Órdenes"
          value={orders.data?.length ?? 0}
          hint={`${pendingOrders} pendientes`}
        />
        <Stat
          to="/dashboard/reservations"
          icon={CalendarClock}
          label="Reservas"
          value={reservations.data?.length ?? 0}
        />
        <Stat
          to="/dashboard/menu"
          icon={UtensilsCrossed}
          label="Menú"
          value={items.data?.length ?? 0}
          hint={`${categories.data?.length ?? 0} categorías`}
        />
        <Stat
          to="/dashboard/tables"
          icon={Armchair}
          label="Mesas"
          value={tables.data?.length ?? 0}
          hint={`${occupiedTables} ocupadas`}
        />
      </div>
    </div>
  );
};
