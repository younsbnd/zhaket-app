"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../../../../constants/headerData";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Link from "next/link";

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
    <div className='lg:hidden flex'>
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
                {categories.map((item, index) => (
                  <motion.li
                    key={item.id || index}
                    variants={categoryItemVariants}
                    className='border-b border-gray-200 py-3 my-5'>
                    <div
                      className='flex items-center justify-between w-full'
                      onClick={() => toggleSubmenu(index)}>
                      <span className='font-semibold flex items-center gap-2 text-zhaket-secondary text-xl select-none'>
                        {item.icon && item.icon}
                        {item.title}
                      </span>
                      {item.subcategories?.length > 0 && (
                        <button
                          className='p-1'
                          aria-expanded={openSubmenu === index}
                          aria-controls={`submenu-${index}`}>
                          {openSubmenu === index ? (
                            <BiChevronUp className='h-6 w-6' />
                          ) : (
                            <BiChevronDown className='h-6 w-6' />
                          )}
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
                          className='overflow-hidden grid grid-cols-2 mb-10'>
                          {item.subcategories.map((subItem, subIndex) => (
                            <motion.li
                              key={subItem.id || subIndex}
                              variants={submenuItemVariants}
                              className='my-1.5'>
                              <Link
                                href={subItem.url || "#"}
                                className='block text-gray-700 hover:text-primary transition-colors'
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
              </motion.ul>
            )}
          </AnimatePresence>
        </nav>
      </header>
    </div>
  );
}
