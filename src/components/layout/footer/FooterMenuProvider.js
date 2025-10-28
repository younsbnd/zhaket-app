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

  // Build hierarchical structure for footer menus
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

  // Process footer menu data
  const hierarchicalMenus = menusResponse?.data ? buildHierarchicalStructure(menusResponse.data) : [];
  const activeMenus = hierarchicalMenus.filter(menu => menu.isActive);
  
  // Footer menus - parent menus without children should be titles
  const footerMenus = activeMenus.filter(menu => menu.menuType === 'footer-menu');
  
  // Group footer menus by parent (titles)
  const groupedFooterMenus = footerMenus.reduce((acc, menu) => {
    if (!menu.parent) {
      // This is a title menu
      acc[menu._id] = {
        title: menu.name,
        links: (menu.children || []).toReversed().map(child => ({
          label: child.name,
          href: child.path || '#',
          target: child.target || '_self'
        }))
      };
    }
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
