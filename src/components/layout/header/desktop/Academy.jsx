"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";

const Academy = ({ academyMenu, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className='relative'
      ref={menuRef}
      onMouseLeave={() => {
        setIsMenuOpen(false);
        setHoveredCategory(null);
      }}>
      {/* Trigger */}
      <button
        onMouseEnter={() => setIsMenuOpen(true)}
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className='cursor-pointer px-4 py-2 inline-flex items-center gap-2 rounded-md transition-colors duration-200'>
        <span className='text-zhaket-text/70 font-medium'>{title}</span>
        <MdKeyboardArrowDown
          className={`text-zhaket-primary text-xl transition-transform duration-200 ${
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
            className='absolute rtl:right-0 right-0 mt-2 w-[500px] bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50 flex'>
            {/* Left column: main categories */}
            <div className='w-1/2 border-r border-gray-100 py-4'>
              <ul>
                {academyMenu?.map((cat, i) => (
                  <li
                    key={i}
                    className={`p-3 flex items-center justify-between cursor-pointer ${
                      hoveredCategory === i
                        ? "bg-gray-50 text-primary"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                    onMouseEnter={() => setHoveredCategory(i)}>
                    <Link
                      href={cat.url || "#"}
                      className='flex items-center gap-2 w-full font-medium'>
                      {cat.title}
                    </Link>
                    {cat.subcategories?.length > 0 && (
                      <MdKeyboardArrowLeft className='text-gray-400 text-lg' />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column: subcategories */}
            <div className='w-1/2 py-4'>
              {hoveredCategory !== null &&
                academyMenu[hoveredCategory]?.subcategories?.length > 0 && (
                  <ul className='space-y-2 px-4'>
                    {academyMenu[hoveredCategory].subcategories.map(
                      (sub, idx) => (
                        <li key={idx}>
                          <Link
                            href={sub.url || "#"}
                            className='block text-sm text-gray-600 hover:text-primary transition-colors'>
                            {sub.title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Academy;
