"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import NavBarItem from "./NavBarItem";
import { FiList } from "react-icons/fi";
import { BsBriefcaseFill } from "react-icons/bs";
import { IoAlertCircle } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

const navLinks = [
  {
    label: "All Tasks",
    href: "/dashboard",
    icon: <FiList className=" text-gray-500" />,
  },
  {
    label: "Work",
    href: "/dashboard/tag/work",
    icon: <BsBriefcaseFill className=" text-blue-500" />,
  },
  {
    label: "Urgent",
    href: "/dashboard/tag/urgent",
    icon: <IoAlertCircle className="text-red-500" />,
  },
  {
    label: "Personal",
    href: "/dashboard/tag/personal",
    icon: <FaUser className="text-purple-500" />,
  },
  {
    label: "Ideas",
    href: "/dashboard/tag/ideas",
    icon: <FaLightbulb className="text-amber-500" />,
  },
];

export default function Sidebar({ collapsed = false }) {
  const pathname = usePathname();
  // Normalize path (remove trailing slash except "/")
  const normalizedPath =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

  // Pick exactly ONE active link: the longest matching href wins
  const activeHref =
    navLinks
      .map((l) => l.href)
      .filter(
        (href) =>
          normalizedPath === href || normalizedPath.startsWith(href + "/"),
      )
      .sort((a, b) => b.length - a.length)[0] || null;

  return (
    <aside className="h-full w-full overflow-hidden text-zinc-900">
      <div className={`${collapsed ? "p-3" : "p-5"} flex h-full flex-col`}>
        {/* Brand header */}
        <div
          className={`${collapsed ? "justify-center" : "gap-3"}
            flex items-center border-[rgba(0,0,0,0.1)]"
          `}
        >
          <div className="relative h-14 w-14 overflow-hidden rounded-xl ring-1 ring-black/10">
            <Image
              src="/logo.jpeg"
              alt="Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="text-lg font-extrabold leading-none truncate">
                <span className="text-amber-400">C</span>
                asaLavoro
              </div>
              <div className="mt-1 text-xs text-zinc-500 truncate">
                Task Manager
              </div>
            </div>
          )}
        </div>

        {/* Navigation menu */}
        <nav
          className={`
             ${collapsed ? "px-0" : ""} mt-6 space-y-1.5 font-extrabold"}`}
        >
          {navLinks.map((link) => (
            <NavBarItem
              key={link.href}
              href={link.href}
              label={link.label}
              collapsed={collapsed}
              icon={link.icon}
              active={activeHref === link.href}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
