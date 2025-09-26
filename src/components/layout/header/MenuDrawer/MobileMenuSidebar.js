"use client";

// React imports
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

// Icon imports
import { FcExpand, FcNext } from "react-icons/fc";
import { AiOutlineClose } from "react-icons/ai";

// Constants imports
import { POPULAR_PLUGINS, POPULAR_THEMES, TAB_CONTENT } from "@/constants/header/mainMenuData";
import { mainTabs } from "@/constants/header/mobileMenuData";

/**
 * MobileMenuSidebar Component
 * Renders a mobile sidebar menu with accordion functionality for navigation categories
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {function} onClose - Handler to close the sidebar
 * @returns {JSX.Element} Mobile sidebar menu component
 */
export default function MobileMenuSidebar({ isOpen, onClose }) {
  const [openAccordions, setOpenAccordions] = useState({});

  // Toggle accordion state for menu items with useCallback for performance
  const toggleAccordion = useCallback((id) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback((event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  // Render content for accordion sections
  const renderAccordionContent = useCallback((tabId) => {
    if (tabId === "most-popular") {
      return (
        <div className="px-2 py-1 bg-white rounded-md mt-2 shadow-sm">
          <div className="grid grid-cols-1 gap-4">
            {/* Popular themes section */}
            <nav aria-label="Popular themes">
              <ul className="space-y-2">
                {POPULAR_THEMES.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] transition-colors duration-200 block py-1 rounded"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Popular plugins section */}
            <nav aria-label="Popular plugins">
              <ul className="space-y-2">
                {POPULAR_PLUGINS.slice(0, 4).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] transition-colors duration-200 block py-1 rounded"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
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
            <nav key={idx} aria-label={`Category section ${idx + 1}`}>
              <ul className="space-y-2">
                {col.slice(0, 5).map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-sm text-[#76767C] hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] transition-colors duration-200 block py-1 rounded"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
    );
  }, [onClose]);

  return (
    <>
      {/* Mobile menu overlay - dark background when menu is open */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full bg-[#00000033] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
        onKeyDown={(e) => handleKeyDown(e, onClose)}
        aria-hidden="true"
        role="presentation"
      />

      {/* Mobile menu sidebar */}
      <aside
        className={`fixed top-0 right-0 z-60 h-full w-[370px] max-w-[90vw] transform-gpu overflow-y-auto bg-white px-[10px] py-5 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile menu header with logo and close button */}
        <header className="flex items-center justify-between rounded-md px-[20px]">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Go to homepage"
            className="focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded-lg"
          >
            <Image
              alt="ژاکت logo"
              width={60}
              height={60}
              priority
              className="w-[44px] h-auto object-contain"
              src="/images/logo.svg"
            />
          </Link>

          <button
            data-cy="menu-close-button"
            type="button"
            aria-label="Close mobile menu"
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            className="cursor-pointer flex items-center justify-center rounded-lg bg-[#F7F8F9] text-[#5B5C60] hover:bg-[#EDEEEF] focus:outline-none focus:ring-2 focus:ring-[#FF9606] transition-colors duration-300 px-2 py-2 h-[33px] w-[33px]"
          >
            <AiOutlineClose size={18} />
          </button>
        </header>

        {/* Mobile menu categories with accordion functionality */}
        <nav className="mt-6 flex w-full flex-col gap-[15px] rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]" data-cy="menu-container" aria-label="Main navigation">
          {mainTabs.map((tab) => (
            <div key={tab.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
              <button
                className="cursor-pointer flex w-full items-center justify-between py-2 focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded-lg"
                data-cy="stylish-accordion-button"
                type="button"
                onClick={() => toggleAccordion(tab.id)}
                onKeyDown={(e) => handleKeyDown(e, () => toggleAccordion(tab.id))}
                aria-expanded={openAccordions[tab.id] || false}
                aria-controls={`accordion-content-${tab.id}`}
              >
                <div className="flex items-center justify-start gap-[10px]">
                  <span className="flex-shrink-0" aria-hidden="true">
                    {tab.mobileIcon}
                  </span>
                  <span className="transition-colors duration-300 text-base leading-7 text-[#5B5C60] font-medium">
                    {tab.label}
                  </span>
                </div>
                <span className="max-h-4 max-w-4 flex-shrink-0" aria-hidden="true">
                  {openAccordions[tab.id] ? <FcNext /> : <FcExpand />}
                </span>
              </button>

              {/* Expandable accordion content */}
              <div
                id={`accordion-content-${tab.id}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${openAccordions[tab.id] ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
                  }`}
                aria-hidden={!openAccordions[tab.id]}
              >
                {openAccordions[tab.id] && renderAccordionContent(tab.id)}
              </div>
            </div>
          ))}
        </nav>

        {/* Static navigation links */}
        <nav className="flex justify-center flex-col items-start gap-6 p-[20px]" data-cy="menu-container" aria-label="Additional navigation">
          <Link
            href="/blog"
            onClick={onClose}
            className="transition-colors duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded"
          >
            بلاگ
          </Link>

          <Link
            rel="nofollow"
            href="/academy"
            onClick={onClose}
            className="transition-colors duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded"
          >
            ژاکت آکادمی
          </Link>

          <Link
            rel="nofollow"
            href="/service"
            onClick={onClose}
            className="transition-colors duration-300 text-base leading-7 text-[#5B5C60] font-medium border-b border-gray-100 pb-2 w-full hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded"
          >
            ژاکت سرویس
          </Link>

          <Link
            rel="follow"
            href="/ready-site"
            onClick={onClose}
            className="transition-colors duration-300 text-base leading-7 text-[#5B5C60] font-medium hover:text-[#FF9606] focus:text-[#FF9606] focus:outline-none focus:ring-2 focus:ring-[#FF9606] rounded"
          >
            سایت آماده
          </Link>
        </nav>
      </aside>
    </>
  );
}
