"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaChevronDown } from "react-icons/fa";
import MegaMenuDropdown from "./MegaMenuDropdown";

/**
 * MenuItem Component
 * Individual menu item with dropdown functionality
 * 
 * @param {Object} menu - The menu object
 * @param {Object} activeMegaMenuTab - State for tracking active mega menu tab
 * @param {Function} setActiveMegaMenuTab - Function to update active mega menu tab
 */
function MenuItem({ menu, activeMegaMenuTab, setActiveMegaMenuTab }) {
  return (
    <div className="relative group">
      <div className="flex items-center gap-1">
        {/* Menu icon */}
        {menu.icon && menu.icon.trim() !== '' ? (
          <Image
            src={`/${menu.icon}`}
            alt={menu.name}
            width={20}
            height={20}
            className="w-[29px] h-[29px] object-contain"
          />
        ) : null}
        
        <Link
          href={menu.path}
          target={menu.target || '_self'}
          className="font-bold text-[15px] text-[#424244] hover:text-[#FF9606] transition-colors duration-200"
        >
          {menu.name}
        </Link>

        {/* Show dropdown arrow for menus with children */}
        {(menu.children?.length > 0) && (
          <FaChevronDown
            className="text-[#424244] group-hover:text-[#FF9606] group-hover:rotate-180 transition-all duration-300 ease-in-out"
            size={12}
            aria-hidden="true"
          />
          
        )}
      </div>

      {/* Show dropdown for menus with children */}
      {menu.children?.length > 0 && (
        menu.menuType === "mega-menu" ? (
          <MegaMenuDropdown
            menu={menu}
            activeMegaMenuTab={activeMegaMenuTab}
            setActiveMegaMenuTab={setActiveMegaMenuTab}
          />
        ) : (
          <div className="absolute top-full right-0 mt-1 bg-white rounded-[10px] shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[200px]">
            <div className="p-1">
              <ul className="space-y-1">
                {menu.children.toReversed().map(child => (
                  <li key={child._id}>
                    <Link
                      href={child.path}
                      target={child.target || '_self'}
                      className="block text-[14px] text-[#424244] hover:text-[#FF9606] transition-colors duration-200 py-2"
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      )}
    </div>
  );
}

/**
 * NavigationMenu Component
 * Main navigation menu with all menu items
 * 
 * @param {Object[]} mainMenus - Array of main menu items
 * @param {Object} activeMegaMenuTab - State for tracking active mega menu tab
 * @param {Function} setActiveMegaMenuTab - Function to update active mega menu tab
 */
export default function NavigationMenu({ mainMenus, activeMegaMenuTab, setActiveMegaMenuTab }) {
  return (
    <nav className="flex items-center gap-8" role="navigation" aria-label="Main navigation">
      {mainMenus.map(menu => (
        <MenuItem
          key={menu._id}
          menu={menu}
          activeMegaMenuTab={activeMegaMenuTab}
          setActiveMegaMenuTab={setActiveMegaMenuTab}
        />
      ))}
    </nav>
  );
}
