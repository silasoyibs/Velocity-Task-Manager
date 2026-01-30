"use client";

// Google font setup for the entire app
import { Montserrat } from "next/font/google";
import "./globals.css";

// Shared layout components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import { useState } from "react";
import { Toaster } from "sonner";

// Configure Montserrat and expose it as a CSS variable
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  // Controls collapsed / expanded sidebar state
  const [collapsed, setCollapsed] = useState(false);

  // Width and padding adjust based on sidebar state
  const sidebarWidth = collapsed ? "w-[84px]" : "w-[280px]";
  const mainPaddingLeft = collapsed ? "lg:pl-[84px]" : "lg:pl-[280px]";

  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <div className="h-screen overflow-hidden bg-zinc-50">
          {/* Fixed sidebar (desktop only) */}
          <aside
            className={[
              "hidden lg:block fixed left-0 top-0 h-screen bg-white border-r border-black/10 transition-all duration-300",
              sidebarWidth,
            ].join(" ")}
          >
            <Sidebar collapsed={collapsed} />
          </aside>

          {/* Main content column */}
          <div
            className={[
              "flex h-screen flex-col transition-all duration-300",
              mainPaddingLeft,
            ].join(" ")}
          >
            {/* Top navigation bar */}
            <header className="w-full border-b border-black/10 bg-white">
              <Navbar
                collapsed={collapsed}
                onToggleSidebar={() => setCollapsed((v) => !v)}
              />
            </header>

            {/* Scrollable routed content */}
            <main className="flex-1 w-full overflow-y-auto shadow-soft ring-1 ring-black/5">
              <div className="pl-8 mt-4 text-2xl font-semibold text-zinc-900">
                All Task
              </div>

              <div className="p-4 sm:p-6">{children}</div>
            </main>
          </div>
        </div>

        {/* Global toast notifications */}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
