"use client";

import { PiShoppingCartLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import UserAvatarButton from "./UserAvatarButton";
import { useState } from "react";
import NotificationsModal from "./NotificationsModal";
import { usePathname } from "next/navigation";
import { getUserHeaderMeta } from "@/constants/userHeader";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

export default function UserHeader() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = [];
  const pathname = usePathname();
  const { title, Icon } = getUserHeaderMeta(pathname || "");

  return (
    <header className="bg-white h-[100px] sticky z-50 shadow-sm shadow-[#f2efef]">
      {/* Header Content Container */}
      <div className="lg:pr-[350px] h-full">
        <div className="w-full max-w-[1275px] mx-auto px-4 h-full flex justify-between items-center">

          {/* Page Title */}
          <div className="flex flex-row md:flex-row gap-3 items-center">
            <Icon size={24} className="text-[#FF9606]" />
            <p className="text-2xl font-bold text-gray-600">{title}</p>
          </div>

          {/* Right Actions */}
          <div className="flex flex-row gap-5">

            {/* Cart Popover */}
            <Popover
              open={isCartOpen}
              onOpenChange={setIsCartOpen}
              placement="bottom-end"
            >
              <PopoverTrigger>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(prev => !prev)}
                  className="rounded-lg w-12 h-12 flex justify-center items-center 
                           hover:bg-[#fef2da] hover:text-[#f2a712] transition-colors duration-200"
                  aria-label="Open Cart"
                >
                  <PiShoppingCartLight size={24} />
                </button>
              </PopoverTrigger>
              <PopoverContent className="relative z-50 mt-3 w-[312px] min-h-[150px] rounded-md bg-white pt-7 shadow-[15px_0px_30px_rgba(150,155,164,0.2)]">
                <div className="px-[15px]">
                  <div className="flex items-center gap-[10px]">
                    <PiShoppingCartLight size={20} className="text-[#878F9B]" />
                    <p className="font-bold text-[17px] text-[#454545]">سبد خرید</p>
                  </div>
                  <div className="custom-scrollbar max-h-[300px] overflow-y-auto mt-4">
                    {cartItems.length === 0 ? (
                      <p className="text-lg font-bold text-center text-[#424244]">
                        سبد خرید شما خالی است!
                      </p>
                    ) : (
                      <ul className="space-y-2">
                        {cartItems.map((item) => (
                          <li key={item.id} className="text-sm text-gray-700">
                            {item.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setIsNotifOpen(true)}
              className="w-12 h-12 flex justify-center items-center 
                       hover:bg-gray-100 rounded-lg transition-colors duration-200"
              aria-label="Open Notifications"
            >
              <IoNotificationsOutline size={23} className="text-[#424244]" />
            </button>
            <NotificationsModal
              isOpen={isNotifOpen}
              onOpenChange={setIsNotifOpen}
            />

            {/* User Avatar */}
            <UserAvatarButton />
          </div>
        </div>
      </div>
    </header>
  );
}
