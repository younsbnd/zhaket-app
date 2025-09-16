"use client";

// React and Next.js imports
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";

// UI Component imports
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/react";

// Icon imports
import { IoSearchOutline } from "react-icons/io5";
import { AiOutlineMenu } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";

// Local component imports
import MobileMenuSidebar from "./MobileMenuSidebar";
import UserProfileDropdown from "./MobileUserProfile";
import AuthButton from "./AuthButton";
import SearchModal from "../searchbox/Searchbox";

/**
 * MobileHeader Component
 * Renders the mobile header with navigation menu, logo, search, cart, and authentication
 * Only visible on mobile devices (hidden on md+ screens)
 * @returns {JSX.Element} Mobile header component
 */
export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { data: session, status } = useSession();

  // Close mobile menu handler
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  // Open search modal handler
  const openSearchModal = () => setIsSearchOpen(true);
  
  // Close search modal handler
  const closeSearchModal = () => setIsSearchOpen(false);

  return (
    <>
      {/* Mobile Header - visible only on mobile screens */}
      <header className="flex items-center top-0 z-60 justify-between pb-4 pt-6 md:hidden bg-white">
        {/* Left Section - Menu and Logo */}
        <div className="flex items-center gap-2">
          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open mobile menu"
            className="flex justify-center items-center h-10 w-10 rounded-lg bg-white shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#EB8800] transition-colors duration-200"
          >
            <AiOutlineMenu className="text-[#EB8800] text-2xl" />
          </button>

          {/* Logo */}
          <Link 
            href="/" 
            aria-label="Go to homepage"
            className="focus:outline-none focus:ring-2 focus:ring-[#EB8800] rounded-lg transition-all duration-200"
          >
            <Image
              src="/images/logo.svg"
              alt="Zhaket logo"
              width={50}
              height={50}
              className="min-h-[39px] min-w-[55px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Right Section - Search, Cart, and Authentication */}
        <nav className="flex items-center gap-2" aria-label="Header navigation">
          {/* Search Button */}
          <button
            onClick={openSearchModal}
            aria-label="Open search"
            className="flex justify-center items-center h-10 w-10 rounded-lg bg-white shadow-md hover:bg-[#FFF5E6] focus:outline-none focus:ring-2 focus:ring-[#EB8800] transition-colors duration-200"
          >
            <IoSearchOutline className="text-[#878F9B]" size={20} />
          </button>

          {/* Shopping Cart with Popover */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <button
                className="h-10 w-[54px] flex justify-center items-center rounded-lg hover:bg-[#fef6e8] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#EB8800] transition-colors duration-200"
                aria-label="Shopping cart"
              >
                <MdOutlineShoppingCart
                  size={20}
                  className="text-[#878F9B] transition-colors duration-200"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <p className="text-sm text-gray-600">سبد خرید خالی است</p>
            </PopoverContent>
          </Popover>

          {/* Authentication Section */}
          {status === "authenticated" ? (
            <UserProfileDropdown 
              session={session} 
              onMenuClose={closeMobileMenu} 
            />
          ) : (
            <AuthButton />
          )}
        </nav>
      </header>

      {/* Mobile Menu Sidebar */}
      <MobileMenuSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={closeMobileMenu} 
      />

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={closeSearchModal} 
      />
    </>
  );
}
