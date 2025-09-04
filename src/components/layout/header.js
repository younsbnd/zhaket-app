"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent, Button, CircularProgress } from "@heroui/react";
import { TbCategory } from "react-icons/tb";
import { FaChevronDown, FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart, MdOutlineWeb, MdLocalOffer } from "react-icons/md";
import { SiWordpress } from "react-icons/si";
import { BiPlug } from "react-icons/bi";
import { RiFileCodeLine } from "react-icons/ri";
import { AiOutlineHtml5 } from "react-icons/ai";
import { HiOutlineLogout, HiOutlineCog, HiOutlineDownload, HiOutlineTicket, HiOutlineViewGrid } from "react-icons/hi";
import { signOut, useSession } from "next-auth/react";
import MobileHeader from "./Drawer";

const MAIN_TABS = [
  { 
    id: "most-popular", 
    icon: <MdOutlineWeb color="#FF9606" size={24} />,
    label: "محبوب‌ترین‌ها",
    href: '/search?sort_by="top_sales"&categories=["5dcaacbfeaec37018b508a3b"]'
  },
{ 
    id: "wordpress-themes", 
    icon: <SiWordpress color="#878F9B" size={24} />, 
    label: "قالب وردپرس", 
    href: "/web/category/wordpress-themes" 
  },
  { 
    id: "wordpress-plugins", 
    icon: <BiPlug color="#878F9B" size={24} />, 
    label: "افزونه وردپرس",
    href: "/web/category/wordpress-plugins"
  },
  { 
    id: "scripts", 
    icon: <RiFileCodeLine color="#878F9B" size={24} />,
    label: "اسکریپت",
    href: "/web/category/script"
  },
{ 
    id: "html-templates", 
    icon: <AiOutlineHtml5 color="#878F9B" size={24} />, 
    label: "قالب HTML", 
    href: "/web/category/html-site-templates" 
  },
  { 
    id: "amazing-bundles", 
    icon: <MdLocalOffer color="#878F9B" size={24} />, 
    label: "بسته‌های شگفت‌انگیز", 
    href: "/web/category/amazing-bundles" 
  },
];

const POPULAR_THEMES = [
  { label: "قالب وودمارت", href: "/web/woodmart-woocommerce-themes" },
  { label: "قالب آسترا پرو", href: "/web/astra-pro-wordpress-theme" },
];

const POPULAR_PLUGINS = [
  { label: "افزونه المنتور پرو", href: "/web/elementor-pro-pagebuilder-plugin" },
  { label: "افزونه دیجیتس", href: "/web/mobile-number-signup" },
{ label: "افزونه یواست سئو", href: "/web/yoast-seo-premium-wordpress-plugin" },
];

const TAB_CONTENT = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/web/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/web/category/education" }],
    [{ label: "قالب وبلاگ", href: "/web/tag/weblog-wordpress-theme" }]
  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "/plugins/shop" }],
    [{ label: "افزونه ترجمه", href: "/plugins/translation" }],
    [{ label: "افزونه رزرواسیون", href: "/plugins/reservation" }]
  ],
  scripts: [
    [{ label: "اسکریپت مدیریت پروژه", href: "/scripts/project-management" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "/scripts/social" }],
    [{ label: "اسکریپت چت", href: "/scripts/chat" }]
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "/html/onepage" }],
[{ label: "قالب لندینگ پیج", href: "/html/landing" }], 
    [{ label: "قالب رستوران", href: "/html/restaurant" }]
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "/bundles/wp" }],
    [{ label: "بسته قالب‌ها", href: "/bundles/themes" }],
    [{ label: "بسته توسعه", href: "/bundles/development" }]
  ],
};

export default function Header() {
  const [activeTab, setActiveTab] = useState(MAIN_TABS[0].id);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const { data: session, status } = useSession();

  // Render most popular content section
  const renderMostPopularContent = () => (
        <div className="flex flex-col lg:flex-row">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-[20px] lg:p-[30px] flex-1">
            <div>
              <p className="text-base text-[#424244] font-medium pb-4 hover:text-[#FF9606] transition">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a3b']">
              محبوب‌ترین قالب‌ها
            </Link>
</p>
              <ul>
                {POPULAR_THEMES.map(item => (
                  <li key={item.label}>
                    <Link 
href={item.href} 
className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1"
>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-base text-[#424244] font-medium pb-4 hover:text-[#FF9606] transition">
            <Link href="/search?sort_by=top_sales&categories=['5dcaacbfeaec37018b508a39']">
              محبوب‌ترین افزونه‌ها
            </Link>
</p>
              <ul>
                {POPULAR_PLUGINS.map(item => (
                  <li key={item.label}>
                    <Link 
href={item.href} 
className="text-sm text-[#76767C] hover:text-[#FF9606] block py-1"
>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

      {/* Advertisement banners */}
      <div className="hidden lg:flex flex-col gap-3 max-w-[260px]">
        <Link href="https://ircdn.zhaket.com/resources/5dc9fbf3eaec370009205b97/67723f16966cc82e97038df3.png">
          <Image 
            alt="ad1" 
            src="https://ircdn.zhaket.com/resources/5dc9fbf3eaec370009205b97/67723f16966cc82e97038df3.png" 
            width={260} 
            height={200} 
            className="rounded-[10px]" 
          />
        </Link>
        <Link href="https://ircdn.zhaket.com/resources/5dc9fbf3eaec370009205b97/67724097e0240bc7cb0377a3.png">
          <Image 
            alt="ad2" 
            src="https://ircdn.zhaket.com/resources/5dc9fbf3eaec370009205b97/67724097e0240bc7cb0377a3.png" 
            width={260} 
            height={200} 
            className="rounded-[10px]" 
          />
        </Link>
      </div>
        </div>
      );
    
  // Render tab content for categories
  const renderTabContent = (tabId) => (
      <div className="flex-1 p-[20px] lg:p-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[15px] lg:gap-[20px]">
          {TAB_CONTENT[tabId]?.map((col, idx) => (
            <div key={idx} className="pr-0 lg:pr-[20px] pt-0 lg:pt-[15px]">
<ul>
                {col.map(item => (
                  <li key={item.label}>
                    <Link href={item.href}>
                    <p className="transition duration-300 text-sm leading-7 pb-3 text-[#76767C] hover:text-[#FF9606]">
                      {item.label}
</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  
  // Render user menu dropdown when authenticated
  const renderUserMenu = () => (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <Button className="group flex h-10 w-fit items-center gap-2 rounded-lg bg-white p-2 shadow-sm" disableRipple>
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "کاربر"}
                width={24}
                height={24}
                className="rounded-full"
              />
            ) : (
             <FaUser className="text-[#878F9B]" size={16} />
            )}
            <span className="text-sm leading-7 pr-1 text-[#787676] hidden lg:inline">
              {session?.user?.name || session?.user?.email || "کاربر"}
            </span>
            <FaChevronDown className="text-[#878F9B]" size={12} />
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[240px] bg-white rounded-lg shadow-lg">
        <div className="bg-white rounded-lg">
          {/* User info header */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="text-base leading-7 text-[#5B5C60]">
              کاربر {session?.user?.name || "ژاکت"}
            </p>
          </div>

          {/* Dashboard link */}
          <Link href="/panel">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
               <HiOutlineViewGrid className="text-[#5B5C60]" size={14} />
              <p className="text-sm leading-7 text-[#5B5C60]">پیشخوان</p>
            </div>
          </Link>

          {/* Profile completion */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF5E6] py-4 pr-7 pl-3 hover:bg-[#F9FAFC] mx-2">
              <div className="flex items-center gap-4">
                <FaUser className="text-[#EB8800]" size={12} />
                <p className="text-sm text-[#EB8800]">تکمیل پروفایل</p>
              </div>
{/* Progress circle */}
              <div className="relative flex items-center justify-center">
                <CircularProgress
                  aria-label="Loading..."
                  className="text-[#EB8800]" 
                  color="warning"
                  showValueLabel={true}
                  size="lg"
                  value={50}
                />
              </div>
            </div>
          </Link>

          {/* Downloads */}
          <Link href="/panel/downloads">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <HiOutlineDownload className="text-[#5B5C60]" size={15} />
              <p className="text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* New ticket */}
          <Link href="/panel/tickets/new">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
               <HiOutlineTicket className="text-[#6097F3]" size={15} />
              <p className="text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
             <HiOutlineCog className="text-[#5B5C60]" size={17} />
              <p className="text-sm leading-7 text-[#5B5C60]">ویرایش حساب</p>
            </div>
          </Link>

          {/* Logout */}
          <div 
                        role="button" 
            tabIndex={0} 
            onClick={() => signOut()} 
            className="flex items-center gap-4 py-4 pr-7 hover:bg-[#F9FAFC] cursor-pointer"
          >
            <HiOutlineLogout className="text-[#5B5C60]" size={19} />
            <p className="text-sm leading-7 text-[#5B5C60]">خروج از حساب</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  // Render auth button for non-authenticated users
  const renderAuthButton = () => (
    <Link href="/auth/signin" className="group flex h-10 items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
      <FaUser className="text-[#878F9B]" size={16} />
      <span className="text-sm text-[#787676] hidden lg:inline">ورود | ثبت‌نام</span>
    </Link>
  );

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-[1279px] px-4 mx-auto flex items-center justify-between py-6">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
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
                
        {/* Navigation Menu */}
        <nav className="hidden md:flex lg:flex items-center gap-[25px] xl:gap-[35px]">
          {/* Categories Dropdown */}
          <Popover 
placement="bottom-end" 
              showArrow 
              offset={12} 
              isOpen={isPopoverOpen} 
              onOpenChange={setIsPopoverOpen} 
              trigger="hover"
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

        {/* Tab Content */}
                  {activeTab === "most-popular" ? (
                    renderMostPopularContent()
                  ) : (
                    renderTabContent(activeTab)
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* Navigation Links */}
            <Link href="/blog" className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606]">
              بلاگ
            </Link>
            <Link href="/academy" className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606]">
              ژاکت آکادمی
            </Link>
            <Link href="/service" className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606]">
              ژاکت سرویس
            </Link>
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
                    className="h-10 w-10 rounded-lg bg-white shadow-sm" 
                  aria-label="Cart" 
                  disableRipple
                  >
                    <MdOutlineShoppingCart size={20} className="text-[#878F9B]" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-4">
                سبد خرید خالی است
              </PopoverContent>
                </Popover>
            
            {/* User Authentication */}
            {status === "authenticated" ? renderUserMenu() : renderAuthButton()}
          </div>
        </div>
      </header>

      {/* Mobile Header Component */}
      <MobileHeader />
    </>
  );
}
