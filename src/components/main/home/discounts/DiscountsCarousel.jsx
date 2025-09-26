"use client";
import { DISCOUNTS_PRODUCT } from "@/constants/main/home/discounts-product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

//  create a carousel for discounts products
const DescountsCarousel = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 0,
          },
          576: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
        
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 1,
          },
        }}
        slidesPerView={6}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="discounts-swiper px-40 py-4!"
      >
        {DISCOUNTS_PRODUCT?.map((item) => (
          //  create a swiper slide for each item
          <SwiperSlide key={item.id}>
            <div className="flex flex-col justify-between overflow-hidden border shadow-[0px_5px_25px_0px_rgba(126,137,155,0.11)] relative h-[208px] w-[195px] rounded-lg border-solid border-[#F4F4F4] bg-white px-4 py-7 ms-4">
              <Link href={item.path}>
                <div className="flex items-center justify-center flex-col gap-5 p-0">
                  <div className="flex items-center justify-center absolute left-0 top-[15px] h-[22px] w-[41px] rounded-r-[4px] bg-[linear-gradient(247.65deg,_#FFC107_-35.57%,_#FF9737_100%)] text-center text-[13px] font-bold leading-[18px] text-[#FFFFFF]">
                    {item.discount}%
                  </div>
                  <Image
                    src={item.src}
                    alt="discount-1"
                    width={80}
                    height={80}
                    priority
                    className="object-cover"
                  />
                  <p className="transition duration-300 text-sm leading-7 text-center line-clamp-2 text-[#5B5C60] hover:text-[#ff9606]">
                    {item.title}
                    Templates
                  </p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DescountsCarousel;
