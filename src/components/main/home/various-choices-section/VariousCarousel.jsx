"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { VARIOUS_CAROUSEL_ITEMS } from "@/constants/main/home/variousCarousel";
import Link from "next/link";

const VariousCarousel = () => {
  return (
    <div className=" h-[454px] mx-auto overflow-visible">
      <Swiper
        slidesPerView={4.5}
        spaceBetween={20}
        className="mySwiper !overflow-visible"
      >
        {VARIOUS_CAROUSEL_ITEMS?.map((item) => (
          <SwiperSlide className="!w-[280px] !h-[454px] mx-auto">
            <Link href={item.path}>
              <Image
                src={item.src}
                alt={item.alt}
                width={1500}
                height={1500}
                quality={100}
                className="object-cover"
                priority
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default VariousCarousel;
