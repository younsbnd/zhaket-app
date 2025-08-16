// Importing required libraries from React
import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating Context for theme management (dark/light mode)
const ThemeContext = createContext();

// Provider component that wraps the entire application
export const ThemeProvider = ({ children }) => {
  // State to store theme status (true = dark, false = light)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // useEffect to load saved theme from localStorage
  useEffect(() => {
    // Check if a previous theme is saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      // Set theme based on saved value
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // useEffect to apply theme to the html element
  useEffect(() => {
    // Add or remove 'dark' class from the html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save in localStorage
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save in localStorage
    }
  }, [isDarkMode]);

  // Function to toggle theme
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  // Values provided to child components
  const value = {
    isDarkMode,    // Current theme status
    toggleTheme    // Theme toggle function
  };

  // Providing Context to child components
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use ThemeContext
export const useTheme = () => {
  // Accessing context
  const context = useContext(ThemeContext);
  
  // Checking if context is available
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
