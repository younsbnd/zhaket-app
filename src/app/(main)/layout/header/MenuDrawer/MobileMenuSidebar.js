"use client";

import React, { useState } from "react";
import { FcExpand, FcNext } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { BiPlug } from "react-icons/bi";
import { IoCodeSlashOutline, IoSearchOutline } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { POPULAR_PLUGINS, POPULAR_THEMES } from "@/constants/header/mainMenuData";
import { mainTabs } from "@/constants/header/mobileMenuData";

 

export default function MobileMenuSidebar({ isOpen, onClose }) {
  const [openAccordions, setOpenAccordions] = useState({});

  // Toggle accordion state for menu items
  const toggleAccordion = (id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Render content for accordion sections
  const renderAccordionContent = (tabId) => {
    if (tabId === "most-popular") {
      return (
        <div className="px-4 py-3 bg-white rounded-md mt-2 shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            {/* Popular themes section */}
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">
                محبوب‌ترین قالب‌ها
              </p>
              <ul className="space-y-2">
                {POPULAR_THEMES.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular plugins section */}
            <div>
              <p className="text-sm text-[#424244] font-medium pb-2 border-b border-gray-100 mb-2">
                محبوب‌ترین افزونه‌ها
              </p>
              <ul className="space-y-2">
                {POPULAR_PLUGINS.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
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

    const content = TAB_CONTENT[tabId];
    if (!content) return null;

    return (
      <div className="px-4 py-3 bg-white rounded-md mt-2 shadow-sm">
        <div className="grid grid-cols-1 gap-4">
          {content.map((col, idx) => (
            <div key={idx}>
              <ul className="space-y-2">
                {col.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] transition block py-1"
                      onClick={onClose}
                    >
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

  return (
    <>
      {/* Mobile menu overlay - dark background when menu is open */}
      <div
        className={`fixed top-0 left-0 z-20 h-full w-full bg-[#00000033] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu sidebar */}
      <div
        className={`fixed top-0 right-0 z-30 h-full w-[370px] max-w-[90vw] transform-gpu overflow-y-auto bg-white px-[10px] py-5 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Mobile menu header with logo and close button */}
        <div className="flex items-center justify-between rounded-md px-[20px]">
          <Link href="/" onClick={onClose} aria-label="Go to homepage">
            <Image
              alt="ژاکت"
              width={60}
              height={43}
              priority
              className="min-h-[31px] min-w-[44px]"
              src="/images/logo.svg"
            />
          </Link>

          <button
            data-cy="menu-close-button"
            className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg text-white transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs hover:bg-secondary/80 h-[33px] w-[33px] bg-[#F7F8F9]"
            type="button"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              color="#878F9B"
              height="20"
              className=""
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z" />
            </svg>
          </button>
        </div>

        {/* Search bar inside mobile menu */}
        <div className="mt-4 px-[21px]">
          <div className="flex items-center rounded-md bg-[#F9FAFC] px-4 h-12 w-full">
            <input
              className="flex-1 bg-transparent text-sm text-[#76767C] outline-none"
              placeholder="جستجو در ژاکت"
              type="search"
            />
            <IoSearchOutline className="cursor-pointer" color="#878F9B" size={24} />
          </div>
        </div>

        {/* Mobile menu categories with accordion functionality */}
        <div className="mt-6 flex w-full flex-col gap-[15px] rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]" data-cy="menu-container">
          {mainTabs.map((tab) => (
            <div key={tab.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <button
                className="cursor-pointer flex w-full items-center justify-between py-2"
                data-cy="stylish-accordion-button"
                type="button"
                onClick={() => toggleAccordion(tab.id)}
                aria-expanded={openAccordions[tab.id] || false}
                aria-controls={`accordion-content-${tab.id}`}
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
                id={`accordion-content-${tab.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordions[tab.id] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
              >
                {openAccordions[tab.id] && renderAccordionContent(tab.id)}
              </div>
            </div>
          ))}
        </div>

        {/* Static navigation links */}
        <div className="flex justify-center flex-col items-start gap-6 p-[20px]" data-cy="menu-container">
          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link href="/blog" onClick={onClose}>بلاگ</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link rel="nofollow" href="/academy" onClick={onClose}>ژاکت آکادمی</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full">
            <Link rel="nofollow" href="/service" onClick={onClose}>ژاکت سرویس</Link>
          </p>

          <p className="transition duration-300 text-base leading-7 text-[#5B5C60] font-medium">
            <Link rel="follow" href="/ready-site" onClick={onClose}>سایت آماده</Link>
          </p>
        </div>
      </div>
    </>
  );
}
