"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiChevronDown } from 'react-icons/hi2';
import Image from 'next/image';
import { dropdownItems, USER_NAVIGATION } from '@/constants/userNavigation';

const UserSidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    support: false,
    settings: false
  });
  const pathname = usePathname();

  // Check if any child of a dropdown is active
  const isDropdownActive = (children) => {
    return children.some(child => pathname === child.href);
  };

  // Auto-open dropdown if any of its children is active
  useEffect(() => {
    const checkAndOpenDropdowns = () => {
      const newOpenState = {};
      dropdownItems.forEach(item => {
        const hasActiveChild = item.children.some(child => pathname === child.href);
        if (hasActiveChild) {
          newOpenState[item.key] = true;
        }
      });
      if (Object.keys(newOpenState).length > 0) {
        setOpenDropdowns(prev => ({ ...prev, ...newOpenState }));
      }
    };
    
    checkAndOpenDropdowns();
  }, [pathname]);

  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  const isActive = (href) => pathname === href;

  return (
    <div className="fixed right-0 top-0 h-screen w-[350px] bg-white shadow-[0px_0px_45px_0px_#7E899B1A] z-50 transition-all duration-300 flex flex-col">
      {/* Header */}
      <div className="flex items-center h-[100px] p-5 border-b border-gray-100 justify-between">
        <Image width={60} height={43} className="w-[60px] h-[43px] object-contain" src="/images/logo.svg" alt="zhaket logo" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2">
        <nav className=" lg:space-y-1 xl:space-y-2  py-4">

          {/* Regular Menu Items */}
          {USER_NAVIGATION.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`flex items-center gap-4 text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium group relative transition-all duration-200 px-5 py-3 ${isActive(item.path)
                ? 'bg-orange-50 text-orange-600 font-bold'
                : ''
                }`}
            >
              <div className="relative">
                {item.icon}
                {item.hasNotification && (
                  <div className="w-1.5 h-1.5 bg-red-500 border-white border rounded-full absolute -top-0.5 -left-0.5" />
                )}
              </div>
              <span className="text-sm">{item.title}</span> {/* Make menu text smaller */}
            </Link>
          ))}

          {/* Dropdown Menu Items */}
          {dropdownItems.map((item) => {
            const hasActiveChild = isDropdownActive(item.children);
            
            return (
              <div key={item.key} className="group">
                <button
                  onClick={() => toggleDropdown(item.key)}
                  className={`flex items-center w-full rounded-lg font-medium transition-all duration-200 cursor-pointer justify-between px-5 py-3 ${
                    hasActiveChild
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-orange-500'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={hasActiveChild ? 'text-orange-600' : 'text-gray-600'}>
                      {item.icon}
                    </div>
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <HiChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      openDropdowns[item.key] ? 'rotate-180' : ''
                    } ${hasActiveChild ? 'text-orange-400' : 'text-gray-300'}`}
                  />
                </button>

                {/* Dropdown Content */}
                {openDropdowns[item.key] && (
                  <div className="mt-2 mr-5 mb-2 border-r-2 border-gray-100">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        className={`flex items-center gap-3 px-4 py-2.5 mr-4 text-sm rounded-lg transition-all duration-200 group/item ${
                          isActive(child.href)
                            ? 'bg-gradient-to-l from-orange-50 to-transparent text-orange-600 font-semibold border-r-2 border-orange-500 -mr-[2px]'
                            : 'text-gray-600 hover:text-orange-500 hover:bg-gradient-to-l hover:from-orange-50/50 hover:to-transparent'
                        }`}
                      >
                        {/* Dot indicator */}
                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                          isActive(child.href)
                            ? 'bg-orange-500 scale-125'
                            : 'bg-gray-300 group-hover/item:bg-orange-400'
                        }`} />
                        <span>{child.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default UserSidebar;
