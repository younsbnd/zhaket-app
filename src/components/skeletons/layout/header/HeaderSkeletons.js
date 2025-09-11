"use client";
import { Skeleton } from "@heroui/react";
import { CiMenuBurger } from "react-icons/ci";
// Import all required icons for skeletons (no duplicates)
import { FiShoppingCart } from "react-icons/fi";
import { BiUser } from "react-icons/bi";
import React from "react";

/**
 * MobileHeaderSkeleton
 * Skeleton loader for the mobile header, including hamburger menu, logo, cart, and user button.
 * Uses HeroUI Skeleton for all loading placeholders.
 */
export function MobileHeaderSkeleton() {
  return (
    <header className="flex items-center top-0 z-60 justify-between px-4 pb-4 pt-6 md:hidden bg-white">
      <div className="flex items-center gap-5">
        {/* Hamburger menu skeleton */}
        <Skeleton className="h-12 w-12 rounded-lg flex items-center justify-center">
          <CiMenuBurger className="text-[#EB8800] text-3xl" />
        </Skeleton>
        {/* Logo skeleton */}
        <Skeleton className="min-h-[39px] min-w-[55px] rounded-md">
          <div className="h-[39px] w-[55px]" />
        </Skeleton>
      </div>
      <div className="flex items-center gap-2">
        {/* Cart button skeleton */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <FiShoppingCart className="text-[#878F9B]" size={20} />
        </Skeleton>
        {/* User button skeleton */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <BiUser className="text-[#787676]" size={20} />
        </Skeleton>
      </div>
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
    <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white w-full">
      {/* Logo skeleton (left) */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-[43px] w-[60px] rounded-md" />
      </div>
      {/* Navigation skeleton (center) */}
      <nav className="flex-1 flex justify-center">
        <div className="flex gap-6">
          {/* Simulate 5 nav items as skeletons */}
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-6 w-20 rounded" />
          ))}
        </div>
      </nav>
      {/* Search, cart, and user skeletons (right) */}
      <div className="flex items-center gap-4">
        {/* Search bar skeleton */}
        <Skeleton className="h-10 w-56 rounded-md" />
        {/* Cart icon skeleton */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <FiShoppingCart className="text-[#878F9B]" size={20} />
        </Skeleton>
        {/* User icon skeleton */}
        <Skeleton className="h-10 w-10 rounded-lg flex items-center justify-center">
          <BiUser className="text-[#787676]" size={20} />
        </Skeleton>
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
