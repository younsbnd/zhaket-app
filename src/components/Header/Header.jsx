import React from 'react';
import { 
  RiMenuLine, 
  RiCloseLine, 
  RiSunLine, 
  RiMoonLine,
  RiNotificationLine,
  RiUserLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cssUtils';

/**
 * Header Component
 * Includes sidebar toggle button, page title, theme switch, notifications, and user profile
 */
const Header = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  pageTitle = "داشبورد" 
}) => {
  // Access to theme context
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className={cn(
      "sticky top-0 z-30 flex h-16 w-full items-center justify-between",
      "border-b border-gray-200 bg-white px-4 shadow-sm transition-colors",
      "dark:border-gray-700 dark:bg-gray-800",
      "lg:px-6"
    )}>
      {/* Left section: menu button and page title */}
      <div className="flex items-center gap-4">
        {/* Sidebar toggle button */}
        <button
          onClick={toggleSidebar}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200",
            "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-800"
          )}
          aria-label={isSidebarOpen ? "بستن منو" : "باز کردن منو"}
        >
          {isSidebarOpen ? (
            <RiCloseLine className="h-5 w-5" />
          ) : (
            <RiMenuLine className="h-5 w-5" />
          )}
        </button>

        {/* Page title */}
        <div className="flex items-center">
          <h1 className={cn(
            "text-xl font-semibold text-gray-900 transition-colors",
            "dark:text-gray-100"
          )}>
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right section: notifications, theme switch, and user profile */}
      <div className="flex items-center gap-2">
        {/* Notification button */}
        <button
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg",
            "bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200",
            "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-800"
          )}
          aria-label="نوتیفیکیشن‌ها"
        >
          <RiNotificationLine className="h-5 w-5" />
          {/* New notification indicator */}
          <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white dark:border-gray-800"></span>
        </button>

        {/* Theme toggle button */}
        <button
          onClick={toggleTheme}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg",
            "bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200",
            "dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "dark:focus:ring-offset-gray-800"
          )}
          aria-label={isDarkMode ? "تغییر به حالت روشن" : "تغییر به حالت تیره"}
        >
          {isDarkMode ? (
            <RiSunLine className="h-5 w-5" />
          ) : (
            <RiMoonLine className="h-5 w-5" />
          )}
        </button>

        {/* User profile */}
        <div className="relative">
          <button
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2",
              "bg-gray-100 transition-colors hover:bg-gray-200",
              "dark:bg-gray-700 dark:hover:bg-gray-600",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "dark:focus:ring-offset-gray-800"
            )}
            aria-label="منوی کاربر"
          >
            {/* User avatar */}
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full",
              "bg-blue-500 text-white"
            )}>
              <RiUserLine className="h-4 w-4" />
            </div>

            {/* User name (visible only on desktop) */}
            <div className="hidden lg:block">
              <span className={cn(
                "text-sm font-medium text-gray-900 transition-colors",
                "dark:text-gray-100"
              )}>
                کاربر مدیر
              </span>
            </div>

            {/* Dropdown icon */}
            <RiArrowDownSLine className={cn(
              "h-4 w-4 text-gray-500 transition-colors",
              "dark:text-gray-400",
              "hidden lg:block"
            )} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
