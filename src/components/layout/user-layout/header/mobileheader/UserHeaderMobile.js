"use client";

import Image from "next/image";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { PiShoppingCartLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { usePathname } from "next/navigation";
import { getUserHeaderMeta } from "@/constants/userHeader";
import UserAvatarButton from "../UserAvatarButton";
import NotificationsModal from "../NotificationsModal";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

const UserHeaderMobile = ({ onMenuToggle }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = []; // دیتا واقعی
  const pathname = usePathname();
  const { title, Icon } = getUserHeaderMeta(pathname || "");

  return (
    <div className="lg:hidden bg-white sticky top-0 left-0 z-50 shadow-sm">
      {/* Top */}
      <div className="flex justify-between items-center py-4 px-4 border-b border-gray-100 ">
        <div className="flex items-center gap-8">
          <button onClick={onMenuToggle} className="text-[#EB8800] text-2xl"><AiOutlineMenu /></button>
          <Link href="/"><Image src="/images/logo.svg" alt="logo" width={54} height={39} /></Link>
        </div>

        <div className="flex items-center gap-5">
          {/* Cart Popover */}
          <Popover open={isCartOpen} onOpenChange={setIsCartOpen} placement="bottom-end">
            <PopoverTrigger >
              <button
                onClick={() => setIsCartOpen(true)}
                className="rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:bg-secondary-100 hover:text-secondary-main"
              >
                <PiShoppingCartLight className="w-6 h-6" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="relative z-50 mt-3 h-[150px] w-[312px] rounded-md bg-white pt-7 shadow-[15px_0px_30px_rgba(150,155,164,0.2)]">
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

          <button onClick={() => setIsNotifOpen(true)}><IoNotificationsOutline className="w-5 h-5 text-[#878F9B]" /></button>
          <NotificationsModal isOpen={isNotifOpen} onOpenChange={setIsNotifOpen} />
          <UserAvatarButton />
        </div>
      </div>

      {/* Bottom */}
      <div className="flex items-center gap-3 px-4 py-3 ">
        <Icon size={24} className="text-[#FF9606]" />
        <p className="text-[1.5rem] font-bold text-gray-700">{title}</p>
      </div>
    </div>
  );
};

export default UserHeaderMobile;
