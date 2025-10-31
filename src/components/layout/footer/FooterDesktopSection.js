"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { HiEnvelope } from "react-icons/hi2";
import { HiArrowLeft } from "react-icons/hi";
import { Button, Input } from "@heroui/react";

/**
 * FooterDesktopSection Component
 * 
 * Renders the desktop version of the footer with:
 * - Logo and navigation links on the left side
 * - Newsletter subscription and contact support on the right side
 * - Responsive design that hides on mobile devices
 * 
 * @param {Object} props - Component props
 * @param {Array} props.footerLinks - Array of footer link sections with title and links
 * @returns {JSX.Element} Desktop footer section
 */
export default function FooterDesktopSection({ footerLinks, logoUrl }) {
  return (
    <div className="justify-between md:flex md:pt-[50px] w-full">
      {/* Left side: Logo + Navigation columns */}
      <div className="hidden md:flex md:w-[calc(100%_-_377px)] pt-[25px] gap-x-32">
        {/* Company logo section */}
        <div className="flex flex-col items-start gap-4">
          <Link href="/" aria-label="صفحه اصلی ژاکت">
            <Image
              alt="لوگو ژاکت"
              width={60}
              height={43}
              src={logoUrl || "/images/logo.svg"}
              className="min-h-[31px] min-w-[44px] transition-opacity duration-300 hover:opacity-80"
              priority
            />
          </Link>
          
          {/* Dynamic first footer menu children under logo (no title) */}
          <div className="flex w-full flex-col items-start gap-4">
            {footerLinks && footerLinks.length > 0 && footerLinks[0] && footerLinks[0].links ? (
              /* First footer menu links only (no title) */
              <nav className="flex flex-col items-start gap-2" aria-label={`${footerLinks[0].title} لینک‌ها`}>
                {footerLinks[0].links.map((link, linkIndex) => (
                  <Link
                    key={`first-menu-${linkIndex}-${link.href}`}
                    href={link.href}
                    className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ) : (
              /* Fallback static links if no dynamic menu */
              <nav className="flex flex-col items-start gap-2" aria-label="ارتباط با ما لینک‌ها">
                <Link
                  href="/content/terms"
                  className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                >
                  قوانین ژاکت
                </Link>
                <Link
                  href="/logo"
                  className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                >
                  لوگو
                </Link>
                <Link
                  href="/content/about"
                  className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                >
                  درباره ما
                </Link>
                <Link
                  href="/content/contact"
                  className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                >
                  تماس با ما
                </Link>
              </nav>
            )}
          </div>
        </div>

        {/* Navigation links organized in 2 columns with increased spacing (excluding first menu) */}
        <div className="grid grid-cols-2 gap-x-16 flex-1 justify-start">
          {footerLinks.slice(1).filter(section => section.title !== "ارتباط با ژاکت").map((section, index) => (
            <div
              key={section.title}
              className="flex w-full flex-col items-start gap-4"
            >
              {/* Section title */}
              <h3 className="text-[17px] text-[#424244] leading-7 font-medium md:block">
                {section.title}
              </h3>

              {/* Section links */}
              <nav className="flex flex-col items-start gap-2" aria-label={`${section.title} لینک‌ها`}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={`${section.title}-${linkIndex}-${link.href}`}
                    href={link.href}
                    className="text-[14px] leading-7 text-[#76767C] font-bold transition-colors duration-300 hover:text-[#FF9606]"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter and contact section */}
      <div className="flex flex-col lg:mr-36 md:w-[377px]">
        {/* Newsletter subscription card */}
        <div className="mt-4 h-[159px] rounded-xl border-[3px] border-white bg-[linear-gradient(233.69deg,#FFDAA2_-5.92%,#FFF3E0_17.7%)] p-7 shadow-[0px_5px_25px_0px_rgba(255,107,1,0.08)]">
          <div className="flex items-center gap-3 pb-2">
            <Image
              alt="لوگو ژاکت"
              priority
              width={33}
              height={33}
              src={logoUrl || "/images/logo.svg"}
              className="w-[22px] h-[22px] object-contain"
            />
            <span className="text-lg leading-7 text-[#544C45] font-medium">
              خبرنامه ژاکت
            </span>
          </div>

          <div className="pt-6">
            <div className="flex items-center rounded-md p-1 shadow-md bg-white h-12 w-full hover:ring-1 hover:ring-[#878F9B] transition-all duration-300">
              <span className="pr-[13px]" aria-hidden="true">
                <HiEnvelope className="w-5 h-5 text-[#878F9B]" />
              </span>
              <Input
                className="flex-1"
                classNames={{
                  input: "text-sm text-[#76767C]",
                  inputWrapper: "h-8 border-0 shadow-none bg-transparent",
                }}
                type="email"
                placeholder="ایمیل خود را وارد کنید"
                variant="flat"
                aria-label="ایمیل برای عضویت در خبرنامه"
              />
              <Button
                isIconOnly
                className="bg-[#FFAE11] hover:bg-[#FFAE11]/80 text-white h-10 w-10 transition-colors duration-300"
                aria-label="عضویت در خبرنامه"
              >
                <HiArrowLeft className="w-[15px] h-[15px]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact support section */}
        <div className="flex items-center w-full justify-between pt-7">
          <div className="flex items-center gap-3">
            {/* Support avatars */}
            <div className="flex ml-4 items-center" role="img" aria-label="تیم پشتیبانی">
              <Image
                alt="پشتیبانی ژاکت"
                width={30}
                height={30}
                priority
                src="/images/footer/contact-avatar-2.dccc43be.jpg"
                className="-translate-x-3 -translate-y-3 rounded-full border-2 border-white shadow"
              />
              <Image
                alt="پشتیبانی ژاکت"
                width={36}
                height={36}
                priority
                src="/images/footer/contact-avatar-1.61401764.png"
                className="rounded-full border-2 border-white shadow"
              />
            </div>

            {/* Support text */}
            <div>
              <p className="text-base leading-7 text-[#424244] font-medium">
                سوالی دارید؟ بپرسید
              </p>
              <p className="text-sm leading-7 text-[#878F9B]">
                ابتدا عضو شوید و سپس تیکت بفرستید
              </p>
            </div>
          </div>

          {/* Contact button */}
          <Link href="/dashboard/tickets/new">
            <Button className="h-[40px] w-[70px] bg-[#F0F8FF] text-[#6097F3] hover:bg-[#F0F8FF]/80 transition-colors duration-300 font-medium">
              ارسال تیکت
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}