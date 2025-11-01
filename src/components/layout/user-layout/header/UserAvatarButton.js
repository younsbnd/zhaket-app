"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  CircularProgress,
} from "@heroui/react";
import { FiUser } from "react-icons/fi";
import { FaHome, FaUser } from "react-icons/fa";
import {
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineDownload,
  HiOutlineTicket,
} from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import { RiAdminLine } from "react-icons/ri";

export default function UserAvatarButton({
  size = 20,
  bgColor = "bg-gray-50",
  buttonClass = "",
}) {
  const { data: session } = useSession();

  return (
    <Popover placement="bottom-end">
      {/* Trigger: Your avatar button */}
      <PopoverTrigger>
        <button
          type="button"
          className={`cursor-pointer outline-none rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center ${bgColor} ${buttonClass}`}
        >
          <span className="relative flex shrink-0 justify-center items-center overflow-hidden w-8 h-8 rounded-lg">
            <FiUser size={size} className="text-gray-500" />
          </span>
        </button>
      </PopoverTrigger>
      {/* Content: User menu */}
      <PopoverContent className="p-0 min-w-[240px] bg-white rounded-lg shadow-lg">
        <div className="bg-white rounded-lg">
          {/* User info */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="text-base leading-7 text-[#5B5C60]">
              {session?.user?.fullName || "کاربر ژاکت"}
            </p>
          </div>

          {/* admin link */}
          {session?.user?.role === "admin" && (
            <Link href="/admin">
              <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
                <RiAdminLine className="text-[#5B5C60]" size={16} />
                <p className="text-sm leading-7 text-[#5B5C60]">پنل ادمین</p>
              </div>
            </Link>
          )}
          {/* home link */}
          <Link href="/">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <FaHome className="text-[#5B5C60]" size={14} />
              <p className="text-sm leading-7 text-[#5B5C60]">خانه</p>
            </div>
          </Link>

          {/* edit profile link */}
          <Link href="/panel/settings/edit-profile/edit-password">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF5E6] py-4 pr-7 pl-3 hover:bg-[#F9FAFC] mx-2">
              <div className="flex items-center gap-4">
                <FaUser className="text-[#EB8800]" size={12} />
                <p className="text-sm text-[#EB8800]">تکمیل پروفایل</p>
              </div>
              <div className="relative flex items-center justify-center">
                <CircularProgress
                  aria-label="Loading..."
                  className="text-[#EB8800]"
                  color="warning"
                  showValueLabel={true}
                  size="lg"
                  value={50}
                />
              </div>
            </div>
          </Link>

          {/* downloads link */}
          <Link href="/panel/downloads">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineDownload className="text-[#5B5C60]" size={15} />
              <p className="text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* new ticket link */}
          <Link href="/panel/tickets/new">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineTicket className="text-[#6097F3]" size={15} />
              <p className="text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* logout link */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => signOut()}
            className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC] cursor-pointer"
          >
            <HiOutlineLogout className="text-[#5B5C60]" size={19} />
            <p className="text-sm leading-7 text-[#5B5C60]">خروج از حساب</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
