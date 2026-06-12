import { motion } from "framer-motion";
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
    <aside className="w-56 shrink-0 bg-gradient-glass backdrop-blur-xl border-r border-white/10 flex flex-col">
      <motion.div 
        className="flex items-center gap-2 px-5 py-5 border-b border-white/10"
        whileHover={{ scale: 1.02 }}
      >
        <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center">
          <Zap size={16} className="text-white" />
        </div>
        <span className="font-semibold text-white tracking-tight">
          Xeno CRM
        </span>
      </motion.div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-300",
                isActive
                  ? "bg-brand-500/20 text-brand-500 font-medium shadow-glow"
                  : "text-muted hover:text-white hover:bg-white/10"
              )
            }
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex-shrink-0"
            >
            <Icon size={16} />
            </motion.div>
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t border-white/10">
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