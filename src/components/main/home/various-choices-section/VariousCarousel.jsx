"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { VARIOUS_CAROUSEL_ITEMS } from "@/constants/main/home/variousCarousel";
import Link from "next/link";

//  create a carousel for various choices products
const VariousCarousel = () => {
  return (
    <div className=" h-[454px] mx-auto overflow-visible">
      {/* swiper */}
      <Swiper
        slidesPerView={4.5}
        breakpoints={{
          0: {
            slidesPerView: 1.25,
            spaceBetween: 20,
          },

          480: {
            slidesPerView: 2.1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.8,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3.6,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 4.3,
            spaceBetween: 20,
          },
        }}
        spaceBetween={20}
        className="mySwiper !overflow-visible"
      >
        {VARIOUS_CAROUSEL_ITEMS?.map((item) => (
          //  create a swiper slide for each item
          <SwiperSlide className="!w-[280px] !h-[454px] mx-auto">
            <Link href={item.path}>
              {/* image */}
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
