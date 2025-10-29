"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Badge,
} from "@heroui/react";
import { TbCategory } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";

import {
  MAIN_TABS,
  POPULAR_PLUGINS,
  POPULAR_THEMES,
  TAB_CONTENT,
} from "@/constants/header/mainMenuData";

import CategoryTabContent from "./CategoryTabContent";
import MostPopularSection from "./MostPopularContent";
import UserMenu from "./UserMenuPopover";
import MobileHeader from "./MenuDrawer/MobileHeader";
import AuthButton from "./MenuDrawer/AuthButton";
import HeaderSkeletons from "@/components/skeletons/layout/header/HeaderSkeletons";
import CascadingMenu from "./CascadingMenu";
import SearchModal from "./searchbox/Searchbox";
import { useSettings } from "@/contexts/SettingsContext";
import { useCartStore } from "@/stores/useCartStore";

/**
 * Header Component
 * Main navigation header for desktop and tablet devices
 * Includes logo, navigation menu, search functionality, shopping cart, and user authentication
 */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // State for tracking the active tab in the categories dropdown
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].id);
  // State for controlling the categories popover visibility
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // State for controlling the search modal visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Session data from NextAuth
  const { data: session, status } = useSession();
  // Get settings from context
  const { settings } = useSettings();
  const logoUrl = settings?.logoUrl || "/images/logo.svg";

  const { items: cartItems } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 1) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > 20 // Hide after scrolling 200px down
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Avoid rendering skeleton for static header

  return (
    <>
      {/* ======= DESKTOP / TABLET HEADER ======= */}
      <header
        className={`w-full hidden md:block fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="max-w-[1279px] px-4 mx-auto flex items-center justify-between py-6">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center ml-1 min-w-[32px] z-10 relative"
          >
            <Image
              src={logoUrl}
              alt="Zhaket"
              width={40}
              height={40}
              className="md:w-12 lg:w-[60px] w-auto h-auto object-contain"
              priority
            />
          </Link>

          {/* Main Navigation - visible on tablet and desktop */}
          <nav className="hidden md:flex items-center gap-[20px] xl:gap-[35px]">
            {/* Categories Dropdown */}
            <div
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
              onFocus={() => setIsPopoverOpen(true)}
              onBlur={() => setIsPopoverOpen(false)}
              tabIndex={0}
              className="outline-none"
            >
              <Popover
                placement="bottom-end"
                showArrow
                offset={8}
                isOpen={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                trigger="manual"
              >
                <PopoverTrigger>
                  <Button
                    className="flex items-center gap-[9px] font-bold text-[15px] text-[#424244] hover:text-[#FF9606] bg-transparent p-0 h-auto"
                  >
                    <TbCategory color="#FF9606" size={20} />
                    <Link href="/category" className="hover:text-[#FF9606]">
                      دسته‌بندی‌ها
                    </Link>
                    <FaChevronDown color="#FF9606" />
                  </Button>
                </PopoverTrigger>

                {/* Categories Dropdown Content - Full width responsive design */}
                <PopoverContent className="p-[5px] w-[95vw] max-w-[1200px] rounded-[10px] bg-white shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] hidden md:block">
                  <div className="flex flex-col md:flex-row min-h-[400px]">
                    <div className="bg-[#F9FAFC] rounded-[10px] md:w-[190px] lg:w-[300px] xl:w-[320px] p-[5px] flex-shrink-0">
                      <ul>
                        {MAIN_TABS.map((tab) => (
                          <li key={tab.id}>
                            {tab.href ? (
                              <Link
                                href={tab.href}
                                onMouseEnter={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-[15px] xl:px-[19px] py-3 xl:py-4 rounded-md cursor-pointer transition-all duration-200 ${
                                  activeTab === tab.id
                                    ? "bg-white shadow-sm text-[#FF9606]"
                                    : "text-[#5B5C60] hover:bg-white hover:shadow-sm"
                                }`}
                              >
                                {tab.icon}
                                <span className="text-sm md:text-base">
                                  {tab.label}
                                </span>
                              </Link>
                            ) : (
                              <div
                                onMouseEnter={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-3 px-[15px] xl:px-[19px] py-3 xl:py-4 rounded-md cursor-pointer transition-all duration-200 ${
                                  activeTab === tab.id
                                    ? "bg-white shadow-sm text-[#FF9606]"
                                    : "text-[#5B5C60] hover:bg-white hover:shadow-sm"
                                }`}
                              >
                                {tab.icon}
                                <span className="text-sm md:text-base">
                                  {tab.label}
                                </span>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right Side - Tab Content */}
                    <div className="flex-1 min-w-0">
                      {activeTab === "most-popular" ? (
                        <MostPopularSection
                          POPULAR_THEMES={POPULAR_THEMES}
                          POPULAR_PLUGINS={POPULAR_PLUGINS}
                        />
                      ) : (
                        <CategoryTabContent
                          tabId={activeTab}
                          TAB_CONTENT={TAB_CONTENT}
                        />
                      )}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Academy and Service Navigation Links */}
            <CascadingMenu
              label="ژاکت آکادمی"
              items={[
                {
                  label: "سئو بعداز راه‌اندازی سایت",
                  href: "https://academy.zhaket.com/product/essential-seo-actions-after-launching-site/",
                  rel: "nofollow",
                },
                {
                  label: "افزایش سرعت (رایگان)",
                  href: "https://academy.zhaket.com/product/webinar-website-optimization/",
                  rel: "nofollow",
                },
              ]}
            />
            <CascadingMenu
              label="ژاکت سرویس"
              items={[
                {
                  label: "سرویس ۱",
                  href: "https://service.zhaket.com/1",
                  rel: "nofollow",
                },
              ]}
            />
            <Link
              href="/web/category/prebuilt-site?sort_by=%22top_sales%22"
              className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606] transition-colors duration-200"
            >
              سایت آماده
            </Link>
          </nav>

          {/* Right Utilities Section */}
          <div className="flex items-center gap-[10px]">
            {/* Search Bar - Desktop only, full search input */}
            <div
              className="hidden lg:flex items-center rounded-md bg-[#F9FAFC] px-2 h-12 w-[250px] xl:w-[275px] cursor-pointer hover:bg-[#f0f1f3] transition-colors duration-200"
              onClick={() => setIsSearchOpen(true)}
            >
              <input
                readOnly
                className="flex-1 bg-transparent text-sm text-[#76767C] outline-none cursor-pointer"
                placeholder="جستجو در ژاکت"
              />
              <IoSearchOutline
                className="cursor-pointer"
                color="#878F9B"
                size={24}
              />
            </div>

            {/* Search Icon - Tablet only */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex lg:hidden justify-center items-center h-12 w-12 rounded-lg bg-[#F9FAFC] cursor-pointer  transition-colors duration-200"
              aria-label="Search"
            >
              <IoSearchOutline className="text-[#878F9B]" size={22} />
            </button>

            <Badge content={cartItems.length} color="danger">
              <Link
                href="/cart"
                className="group h-[45px] w-[54px] flex justify-center items-center rounded-lg bg-slate-50 hover:bg-[#fef6e8] transition-colors duration-300 cursor-pointer"
                aria-label="Shopping Cart"
              >
                <MdOutlineShoppingCart
                  size={20}
                  className="text-[#878F9B] transition-all duration-300 group-hover:text-[#f6b93b] group-hover:scale-110"
                />
              </Link>
            </Badge>
            {/* Authentication Section - User Menu or Login Button */}
            {status === "authenticated" ? (
              <UserMenu session={session} />
            ) : (
              <AuthButton />
            )}
          </div>
        </div>
      </header>

      {/* ======= MOBILE HEADER ======= */}
      <MobileHeader />

      {/* Search Modal - Triggered by search icon/bar click */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
