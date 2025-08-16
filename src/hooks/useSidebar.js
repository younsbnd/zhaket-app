// Importing required hooks from React
import { useState, useEffect } from 'react';

// Custom hook for managing sidebar state
const useSidebar = () => {
  // State for storing sidebar open/close status
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // State to detect whether we are in mobile mode or not
  const [isMobile, setIsMobile] = useState(false);

  // useEffect to detect screen size and set mobile mode
  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 768; // Less than 768px = mobile
      setIsMobile(mobile);
      
      // If in mobile mode, close the sidebar by default
      if (mobile) {
        setIsSidebarOpen(false);
      } else {
        // In desktop mode, open the sidebar
        setIsSidebarOpen(true);
      }
    };

    // Initial screen size check
    checkScreenSize();

    // Add event listener for screen size changes
    window.addEventListener('resize', checkScreenSize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []); // Empty array means run only once

  // Function to toggle sidebar state (open/close)
  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  // Function to close the sidebar (commonly used on mobile)
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Function to open the sidebar
  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  // Returning all necessary variables and functions
  return {
    isSidebarOpen,  // Sidebar open/close status
    isMobile,       // Are we in mobile mode?
    toggleSidebar,  // Toggle function for sidebar
    closeSidebar,   // Function to close sidebar
    openSidebar     // Function to open sidebar
  };
};

// Exporting the hook for use in other components
export default useSidebar;
