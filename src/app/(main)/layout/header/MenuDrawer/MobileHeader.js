"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { CiMenuBurger } from "react-icons/ci";
import { BiUser } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger } from "@heroui/react";
import MobileMenuSidebar from "./MobileMenuSidebar";
import UserProfileDropdown from "./MobileUserProfile";
import AuthButton from "./AuthButton";
 
 


export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  // Close mobile menu handler
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      {/* Mobile Header - visible only on mobile devices */}
      <header className="flex items-center top-0 z-60 justify-between px-4 pb-4 pt-6 md:hidden bg-white">
        <div className="flex items-center gap-5">
          {/* Hamburger menu button - increased icon size for better accessibility and visual clarity */}
          <button
            data-cy="mobile-menu-button"
            className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg text-white transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs hover:bg-secondary/80 h-12 w-12 bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)]"
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
          >
            {/* Increased from text-2xl to text-3xl for larger hamburger icon */}
            <CiMenuBurger className="text-[#EB8800] text-3xl" />
          </button>

          {/* Logo */}
          <Link href="/" aria-label="Go to homepage">
            <Image
              alt="ژاکت"
              width={60}
              height={43}
              className="min-h-[39px] min-w-[55px]"
              src="/images/logo.svg"
              priority
            />
          </Link>
        </div>

        {/* Right side controls - cart and user auth */}
        <div className="flex items-center gap-2">
          {/* Shopping cart button - uses react-icons/fi for the cart icon, with Tailwind and hover effect */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <button
                data-cy="data-cy-cart-button"
                className="outline-hidden group ui-open:bg-[#FFF5E6] relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] transition duration-300 hover:bg-[#FFF5E6] md:h-12 md:w-12 md:bg-[#F9FAFC] md:shadow-none"
                aria-label="Cart"
                type="button"
              >
                {/* Cart icon from react-icons/fi, with color and hover effect */}
                <FiShoppingCart className="ui-open:text-[#FF9606] text-[#878F9B] transition duration-300 group-hover:text-[#FF9606]" size={20} />
              </button>
            </PopoverTrigger>
          </Popover>

          {/* User authentication section */}
          {status === "authenticated" ? (
            <UserProfileDropdown
              session={session}
              onMenuClose={closeMobileMenu}
            />
          ) : (
            // Use the AuthButton component for login/register
            <AuthButton />
          )}
        </div>
      </header>

      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />
    </>
  );
}
