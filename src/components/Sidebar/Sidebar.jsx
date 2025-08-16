import React from 'react';
import * as RiIcons from 'react-icons/ri';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cssUtils';
import { SIDEBAR_MENU_ITEMS, APP_CONFIG } from '../../utils/appConfig';

/**
 * Sidebar component
 * Includes logo, main menu, and logout button
 */
const Sidebar = ({ 
  isOpen, 
  isMobile, 
  closeSidebar,
  activeMenuItem = 'dashboard'
}) => {
  const { isDarkMode } = useTheme();

  /**
   * Render icon by name
   */
  const renderIcon = (iconName, className = "h-5 w-5") => {
    const IconComponent = RiIcons[iconName];
    return IconComponent ? <IconComponent className={className} /> : null;
  };

  /**
   * Handle click on menu item
   */
  const handleMenuItemClick = (item) => {
    console.log(`کلیک روی منوی: ${item.title}`);
    // Routing will be added in the next phase
    
    // On mobile, close the sidebar
    if (isMobile) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Position and size
          "fixed right-0 top-0 z-50 h-full flex flex-col",
          "transform transition-transform duration-300 ease-in-out",
          // Open/close state
          isOpen ? "translate-x-0" : "translate-x-full",
          // Responsive size
          "w-64 lg:w-64",
          // Styles
          "border-l border-gray-200 bg-white shadow-xl",
          "dark:border-gray-700 dark:bg-gray-800",
          // Always show on desktop
          "lg:translate-x-0 lg:static lg:shadow-none"
        )}
      >
        {/* Sidebar Header - logo */}
        <div className={cn(
          "flex h-16 items-center justify-center border-b border-gray-200 px-6",
          "dark:border-gray-700"
        )}>
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              "bg-blue-500 text-white"
            )}>
              {renderIcon('RiDashboard3Line', 'h-6 w-6')}
            </div>
            
            {/* Application name */}
            <h2 className={cn(
              "text-xl font-bold text-gray-900 transition-colors",
              "dark:text-gray-100"
            )}>
              {APP_CONFIG.name}
            </h2>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {SIDEBAR_MENU_ITEMS.map((item) => {
              const isActive = activeMenuItem === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleMenuItemClick(item)}
                    className={cn(
                      // Base style
                      "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right transition-colors",
                      // Default state
                      "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      "dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100",
                      // Active state
                      isActive && [
                        "bg-blue-50 text-blue-700 shadow-sm",
                        "dark:bg-blue-900/20 dark:text-blue-400"
                      ],
                      // Focus state
                      "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                      "dark:focus:ring-offset-gray-800"
                    )}
                  >
                    {/* Menu icon */}
                    <span className={cn(
                      "transition-colors",
                      isActive ? "text-blue-500 dark:text-blue-400" : "text-gray-400 group-hover:text-gray-500"
                    )}>
                      {renderIcon(item.icon)}
                    </span>

                    {/* Menu title */}
                    <span className="text-sm font-medium">
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Sidebar Footer - logout button */}
        <div className={cn(
          "border-t border-gray-200 p-4",
          "dark:border-gray-700"
        )}>
          <button
            onClick={() => console.log('خروج از سیستم')}
            className={cn(
              "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-right transition-colors",
              "text-red-600 hover:bg-red-50 hover:text-red-700",
              "dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300",
              "focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
              "dark:focus:ring-offset-gray-800"
            )}
          >
            {/* Logout icon */}
            <span className="text-red-500 dark:text-red-400">
              {renderIcon('RiLogoutBoxLine')}
            </span>

            {/* Logout text */}
            <span className="text-sm font-medium">
              خروج از سیستم
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
