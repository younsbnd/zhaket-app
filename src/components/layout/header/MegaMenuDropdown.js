"use client";

import React from "react";
import Link from "next/link";
import { TbCategory } from "react-icons/tb";
import Image from "next/image";

/**
 * MegaMenuDropdown Component
 * Displays the mega menu dropdown with left sidebar categories and right content
 * 
 * @param {Object} menu - The menu object with children
 * @param {Object} activeMegaMenuTab - State for tracking active tab
 * @param {Function} setActiveMegaMenuTab - Function to update active tab
 */
export default function MegaMenuDropdown({ menu, activeMegaMenuTab, setActiveMegaMenuTab }) {
  return (
    <div className="absolute top-full right-0 mt-1 bg-white rounded-[10px] shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-[95vw] max-w-[1200px]">
      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Left Sidebar - Categories List */}
        <div className="bg-[#F9FAFC] rounded-[10px] md:w-[190px] lg:w-[300px] xl:w-[320px] p-[8px] flex-shrink-0">
          <ul className="space-y-2">
            {menu.children.toReversed().map((child, index) => {
              const isActive = activeMegaMenuTab[menu._id] === child._id || (index === 0 && !activeMegaMenuTab[menu._id]);
              return (
                <li key={child._id}>
                  <div
                    onMouseEnter={() => setActiveMegaMenuTab(prev => ({ ...prev, [menu._id]: child._id }))}
                    className={`flex items-center relative justify-start gap-3 rounded-md px-[15px] xl:px-[19px] py-4 xl:py-5 hover:bg-white hover:shadow-[0px_2px_8px_0px_rgba(73,75,84,0.05)] cursor-pointer transition-all duration-200 ${isActive ? "bg-white shadow-sm text-[#FF9606]" : "text-[#5B5C60]"}`}
                  >
                    {/* Arrow indicator for active item */}
                    {isActive && (
                      <>
                        <div className="absolute bottom-[26px] left-[-8px] h-5 w-5 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-[#F9FAFC]"></div>
                        <div className="absolute bottom-[26px] left-[-12px] h-5 w-5 -translate-x-1/2 translate-y-1/2 rotate-45 transform bg-white"></div>
                      </>
                    )}
                    {/* Category Icon */}
                    {child.icon && Array.isArray(child.icon) ? (
                      child.icon.map((icon, iconIndex) => {
                        // Check if icon path is valid (not empty and not null)
                        if (icon && icon.trim() !== '') {
                          return (
                            <Image
                              key={`${child._id}-icon-${iconIndex}`}
                              src={`/${icon}`}
                              alt={icon}
                              width={20}
                              height={20}
                              className="w-[29px] h-[29px] object-contain"
                            />
                          );
                        }
                        return null;
                      })
                    ) : child.icon && typeof child.icon === 'string' && child.icon.trim() !== '' ? (
                      <Image
                        src={`/${child.icon}`}
                        alt={child.name}
                        width={20}
                        height={20}
                        className="w-[29px] h-[29px] object-contain"
                      />
                    ) : null}
                    {/* Category Name */}
                    <p className="transition duration-300 text-[15px]">
                      <Link href={child.path} target={child.target || '_self'}>
                        {child.name}
                      </Link>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 min-w-0">
          <div className="grid w-full grid-cols-3 p-[30px]">
            <div className="flex col-span-2 items-start justify-between">
              {(() => {
                const reversedChildren = menu.children.toReversed();
                const activeChildId = activeMegaMenuTab[menu._id] || reversedChildren[0]?._id;
                const activeChild = menu.children.find(child => child._id === activeChildId);

                if (!activeChild) return null;

                return (
                  <div className="w-full max-w-[270px] rounded-[10px] pr-[20px] pt-[15px]">

                    <ul className="space-y-3">
                      {activeChild.children?.toReversed().slice(0, 5).map(subChild => (
                        <li key={subChild._id}>
                          <div>
                            <p
                              onMouseEnter={() => setActiveMegaMenuTab(prev => ({ ...prev, [menu._id]: activeChild._id }))}
                              className="transition duration-300 text-sm leading-8 pb-3 text-[#76767C] hover:text-[#ff9606]"
                            >
                              <Link href={subChild.path} target={subChild.target || '_self'}>
                                {subChild.name}
                              </Link>
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
