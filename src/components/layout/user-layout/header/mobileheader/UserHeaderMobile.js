"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai"; // Menu icon
import { PiShoppingCartLight } from "react-icons/pi"; // Shopping cart icon
import { IoNotificationsOutline } from "react-icons/io5"; // Notification bell icon
import { TbLayoutGrid } from "react-icons/tb"; // Dashboard icon
import UserAvatarButton from "../UserAvatarButton";
import NotificationsModal from "../NotificationsModal";
import { useState } from "react";

const UserHeaderMobile = ({ onMenuToggle }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  return (
    <div className="lg:hidden bg-white sticky top-0 left-0 z-50 shadow-sm">
      {/* Top Section */}
      <div className="flex justify-between items-center py-4 px-4 border-b border-b-[#e8e1e8a4]">
        {/* Right: Menu + Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={onMenuToggle}
            type="button"
            className="text-[#EB8800] text-2xl"
          >
            <AiOutlineMenu />
          </button>
          <Link href="/" rel="noopener noreferrer">
            <Image
              src="/images/logo.svg"
              alt="zhaket logo"
              width={54}
              height={39}
              className="object-contain"
            />
          </Link>
        </div>

        {/* Left: Cart + Notifications + Avatar */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="cursor-pointer relative rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:bg-secondary-100 hover:text-secondary-main text-gray-500 md:text-gray-800"
          >
            <PiShoppingCartLight className="w-6 h-6" />
          </Link>

          <button type="button" aria-haspopup="dialog" onClick={() => setIsNotifOpen(true)} className="relative">
            <IoNotificationsOutline className="w-5 h-5 text-[#878F9B]" />
          </button>
          <NotificationsModal
            isOpen={isNotifOpen}
            onOpenChange={setIsNotifOpen}
          />
          {/* Avatar Button (reusable component) */}
          <UserAvatarButton />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-b-[#e8e1e8a4]">
        <TbLayoutGrid size={24} className="text-[#FF9606]" />
        <p className="text-[1.5rem] leading-[40px] font-bold text-gray-800 whitespace-nowrap">
          داشبورد
        </p>
      </div>
    </div>
  );
};

export default UserHeaderMobile;
