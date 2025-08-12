"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";
import Link from "next/link";

const Icon = ({ name, className }) => <span className={className}>{name}</span>;

const MegaMenuDropdown = ({ categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0); // Default to first category
  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Set first category with subcategories as active when menu opens
  useEffect(() => {
    if (isMenuOpen && categories.length > 0) {
      // Find first category that has subcategories
      const firstWithSubs = categories.findIndex(
        (cat) => cat.subcategories?.length > 0
      );
      setActiveCategory(firstWithSubs >= 0 ? firstWithSubs : null);
    }
  }, [isMenuOpen, categories]);

  const handleCategoryHover = (index) => {
    clearTimeout(timeoutRef.current);
    if (categories[index]?.subcategories?.length > 0) {
      setActiveCategory(index);
    }
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 300);
  };

  const cancelMouseLeave = () => {
    clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className='relative' ref={menuRef} onMouseLeave={handleMouseLeave}>
      {/* Trigger Button */}
      <button
        onMouseEnter={() => setIsMenuOpen(true)}
        onClick={handleMenuToggle}
        className='cursor-pointer px-4 py-2 inline-flex items-center gap-2 rounded-md transition-colors duration-200 hover:bg-gray-100'
        aria-expanded={isMenuOpen}
        aria-haspopup='true'>
        <FiMenu className='text-zhaket-primary' />
        <span className='text-zhaket-text/70 font-medium'>دسته‌بندی‌ها</span>
        <MdKeyboardArrowDown
          className={`text-xl text-zhaket-primary transition-transform duration-200 ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className='absolute rtl:right-0 right-0 mt-2 w-[700px] bg-white border border-gray-200 shadow-xl rounded-lg overflow-hidden z-50 flex'
            onMouseEnter={cancelMouseLeave}
            onMouseLeave={handleMouseLeave}>
            {/* Main Categories Column */}
            <div className='w-1/3 bg-gray-100 pt-5 pr-5'>
              <p className='font-bold text-gray-800 mb-4 text-lg'>
                همه دسته‌بندی‌ها
              </p>
              <ul className='space-y-1'>
                {categories.map((cat, i) => (
                  <motion.li
                    key={i}
                    initial={{ backgroundColor: "rgba(243, 244, 246, 1)" }}
                    animate={{
                      backgroundColor:
                        activeCategory === i
                          ? "#fff"
                          : "rgba(243, 244, 246, 1)",
                    }}
                    transition={{ duration: 0.15 }}
                    className='rounded-md'>
                    <div
                      className={`p-3 flex items-center justify-between transition-colors ${
                        activeCategory === i
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                      onMouseEnter={() => handleCategoryHover(i)}
                      onClick={() => handleCategoryHover(i)}>
                      <Link
                        href={cat.url || "#"}
                        className='flex items-center gap-3 w-full font-medium'>
                        {cat.icon && (
                          <Icon
                            name={cat.icon}
                            className='text-primary text-lg'
                          />
                        )}
                        <span>{cat.title}</span>
                      </Link>
                      {cat.subcategories?.length > 0 && (
                        <MdKeyboardArrowLeft className='text-gray-400 text-xl' />
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Subcategories Column - Shows first category by default */}
            <AnimatePresence mode='wait'>
              {activeCategory !== null &&
                categories[activeCategory]?.subcategories?.length > 0 && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className='w-2/3 p-6'>
                    <div className='grid grid-cols-2 gap-6'>
                      {categories[activeCategory].subcategories.map(
                        (sub, j) => (
                          <div key={j} className=''>
                            <Link
                              href={sub.url || "#"}
                              className='text-gray-600 text-sm hover:text-primary flex items-center gap-2 border-b border-gray-100 pb-2'>
                              {sub.title}
                            </Link>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenuDropdown;
