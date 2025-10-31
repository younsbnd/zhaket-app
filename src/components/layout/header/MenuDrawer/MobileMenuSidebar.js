"use client";

// React imports
import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

// Icon imports
import { AiOutlineClose } from "react-icons/ai";
import { FiPlus, FiMinus } from "react-icons/fi";

// API imports
import { fetcher } from "@/lib/api/fetcher";
 

/**
 * MobileMenuSidebar Component
 * Renders a mobile sidebar menu with dynamic navigation from database
 * @param {boolean} isOpen - Controls sidebar visibility
 * @param {function} onClose - Handler to close the sidebar
 * @returns {JSX.Element} Mobile sidebar menu component
 */
export default function MobileMenuSidebar({ isOpen, onClose }) {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [megaMenuItems, setMegaMenuItems] = useState([]);
  const [headerMenuItems, setHeaderMenuItems] = useState([]);

  // Fetch menu data dynamically
  const { data: menusResponse, isLoading: isLoadingMenus, error: menuError } = useSWR(
    "/api/admin/menu",
    fetcher,
  );

  // Process dynamic menu data
  useEffect(() => {
    if (menusResponse?.data && Array.isArray(menusResponse.data)) {
      let megaItems = [];
      let headerItems = [];
      
      // First, add mega menu children as top-level items (دسته‌بندی‌ها)
      const megaMenus = menusResponse.data.filter(menu => menu.menuType === 'mega-menu');
      megaMenus.forEach(megaMenu => {
        if (megaMenu.children && megaMenu.children.length > 0) {
          megaMenu.children.toReversed().forEach(child => {
            megaItems.push({
              _id: child._id,
              label: child.name,
              href: child.path,
              icon: child.icon,
              menuType: 'mega-child',
              children: (child.children || []).toReversed().map(subChild => ({
                _id: subChild._id,
                label: subChild.name,
                href: subChild.path
              }))
            });
          });
        }
      });
      
      // Then, add regular header menus at the bottom
      const headerMenus = menusResponse.data.filter(menu => menu.menuType === 'header-menu');
      headerMenus.forEach(menu => {
        headerItems.push({
          _id: menu._id,
          label: menu.name,
          href: menu.path,
          icon: menu.icon,
          menuType: menu.menuType,
          children: (menu.children || []).toReversed().map(child => ({
            _id: child._id,
            label: child.name,
            href: child.path,
            children: (child.children || []).toReversed().map(subChild => ({
              _id: subChild._id,
              label: subChild.name,
              href: subChild.path
            }))
          }))
        });
      });

      setMegaMenuItems(megaItems);
      setHeaderMenuItems(headerItems);
    }
  }, [menusResponse]);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

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

  return (
    <>
      {/* Mobile menu overlay - dark background when menu is open */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full bg-[#00000033] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        onKeyDown={(e) => handleKeyDown(e, onClose)}
        aria-hidden="true"
        role="presentation"
      />

      {/* Mobile menu sidebar */}
      <aside
        className={`fixed top-0 right-0 z-60 h-full w-[370px] max-w-[90vw] transform-gpu overflow-y-auto bg-white px-[10px] py-5 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Mobile menu header with logo and close button */}
        <header className="flex items-center justify-between rounded-md px-[20px] mb-6">
          <Link
            href="/"
            onClick={onClose}
            aria-label="Go to homepage"
            className="rounded-lg"
          >
            <Image
              alt="ژاکت logo"
              width={60}
              height={60}
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
            className="cursor-pointer flex items-center justify-center rounded-lg bg-[#F7F8F9] text-[#5B5C60] hover:bg-[#EDEEEF] transition-colors duration-300 px-2 py-2 h-[33px] w-[33px]"
          >
            <AiOutlineClose size={18} />
          </button>
        </header>

        {/* Dynamic menu items */}
        {isLoadingMenus ? (
          <div className="mt-6 flex w-full flex-col gap-[18px] rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Mega Menu Items - با بک‌گراند خاکستری */}
            {megaMenuItems.length > 0 && (
              <nav className="mt-6 flex w-full flex-col gap-6 rounded-[10px] bg-[#F9FAFC] p-2 px-[21px] py-[28px]" data-cy="mega-menu-container" aria-label="Mega menu navigation">
                {megaMenuItems.toReversed().map((menu) => {
                  const menuId = `mega-${menu._id}`;
                  const hasChildren = Array.isArray(menu.children) && menu.children.length > 0;
                  const isExpanded = !!expandedMenus[menuId];

                  return (
                    <div key={menu._id}>
                      <button
                        className="cursor-pointer flex w-full items-center justify-between mb-1"
                        type="button"
                        onClick={() => {
                          if (hasChildren) {
                            toggleMenu(menuId);
                          } else if (menu.href) {
                            onClose();
                          }
                        }}
                      >
                        <div className="flex items-center justify-start gap-[10px]">
                          <Link href={menu.href || "#"} onClick={onClose}>
                            <p className="transition duration-300 text-base leading-7 text-[#5B5C60]">
                              {menu.label}
                            </p>
                          </Link>
                        </div>
                        {hasChildren ? (
                          <span className="max-h-4 max-w-4 text-[#878F9B]">
                            {isExpanded ? <FiMinus size={15} /> : <FiPlus size={15} />}
                          </span>
                        ) : null}
                      </button>

                      {hasChildren && isExpanded ? (
                        <div className="rounded-md shadow-sm bg-white mt-3 space-y-2 p-2">
                          {menu.children.map((child) => (
                            <Link
                              key={child._id}
                              href={child.href}
                              onClick={onClose}
                              className="block rounded-lg bg-white px-3 py-2 text-[13px] text-[#5F6274] hover:text-[#FF9606] duration-200"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            )}

            {/* Header Menu Items - با بک‌گراند سفید */}
            {headerMenuItems.length > 0 && (
              <nav className="mt-6 flex w-full flex-col gap-6 rounded-[10px] bg-white p-2 px-[21px] py-[28px]" data-cy="header-menu-container" aria-label="Header menu navigation">
                {headerMenuItems.map((menu) => {
                  const menuId = `header-${menu._id}`;
                  const hasChildren = Array.isArray(menu.children) && menu.children.length > 0;
                  const isExpanded = !!expandedMenus[menuId];

                  return (
                    <div key={menu._id}>
                      <button
                        className="cursor-pointer flex w-full items-center justify-between mb-1"
                        type="button"
                        onClick={() => {
                          if (hasChildren) {
                            toggleMenu(menuId);
                          } else if (menu.href) {
                            onClose();
                          }
                        }}
                      >
                        <div className="flex items-center justify-start gap-[10px]">
                          <Link href={menu.href || "#"} onClick={onClose}>
                            <p className="transition duration-300 text-base leading-7 text-[#5B5C60]">
                              {menu.label}
                            </p>
                          </Link>
                        </div>
                        {hasChildren ? (
                          <span className="max-h-4 max-w-4 text-[#878F9B]">
                            {isExpanded ? <FiMinus size={15} /> : <FiPlus size={15} />}
                          </span>
                        ) : null}
                      </button>

                      {hasChildren && isExpanded ? (
                        <div className="rounded-md shadow-sm bg-white mt-3 space-y-2 p-2">
                          {menu.children.map((child) => {
                            const childId = `child-${child._id}`;
                            const hasSubChildren = Array.isArray(child.children) && child.children.length > 0;
                            const isChildExpanded = !!expandedMenus[childId];

                            return (
                              <div key={child._id}>
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={child.href}
                                    onClick={onClose}
                                    className="flex flex-row rounded-lg bg-white px-3 py-2 text-[13px] text-[#5F6274] hover:text-[#FF9606] duration-200 flex-1"
                                  >
                                    {child.label}
                                  </Link>
                                  {hasSubChildren && (
                                    <button
                                      onClick={() => toggleMenu(childId)}
                                      className="px-2 py-1 text-[#878F9B]"
                                    >
                                      {isChildExpanded ? <FiMinus size={12} /> : <FiPlus size={12} />}
                                    </button>
                                  )}
                                </div>
                                
                                {hasSubChildren && isChildExpanded && (
                                  <div className="ml-4 mt-2 space-y-2">
                                    {child.children.map((subChild) => (
                                      <Link
                                        key={subChild._id}
                                        href={subChild.href}
                                        onClick={onClose}
                                        className="block rounded-lg bg-gray-50 px-3 py-2 text-[12px] text-[#5F6274] hover:text-[#FF9606] duration-200"
                                      >
                                        {subChild.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            )}
          </>
        )}
      </aside>
    </>
  );
}
