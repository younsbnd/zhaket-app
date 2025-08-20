"use client";
import Image from "next/image";
import React from "react";

// layout for auth pages
const AuthLayout = ({ title, children }) => {
  return (
    <div className="w-full bg-[#F9FAFC]">
      <div className="relative h-screen flex justify-center items-center w-full ">
        <Image
          src="/images/bg-login.svg"
          alt="bg-login"
          width={800}
          height={500}
          priority
          className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[590px]"
        />
        <div className="bg-white border border-[#F4F4F4] shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] w-90 z-10 rounded-lg mx-9 sm:p-10 p-5 relative">
          {/* logo and title */}
          <div className=" flex flex-col justify-center items-center h-auto mb-9 relative">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={50}
              height={50}
              priority
              className="w-12 h-12"
            />

            <span className="mt-3 text-[14.2px]">{title}</span>
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
