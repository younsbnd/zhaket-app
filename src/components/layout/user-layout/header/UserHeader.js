"use client";

import { TbLayoutGrid } from "react-icons/tb";
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
  const cartItems = []; // جایگزین با دیتا واقعی
  const pathname = usePathname();
  const { title, Icon } = getUserHeaderMeta(pathname || "");

  return (
    <header className="text-right bg-white md:h-[100px] top-0 left-0 z-50 px-0 shadow-sm shadow-[#f2efef] overflow-hidden sticky">
      <div className="text-right mx-auto w-full md:max-w-2xl xl:max-w-5xl 2xl:max-w-[1400px] flex flex-row justify-between items-center h-full px-3 sm:px-4 py-4 md:py-0 lg:mr-[350px]">

        {/* Title */}
        <div className="flex flex-row gap-3 items-center bor">
          <Icon size={24} className="text-[#FF9606]" />
          <p className="text-[1.5rem] font-bold text-gray-800">{title}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-row gap-5">
          {/* Cart Popover */}
          <Popover open={isCartOpen} onOpenChange={setIsCartOpen} placement="bottom-end">
            <PopoverTrigger >
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:bg-[#fef2da] hover:text-[#f2a712]"
              >
                <PiShoppingCartLight size={24} />
              </button>
            </PopoverTrigger>
            <PopoverContent className="relative z-50 mt-3 w-[312px] h-[150px] rounded-md bg-white pt-7 shadow-[15px_0px_30px_rgba(150,155,164,0.2)]">
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
                    <ul>
                      {cartItems.map(item => <li key={item.id}>{item.name}</li>)}
                    </ul>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Notifications */}
          <button type="button" className="w-10 h-10 md:w-12 md:h-12 flex justify-center items-center">
            <IoNotificationsOutline size={23} onClick={() => setIsNotifOpen(true)} className="text-[#424244]" />
          </button>
          <NotificationsModal isOpen={isNotifOpen} onOpenChange={setIsNotifOpen} />

          <UserAvatarButton />
        </div>
      </div>
    </header>
  );
}
