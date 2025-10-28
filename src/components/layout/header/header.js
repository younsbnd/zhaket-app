"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

 

import {
  addToast,
  Badge,
} from "@heroui/react";

import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useSession } from "next-auth/react";
import useSWR from "swr";

import { fetcher } from "@/lib/api/fetcher";
import UserMenu from "./UserMenuPopover";
import MobileHeader from "./MenuDrawer/MobileHeader";
import AuthButton from "./MenuDrawer/AuthButton";
import HeaderSkeletons from "@/components/skeletons/layout/header/HeaderSkeletons";
 
 import NavigationMenu from "./NavigationMenu";
 
 
 
import CascadingMenu from "./CascadingMenu";
import SearchModal from "./searchbox/Searchbox.js";
import { useSettings } from "@/contexts/SettingsContext";
import { useCartStore } from "@/stores/useCartStore";
 

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  // State for tracking the active tab in the categories dropdown
  const [activeTab, setActiveTab] = useState("");
  // State for controlling the categories popover visibility
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  // State for controlling the search modal visibility
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // State for tracking active mega menu tab
  const [activeMegaMenuTab, setActiveMegaMenuTab] = useState({});
  // Session data from NextAuth
  const { data: session, status } = useSession();
  // Get settings from context
  const { settings } = useSettings();
  const logoUrl = settings?.logoUrl || "/images/logo.svg";

  const { items: cartItems } = useCartStore();

  // Fetch menus using SWR (like other components in the project)
  const { data: menusResponse, isLoading: isLoadingMenus, error: menuError } = useSWR(
    "/api/admin/menu",
    fetcher,

  );

  // Build hierarchical structure
  const buildHierarchicalStructure = (flatMenus) => {
    const menuMap = new Map();

    flatMenus.forEach(menu => {
      menuMap.set(menu._id.toString(), { ...menu, children: [] });
    });

    const rootMenus = [];

    flatMenus.forEach(menu => {
      if (menu.parent) {
        const parent = menuMap.get(menu.parent._id.toString());
        if (parent) {
          parent.children.push(menuMap.get(menu._id.toString()));
        }
      } else {
        rootMenus.push(menuMap.get(menu._id.toString()));
      }
    });

    return rootMenus;
  };
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
  // Process menu data
  const hierarchicalMenus = menusResponse?.data ? buildHierarchicalStructure(menusResponse.data) : [];
  const activeMenus = hierarchicalMenus.filter(menu => menu.isActive);

  // Separate main menus and mega menus
  const mainMenus = activeMenus.filter(menu => !menu.parent && (menu.menuType === 'header-menu' || menu.menuType === 'mega-menu' || !menu.menuType));
  const megaMenus = activeMenus.filter(menu => menu.menuType === 'mega-menu');
  
  // Footer menus - parent menus without children should be titles
  const footerMenus = activeMenus.filter(menu => menu.menuType === 'footer-menu');



  // Set activeTab to first parent mega menu with children when megaMenus are loaded
  useEffect(() => {
    if (megaMenus.length > 0 && !activeTab) {
      // Find first parent mega menu with children
      let firstParentMegaMenu = megaMenus.find(menu => !menu.parent && menu.children && menu.children.length > 0);
      if (firstParentMegaMenu) {
        setActiveTab(firstParentMegaMenu._id);
      }
    }
  }, [megaMenus, activeTab]);


  // Default menus fallback

  // Show loading skeleton while session is being fetched and avoid rendering skeleton for static header  
  if (status === "loading") {
    return <HeaderSkeletons />;
  }

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
            />
          </Link>

          {/* Main Navigation - visible on tablet and desktop */}
          <nav className="hidden md:flex items-center gap-[20px] xl:gap-[35px]">
 

            {/* Dynamic Menu from Database */}
            {isLoadingMenus ? (
              <HeaderSkeletons />
            ) : menuError ? (
              addToast({
                description:"خطا در بارگذاری منوها",
                color: "danger",
                shouldShowTimeoutProgress: true,
              })
            ) : mainMenus.length > 0 ? (
              <NavigationMenu
                mainMenus={mainMenus}
                activeMegaMenuTab={activeMegaMenuTab}
                setActiveMegaMenuTab={setActiveMegaMenuTab}
              />
            ) : null}
 
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