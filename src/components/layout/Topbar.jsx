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
    <header className="h-14 shrink-0 border-b border-border bg-panel flex items-center px-6 gap-4">
      <h1 className="text-sm font-semibold text-white flex-1">{title}</h1>
      <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-3 py-1.5 w-52">
        <Search size={13} className="text-muted" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-xs text-white placeholder:text-muted outline-none w-full"
        />
      </div>
      <button className="w-8 h-8 rounded-lg border border-border hover:border-brand-500 flex items-center justify-center transition-colors">
        <Bell size={14} className="text-muted" />
      </button>
    </header>
  );
}