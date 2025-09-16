"use client";

import React, { useCallback } from "react";
import { Popover, PopoverTrigger, PopoverContent, CircularProgress } from "@heroui/react";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHome, BiPlus, BiUser } from "react-icons/bi";
import { CiEdit, CiLogout } from "react-icons/ci";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserProfileDropdown({ session, onMenuClose }) {
  // Handle user logout
  const handleLogout = useCallback(() => {
    signOut();
    if (onMenuClose) onMenuClose();
  }, [onMenuClose]);

  // Get user display name
  const getDisplayName = useCallback(() => {
    return session?.user?.name?.split(' ')[0] ||
      session?.user?.email?.split('@')[0] ||
      "کاربر ژاکت";
  }, [session]);

  // Handle menu item click and close menu
  const handleMenuItemClick = useCallback(() => {
    if (onMenuClose) onMenuClose();
  }, [onMenuClose]);

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button
          className="group flex h-10 w-fit min-w-12 items-center justify-center rounded-lg bg-white p-2 shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-none focus:outline-none focus:ring-2 focus:ring-[#76767c] transition duration-300 hover:bg-[#76767c] md:h-12 md:bg-[#F9FAFC] md:shadow-none"
          aria-label={`Open ${getDisplayName()} profile menu`}
        >
          <div className="flex items-center gap-2">
            {/* User avatar */}
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "کاربر"}
                width={20}
                height={20}
                className="rounded-full"
                priority
              />
            ) : (
              <BiUser className="w-5 h-5 text-[#878F9B]" />
            )}

            {/* User name */}
            <span className="text-sm leading-7 pr-1 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
              {getDisplayName()}
            </span>

            {/* Dropdown arrow */}
            <FaChevronDown className="text-[#878F9B] transition-transform duration-300 group-hover:rotate-180" size={10} />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[250px]">
        <div role="menu" aria-label="User profile menu">
          {/* User info header */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="transition duration-300 text-base leading-7 text-[#5B5C60]">
              {session?.user?.name || "کاربر ژاکت"}
            </p>
          </div>

          {/* Dashboard link */}
          <Link
            href="/panel"
            onClick={handleMenuItemClick}
            className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            role="menuitem"
          >
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] transition-colors duration-200">
              <BiHome className="w-5 h-5 text-[#5B5C60]" />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">پیشخوان</p>
            </div>
          </Link>

          {/* Profile completion with progress indicator */}
          <Link
            href="/panel/settings/edit-profile"
            onClick={handleMenuItemClick}
            className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            role="menuitem"
          >
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF5E6] py-4 pr-7 pl-3 hover:bg-[#F9FAFC] mx-2 transition-colors duration-200">
              <div className="flex items-center justify-center gap-4">
                <BiUser className="w-5 h-5 text-[#EB8800]" />
                <p className="transition duration-300 text-sm leading-7 text-[#EB8800]">تکمیل پروفایل</p>
              </div>
              <div className="flex items-center justify-center">
                <CircularProgress
                  aria-label="Profile completion progress"
                  className="text-[#EB8800]"
                  color="warning"
                  showValueLabel={true}
                  size="lg"
                  value={50}
                />
              </div>
            </div>
          </Link>

          {/* Downloads link */}
          <Link
            href="/panel/downloads"
            onClick={handleMenuItemClick}
            className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            role="menuitem"
          >
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] transition-colors duration-200">
              <AiOutlineHeart className="w-5 h-5 text-[#5B5C60]" />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* New ticket link */}
          <Link
            href="/panel/tickets/new"
            onClick={handleMenuItemClick}
            className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            role="menuitem"
          >
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] transition-colors duration-200">
              <BiPlus className="w-5 h-5 text-[#6097F3]" />
              <p className="transition duration-300 text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* Edit account settings */}
          <Link
            href="/panel/settings/edit-profile"
            onClick={handleMenuItemClick}
            className="block focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            role="menuitem"
          >
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] transition-colors duration-200">
              <CiEdit className="w-5 h-5 text-[#5B5C60]" />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">ویرایش حساب</p>
            </div>
          </Link>

          {/* Logout functionality */}
          <button
            className="flex items-center cursor-pointer justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] w-full text-right transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF9606]"
            onClick={handleLogout}
            type="button"
            aria-label="Logout from account"
            role="menuitem"
          >
            <CiLogout className="w-5 h-5 text-[#5B5C60]" />
            <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">خروج از حساب</p>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
