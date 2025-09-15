// AuthButton.jsx
// This component renders the login/register button for unauthenticated users.
// It is separated for reusability and clarity across the app.

import React from "react";
import Link from "next/link";
import { BiUser } from "react-icons/bi";

const AuthButton = () => (
  <Link
  className="group flex h-10 w-fit min-w-14 items-center justify-center rounded-lg bg-white shadow-[0px_4px_8px_0px_rgba(153,126,86,0.08)] outline-hidden transition duration-300 hover:bg-[#76767c] md:h-12 lg:w-32 md:bg-[#f7f7f7] md:shadow-none"
  href="/auth/signin"
>
  {/* Icon turns white when parent (group) is hovered */}
  <BiUser className="transition duration-300 group-hover:text-white" />

  <span className="text-sm flex text-nowrap leading-7 pr-2 text-[#787676] transition duration-300 group-hover:text-[#f7f8f9]">
    ورود | ثبتنام
  </span>
</Link>

);

export default AuthButton;
