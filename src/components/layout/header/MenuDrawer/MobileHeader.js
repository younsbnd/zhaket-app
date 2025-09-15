"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import MobileMenuSidebar from "./MobileMenuSidebar";
import UserProfileDropdown from "./MobileUserProfile";
import AuthButton from "./AuthButton";
import SearchModal from "../searchbox/Searchbox";
import { AiOutlineMenu } from "react-icons/ai";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { MdOutlineShoppingCart } from "react-icons/md";


export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // <-- New state for modal
  const { data: session, status } = useSession();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="flex items-center top-0 z-60 justify-between px-4 pb-4 pt-6 md:hidden bg-white">
        <div className="flex items-center gap-5">
          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="flex justify-center items-center h-10 w-10 rounded-lg bg-white shadow-md"
          >
            <AiOutlineMenu className="text-[#EB8800] text-2xl" />
          </button>

          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <Image
              src="/images/logo.svg"
              alt="Zhaket"
              width={50}
              height={50}
              className="min-h-[39px] min-w-[55px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Search Icon (opens modal) */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="flex justify-center items-center h-10 w-10 rounded-lg bg-white shadow-md hover:bg-[#FFF5E6]"
          >
            <IoSearchOutline className="text-[#878F9B]" size={20} />
          </button>
          {/* Shopping Cart */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <button
                className="h-[40px] w-[54px] flex justify-center items-center rounded-lg hover:bg-[#fef6e8] bg-white shadow-sm"
                aria-label="Cart"
              >
                <MdOutlineShoppingCart
                  size={20}
                  className="text-[#878F9B] hover:text-[#efd8b4]"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              سبد خرید خالی است
            </PopoverContent>
          </Popover>
          {/* Auth */}
          {status === "authenticated" ? (
            <UserProfileDropdown session={session} onMenuClose={closeMobileMenu} />
          ) : (
            <AuthButton />
          )}
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
