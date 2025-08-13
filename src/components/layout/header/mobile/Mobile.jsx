"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  academyMenu,
  categories,
  servicesMenu,
} from "../../../../constants/headerData";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Link from "next/link";
import Academy from "../desktop/Academy";
import Image from "next/image";

const categoryListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categoryItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const submenuListVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05 },
  },
};

const submenuItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <div className='lg:hidden flex fixed top-0 left-0 right-0'>
      {/* Burger Button */}
      <div
        className={`burger-container fixed top-[30px] right-[20px] w-[30px] h-[24px] cursor-pointer z-[100] flex flex-col justify-between ${
          menuOpen ? "open" : ""
        }`}
        onClick={() => setMenuOpen(!menuOpen)}
        role='button'
        tabIndex={0}
        aria-label='Toggle menu'
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && setMenuOpen(!menuOpen)
        }>
        <div className='burger w-full h-[4px] bg-gray-800 rounded transition-all duration-400 origin-center' />
        <div className='burger w-full h-[4px] bg-gray-800 rounded transition-all duration-400 origin-center' />
        <div className='burger w-full h-[4px] bg-gray-800 rounded transition-all duration-400 origin-center' />
      </div>

      {/* Fullscreen Menu */}
      <header
        className={`fixed top-0 left-0 w-screen h-screen max-h-screen overflow-y-auto hide-scrollbar bg-white/95 transform transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] flex justify-start z-[90] pt-12 px-4 ${
          menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        }`}>
        <nav className='w-full'>
          <AnimatePresence>
            {menuOpen && (
              <motion.ul
                className='w-full'
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={categoryListVariants}>
                <motion.li className='w-full flex items-center justify-end my-3'>
                  <Image
                    src={"/logo.svg"}
                    width={60}
                    height={60}
                    className='object-cover'
                    alt='logo'
                  />
                </motion.li>
                {categories.map((item, index) => (
                  <motion.li
                    key={item.id || index}
                    variants={categoryItemVariants}
                    className='py-3 my-5'>
                    <div
                      className='flex items-center justify-between w-full'
                      onClick={() => toggleSubmenu(index)}>
                      <span className='font-semibold flex items-center gap-2 text-zhaket-secondary/70 text-xl select-none'>
                        <span
                          className={`text-2xl ml-1.5 ${
                            item.title === "محیوب ترین" && "text-zhaket-primary"
                          }`}>
                          {" "}
                          {item.icon && item.icon}
                        </span>
                        {item.title}
                      </span>
                      {item.subcategories?.length > 0 && (
                        <button
                          className='p-1 flex items-center justify-center'
                          aria-expanded={openSubmenu === index}
                          aria-controls={`submenu-${index}`}>
                          <span className='relative block w-4 h-4'>
                            {/* Horizontal line */}
                            <span
                              className={`absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300 ease-in-out`}
                            />
                            {/* Vertical line */}
                            <span
                              className={`absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300 ease-in-out ${
                                openSubmenu === index
                                  ? "scale-x-0"
                                  : "rotate-90"
                              }`}
                            />
                          </span>
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    <AnimatePresence initial={false}>
                      {openSubmenu === index && item.subcategories && (
                        <motion.ul
                          key={`submenu-${index}`}
                          id={`submenu-${index}`}
                          initial='hidden'
                          animate='visible'
                          exit='hidden'
                          variants={submenuListVariants}
                          className='overflow-hidden mb-10 my-3'>
                          {item.subcategories.map((subItem, subIndex) => (
                            <motion.li
                              key={subItem.id || subIndex}
                              variants={submenuItemVariants}
                              className='my-1.5'>
                              <Link
                                href={subItem.url || "#"}
                                className='block text-gray-700 hover:text-primary transition-colors py-3'
                                onClick={() => setMenuOpen(false)}>
                                {subItem.title}
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </motion.li>
                ))}
                <motion.li
                  variants={categoryListVariants}
                  className='py-3 my-2 font-semibold flex items-center gap-2 text-zhaket-secondary/70 text-xl'>
                  وبلاگ
                </motion.li>
                <motion.li
                  variants={categoryListVariants}
                  className=' py-3 my-2'>
                  <Academy academyMenu={academyMenu} title={"اکادمی"} />
                </motion.li>
                <motion.li
                  variants={categoryListVariants}
                  className=' py-3 my-2'>
                  <Academy academyMenu={servicesMenu} title={"خدمات"} />
                </motion.li>
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </div>
  );
}
