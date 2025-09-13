"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
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
 
 
export default function Header() {
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].id);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for modal
  const { data: session, status } = useSession();

  // While session is loading, show skeletons
  if (status === "loading") {
    return <HeaderSkeletons />;
  }

  return (
    <>
      {/* ======= DESKTOP / TABLET HEADER ======= */}
      <header className="w-full bg-white   hidden md:block">
        <div className="max-w-[1279px] px-4 mx-auto flex items-center justify-between py-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center ml-1 min-w-[32px] z-10 relative"
          >
            <Image
              src="/images/logo.svg"
              alt="Zhaket"
              width={40}
              height={31}
              className=" md:w-12  lg:w-[60px] w-auto h-auto"
              priority
            />
          </Link>

          {/* Main Navigation (visible on tablet+desktop) */}
          <nav className="hidden md:flex items-center gap-[20px] xl:gap-[35px]">
            {/* Categories Dropdown */}
            <div
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
              onFocus={() => setIsPopoverOpen(true)}
              onBlur={() => setIsPopoverOpen(false)}
              tabIndex={0}
              style={{ outline: "none" }}
            >
              <Popover
                placement="bottom-end"
                showArrow
                offset={12}
                isOpen={isPopoverOpen}
                onOpenChange={setIsPopoverOpen}
                trigger="manual"
              >
                <PopoverTrigger>
                  <Button
                    disableRipple
                    className="flex items-center gap-[10px] font-bold text-[15px] text-[#424244] hover:text-[#FF9606] bg-transparent p-0 h-auto"
                  >
                    <TbCategory color="#FF9606" size={20} />
                    <span>دسته‌بندی‌ها</span>
                    <FaChevronDown color="#FF9606" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-[5px] rounded-[10px] w-full max-w-[900px] xl:max-w-[1000px] bg-white shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] hidden lg:block">
                  <div className="flex flex-col lg:flex-row">
                    {/* Left-side category tabs */}
                    <div className="bg-[#F9FAFC] rounded-[10px] w-full lg:max-w-[280px] xl:max-w-[300px] p-[5px]">
                      <ul>
                        {MAIN_TABS.map((tab) => (
                          <li key={tab.id}>
                            <div
                              onMouseEnter={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-3 px-[15px] xl:px-[19px] py-3 xl:py-4 rounded-md cursor-pointer transition ${
                                activeTab === tab.id
                                  ? "bg-white shadow-sm text-[#FF9606]"
                                  : "text-[#5B5C60] hover:bg-white hover:shadow-sm"
                              }`}
                            >
                              {tab.icon}
                              {tab.label}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right-side tab content */}
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
                </PopoverContent>
              </Popover>
            </div>

            {/* Academy and Service Links */}
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
              className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606]"
            >
              سایت آماده
            </Link>
          </nav>

          {/* Right Utilities Section */}
          <div className="flex items-center gap-[10px]">
            {/* Search: Desktop = full searchbar, Tablet = icon only */}
            <div className="hidden lg:flex items-center rounded-md bg-[#F9FAFC] px-2 h-12 w-[250px] xl:w-[275px]">
              <input
                className="flex-1 bg-transparent text-sm text-[#76767C] outline-none"
                placeholder="جستجو در ژاکت"
              />
              <IoSearchOutline className="cursor-pointer" color="#878F9B" size={24} />
            </div>

            {/* Tablet Search Icon (md only) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex lg:hidden justify-center items-center h-12 w-12 rounded-lg bg-[#F9FAFC] hover:bg-[#FFF5E6] transition"
              aria-label="Search"
            >
              <IoSearchOutline className="text-[#878F9B]" size={22} />
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

            {/* Auth/User Menu */}
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

      {/* Search Modal Triggered by Tablet Icon */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
