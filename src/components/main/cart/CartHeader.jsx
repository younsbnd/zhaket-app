"use client";
import React from "react";
import Link from "next/link";
import { LuCreditCard } from "react-icons/lu";
import { useSession } from "next-auth/react";

const CartHeader = () => {
  const { data: session } = useSession();
  return (
    <div className="flex items-center justify-between md:border-b-[1px] md:border-b-[#EFEFF2] md:p-[26px]">
      {/* cart header title */}
      <div className="flex items-center justify-center gap-[35px]">
        <p className="transition duration-300 text-i-typography text-[22px] md:text-[18px]">
          سبد خرید
        </p>
        <div className="items-center justify-center hidden gap-[10px] md:flex">
          <LuCreditCard className="w-4 h-4 text-[#878F9B]" />
          <p className="transition duration-300 text-sm leading-7 text-[#878F9B]">
            دسترسی آنی به فایل محصول بعد از پرداخت
          </p>
        </div>
      </div>
      {/* login button */}
      {!session?.user && (
        <Link
          href="/login"
          className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] rounded-lg transition duration-300 focus:outline-hidden focus:outline-0 px-4 py-3 text-xs h-12 w-[152px] bg-[#F7F8F9] text-[#878F9B]"
        >
          ورود به ژاکت
        </Link>
      )}
    </div>
  );
};

export default CartHeader;
