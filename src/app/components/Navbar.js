"use client";
import { useState } from "react";
import CreateTaskModal from "./CreateTaskModal";

export default function Navbar({ collapsed, onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className=" ring-1 ring-black/5 text-zinc-900  border-[rgba(0,0,0,0.1)] bg-white px-3">
        <div className="flex flex-col gap-3 p-4 sm:flex-row justify-between sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex items-center gap-3">
              {/* Sidebar collapse toggle (desktop) */}
              <button
                type="button"
                onClick={onToggleSidebar}
                className=" border-[rgba(0,0,0,0.2)] hidden lg:inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ring-1 ring-black/10 hover:bg-white"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <span className="text-lg leading-none">
                  {collapsed ? "»" : "«"}
                </span>
              </button>

              <div>
                <div className="text-lg  text-zinc-900 font-extrabold">
                  <span className="text-amber-400">C</span>
                  asaLavoro
                </div>
                <div className="text-xs font-semibold  text-zinc-600">
                  Task Manager
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="rounded-xl px-3 py-2 text-sm font-semibold  bg-amber-400 text-black"
            >
              + New Task
            </button>
          </div>
        </div>
      </header>

      <CreateTaskModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
