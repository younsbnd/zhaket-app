"use client";
import { useDisclosure } from "@heroui/react";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import AdminMobileMenu from "./AdminMobileMenu";
import { usePathname } from "next/navigation";
import { ADMIN_NAVIGATIONS } from "@/constants/adminNavigation";
import AdminUserMenu from "./AdminUserMenu";

const AdminHeader = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();
  const adminNavigations = ADMIN_NAVIGATIONS.find(
    (navigation) => navigation.path === pathname
  );
  return (
    <header className="sticky top-0 z-20 glass border-b border-slate-800/60 backdrop-blur px-4 py-4 w-full">
      <div className="mx-auto flex max-w-7xl items-center gap-3">
        {/* mobile menu button */}
        <button
          id="openSidebar"
          onClick={onOpen}
          className="xl:hidden inline-flex size-9 items-center justify-center rounded-xl text-slate-300 hover:bg-white/5 cursor-pointer"
        >
          <HiMenuAlt2 className="size-5 text-white/60" />
        </button>
        {/* header title */}
        <p className="text-[19px] font-medium">
          {adminNavigations?.name || "پنل مدیریت"}
        </p>
        <AdminMobileMenu isOpen={isOpen} onOpenChange={onOpenChange} />
        <div className="ms-auto"></div>
        {/* user menu */}
        <div className="relative">
          <AdminUserMenu />
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
