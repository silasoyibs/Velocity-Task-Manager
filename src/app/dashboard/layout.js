"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const sidebarWidth = collapsed ? "w-[84px]" : "w-[280px]";
  const mainPaddingLeft = collapsed ? "lg:pl-[84px]" : "lg:pl-[280px]";

  return (
    <div className="h-screen overflow-hidden bg-zinc-50">
      {/* Sidebar fixed (not scrollable) */}
      <aside
        className={[
          "hidden lg:block fixed left-0 top-0 h-screen bg-white border-r border-black/10 transition-all duration-300",
          sidebarWidth,
        ].join(" ")}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      {/* Main column */}
      <div
        className={[
          "flex h-screen flex-col transition-all duration-300",
          mainPaddingLeft,
        ].join(" ")}
      >
        <header className="w-full border-b border-black/10 bg-white">
          <Navbar
            collapsed={collapsed}
            onToggleSidebar={() => setCollapsed((v) => !v)}
          />
        </header>

        {/* Routed page scrolls */}
        <main className="flex-1 bg-green-500 shadow-soft ring-1 ring-black/5 w-full h-screen overflow-y-auto">
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

// <div className=" bg-green-500 shadow-soft ring-1 ring-black/5 w-full h-screen">
//                 <div className="p-5 sm:p-6">{children}</div>
//               </div>
