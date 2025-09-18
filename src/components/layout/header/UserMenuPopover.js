"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent, Button, CircularProgress } from "@heroui/react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { HiOutlineLogout, HiOutlineCog, HiOutlineDownload, HiOutlineTicket, HiOutlineViewGrid } from "react-icons/hi";
import { signOut } from "next-auth/react";

/**
 * UserMenu component
 * Displays user dropdown menu when user is authenticated.
 * 
 * @param {Object} session - The session object from useSession().
 */
export default function UserMenu({ session }) {
  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button className="group flex h-10 w-fit items-center gap-2 rounded-lg bg-white p-2 shadow-sm" disableRipple>
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "کاربر"}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
              <FaUser className="text-[#878F9B]" size={16} />
            )}
            <span className="text-sm leading-7 pr-1 text-[#787676] hidden lg:inline">
              {session?.user?.name || session?.user?.email || "کاربر"}
            </span>
            <FaChevronDown className="text-[#878F9B]" size={12} />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[240px] bg-white rounded-lg shadow-lg">
        <div className="bg-white rounded-lg">
          {/* User info header */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="text-base leading-7 text-[#5B5C60]">
              کاربر {session?.user?.name || "ژاکت"}
            </p>
          </div>

          {/* Dashboard link */}
          <Link href="/panel">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineViewGrid className="text-[#5B5C60]" size={14} />
              <p className="text-sm leading-7 text-[#5B5C60]">پیشخوان</p>
            </div>
          </Link>

          {/* Profile completion */}
          <Link href="/panel/settings/edit-profile">
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

          {/* Downloads */}
          <Link href="/panel/downloads">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineDownload className="text-[#5B5C60]" size={15} />
              <p className="text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* New ticket */}
          <Link href="/panel/tickets/new">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineTicket className="text-[#6097F3]" size={15} />
              <p className="text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineCog className="text-[#5B5C60]" size={17} />
              <p className="text-sm leading-7 text-[#5B5C60]">ویرایش حساب</p>
            </div>
          </Link>

          {/* Logout */}
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
