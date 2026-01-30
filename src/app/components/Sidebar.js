import Image from "next/image";
import NavBarItem from "./NavBarItem";

// Main sidebar layout
export default function Sidebar({ collapsed = false }) {
  return (
    <aside className="h-full w-full overflow-hidden text-zinc-900">
      <div
        className={[
          // Vertical layout for sidebar content
          "flex h-full flex-col",
          // Adjust padding based on collapsed state
          collapsed ? "p-3" : "p-5",
        ].join(" ")}
      >
        {/* Brand header */}
        <div
          className={[
            "flex items-center",
            // Center logo when collapsed
            collapsed ? "justify-center" : "gap-3",
          ].join(" ")}
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/10">
            {/* App logo */}
            <span className="text-xs font-semibold">
              <Image src="/logo.jpeg" alt="Logo" width={300} height={300} />
            </span>
          </div>

          {/* Brand text hidden when collapsed */}
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-none truncate">
                CasaLavoro
              </div>
              <div className="mt-1 text-xs text-zinc-500 truncate">
                Task Manager
              </div>
            </div>
          )}
        </div>

        {/* Navigation menu */}
        <div
          className={[
            "mt-6 space-y-1.5 font-extrabold",
            collapsed ? "px-0" : "",
          ].join(" ")}
        >
          {/* Default route */}
          <NavBarItem
            href="/"
            label="All Tasks"
            active
            collapsed={collapsed}
            icon="✓"
          />
        </div>
      </div>
    </aside>
  );
}
