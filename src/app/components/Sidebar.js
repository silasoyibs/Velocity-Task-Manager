import Link from "next/link";

const IconDot = ({ active }) => (
  <span
    className={[
      "h-2.5 w-2.5 rounded-full",
      active ? "bg-amber-500" : "bg-zinc-300",
    ].join(" ")}
  />
);

const Item = ({ href, label, active, collapsed, icon }) => {
  return (
    <Link
      href={href}
      className={[
        "flex items-center rounded-xl px-3 py-2 text-sm transition",
        collapsed ? "justify-center" : "gap-3",
        active
          ? "bg-zinc-50 ring-1 ring-black/5 text-zinc-900"
          : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900",
      ].join(" ")}
      title={collapsed ? label : undefined}
    >
      {/* icon */}
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white ring-1 ring-black/5">
        <span className="text-sm">{icon}</span>
      </span>

      {/* label (hidden when collapsed) */}
      {!collapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
};

export default function Sidebar({ collapsed = false }) {
  return (
    <aside className="h-full w-full overflow-hidden bg-red-500 text-zinc-900 ">
      <div
        className={["flex h-full flex-col", collapsed ? "p-3" : "p-5"].join(
          " ",
        )}
      >
        {/* Brand */}
        <div
          className={[
            "flex items-center",
            collapsed ? "justify-center" : "gap-3",
          ].join(" ")}
        >
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl ring-1 ring-black/10">
            <span className="text-xs font-semibold">CL</span>
          </div>

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

        {/* Menu */}
        <div
          className={["mt-6 space-y-1.5", collapsed ? "px-0" : ""].join(" ")}
        >
          <Item
            href="/dashboard"
            label="Tasks"
            active
            collapsed={collapsed}
            icon="✓"
          />
          <Item
            href="/dashboard/tags"
            label="Tags"
            collapsed={collapsed}
            icon="#"
          />
          <Item
            href="/dashboard/settings"
            label="Settings"
            collapsed={collapsed}
            icon="⚙"
          />
        </div>

        {/* Footer pinned */}
        <div className="mt-auto pt-6">
          <div
            className={[
              "rounded-2xl bg-zinc-50 ring-1 ring-black/5",
              collapsed ? "p-2" : "p-4",
            ].join(" ")}
          >
            <div
              className={[
                "flex items-center",
                collapsed ? "justify-center" : "gap-2",
              ].join(" ")}
            >
              <IconDot active />
              {!collapsed && (
                <div className="text-sm font-semibold">Quick Tip</div>
              )}
            </div>

            {!collapsed && (
              <>
                <p className="mt-1 text-xs text-zinc-500">
                  Later we’ll animate task enter/exit and list reordering with
                  Framer Motion.
                </p>
                <div className="mt-3 h-1 w-14 rounded-full bg-amber-500" />
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
