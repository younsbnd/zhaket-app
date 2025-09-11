"use client";

import React from "react";
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
  const handleLogout = () => {
    signOut();
    if (onMenuClose) onMenuClose();
  };

  // Get user display name
  const getDisplayName = () => {
    return session?.user?.name?.split(' ')[0] ||
      session?.user?.email?.split('@')[0] ||
      "کاربر ژاکت";
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button className="group flex h-10 w-fit min-w-12 items-center justify-center rounded-lg bg-white p-2 shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-hidden transition duration-300 hover:bg-[#76767c] md:h-12 md:bg-[#F9FAFC] md:shadow-none">
          <div className="flex items-center gap-2">
            {/* User avatar */}
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "کاربر"}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
              <BiUser />
            )}

            {/* User name */}
            <span className="text-sm leading-7 pr-1 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
              {getDisplayName()}
            </span>

            {/* Dropdown arrow */}
            <FaChevronDown className="text-[#878F9B]" size={10} />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[250px]">
        <div>
          {/* User info header */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="transition duration-300 text-base leading-7 text-[#5B5C60]">
              {session?.user?.name || "کاربر ژاکت"}
            </p>
          </div>

          {/* Dashboard link */}
          <Link href="/panel">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <BiHome />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">پیشخوان</p>
            </div>
          </Link>

          {/* Profile completion with progress indicator */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF5E6] py-4 pr-7 pl-3 hover:bg-[#F9FAFC] mx-2">
              <div className="flex items-center justify-center gap-4">
                <BiUser />
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
          <Link href="/panel/downloads">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <AiOutlineHeart />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* New ticket link */}
          <Link href="/panel/tickets/new">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <BiPlus />
              <p className="transition duration-300 text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* Edit account settings */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <CiEdit />
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">ویرایش حساب</p>
            </div>
          </Link>

          {/* Logout functionality */}
          <button
            className="flex items-center cursor-pointer justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC] w-full text-right"
            onClick={handleLogout}
            type="button"
            aria-label="Logout from account"
          >
            <CiLogout />
            <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">خروج از حساب</p>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
