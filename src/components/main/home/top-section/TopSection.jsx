"use client";
import React from "react";
import TopThemesSection from "./TopThemesSection";
import IraniProductsSection from "./IraniProductsSection";
import ZhaketMarketSection from "./ZhaketMarketSection";
import Image from "next/image";

const TopSection = () => {
  return (
    <div>
      {/* zhaket market component */}
      <section className="flex items-center justify-center max-w-[1279px] gap-6 p-4 pt-14 md:px-0 md:pt-16 xl:justify-between *:w-full mx-auto z-10">
        <ZhaketMarketSection />
        {/* top themes component */}
        <div className="items-center justify-center hidden gap-6 xl:flex">
          <div className="flex flex-col justify-between overflow-hidden relative h-[440px] w-[326px] rounded-2xl border-[3px] border-white pb-11 pt-[46px] shadow-[0px_5px_35px_0px_rgba(34,36,49,0.18)] z-10">
            <TopThemesSection />
          </div>
          {/* irani products component */}
          <div className="items-center flex flex-col justify-between overflow-hidden relative h-[440px] w-[326px] rounded-2xl border-[2px] border-white pb-12 pt-[60px] shadow-[0_5px_25px_0_rgba(255,107,1,0.1)] z-10">
            <IraniProductsSection />
          </div>
        </div>
        {/* background mobile*/}
        <Image
          src="/images/main/home/top-section/home-bg-mobile.90f4a2a9.svg"
          alt="home-bg-mobile"
          width={326}
          height={440}
          priority
          className=" h-full absolute left-0 right-0 bottom-0 top-[-10%]! -z-10 w-full! bg-cover! bg-right-top! md:hidden"
        />
        {/* background desktop */}
        <Image
          src="/images/main/home/top-section/home-bg.0caf3210.svg"
          alt="home-bg"
          width={326}
          height={440}
          priority
          className="-z-10 h-full w-full absolute top-0 left-0 right-0 bottom-0  hidden min-h-[676px]  bg-cover! bg-right-top! md:top-[-100px]! md:inline"
        />
      </section>
    </div>
  );
};

export default TopSection;
