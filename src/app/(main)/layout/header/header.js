"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent, Button } from "@heroui/react";
import { TbCategory } from "react-icons/tb";
import { FaChevronDown, FaUser } from "react-icons/fa";
 
 
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";
 
 

import { MAIN_TABS, POPULAR_PLUGINS, POPULAR_THEMES, TAB_CONTENT } from "@/constants/header/mainMenuData";

import CategoryTabContent from "./CategoryTabContent";
import MostPopularSection from "./MostPopularContent";
import UserMenu from "./UserMenuPopover";
import MobileHeader from "./MenuDrawer/MobileHeader";
import AuthButton from "./MenuDrawer/AuthButton";

import HeaderSkeletons from "@/components/skeletons/layout/header/HeaderSkeletons";
import CascadingMenu from "./CascadingMenu";
 


/**
 * Desktop and mobile header component
 * Combines navigation, search, cart, and user menu.
 */
export default function Header() {
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].id);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: session, status } = useSession();

  // Render auth button for non-authenticated users
  const renderAuthButton = () => (
    <AuthButton />
  );

  // Show header skeletons while loading session/auth state
  if (status === "loading") {
    return <HeaderSkeletons />;
  }

  return (
    <>
      {/* Desktop Header */}
      <header className="w-full bg-white shadow-sm hidden md:block">
        <div className="max-w-[1279px] px-4 mx-auto flex items-center justify-between py-6">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="ژاکت" width={60} height={43} />
          </Link>

          {/* Navigation Menu with dropdowns for Academy and Service */}
          <nav className="hidden md:flex lg:flex items-center gap-[25px] xl:gap-[35px]">
            {/* Categories Dropdown */}
            <div
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
              onFocus={() => setIsPopoverOpen(true)}
              onBlur={() => setIsPopoverOpen(false)}
              tabIndex={0}
              style={{ outline: 'none' }}
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
                <PopoverContent className="p-[5px] rounded-[10px] w-full max-w-[900px] xl:max-w-[1000px] bg-white shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)]">
                  <div className="flex flex-col lg:flex-row">
                    {/* Tab Navigation */}
                    <div className="bg-[#F9FAFC] rounded-[10px] w-full lg:max-w-[280px] xl:max-w-[300px] p-[5px]">
                      <ul>
                        {MAIN_TABS.map(tab => (
                          <li key={tab.id}>
                            <div
                              onMouseEnter={() => setActiveTab(tab.id)}
                              className={`flex items-center gap-3 px-[15px] xl:px-[19px] py-3 xl:py-4 rounded-md cursor-pointer transition ${activeTab === tab.id
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
                    {/* Tab Content */}
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
            {/* Blog link (unchanged) */}
            <Link href="/blog" className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606]">
              بلاگ
            </Link>
            {/* Zhaket Academy dropdown */}
            <CascadingMenu
              label="ژاکت آکادمی"
              items={[
                { label: "دوره طراحی سایت", href: "https://academy.zhaket.com/webdesign/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "follow" },
                { label: "دوره سئو کاربردی", href: "https://academy.zhaket.com/seo/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "follow" },
                { label: "دوره تولید محتوا", href: "https://academy.zhaket.com/product/content-writing/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "nofollow" },
                { label: "دوره اینستاگرام", href: "https://academy.zhaket.com/product/instagram-marketing/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "follow" },
                { label: "دوره آنالیتیکس GA4", href: "https://academy.zhaket.com/product/google-analytics/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "nofollow" },
                { label: "بازاریابی برای فروشگاه‌های اینترنتی", href: "https://academy.zhaket.com/product/get-started-digital-marketing/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound&utm_content=14010216" },
                { label: "سئو بعداز راه‌اندازی سایت", href: "https://academy.zhaket.com/product/essential-seo-actions-after-launching-site/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound&utm_content=14010216", rel: "nofollow" },
                { label: "افزایش سرعت (رایگان)", href: "https://academy.zhaket.com/product/webinar-website-optimization/?utm_source=zhaket&utm_medium=navmenu&utm_campaign=inbound", rel: "nofollow" },
              ]}
            />
            {/* Zhaket Service dropdown (example items, replace as needed) */}
            <CascadingMenu
              label="ژاکت سرویس"
              items={[
                { label: "سرویس ۱", href: "https://service.zhaket.com/1", rel: "nofollow" },
                { label: "سرویس ۲", href: "https://service.zhaket.com/2", rel: "nofollow" },
              ]}
            />
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center gap-[10px]">

            {/* Search Box */}
            <div className="flex items-center rounded-md bg-[#F9FAFC] px-4 h-12 w-[200px] lg:w-[250px] xl:w-[275px]">
              <input
                className="flex-1 bg-transparent text-sm text-[#76767C] outline-none"
                placeholder="جستجو در ژاکت"
              />
              <IoSearchOutline className="cursor-pointer" color="#878F9B" size={24} />
            </div>

            {/* Shopping Cart */}
            <Popover placement="bottom-end">
              <PopoverTrigger>
                <Button
                  className="h-10 w-10 rounded-lg hover:bg-[#fef6e8] bg-white shadow-sm"
                  aria-label="Cart"
                  disableRipple
                >
                  <MdOutlineShoppingCart size={20} className="text-[#878F9B]   hover:text-[#efd8b4]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                سبد خرید خالی است
              </PopoverContent>
            </Popover>

            {/* User Authentication */}
            {status === "authenticated" ? (
              <UserMenu session={session} />
            ) : (
              renderAuthButton()
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <MobileHeader />
    </>
  );
}
