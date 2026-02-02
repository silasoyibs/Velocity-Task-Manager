import Link from "next/link";

function NavBarItem({ href, label, active, collapsed, icon }) {
  return (
    <Link
      href={href}
      className={`
        "${collapsed ? "justify-center" : "gap-3"}  ${
          active
            ? "bg-amber-200 text-black ring-1 ring-amber-300 "
            : "text-zinc-500 hover:bg-amber-200 hover:text-black"
        } flex items-center rounded-xl px-3 py-2 text-sm font-extrabold transition-colors"
       `}
    >
      {/* Icon container */}
      <span
        className={
          "inline-flex h-8 w-8 items-center justify-center transition-colors"
        }
      >
        <span className="text-sm text-black">{icon}</span>
      </span>

      {/* Hide label when sidebar is collapsed */}
      {!collapsed && <span className="font-medium text-black ">{label}</span>}
    </Link>
  );
}

export default NavBarItem;
