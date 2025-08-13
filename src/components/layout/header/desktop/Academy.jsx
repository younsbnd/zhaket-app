"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";

const Academy = ({ academyMenu, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null); // controls mobile submenu
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setHoveredCategory(null);
        setOpenSubmenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleCategory = (i) => {
    if (isMobile) {
      setOpenSubmenu((prev) => (prev === i ? null : i));
    } else {
      setHoveredCategory(i);
    }
  };

  return (
    <div
      className='relative'
      ref={menuRef}
      onMouseLeave={() => {
        if (!isMobile) {
          setIsMenuOpen(false);
          setHoveredCategory(null);
        }
      }}>
      {/* Main Trigger */}
      <button
        onMouseEnter={() => !isMobile && setIsMenuOpen(true)}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='cursor-pointer lg:px-4 py-2 inline-flex items-center lg:justify-normal justify-between lg:w-auto w-full gap-2 rounded-md transition-colors duration-200'>
        <span className='text-zhaket-text/70 font-medium lg:text-sm text-xl'>
          {title}
        </span>

        {/* Mobile +/− icon for main toggle */}
        <span className='lg:hidden relative block w-4 h-4'>
          {/* Horizontal line */}
          <span className='absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300' />
          {/* Vertical line */}
          <span
            className={`absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300 ${
              isMenuOpen ? "scale-x-0" : "rotate-90"
            }`}
          />
        </span>

        {/* Desktop arrow */}
        <MdKeyboardArrowDown
          className={`text-zhaket-primary text-xl lg:flex hidden transition-transform duration-200 ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className='absolute rtl:right-0 right-0 mt-2 md:w-[500px] w-full bg-white lg:border border-none border-gray-200 lg:shadow-lg rounded-lg overflow-hidden z-50 flex'>
            <div className='w-full py-4'>
              <ul>
                {academyMenu?.map((cat, i) => (
                  <li
                    key={i}
                    className={`p-3 flex items-center justify-between w-full cursor-pointer ${
                      hoveredCategory === i || openSubmenu === i
                        ? "bg-gray-50 text-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => !isMobile && toggleCategory(i)}>
                    <Link
                      href={cat.url || "#"}
                      className='flex items-center gap-2 w-full text-sm text-zhaket-secondary/80'>
                      {cat.title}
                    </Link>

                    {cat.subcategories?.length > 0 &&
                      (isMobile ? (
                        // Mobile submenu toggle +/-
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCategory(i);
                          }}
                          className='relative w-4 h-4 flex-shrink-0'>
                          {/* Horizontal */}
                          <span className='absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300' />
                          {/* Vertical */}
                          <span
                            className={`absolute top-1/2 left-0 w-4 h-0.5 bg-gray-600 transform -translate-y-1/2 transition-all duration-300 ${
                              openSubmenu === i ? "scale-x-0" : "rotate-90"
                            }`}
                          />
                        </span>
                      ) : (
                        <MdKeyboardArrowLeft className='text-gray-400 text-lg' />
                      ))}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Academy;
