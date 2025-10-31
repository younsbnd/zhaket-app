"use client";

import React from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/api/fetcher";

/**
 * FooterMenuProvider Component
 * 
 * Handles fetching and processing footer menus from database with the following features:
 * - Fetches menu data using SWR for caching and revalidation
 * - Builds hierarchical menu structure from flat menu data
 * - Filters active footer menus only
 * - Converts menu children to proper link format for components
 * - Provides fallback links if no database menus are found
 * 
 * @param {Object} props - Component props
 * @param {Function} props.children - Render prop function that receives processed data
 * @param {Array} props.fallbackLinks - Fallback links if no database menus are found
 * @returns {JSX.Element} Rendered children with processed menu data
 */
export default function FooterMenuProvider({ children, fallbackLinks }) {
  // Fetch menus from database
  const { data: menusResponse, isLoading: isLoadingMenus, error: menuError } = useSWR(
    "/api/admin/menu",
    fetcher,
  );

  // Process footer menu data - children are already embedded
  const allMenus = menusResponse?.data || [];
  
  // Footer menus - filter only footer-menu type
  const footerMenus = allMenus.filter(menu => menu.menuType === 'footer-menu');
  
  // Group footer menus - children are embedded
  const groupedFooterMenus = footerMenus.reverse().reduce((acc, menu) => {
    acc[menu._id] = {
      title: menu.name,
      links: (menu.children || []).toReversed().map(child => ({
        label: child.name,
        href: child.path || '#'
      }))
    };
    return acc;
  }, {});

  // Prepare final footer links
  const finalFooterLinks = Object.keys(groupedFooterMenus).length > 0 
    ? Object.values(groupedFooterMenus) 
    : fallbackLinks;

  // Pass processed data to children
  return children({
    footerLinks: finalFooterLinks,
    isLoading: isLoadingMenus,
    error: menuError,
    groupedFooterMenus
  });
}
