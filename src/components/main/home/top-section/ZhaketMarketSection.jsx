import React from "react";
import { BsPatchCheck } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { GoUnlock } from "react-icons/go";
import { TbRefresh } from "react-icons/tb";

// 
const ZhaketMarketSection = () => {
  return (
    <div className="p-2 space-y-8 self-center">
      {/* title */}
      <h1 className="text-lg md:items-start md:text-start text-center text-[#787676] mb-4">
        ژاکت، معتبرترین مارکت تخصصی قالب و افزونه وردپرس
      </h1>
      {/* description */}
      <blockquote>
        <p className="transition duration-300 text-2xl leading-7 font-medium text-center tracking-[-2px] text-[#454545] md:text-right">
          راهکار برتر راه‌اندازی و توسعه وب‌سایت
        </p>
        <p className="transition duration-300 text-2xl leading-7 font-extraBold text-center mt-3 text-[#454545] md:text-right md:text-[28px]">
          <span className="text-2xl font-bold">با هزاران قالب و افزونه</span>
          <span className="relative">
            <span className="absolute inset-0 top-1 h-[30px] -skew-x-12 transform bg-orange-50 md:top-2"></span>
            <span className="transition duration-300 text-2xl leading-7 font-bold text-center relative z-10 text-[#454545] md:text-[28px]">
              {" "}
              باکیفیت و متنوع وردپرس
            </span>
          </span>
        </p>
      </blockquote>

      {/* search */}
      <div className="flex items-center rounded-md border-athens-gray p-1 transition duration-100 border-0 bg-white h-[60px] w-full max-w-[400px] md:max-w-[465px] shadow-[0px_5px_25px_0_rgba(126,137,155,0.12)] ">
        <input
          placeholder="مثلا قالب فروشگاه"
          className="block w-full rounded-lg border-gray-300 bg-white p-2.5 text-sm text-[#76767C] outline-hidden transition duration-100 focus:border-[#FF9606] focus:shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.15)] focus:ring-[#FF9606] h-8 z-30 border-0 px-4 py-1 placeholder:text-[#5B5C60] placeholder:font-semibold"
        />
        <button className="font-semibold cursor-pointer flex items-center justify-center gap-[10px] text-white transition duration-300 focus:outline-hidden focus:outline-0 h-12 px-5 py-4 text-sm bg-[#FF9606] hover:bg-[#FFE6C0] hover:text-[#B47510] rounded-md">
          <IoSearch className="size-4 " />
          جستجو
        </button>
      </div>

      {/* features */}
      <div className="flex items-center gap-2 md:gap-6">
        <div className="flex items-center gap-2 text-[10px] sm:text-[12px] text-gray-600 font-semibold">
          <BsPatchCheck className="text-orange-400" size={15} />
          <p>ضمانت بازگشت وجه</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-[12px] text-gray-600 font-semibold">
          <GoUnlock className="text-orange-400" size={15} />
          <p>پشتیبانی حرفه ای</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] sm:text-[12px] text-gray-600 font-semibold">
          <TbRefresh className="text-orange-400" size={15} />
          <p>به‌روزرسانی خودکـــار</p>
        </div>
      </div>
    </div>
  );
};

export default ZhaketMarketSection;
