"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
/**
 * FooterAboutSection component
 * Renders the about section with e-namad trust seal and social icons.
 * Uses next/image for all images and next/link for all links.
 */
export default function FooterAboutSection({ socials }) {
  return (
    <>
      {/* About us section with e-namad trust seal and dropdown menus */}
      <div className="flex flex-col md:flex-row items-center justify-center pt-10 gap-4" data-cy="data-cy-footer-about-us">
        <div className="flex flex-col md:flex-row items-center justify-between gap-[50px] rounded-lg bg-[#F9FAFC] p-[23px] text-[#5D6877] w-full">

          {/* About text and e-namad trust seal (mobile/desktop) */}
          <div className="flex flex-col md:flex-row items-center gap-[30px] w-full md:w-auto">
            <p className="transition duration-300 text-sm leading-7 font-medium text-[#5D6877] text-center md:text-right">
              مرجع وردپرس فارسی و رهبر بازار اولین پلتفرم ارائه دهنده خدمات و محصولات دیجیتال در ایران که با گردهم آوری منابع انسانی توانمند و برجسته بدنبال خلق ارزش برای ذینفعان خود می باشد. ژاکت دارای 6 فاز توسعه در سمت محصول با تیم قدرتمند فنی و تیم کارکشته و با تجربه بازاریابی برای افزایش سهم بازار حداکثری خود است.
            </p>
            <Link className="flex" href=" " target="_blank" rel="noopener noreferrer">
              {/* E-namad trust seal image: always set both width and height, and use style to divtain aspect ratio if CSS changes one */}
              <Image
                alt="E-namad trust seal"
                src="/images/footer/download.jpg"
                width={67}
                height={82}
                className="w-[67px] h-auto cursor-pointer"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
