import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, UtensilsCrossed, ShoppingBag, CalendarClock, Armchair, LogOut } from "lucide-react";
import { useAuth } from "@/features/auth/use-auth";

const NAV_ITEMS = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Inicio" },
  { to: "/dashboard/menu", icon: UtensilsCrossed, label: "Menú" },
  { to: "/dashboard/orders", icon: ShoppingBag, label: "Órdenes" },
  { to: "/dashboard/reservations", icon: CalendarClock, label: "Reservas" },
  { to: "/dashboard/tables", icon: Armchair, label: "Mesas" },
] as const;

export const DashboardLayout = () => {
  const { tenant, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen w-full bg-background-dark text-white flex">

      <aside className="w-64 shrink-0 border-r border-white/10 bg-linear-to-b from-[#1a0d10] to-[#12080a] flex flex-col">
        <div className="px-6 py-6 border-b border-white/10">
          <span className="text-primary text-[10px] font-semibold tracking-[0.3em] uppercase">
            Panel
          </span>
          <h1 className="text-lg font-bold text-white mt-1 truncate">
            {tenant?.name ?? "Restaurante"}
          </h1>
          <p className="text-slate-500 text-xs mt-1 truncate">
            /r/{tenant?.slug ?? "-"}
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {NAV_ITEMS.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-primary/15 text-white border border-primary/30"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-3">
          <div className="px-3">
            <p className="text-xs text-slate-500">Conectado como</p>
            <p className="text-sm text-white truncate">{user?.name ?? "—"}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-400 hover:bg-white/5 hover:text-red-400 transition"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8">
          <Outlet />
        </div>
      </main>

    </div>
  );
};
