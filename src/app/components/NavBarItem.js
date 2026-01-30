import Link from "next/link";

function NavBarItem({ href, label, active, collapsed, icon }) {
  return (
    <Link
      href={href}
      className={[
        // Base layout and typography
        "flex items-center rounded-xl px-3 py-2 text-sm font-extrabold transition-colors",
        // Center content when sidebar is collapsed
        collapsed ? "justify-center" : "gap-3",
        // Active vs inactive styles
        active
          ? "bg-amber-200 text-black ring-1 ring-amber-300 hover:bg-amber-400"
          : "text-zinc-500 hover:bg-amber-300 hover:text-black",
      ].join(" ")}
      // Show label as tooltip when collapsed
      title={collapsed ? label : undefined}
    >
      {/* Icon container */}
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

      {/* Hide label when sidebar is collapsed */}
      {!collapsed && <span className="font-bold">{label}</span>}
    </Link>
  );
}

export default NavBarItem;
