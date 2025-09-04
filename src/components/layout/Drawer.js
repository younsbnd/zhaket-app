"use client";

import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent, CircularProgress } from "@heroui/react";
import { FcExpand, FcNext } from "react-icons/fc";
import { FaChevronDown } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { BiHome, BiPlug, BiPlus, BiShoppingBag, BiUser } from "react-icons/bi";
import { IoCodeSlashOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { CiEdit, CiLogout, CiMenuBurger } from "react-icons/ci";

// Main category tabs for mobile navigation
const mainTabs = [
  { 
    id: "most-popular", 
    mobileIcon: <AiOutlineHeart color="#878F9B" size={24} />,
    label: "محبوب‌ترین‌ها",
    href: '/search?sort_by="top_sales"&categories=["5dcaacbfeaec37018b508a3b"]'
  },
  { 
    id: "wordpress-plugins", 
    mobileIcon: <BiPlug color="#878F9B" size={24} />,
    label: "افزونه وردپرس",
    href: "/web/category/wordpress-plugins"
  },
  { 
    id: "scripts", 
    mobileIcon: <IoCodeSlashOutline color="#878F9B" size={24} />,
    label: "اسکریپت",
    href: "/web/category/script"
  },
];

// Popular content data
const popularThemes = [
  { label: "قالب وودمارت", href: "/web/woodmart-woocommerce-themes" },
  { label: "قالب آسترا پرو", href: "/web/astra-pro-wordpress-theme" },
];

const popularPlugins = [
  { label: "افزونه المنتور پرو", href: "/web/elementor-pro-pagebuilder-plugin" },
  { label: "افزونه دیجیتس", href: "/web/mobile-number-signup" },
];

// Tab content configuration
const tabContent = {
  "wordpress-themes": [
    [{ label: "قالب وردپرس", href: "/web/category/wordpress-themes" }],
    [{ label: "قالب آموزشی وردپرس", href: "/web/category/education" }],
    [{ label: "قالب وبلاگ", href: "/web/tag/weblog-wordpress-theme" }],
  ],
  "wordpress-plugins": [
    [{ label: "افزونه فروشگاهی", href: "/plugins/shop" }],
    [{ label: "افزونه ترجمه", href: "/plugins/translation" }],
    [{ label: "افزونه رزرواسیون", href: "/plugins/reservation" }],
  ],
  "scripts": [
    [{ label: "اسکریپت مدیریت پروژه", href: "/scripts/project-management" }],
    [{ label: "اسکریپت شبکه اجتماعی", href: "/scripts/social" }],
    [{ label: "اسکریپت چت", href: "/scripts/chat" }],
  ],
  "html-templates": [
    [{ label: "قالب تک صفحه‌ای", href: "/html/onepage" }],
  ],
  "amazing-bundles": [
    [{ label: "بسته کامل وردپرس", href: "/bundles/wp" }],
    [{ label: "بسته قالب‌ها", href: "/bundles/themes" }],
    [{ label: "بسته توسعه", href: "/bundles/development" }],
  ],
};

export default function MobileHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const { data: session, status } = useSession();

  // Toggle accordion state for mobile menu items
  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Render content for mobile accordion sections
  const renderMobileAccordionContent = (tabId) => {
    if (tabId === "most-popular") {
      return (
        <div className="px-4 py-3 bg-white rounded-md mt-2 shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">محبوب‌ترین قالب‌ها</p>
              <ul className="space-y-2">
                {popularThemes.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">محبوب‌ترین افزونه‌ها</p>
              <ul className="space-y-2">
                {popularPlugins.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      );
    }

    const content = tabContent[tabId];
    if (!content) return null;

    return (
      <div className="px-4 py-3 bg-white rounded-md mt-2 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          {content.map((col, idx) => (
            <div key={idx}>
              <ul className="space-y-2">
                {col.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render authenticated user profile dropdown for mobile
  const renderMobileUserProfile = () => (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <button className="group flex h-10 w-fit min-w-12 items-center justify-center rounded-lg bg-white p-2 shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-hidden transition duration-300 hover:bg-[#76767c] md:h-12 md:bg-[#F9FAFC] md:shadow-none">
          <div className="flex items-center gap-2">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "کاربر"}
                width={20}
                height={20}
                className="rounded-full"
              />
            ) : (
             <BiUser/>
            )}
            <span className="text-sm leading-7 pr-1 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
              {session?.user?.name?.split(' ')[0] || session?.user?.email?.split('@')[0] || "کاربر ژاکت"}
            </span>
            <FaChevronDown className="text-[#878F9B]" size={10} />
          </div>
        </button>
      </PopoverTrigger>

      <PopoverContent className="p-0 min-w-[250px]">
        <div>
          {/* User info header */}
          <div className="flex justify-center flex-col items-start pr-7 py-3">
            <p className="transition duration-300 text-base leading-7 text-[#5B5C60]">
              {session?.user?.name || "کاربر ژاکت"}
            </p>
          </div>

          {/* Dashboard link */}
          <Link href="/panel">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
               <BiHome/>
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">پیشخوان</p>
            </div>
          </Link>

          {/* Profile completion with progress indicator */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center justify-between gap-4 rounded-xl bg-[#FFF5E6] py-4 pr-7 pl-3 hover:bg-[#F9FAFC] mx-2">
              <div className="flex items-center justify-center gap-4">
                <BiUser/>
                <p className="transition duration-300 text-sm leading-7 text-[#EB8800]">تکمیل پروفایل</p>
              </div>
              <div className="flex items-center justify-center">
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

          {/* Downloads link */}
          <Link href="/panel/downloads">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
              <AiOutlineHeart/>
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">دانلودها</p>
            </div>
          </Link>

          {/* New ticket link */}
          <Link href="/panel/tickets/new">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
               <BiPlus/>
              <p className="transition duration-300 text-sm leading-7 text-[#6097F3]">ثبت تیکت</p>
            </div>
          </Link>

          {/* Edit account settings */}
          <Link href="/panel/settings/edit-profile">
            <div className="flex items-center justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]">
             <CiEdit/>
              <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">ویرایش حساب</p>
            </div>
          </Link>

          {/* Logout functionality */}
          <div 
            className="flex items-center cursor-pointer justify-start gap-4 py-4 pr-7 hover:bg-[#F9FAFC]" 
            role="button" 
            tabIndex="0"
            onClick={() => {
              signOut();
              setIsMobileMenuOpen(false);
            }}
          >
            <CiLogout/>
            <p className="transition duration-300 text-sm leading-7 text-[#5B5C60]">خروج از حساب</p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );

  // Render login/signup button for non-authenticated users
  const renderMobileAuthButton = () => (
    <Link 
      className="group flex h-10 w-fit min-w-12 items-center justify-center rounded-lg bg-white p-2 shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-hidden transition duration-300 hover:bg-[#76767c] md:h-12 md:bg-[#F9FAFC] md:shadow-none" 
      href="/auth/signin"
    >
      <BiUser/>
      <span className="text-sm leading-7 pr-1 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
        ورود | ثبت‌نام
      </span>
    </Link>
  );

  return (
    <>
      {/* Mobile Header - visible only on mobile devices */}
      <header className="flex items-center top-0 z-60 justify-between px-4 pb-4 pt-6 md:hidden bg-white">
        <div className="flex items-center gap-5">
          {/* Hamburger menu button */}
          <button 
            data-cy="data-cy-mobile-menu-button" 
            className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg text-white transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs hover:bg-secondary/80 h-10 w-10 bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)]" 
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <div className="flex items-center justify-center"> 
              <CiMenuBurger className="text-[#EB8800] text-2xl"/>
            </div>
          </button>
          
          {/* Logo */}
          <Link href="/">
            <Image 
              alt="ژاکت" 
              width={60} 
              height={43} 
              className="min-h-[39px] min-w-[55px]" 
              src="/images/logo.svg"
            />
          </Link>
        </div>
        
        {/* Right side controls - cart and user auth */}
        <div className="flex items-center gap-2">
          {/* Shopping cart popover */}
          <Popover placement="bottom-end">
            <PopoverTrigger>
              <button className="outline-hidden group ui-open:bg-[#FFF5E6] relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-0 bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] transition duration-300 hover:bg-[#FFF5E6] md:h-12 md:w-12 md:bg-[#F9FAFC] md:shadow-none" aria-label="Cart" type="button">
        <BiShoppingBag/>
              </button>
            </PopoverTrigger>
           
          </Popover>

          {/* User authentication section */}
          {status === "authenticated" ? renderMobileUserProfile() : renderMobileAuthButton()}
        </div>

        {/* Mobile menu overlay - dark background when menu is open */}
        <div 
          className={`fixed top-0 left-0 z-20 h-full w-full bg-[#00000033] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Mobile menu sidebar */}
        <div className={`fixed top-0 right-0 z-30 h-full w-[370px] max-w-[90vw] transform-gpu overflow-y-auto bg-white px-[10px] py-5 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* Mobile menu header with logo and close button */}
          <div className="flex items-center justify-between rounded-md px-[20px]">
            <Link href="/">
              <Image 
                alt="ژاکت" 
                width={60} 
                height={43} 
                className="min-h-[31px] min-w-[44px]" 
                src="/images/logo.svg"
              />
            </Link>
            <button 
              data-cy="data-cy-menu-close-button" 
              className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg text-white transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs hover:bg-secondary/80 h-[33px] w-[33px] bg-[#F7F8F9]" 
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="flex items-center justify-center">
                <svg 
                  stroke="currentColor" 
                  fill="currentColor" 
                  strokeWidth="0" 
                  viewBox="0 0 512 512" 
                  color="#878F9B" 
                  style={{color:"#878F9B"}} 
                  height="20" 
                  width="20" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path>
                </svg>
              </div>
            </button>
          </div>
          
          <div>
            {/* Search bar inside mobile menu */}
            <div className="mt-4 px-[21px]">
              <div className="flex items-center rounded-md bg-[#F9FAFC] px-4 h-12 w-full">
                <input 
                  className="flex-1 bg-transparent text-sm text-[#76767C] outline-none" 
                  placeholder="جستجو در ژاکت" 
                />
                <IoSearchOutline className="cursor-pointer" color="#878F9B" size={24} />
              </div>
            </div>

            {/* Mobile menu categories with accordion functionality */}
            <div className="mt-6 flex w-full flex-col gap-[15px] rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]" data-cy="data-cy-menu-container">
              {mainTabs.map((tab, index) => (
                <div key={tab.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <button 
                    className="cursor-pointer flex w-full items-center justify-between py-2" 
                    data-cy="data-cy-stylish-accordion-button" 
                    type="button" 
                    onClick={() => toggleAccordion(tab.id)}
                    aria-expanded={openAccordions[tab.id] || false}
                  >
                    <div className="flex items-center justify-start gap-[10px]">
                      {tab.mobileIcon}
                      <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium">
                        {tab.label}
                      </p>
                    </div>
                    <div className="max-h-4 max-w-4">
                      {openAccordions[tab.id] ? <FcNext /> : <FcExpand />}
                    </div>
                  </button>
                  
                  {/* Expandable accordion content */}
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openAccordions[tab.id] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    {openAccordions[tab.id] && renderMobileAccordionContent(tab.id)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Static navigation links */}
            <div className="flex justify-center flex-col items-start gap-6 p-[20px]" data-cy="data-cy-menu-container">
              <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)}>بلاگ</Link>
              </p>
              
              <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
                <Link rel="nofollow" href="/academy" onClick={() => setIsMobileMenuOpen(false)}>ژاکت آکادمی</Link>
              </p>
              
              <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
                <Link rel="nofollow" href="/service" onClick={() => setIsMobileMenuOpen(false)}>ژاکت سرویس</Link>
              </p>
              
              <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium">
                <Link rel="follow" href="/ready-site" onClick={() => setIsMobileMenuOpen(false)}>سایت آماده</Link>
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
