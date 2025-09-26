import Image from "next/image";
import React from "react";
import VariousCarousel from "./VariousCarousel";

const VariousChoicesSection = () => {
  return (
    <div className="overflow-x-clip">
      <div className=" mx-auto px-4 !pt-12 !pb-8 flex flex-col gap-y-4 max-w-[1279px]">
        <div className="flex gap-4 items-center">
          <span className="flex items-center justify-center h-8 w-8 rounded-md bg-orange-400/90">
            <Image
              src="/images/main/home/various-choices/zhk-white-sm.svg"
              alt="various-choices-bg"
              width={35}
              height={35}
              className="object-cover text-transparent p-2"
            />
          </span>
          <span>ژاکت، انتخاب های متنوع</span>
        </div>
        <div>
          <p className="transition duration-300 text-xl leading-7 font-medium md:font-2xl pt-4 text-[#454545]">
            جستجو کنید، بهترین محصولات را بیابید و سایت خود را مجهز کنید.
          </p>
          <p className="transition duration-300 text-xl leading-7 font-medium md:font-2xl pt-1 text-[#454545]">
            بیش از هزار محصول متنوع در دسترس شماست!
          </p>
        </div>
      </div>
      <div className="mt-7 pr-4 md:p-4 md:pr-0 max-w-[1279px] mx-auto">
        <VariousCarousel />
      </div>
    </div>
  );
};

export default VariousChoicesSection;
