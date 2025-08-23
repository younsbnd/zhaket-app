"use client"; // Marks this component as a Client Component in Next.js (runs in the browser)
import "./globals.css"; // Import global CSS styles
import { useState, useEffect } from "react"; // React hooks for state and lifecycle
import Sidebar from "../components/Sidebar"; // Sidebar component
import Header from "../components/Header";   // Header component

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar open/close state
  const [darkMode, setDarkMode] = useState(false);           // Dark mode toggle state

  // Load dark mode preference from localStorage (runs only on initial render)
  useEffect(() => {
    const saved = localStorage.getItem("theme"); // Retrieve saved theme from localStorage
    if (saved === "dark") {
      setDarkMode(true); // Set dark mode state to true
      document.documentElement.classList.add("dark"); // Add Tailwind 'dark' class to <html>
    }
  }, []);

  // Toggles dark/light mode and saves preference in localStorage
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev; // Invert the current state
      if (next) {
        document.documentElement.classList.add("dark");  // Enable dark mode class
        localStorage.setItem("theme", "dark");           // Save preference
      } else {
        document.documentElement.classList.remove("dark"); // Disable dark mode class
        localStorage.setItem("theme", "light");            // Save preference
      }
      return next; // Update the state
    });
  };

  return (
    <html lang="fa" dir="rtl"> {/* HTML element with Farsi (Persian) language and RTL direction */}
      <body className="bg-gray-100 dark:bg-gray-900 font-vazirmatn">
        {/* flex container covering the full browser height */}
        <div className="flex min-h-screen">
          
          {/* Sidebar component (toggles via state) */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          
          {/* Main content area (flex column layout) */}
          <div className="flex-1 flex flex-col">
            
            {/* Header receives props for menu click, dark mode state, and toggle function */}
            <Header
              onMenuClick={() => setIsSidebarOpen(true)}
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
            
            {/* Main content section with padding and top margin to avoid overlapping with Header */}
            <main className="flex-1 p-4 mt-16">
              {children} {/* Rendered child components/pages */}
            </main>

          </div>
        </div>
      </body>
    </html>
  );
}
