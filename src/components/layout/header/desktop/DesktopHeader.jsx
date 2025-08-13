"use client";

import { useEffect, useRef, useState } from "react";
import { FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";
import {
  academyMenu,
  categories,
  servicesMenu,
} from "../../../../constants/headerData";
import Link from "next/link";
import MegaMenuDropdown from "./MegaMenuDropdown";
import Academy from "./Academy";
import Image from "next/image";
import Search from "../search/Search";
import BurgerMenu from "../mobile/Mobile";

export default function DesktopHeader() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const [search, setSearch] = useState(false);
  const searchRef = useRef(null);
  // Close search on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearch(false);
      }
    }
    if (search) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [search]);
  return (
    <header
      dir='rtl'
      className='relative top-0 z-50 lg:px-10 lg:py-5 md:px-5 px-1 py-2 bg-white w-full shadow-md select-none'>
      {/* Main header */}
      <div className='flex items-center justify-between px-6 py-3'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <BurgerMenu />

          <Link href='/' className='lg:mr-0 mr-10'>
            <Image
              src={"/logo.svg"}
              alt='Zhaket Logo'
              width={60}
              height={60}
              className='object-cover sm:w-16 w-11'
            />
          </Link>
        </div>

        <MegaMenuDropdown categories={categories} />
        {/* Categories mega menu + search */}
        <div className='flex-1 mx-8 hidden lg:flex items-center gap-8'>
          <nav className='relative' onMouseLeave={() => setOpenMenuIndex(null)}>
            <ul className='flex items-center gap-4'>
              <li>
                <Link
                  href='#'
                  className='text-sm font-medium text-zhaket-text/70'>
                  بلاگ
                </Link>
              </li>
              <li className=''>
                <Academy academyMenu={academyMenu} title={"اکادمی"} />
              </li>
              <li>
                <Academy academyMenu={servicesMenu} title={"خدمات"} />
              </li>
              <li>
                <Link
                  href='#'
                  className='text-sm text-zhaket-text/70 font-medium'>
                  سایت اماده
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {search && (
          <div ref={searchRef} className='0'>
            <Search onClose={() => setSearch((prev) => !prev)} />
          </div>
        )}

        {/* Right action buttons */}
        <div className='flex items-center md:gap-2 gap-1.5'>
          <div
            onClick={() => setSearch((prev) => !prev)}
            className='flex items-center lg:ml-10 md:ml-3 gap-2 md:border border-zhaket-secondary/30 py-1.5 md:px-3 rounded-md transition-all text-zhaket-text/70 hover:border-none hover:text-zhaket-primary cursor-pointer'>
            <FiSearch className='text-xl' />
          </div>
          <button className='relative text-zhaket-text/70 inline-flex items-center gap-2 px-3 py-2 rounded-md'>
            <FiShoppingCart className='text-xl' />
            <span className='absolute -top-1 -right-0 bg-zhaket-cta text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center'>
              3
            </span>
          </button>
          <Link
            href='#'
            className='flex items-center gap-2 md:px-3 py-2 text-zhaket-text/70 rounded-md text-sm'>
            <FiUser className='text-xl' />
            <span className='text-sm md:flex hidden'>ورود / ثبت‌نام</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
