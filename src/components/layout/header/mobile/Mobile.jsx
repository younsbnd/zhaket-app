"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data";
import "./header.css";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import Link from "next/link";

const categoryListVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 }, // delay between categories
  },
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
    transition: {
      duration: 0.3,
      ease: "easeInOut",
      staggerChildren: 0.05, // delay between submenu items
    },
  },
};

const submenuItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
export default function BurgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track which submenu is open


  const toggleSubmenu = (index) => {
    setOpenSubmenu((prev) => (prev === index ? null : index));
  };

  return (
    <div className='lg:hidden flex'>
      {/* Burger button */}
      <div
        className={`burger-container ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label='Toggle menu'
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setMenuOpen(!menuOpen);
          }
        }}>
        <div className='burger' />
        <div className='burger' />
        <div className='burger' />
      </div>

      {/* Fullscreen menu */}
      <header className={`pt-12 px-4 header ${menuOpen ? "menu-opened" : ""}`}>
        <nav className='nav  w-full'>
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
                    className='border-b w-full border-gray-200 py-3 my-5'>
                    <div
                      className='flex w-full items-center justify-between'
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
