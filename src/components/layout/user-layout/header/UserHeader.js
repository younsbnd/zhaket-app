"use client";

import { TbLayoutGrid } from "react-icons/tb"; // Dashboard icon
import { PiShoppingCartLight } from "react-icons/pi"; // Shopping cart icon
import { IoNotificationsOutline } from "react-icons/io5"; // Bell icon for notifications
import UserAvatarButton from "./UserAvatarButton";
import { useState } from "react";
import NotificationsModal from "./NotificationsModal";

export default function UserHeader() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  return (
    <header className="text-right bg-white md:h-[100px] top-0 left-0 z-50 px-0 shadow-sm shadow-[#f2efef] overflow-hidden sticky">
      <div className="text-right ml-40 mx-auto w-full max-w-[1275px] flex flex-row justify-between items-center h-full px-4 py-4 md:py-0">

        {/* Title Section */}
        <div className="text-right flex justify-start flex-nowrap flex-row gap-3 items-center">
          <TbLayoutGrid size={24} className="text-[#FF9606]" />
          <p className="text-[1.5rem] leading-[40px] font-bold text-gray-800 whitespace-nowrap">داشبورد</p>
        </div>

        {/* Action Buttons Section */}
        <div className="text-right bg-transparent flex pr-40 flex-row justify-between items-center gap-5">

          {/* Cart */}
          <button
            type="button"
            className="relative cursor-pointer outline-none rounded-lg hover:text-[#f2a712] hover:bg-[#fef2da] w-10 h-10 md:w-12 md:h-12 flex justify-center items-center"
          >
            <PiShoppingCartLight size={24} className="hover:text-[#f3a914] duration-300" />
          </button>

          {/* Notifications */}
          <button
            type="button"
            className="relative w-10 h-10 md:w-12 md:h-12 flex justify-center items-center"
          >
            <IoNotificationsOutline size={23} onClick={() => setIsNotifOpen(true)} className="text-[#424244]" />
          </button>
          <NotificationsModal
            isOpen={isNotifOpen}
            onOpenChange={setIsNotifOpen}
          />
          {/* Avatar Button (reusable component) */}
          <UserAvatarButton />
        </div>
      </div>
    </header>
  );
}
