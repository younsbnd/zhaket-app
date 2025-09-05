"use client";
import { ADMIN_NAVIGATIONS } from "@/constants/adminNavigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// admin navigation links for sidebar and mobile menu
const AdminNavLinks = () => {
  const pathname = usePathname();
  return (
    <nav className="px-3">
      {ADMIN_NAVIGATIONS.map((navigation) => (
        <Link
          key={navigation.name}
          href={navigation.path}
          className={`nav-link group flex items-center gap-3 rounded-xl px-4 py-3 text-slate-200 hover:bg-white/5 ${
            pathname === navigation.path && "border border-white/10"
          }`}
        >
          {navigation.icon}
          <span className="text-sm font-medium">{navigation.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default AdminNavLinks;
