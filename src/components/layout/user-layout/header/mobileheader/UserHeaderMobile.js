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
import { Badge, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { useCartStore } from "@/stores/useCartStore";

const UserHeaderMobile = ({ onMenuToggle }) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { items: cartItems } = useCartStore();
  const pathname = usePathname();
  const { title, Icon } = getUserHeaderMeta(pathname || "");

  return (
    <div className="lg:hidden bg-white sticky top-0 left-0 z-50 shadow-sm">
      {/* Top */}
      <div className="flex justify-between items-center py-4 px-4 border-b border-gray-100 ">
        <div className="flex items-center gap-8">
          <button
            onClick={onMenuToggle}
            className="text-[#EB8800] text-2xl cursor-pointer"
          >
            <AiOutlineMenu />
          </button>
          <Link href="/">
            <Image src="/images/logo.svg" alt="logo" width={54} height={39} />
          </Link>
        </div>

        <div className="flex items-center gap-5">
          {/* Cart Popover */}
          <Badge content={ cartItems.length > 0 ? cartItems.length : null} color="danger" >
            <Link
              href="/cart"
              className="rounded-lg w-10 h-10 md:w-12 md:h-12 flex justify-center items-center hover:bg-amber-50 hover:text-amber-500 cursor-pointer"
            >
              <PiShoppingCartLight className="w-6 h-6" />
            </Link>
          </Badge>

          <button onClick={() => setIsNotifOpen(true)}>
            <IoNotificationsOutline className="w-5 h-5 text-[#878F9B] cursor-pointer" />
          </button>
          <NotificationsModal
            isOpen={isNotifOpen}
            onOpenChange={setIsNotifOpen}
          />
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
