import React, { useState } from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import useSidebar from '../../hooks/useSidebar';
import { cn } from '../../utils/cssUtils';

/**
 * Main Layout component
 * Includes Header, Sidebar, and main content area
 */
const Layout = ({ 
  children, 
  pageTitle = "داشبورد",
  activeMenuItem = "dashboard" 
}) => {
  // Using sidebar management hook
  const { 
    isOpen: isSidebarOpen, 
    isMobile, 
    toggle: toggleSidebar, 
    close: closeSidebar 
  } = useSidebar();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isMobile={isMobile}
        closeSidebar={closeSidebar}
        activeMenuItem={activeMenuItem}
      />

      {/* Main Content Area */}
      <div className={cn(
        "flex min-h-screen flex-col transition-all duration-300",
        // In desktop, account for sidebar space
        !isMobile && isSidebarOpen ? "lg:mr-64" : "lg:mr-0"
      )}>
        {/* Header */}
        <Header
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          pageTitle={pageTitle}
        />

        {/* Main Content */}
        <main className={cn(
          "flex-1 overflow-hidden",
          "bg-gray-50 dark:bg-gray-900 transition-colors"
        )}>
          {/* Content Container */}
          <div className="h-full overflow-y-auto">
            <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
