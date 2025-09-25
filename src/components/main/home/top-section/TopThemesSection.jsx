import { CAROUSEL_ITEMS } from "@/constants/main/home/top-section/carouselItems";
import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper modules
import { Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const TopThemesSection = () => {
  return (
    <>
      <Image
        src="/images/main/home/top-section/rotating-slider-bg.png"
        alt="top-themes-section"
        width={326}
        height={440}
        priority
        className="-z-10 h-full w-full absolute top-0 left-0 right-0 bottom-0"
      />
      <div className="flex flex-col items-center p-0 min-w-[350px]">
        <div className="flex items-center justify-center w-full">
          <div className="relative z-[2] h-[220px] w-[400px]">
            <Swiper
              modules={[Autoplay, EffectCoverflow]}
              spaceBetween={70}
              slidesPerView={2}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              effect="coverflow"
              coverflowEffect={{
                rotate: 0,
                modifier: 2,
                slideShadows: false,
              }}
              loop={true}
              className="themes-swiper rotate-z-slider "
            >
              {CAROUSEL_ITEMS?.map((item) => (
                <SwiperSlide key={item.id}>
                  <Link href={item.path} className="cursor-pointer block">
                    <div className="relative h-[171px] w-[237px] me-9 mb-8">
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={237}
                        height={171}
                        className="rounded-[15px] object-cover object-top h-full w-full"
                      />

                      <span className="flex items-center justify-center absolute bottom-[-20px] z-30 w-full">
                        <Image
                          src={item.children?.src}
                          alt={item.children?.alt}
                          width={45}
                          height={45}
                          className="rounded-[17px] border-2 border-solid border-[#232532]"
                        />
                      </span>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col ">
        <p className="transition duration-300 font-bold text-[17px] text-white">
          قالب های برتر فروشگاهی
        </p>
        <p className="transition duration-300 text-sm leading-7 font-medium pt-1 text-neutral-400">
          راه اندازی یک فروشگاه مدرن و خاص
        </p>

        <Button className="relative mt-6 h-11 w-[120px] top-btn">
          مشاهده همه
        </Button>
      </div>
    </>
  );
};

export default TopThemesSection;
