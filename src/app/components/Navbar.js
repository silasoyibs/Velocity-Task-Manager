"use client";

import { useState } from "react";
import Link from "next/link";
import CreateTaskModal from "./CreateTaskModal";

const NavLink = ({ href, label, active }) => {
  return (
    <Link
      href={href}
      className={[
        "rounded-xl px-3 py-2 text-sm font-medium transition",
        active
          ? "bg-zinc-900 text-amber-400"
          : "text-zinc-900 ring-1 ring-black/5 hover:bg-zinc-50",
      ].join(" ")}
    >
      {label}
    </Link>
  );
};

export default function Navbar({ collapsed, onToggleSidebar }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="shadow-lg ring-1 ring-black/5 text-zinc-900 bg-yellow-500">
        <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          {/* Left: Toggle + title + nav links */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-3">
              {/* Sidebar collapse toggle (desktop) */}
              <button
                type="button"
                onClick={onToggleSidebar}
                className="hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ring-1 ring-black/10 hover:bg-white"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className="text-lg leading-none">
                  {collapsed ? "»" : "«"}
                </span>
              </button>

              <div>
                <div className="text-xs text-zinc-600">CasaLavoro</div>
                <div className="text-lg font-semibold text-zinc-900">
                  Dashboard
                </div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-2">
              <NavLink href="/dashboard" label="Tasks" active />
              <NavLink href="/dashboard/tags" label="Tags" />
              <NavLink href="/dashboard/settings" label="Settings" />
            </nav>
          </div>

          {/* Right: Search + actions */}
          <div className="flex items-center gap-2">
            <input
              placeholder="Search tasks…"
              className="w-full sm:w-64 rounded-xl border border-black/10 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-200"
            />

            {/* ✅ Open Modal */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-xl bg-zinc-900 px-3 py-2 text-sm font-semibold text-amber-400 hover:bg-zinc-800"
            >
              + New Task
            </button>

            <button
              type="button"
              className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-50"
            >
              Filter
            </button>
          </div>
        </div>
      </header>

      {/* ✅ Modal */}
      <CreateTaskModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
