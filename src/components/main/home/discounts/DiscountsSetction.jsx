"use client";
import { Button } from "@heroui/react";
import React from "react";
import { AiOutlinePercentage } from "react-icons/ai";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import DescountsCarousel from "./DiscountsCarousel";

const DiscountsSetction = () => {
  return (
    <section className="flex max-w-[1279px] mx-auto flex-col gap-1 *:w-full md:pt-10 pt-14!">
      {/* title and button */}
      <div className="flex items-center justify-between mb-2 px-1 ps-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center h-11 w-11 rounded-full bg-white shadow-[0px_5px_20px_0px_rgba(219,146,78,0.3)]">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)]">
              <AiOutlinePercentage size={20} color="white" />
            </div>
          </div>
          <h2 className="font-bold text-xl md:text-[21px] text-[#454545]">
            پرتخفیف های ژاکت، همین حالا بخرید!
          </h2>
        </div>
        <Button
          radius="sm"
          variant="faded"
          className="bg-white border-gray-100 border-1 text-orange-500/80 hover:text-white hover:bg-orange-400 hidden md:flex font-bold"
        >
          مشاهده همه
          <IoArrowBack />
        </Button>
      </div>
      {/* carousel */}
      <div>
        <DescountsCarousel />
      </div>
    </section>
  );
};

export default DiscountsSetction;
