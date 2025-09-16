"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

/**
 * FooterAboutSection component
 * Renders the about section with e-namad trust seal
 * Uses next/image for images and next/link for links
 */
export default function FooterAboutSection() {
  return (
    <div 
      className="flex flex-col md:flex-row items-center justify-center pt-10 gap-4" 
      data-cy="data-cy-footer-about-us"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-[50px] rounded-lg bg-[#F9FAFC] p-[23px] text-[#5D6877] w-full">
        
        {/* About text and e-namad trust seal */}
        <div className="flex flex-col md:flex-row items-center gap-[30px] w-full md:w-auto">
          <p className="transition duration-300 text-sm leading-7 font-medium text-[#5D6877] text-center md:text-right">
            مرجع وردپرس فارسی و رهبر بازار اولین پلتفرم ارائه دهنده خدمات و محصولات دیجیتال در ایران که با گردهم آوری منابع انسانی توانمند و برجسته بدنبال خلق ارزش برای ذینفعان خود می باشد. ژاکت دارای 6 فاز توسعه در سمت محصول با تیم قدرتمند فنی و تیم کارکشته و با تجربه بازاریابی برای افزایش سهم بازار حداکثری خود است.
          </p>
          
          {/* E-namad trust seal */}
          <Link 
            className="flex" 
            href="https://trustseal.enamad.ir/" 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="مهر اعتماد الکترونیکی"
          >
            <Image
              alt="مهر اعتماد الکترونیکی"
              src="/images/footer/download.jpg"
              width={67}
              height={82}
              className="w-[67px] h-auto cursor-pointer transition-opacity duration-300 hover:opacity-80"
              priority
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
