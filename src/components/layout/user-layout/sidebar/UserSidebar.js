"use client";

import { useState } from 'react';
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
          {dropdownItems.map((item) => (
            <div key={item.key} className="group">
              <button
                onClick={() => toggleDropdown(item.key)}
                className={`flex items-center w-full text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium group transition-all duration-200 justify-between px-5 py-3`}
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <span className="text-sm">{item.title}</span> {/* Make dropdown menu text smaller */}
                </div>
                <HiChevronDown
                  className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${openDropdowns[item.key] ? 'rotate-180' : ''
                    }`}
                />
              </button>

              {/* Dropdown Content */}
              {openDropdowns[item.key] && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child, childIndex) => (
                    <Link
                      key={childIndex}
                      href={child.href}
                      className={`block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-orange-500 rounded-lg transition-colors ${isActive(child.href) ? 'bg-orange-50 text-orange-600 font-medium' : ''
                        }`}
                    >
                      {child.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default UserSidebar;
