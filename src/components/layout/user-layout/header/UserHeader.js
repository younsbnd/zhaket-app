"use client";

import { PiShoppingCartLight } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import UserAvatarButton from "./UserAvatarButton";
import { useState } from "react";
import NotificationsModal from "./NotificationsModal";
import { usePathname } from "next/navigation";
import { getUserHeaderMeta } from "@/constants/userHeader";
import { Badge } from "@heroui/react";
import Link from "next/link";
import { useCartStore } from "@/stores/useCartStore";

export default function UserHeader() {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { items: cartItems } = useCartStore();
  const pathname = usePathname();
  const { title, Icon } = getUserHeaderMeta(pathname || "");

  return (
    <header className="bg-white h-[100px] sticky z-50 shadow-sm shadow-[#f2efef]">
      {/* Header Content Container */}
      <div className="lg:pr-[350px] h-full">
        <div className="w-full max-w-[1275px] mx-auto px-4 h-full flex justify-between items-center">
          {/* Page Title */}
          <div className="flex flex-row md:flex-row gap-3 items-center">
            <Icon size={24} className="text-[#FF9606] " />
            <p className="text-2xl font-bold text-gray-600">{title}</p>
          </div>

          {/* Right Actions */}
          <div className="flex flex-row gap-5">
            {/* Cart Popover */}

            <Badge
              content={cartItems.length > 0 ? cartItems.length : null}
              color="danger"
            >
              <Link
                href="/cart"
                className="rounded-lg w-12 h-12 flex justify-center items-center 
                           hover:bg-amber-50 hover:text-amber-500 transition-colors duration-200 cursor-pointer"
                aria-label="Open Cart"
              >
                <PiShoppingCartLight size={24} />
              </Link>
            </Badge>

            {/* Notifications */}
            <button
              type="button"
              onClick={() => setIsNotifOpen(true)}
              className="w-12 h-12 flex justify-center items-center 
                       hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
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
