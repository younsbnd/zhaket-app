"use client"; // Mark as a Client Component so this runs in the browser in Next.js

import { FaBars, FaSearch, FaMoon, FaSun } from "react-icons/fa"; // Import icons from react-icons

// Header component: receives props from parent for menu toggle (mobile) and dark mode control
export default function Header({ onMenuClick, darkMode, toggleDarkMode }) {
  return (
    <header
      className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50"
    >
      {/* Hamburger menu button (visible on mobile devices, hidden on large screens) */}
      <button
        className="lg:hidden text-gray-700 dark:text-gray-200"
        onClick={onMenuClick} // Trigger function passed from parent to open sidebar
      >
        <FaBars size={20} /> {/* Hamburger icon */}
      </button>

      {/* Search bar - centered and responsive */}
      <div className="flex-1 max-w-md mx-4 w-full">
        <div className="relative">
          {/* Search input field */}
          <input
            type="text"
            placeholder="جستجو..." // "Search..."
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
            focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          {/* Search icon positioned inside the input */}
          <FaSearch
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300"
            size={16}
          />
        </div>
      </div>

      {/* Dark mode toggle button 
          - Shows Sun icon when dark mode is active, Moon icon otherwise */}
      <button
        className="text-gray-700 dark:text-gray-200"
        onClick={toggleDarkMode} // Calls function to toggle theme mode
      >
        {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
    </header>
  );
}
