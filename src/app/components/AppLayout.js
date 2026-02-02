"use client";
import { useState } from "react";
import { Toaster } from "sonner";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div className="h-screen overflow-hidden bg-zinc-50">
        {/* Fixed sidebar (desktop only) */}
        <aside
          className={`${collapsed ? "w-21" : "w-70"} hidden lg:block fixed left-0 top-0 h-screen bg-white border-r border-black/10 transition-all duration-300
          `}
        >
          <Sidebar collapsed={collapsed} />{" "}
          {/* Sidebar adapts to collapsed state */}
        </aside>

        {/* Main column shifts based on sidebar width */}
        <div
          className={`${collapsed ? "lg:pl-21" : "lg:pl-70"} flex h-screen flex-col transition-all duration-300   
          `}
        >
          {/* Top navigation bar */}
          <header className="w-full border-b border-black/10 bg-white">
            <Navbar
              collapsed={collapsed}
              onToggleSidebar={() => setCollapsed((v) => !v)} // Toggle sidebar state
            />
          </header>

          {/* Scrollable routed content area */}
          <main className="flex-1 w-full overflow-y-auto shadow-soft ring-1 ring-black/5 bg-[#F7F7F7]">
            {/* Routed page content */}
            <div className="p-4 sm:p-6 ">{children}</div>
          </main>
        </div>
      </div>

      {/* Global toast renderer */}
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
