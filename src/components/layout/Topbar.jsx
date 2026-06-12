import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Bell, Search } from "lucide-react";

const titles = {
  "/dashboard": "Dashboard",
  "/customers": "Customers",
  "/segments":  "Segments",
  "/campaigns": "Campaigns",
  "/analytics": "Analytics",
};

export default function Topbar() {
  const { pathname } = useLocation();
  const title = titles[pathname] ?? "Xeno CRM";

  return (
    <header className="h-14 shrink-0 border-b border-white/10 bg-gradient-glass backdrop-blur-xl flex items-center px-6 gap-4">
      <motion.h1 
        key={title}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-semibold text-white flex-1"
      >
        {title}
      </motion.h1>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-52 focus-within:border-white/20 transition-colors">
        <Search size={13} className="text-muted" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-xs text-white placeholder:text-muted outline-none w-full"
        />
      </div>
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-8 h-8 rounded-lg border border-white/10 hover:border-brand-500 hover:shadow-glow flex items-center justify-center transition-all duration-300"
      >
        <Bell size={14} className="text-muted hover:text-brand-500" />
      </motion.button>
    </header>
  );
}