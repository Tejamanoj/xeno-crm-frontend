import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-surface via-[#0f1525] to-surface">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-surface/50 via-[#0f1525]/50 to-surface/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}