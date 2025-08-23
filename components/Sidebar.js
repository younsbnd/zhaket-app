"use client"; // Marks this as a Client Component so it runs in the browser

// Import icons from react-icons library
import {
  FaTimes,         // Close (X) icon
  FaHome,          // Dashboard icon
  FaUsers,         // Users icon
  FaChartBar,      // Reports icon
  FaCog,           // Settings icon
  FaBox,           // Products icon
  FaShoppingCart,  // Orders icon
  FaThLarge,       // Components icon
  FaLifeRing,      // Support icon
} from "react-icons/fa";

export default function Sidebar({ isOpen, setIsOpen }) {
  // Menu items array with labels (in Persian) and corresponding icons
  const menuItems = [
    { name: "داشبورد", icon: <FaHome /> },         // Dashboard
    { name: "کاربران", icon: <FaUsers /> },        // Users
    { name: "گزارش‌ها", icon: <FaChartBar /> },    // Reports
    { name: "تنظیمات", icon: <FaCog /> },          // Settings
    { name: "محصولات", icon: <FaBox /> },          // Products
    { name: "سفارش‌ها", icon: <FaShoppingCart />}, // Orders
    { name: "کامپوننت‌ها", icon: <FaThLarge /> },  // Components
    { name: "پشتیبانی", icon: <FaLifeRing /> },    // Support
  ];

  // Close sidebar on mobile devices (screen width < 1024px)
  const closeOnMobile = () => {
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop (dark overlay behind sidebar) — appears only when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)} // Clicking backdrop closes the sidebar
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg
        transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "translate-x-full"}  // Slide in/out animation for mobile
        lg:static lg:translate-x-0`} // Always visible on desktop
      >
        {/* Close button (visible only on mobile) */}
        <div className="flex justify-end p-4 lg:hidden">
          <button
            className="text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(false)} // Closes sidebar
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="p-4">
          <ul className="space-y-4 text-gray-700 dark:text-gray-200">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={closeOnMobile} // On mobile, clicking a menu item closes the sidebar
                className="flex items-center gap-3 p-2 rounded-lg
                hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                {item.icon} {/* Menu item icon */}
                <span>{item.name}</span> {/* Menu item label */}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
