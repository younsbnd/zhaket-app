"use client";
import { Skeleton } from "@heroui/react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
// Import all required icons for skeletons (no duplicates)
import { BiUser } from "react-icons/bi";
import React from "react";

/**
 * MobileHeaderSkeleton
 * Skeleton loader for the mobile header, including hamburger menu, logo, cart, and user button.
 * Uses HeroUI Skeleton for all loading placeholders.
 */
export function MobileHeaderSkeleton() {
  return (
    <header className="flex items-center justify-around top-0 z-60 pb-4 pt-6 md:hidden bg-white w-full" style={{ minHeight: 64 }}>
      <div className="flex items-center gap-2">
        {/* Hamburger menu skeleton (matches button h-10 w-10) */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <AiOutlineMenu className="text-[#EB8800] text-2xl" />
        </Skeleton>

        {/* Logo skeleton (matches Image size ~50x50 with min-h/min-w) */}
        <Skeleton className="h-[39px] w-[55px] rounded-md">
          <div className="h-[39px] w-[55px]" />
        </Skeleton>
      </div>

      <nav className="flex items-center gap-2">
        {/* Search button skeleton (h-10 w-10) */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <IoSearchOutline className="text-[#878F9B]" size={20} />
        </Skeleton>

        {/* Cart button skeleton (h-10 w-[54px]) */}
        <Skeleton className="h-10 w-[54px] rounded-lg flex items-center justify-center">
          <MdOutlineShoppingCart className="text-[#878F9B]" size={20} />
        </Skeleton>

        {/* Auth button skeleton (approx size of AuthButton) */}
        <Skeleton className="h-10 md:h-12 w-24 lg:w-32 rounded-lg" />
      </nav>
    </header>
  );
}

/**
 * DesktopHeaderSkeleton
 * Skeleton loader for the desktop header, including navigation, search, cart, and user menu.
 * Uses HeroUI Skeleton for all loading placeholders.
 */
export function DesktopHeaderSkeleton() {
  return (
    <header className="w-full bg-white hidden md:block">
      <div className="max-w-[1279px] px-4 mx-auto flex items-center justify-between py-6">

        {/* Logo (left) */}
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 md:w-12 lg:w-[60px] rounded-md" />
        </div>

        {/* Main navigation (center) */}
        <nav className="hidden md:flex items-center gap-[20px] xl:gap-[35px]">
          {/* Categories / primary nav skeletons (5 items) */}
          <Skeleton className="h-[36px] w-[120px] rounded-md" />
          <Skeleton className="h-[36px] w-[110px] rounded-md" />
          <Skeleton className="h-[36px] w-[110px] rounded-md" />
          <Skeleton className="h-[36px] w-[110px] rounded-md" />
          <Skeleton className="h-[36px] w-[110px] rounded-md" />
        </nav>

        {/* Utilities (right) */}
        <div className="flex items-center gap-[10px]">
          {/* Search bar - desktop lg:flex */}
          <div className="hidden lg:flex items-center">
            <Skeleton className="h-12 w-[250px] xl:w-[275px] rounded-md" />
          </div>

          {/* Search icon for tablet (visible on md) */}
          <div className="lg:hidden">
            <Skeleton className="h-12 w-12 rounded-md" />
          </div>

          {/* Cart popover button */}
          <Skeleton className="h-[40px] w-[54px] rounded-md flex items-center justify-center">
            <MdOutlineShoppingCart className="text-[#878F9B]" size={20} />
          </Skeleton>

          {/* Auth / user button */}
          <Skeleton className="h-10 md:h-12 w-24 lg:w-32 rounded-lg" />
        </div>
      </div>
    </header>
  );
}

/**
 * HeaderSkeletons
 * Wrapper to render the correct header skeleton based on screen size.
 * Only use these skeletons for header loading; do not add any other loading UI in the header.
 */
export default function HeaderSkeletons() {
  return (
    <>
      <MobileHeaderSkeleton />
      <DesktopHeaderSkeleton />
    </>
  );
}
