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
        "flex items-center rounded-xl px-3 py-2 text-sm font-extrabold transition-colors",
        collapsed ? "justify-center" : "gap-3",

        active
          ? "bg-amber-200 text-black ring-1 ring-amber-300 hover:bg-amber-400"
          : "text-zinc-500 hover:bg-amber-300 hover:text-black",
      ].join(" ")}
      title={collapsed ? label : undefined}
    >
      {/* Icon */}
      <span
        className={[
          "inline-flex h-8 w-8 items-center justify-center rounded-lg ring-1 transition-colors",

          active
            ? "bg-amber-200 text-black ring-amber-300 hover:bg-amber-400"
            : "bg-white text-zinc-700 ring-black/5 hover:bg-amber-200",
        ].join(" ")}
      >
        <span className="text-sm">{icon}</span>
      </span>

      {!collapsed && <span className="font-bold">{label}</span>}
    </Link>
  );
};

export default function Sidebar({ collapsed = false }) {
  return (
    <aside className="h-full w-full overflow-hidden  text-zinc-900 ">
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
          className={[
            "mt-6 space-y-1.5  font-extrabold",
            collapsed ? "px-0" : "",
          ].join(" ")}
        >
          <Item
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
