"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HiX } from 'react-icons/hi';
import { HiChevronDown } from 'react-icons/hi2';
import Image from 'next/image';
import { dropdownItems, USER_NAVIGATION } from '@/constants/userNavigation';

const MobileSidebar = ({ isOpen, onClose }) => {
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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="lg:hidden fixed inset-0 bg-black/30 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`lg:hidden fixed right-0 top-0 h-screen w-[280px] bg-white shadow-[0px_0px_45px_0px_#7E899B1A] z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        {/* Header */}
        <div className="flex items-center h-[80px] p-4 border-b border-gray-100 justify-between">
          <Image width={50} height={36} className="w-[50px] h-[36px] object-contain" src="/images/logo.svg" alt="zhaket logo" />
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <HiX className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-2">
          <nav className="space-y-1 py-2">
            {/* Regular Menu Items */}
            {USER_NAVIGATION.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium group relative transition-all duration-200 px-4 py-3 ${isActive(item.path)
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
                <span className="text-sm">{item.title}</span>
              </Link>
            ))}

            {/* Dropdown Menu Items */}
            {dropdownItems.map((item) => (
              <div key={item.key} className="group">
                <button
                  onClick={() => toggleDropdown(item.key)}
                  className="flex items-center w-full text-gray-700 hover:bg-gray-50 hover:text-orange-500 rounded-lg font-medium group transition-all duration-200 justify-between px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm">{item.title}</span>
                  </div>
                  <HiChevronDown
                    className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${openDropdowns[item.key] ? 'rotate-180' : ''
                      }`}
                  />
                </button>

                {/* Dropdown Content */}
                {openDropdowns[item.key] && (
                  <div className="ml-6 mt-1 space-y-1">
                    {item.children.map((child, childIndex) => (
                      <Link
                        key={childIndex}
                        href={child.href}
                        onClick={onClose}
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
    </>
  );
};

export default MobileSidebar;
