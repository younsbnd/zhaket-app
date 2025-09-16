// AuthButton.jsx
// This component renders the login/register button for unauthenticated users
// Separated for reusability and clarity across the application

import React from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

/**
 * AuthButton component
 * Renders login/register button with responsive design and hover effects
 * @returns {JSX.Element} Authentication button component
 */
const AuthButton = () => (
  <Link
    className="group flex h-10 w-fit min-w-14 items-center justify-center rounded-lg bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-none focus:outline-none focus:ring-2 focus:ring-[#76767c] transition-all duration-300 hover:bg-[#76767c] md:h-12 lg:w-32 md:bg-[#f7f7f7] md:shadow-none"
    href="/login"
    aria-label="ورود یا ثبت نام"
  >
    {/* User icon - changes color on hover */}
    <BiUser className="w-5 h-5 transition-colors duration-300 text-gray-400 group-hover:text-white" />

    {/* Text - hidden on mobile, visible on larger screens */}
    <span className="flex text-sm text-nowrap leading-7 pr-2 text-[#787676] transition-colors duration-300 group-hover:text-[#f7f8f9]">
      ورود | ثبت نام
    </span>
  </Link>
);

export default AuthButton;
