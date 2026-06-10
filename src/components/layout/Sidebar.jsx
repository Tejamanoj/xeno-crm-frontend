import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Filter,
  Megaphone,
  BarChart2,
  Zap,
  ShoppingBag,
  Bot,
} from "lucide-react";
import clsx from "clsx";

const nav = [
  {
    to: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    to: "/customers",
    icon: Users,
    label: "Customers",
  },
  {
    to: "/orders",
    icon: ShoppingBag,
    label: "Orders",
  },
  {
    to: "/segments",
    icon: Filter,
    label: "Segments",
  },
  {
    to: "/campaigns",
    icon: Megaphone,
    label: "Campaigns",
  },
  {
    to: "/ai-assistant",
    icon: Bot,
    label: "AI Assistant",
  },
  {
    to: "/analytics",
    icon: BarChart2,
    label: "Analytics",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-panel border-r border-border flex flex-col">
      <div className="flex items-center gap-2 px-5 py-5 border-b border-border">
        <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>

        <span className="font-semibold text-white tracking-tight">
          Xeno CRM
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-brand-500/20 text-brand-500 font-medium"
                  : "text-muted hover:text-white hover:bg-white/5"
              )
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-xs font-semibold text-white">
            M
          </div>

          <div>
            <p className="text-xs font-medium text-white">Marketer</p>
            <p className="text-xs text-muted">brand@xeno.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}