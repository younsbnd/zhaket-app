"use client";
import { Button } from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const menuItems = [
  { label: "پروفایل", href: "/admin/profile" },
  { label: "اعلان‌ها", href: "/admin/notifications" },
  { type: "divider" },
];

const AdminUserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        {/* user menu button */}
        <button
          id="userMenuBtn"
          className="inline-flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-white/5 cursor-pointer"
          onClick={toggleMenu}
        >
          <span className=" text-sm">مدیر</span>
          <MdOutlineKeyboardArrowDown
            className={`size-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {/* user menu */}
        <div
          id="userMenu"
          className={`absolute left-0 mt-2 w-56 origin-top-left transition-all bg-slate-900/95 border border-indigo-700/20 shadow-indigo-700/10 rounded-xl p-2 shadow-md ${
            isOpen
              ? "scale-100 opacity-100 pointer-events-auto"
              : "scale-95 opacity-0 pointer-events-none"
          }`}
        >
          {/* user menu items */}
          {menuItems.map((item, index) =>
            item.type === "divider" ? (
              <div key={index} className="my-1 h-px bg-white/10"></div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
          {/* logout button */}
          <Button
            className="block rounded-lg px-3 py-2 text-sm w-full text-right text-red-500 bg-transparent  hover:bg-white/5"
            onPress={() => signOut()}
            size="sm"
          >
            خروج
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminUserMenu;
