// AuthButton.jsx
// This component renders the login/register button for unauthenticated users.
// It is separated for reusability and clarity across the app.

import React from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

const AuthButton = () => (
  <Link
    // Button for login/register (now with hover:bg-[#76767c] as requested)
    className="group flex h-10 w-fit min-w-12 items-center justify-center rounded-lg bg-white p-2 shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-hidden transition duration-300 hover:bg-[#76767c] md:h-12 md:bg-[#F9FAFC] md:shadow-none"
    href="/auth/signin"
  >
    <BiUser />
    <span className="text-sm leading-7 pr-1 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
      ورود | ثبت‌نام
    </span>
  </Link>
);

export default AuthButton;
